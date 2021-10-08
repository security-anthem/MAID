import os
import bottle
from bottle import run, get, post, static_file, template, request
import data_register
import data_compare

@get("/")
def index():
        return template("index", result=None)

@post("/")
def api_call():
        #testデータ
        import json
        test_data="""
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
}
        """

        # 受信データとDBに保存されたデータを比較する関数
        compareResults=data_compare.compare_data(json.loads(str(request.forms.send_data)))
        # DBに受信データを格納する関数(request.forms.send_data)
        data_register.recvDataRegister(str(request.forms.send_data))
        return template("index", result=compareResults)
@get("/static/<static:path>")
def get_static(static):
        return static_file(static,root="static")
@get("/ssdeep/ssdeep.js")
def get_ssdeep():
        return static_file("ssdeep.js",root="ssdeep")
if __name__ == "__main__":
        run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

app = bottle.default_app()
