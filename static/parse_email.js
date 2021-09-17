"use strict"
function parseEmail(content) {
    /* contentについて分析を行い，JSONに変換可能なオブジェクトを返す． */

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
    return JSON.parse(sample_parse_result_json); 
}