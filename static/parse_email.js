"use strict"

/* Authentication-Resultsヘッダをパースする */
function parseAuthenticationResults(content, json){
    //spf
    var spf = /spf=(.*?)\s/.exec(content);
    if(spf){
	if(spf[1] == "pass"){
	    json.spf = "true";
	}
    }
    // dkim
    var dkim = /dkim=(.*?)\s/.exec(content);
    if(dkim){
	if(dkim[1] == "pass"){
	    json.dkim = "true";
	}
    }
    // dmarc
    var dmarc = /dmarc=(.*?)\s/.exec(content);
    if(dmarc){
	if(dmarc[1] == "pass"){
	    json.dmarc = "true";
	}
    }	
}

/* Receivedヘッダをパースする */
function parseReceived(content, json){
    // fromのパース処理
    var from = /from\s*(.*?)\s\((.*)\s*\[([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\]\)/.exec(content);
    if(from){
	json.from.display = from[1];
	json.from.reverse = from[2];
	json.from.ip = from[3];    
    }
    // byのパース処理
    var by = /by\s*(.*?)\s*\(.*\)\s*with\s*([A-Za-z]*)/.exec(content);
    if(by){
	json.by = by[1];
	json.protocol = by[2];
    }
    // ssl/tls情報のパース処理
    var ssl = /(\(version=.*\))/.exec(content);
    if(ssl){
	json.ssl = ssl[1];
    }
    var ssl2 = /(\(TLS.*\))/.exec(content);
    if(ssl2){
	json.ssl = ssl2[1];
    }
}

/* contentについて分析を行い，JSONに変換可能なオブジェクトを返す． */
function parseEmail(content) {
    // parse結果を格納
    var parse_result_json = {
	"received": [],
	"attach": [],
	"pattern": [],
	"from": "",
	"reply-to": "",
	"subject": ""
    };

    // ヘッダとボディへ分割
    let contentArray = content.split('\r\n\r\n');
    let header = contentArray[0];
    let body = contentArray.slice(1).join('\r\n\r\n');
    
    // Authentication-Results, Received and Delivered-Toの取得
    let received_pattern = /(Authentication-Results:[\s\S]*?)?(Received:([\s\S]*?)[+\-][0-9]{4}\s.*)/g;
    let received_nodes = header.match(received_pattern);
    
    // Authentication-Results, Received and Delivered-Toへ分解
    for(const node of received_nodes){
	var parse_result = {
            "from": {
                "display": "",
                "reverse": "",
                "ip": ""
            },
            "by": "",
            "protocol": "",
            "ssl": "",
            "spf": false,
            "dkim": false,
            "dmarc": false
        };
	
	console.log(node);
	let tmp = /Authentication-Results:[\s\S]*/.test(node);
	console.log(tmp);
	
	// Authentication-Resultsが存在する場合，結果をparse
	if(/Authentication-Results:[\s\S]*/.test(node)){
	    var authentication_results = /(Authentication-Results:[\s\S]*?)?Received:/.exec(node)[1];
	    console.log(parse_result);
	    parseAuthenticationResults(authentication_results, parse_result);
	    console.log(parse_result);
	}
	
	// receivedの結果をparse
	var received = /Received:([\s\S]*?)[+\-][0-9]{4}\s.*/.exec(node)[0];
	console.log(parse_result);
	parseReceived(received, parse_result);
	console.log(parse_result);

	// パース結果の格納
	parse_result_json.received.push(parse_result);
    }
    console.log(parse_result_json);

    let sample_parse_result_json=`
{
    "received": [
        {
            "from": {
                "display": "mail.example.com",
                "reverse": "Unknown",
                "ip": "10.0.0.1"
            },
            "by": "mailsrv.example.com",
            "protocol": "ESMTP",
            "ssl": "(version=TLS1_2 cipher=ECDHE-ECDSA-AES128-SHA bits=128/128)",
            "spf": true,
            "dkim": true,
            "dmarc": false
        },
        {
            "from": {
                "display": "mail.example.com",
                "reverse": "Unknown",
                "ip": "10.0.0.1"
            },
            "by": "mailsrv.example.com",
            "protocol": "ESMTP",
            "ssl": "(version=TLS1_2 cipher=ECDHE-ECDSA-AES128-SHA bits=128/128)",
            "spf": true,
            "dkim": true,
            "dmarc": false
        }
    ],
    "attach": ["fuzzy hash of attachment1", "attachment2"],
    "pattern": ["service name 1", "service name 2"],
    "from": "",
    "reply-to": "",
    "subject": "hash"
}    `
    return parse_result_json;
}
