"use strict"

function parseAuthenticationResults(content){

}

function parseReceived(content){
    return content;
}

function parseDeliveredTo(content){

}
/* contentについて分析を行い，JSONに変換可能なオブジェクトを返す． */
function parseEmail(content) {
    // ヘッダとボディへ分割
    let contentArray = content.split('\r\n\r\n');
    let header = contentArray[0];
    let body = contentArray.slice(1).join('\r\n\r\n');
    
    // Authentication-Results, Received and Delivered-Toの取得
    let received_pattern = /(Authentication-Results:[\s\S]*?)?(Received:[\s\S]*?[+\-][0-9]{4}.*)([\s\S]*?Delivered-To:.*)?/g;
    let received_nodes = header.match(received_pattern);

    // parse結果を格納
    var parse_result = {};
    
    // Authentication-Results, Received and Delivered-Toへ分解
    for(const node of received_nodes){
	console.log(node);
	let tmp = /Authentication-Results:[\s\S]*/.test(node);
	console.log(tmp);
	// Authentication-Resultsが存在する場合，結果をparse
	if(/Authentication-Results:[\s\S]*/.test(node)){
	    var authentication_results = /(Authentication-Results:[\s\S]*?)?Received:/.exec(node)[1];
	    console.log(authentication_results);
	    parseAuthenticationResults(authentication_results);
	}
	// receivedの結果をparse
	var received = /Received:[\s\S]*?[+\-][0-9]{4}.*/.exec(node)[0];
	console.log(received);
	parseReceived(received);
	
	// Delivered-Toが存在する場合，結果をparse
	if(/Delivered-To:.*/.test(node)){
	    var delivered_to = /Delivered-To:.*/.exec(node)[0];
	    console.log(delivered_to);
	    parseDeliveredTo(delivered_to);
	}
	// var res = parseReceived(received);
    }
    var res = parseReceived(received);

    var parse_result_json = JSON.stringify(parse_result);
    let sample_parse_result_json=`
    {
        "route":[
            {
                "type": "node",
                "host": "hostname.example.com",
                "ip": "0.0.0.0",
                "spf": "Pass",
                "dkim": "Pass",
                "dmarc": "Pass"
            },
            {
                "type": "edge",
                "crypto_protocol": "TLS"
            },
            {
                "type": "node",
                "host": "hostname.example.com",
                "ip": "0.0.0.0",
                "spf": "Pass",
                "dkim": "Pass",
                "dmarc": "Pass"
            },
            {
                "type": "edge",
                "crypto_protocol": ""
            }
        ]
    }
    `
    return JSON.parse(parse_result_json);
}
