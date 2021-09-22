"use strict"
function parseEmail(content) {
    /* contentについて分析を行い，JSONに変換可能なオブジェクトを返す． */
    var contentArray = content.split('\r\n\r\n');
    var header = contentArray[0];
    var body = contentArray.slice(1).join('\r\n\r\n');
    var p_reveive =;
    var 
	
    var sample_parse_result_json=`
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
    return [header,body];
}
