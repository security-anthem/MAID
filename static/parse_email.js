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
    let received_pattern = /(Authentication-Results:[\s\S]*?)?(Received:[\s\S]*?\+[0-9]{4}.*)([\s\S]*?Delivered-To:.*)?/g;
    let received_nodes = header.match(received_pattern);
    
    // json形式に解体する
    for(const node of received_nodes){
    	if(received_pattern.test(node)){
    	    if(/Authentication-Results/.test(node)){
    		var authentication_results = received_pattern.exec(node)[1];
    	    }
    	    var received = received_pattern.exec(node)[2];
    	    if(/Delivered-To/.test(node)){
    		var delivered_to = received_pattern.exec(node)[3];
    	    }
	}
    	// var res = parseReceived(received);
    }
    var res = parseReceived(received);
    
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
    //return JSON.parse(sample_parse_result_json);
    return res;
}
