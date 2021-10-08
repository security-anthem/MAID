import psycopg2
import os

def recvDataCompare():
    #受信データとDBに保存されたデータを比較し、比較結果を返す
    DATABASE_URL = os.environ['DATABASE_URL']
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    """
    connection=psycopg2.connect('DBのURL')
    cur = connection.cursor()
    cur.execute("SELECT COUNT(host='hostname.example.com') AS HOST_MATCH, COUNT(ip='0.0.0.0') AS IP_MATCH FROM MAIL_HEADERS;")
    results = cur.fetchall()
    cur.close()
    

    """
    connection.close()
    results="IPアドレスの一致件数：2件,ドメインの一致件数：1件"
    
    return results


# (1) 引数としてメールに関するJSON形式の文字列を受け取る
# (2) (1)を辞書型に変換
# (3) 

import json

test_data = '''
{
    "received": [
        {
            "from": {
                "display": "mail.example.com",
                "reverse": "Unknown",
                "ip": "10.0.0.2"
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
'''

def json_string2dict(mail_json_str):
    mail_json_dict = json.loads(mail_json_str)
    return mail_json_dict

def compare_data(mail_json_dict):
    db_url = os.environ['DATABASE_URL']
    connection = psycopg2.connect(db_url, sslmode='require')
    cur = connection.cursor()

    cur.execute("SELECT COUNT(DISTINCT m_id) FROM overview WHERE from_header=%s;", (mail_json_dict["from"],))
    results = cur.fetchall()
    mail_json_dict["from"] = mail_json_dict["from"] + " (" + str(results[0][0]) + ")"

    cur.execute("SELECT COUNT(DISTINCT m_id) FROM overview WHERE reply_to=%s;", (mail_json_dict["reply-to"],))
    results = cur.fetchall()
    mail_json_dict["reply-to"] = mail_json_dict["reply-to"] + " (" + str(results[0][0]) + ")"

    cur.execute("SELECT COUNT(DISTINCT m_id) FROM overview WHERE subject=%s;", (mail_json_dict["subject"],))
    results = cur.fetchall()
    mail_json_dict["subject"] = mail_json_dict["subject"] + " (" + str(results[0][0]) + ")"

    for pat in range(len(mail_json_dict["pattern"])):
        cur.execute("SELECT COUNT(DISTINCT m_id) FROM pattern WHERE pattern=%s;", (mail_json_dict["pattern"][pat],))
        results = cur.fetchall()
        mail_json_dict["pattern"][pat] = mail_json_dict["pattern"][pat] + " (" + str(results[0][0]) + ")"

    for att in range(len(mail_json_dict["attach"])):
        cur.execute("SELECT COUNT(DISTINCT m_id) FROM attach WHERE attach=%s;", (mail_json_dict["attach"][att],))
        results = cur.fetchall()
        mail_json_dict["attach"][att] = mail_json_dict["attach"][att] + " (" + str(results[0][0]) + ")"

    for receive in mail_json_dict.get("received"):
        cur.execute("SELECT COUNT(DISTINCT m_id) FROM received WHERE from_display=%s;", (receive["from"]["display"],))
        results = cur.fetchall()
        receive["from"]["display"] = receive["from"]["display"] + " (" + str(results[0][0]) + ")"
        cur.execute("SELECT COUNT(DISTINCT m_id) FROM received WHERE from_ip=%s;", (receive["from"]["ip"],))
        results = cur.fetchall()
        receive["from"]["ip"] = receive["from"]["ip"] + " (" + str(results[0][0]) + ")"
        cur.execute("SELECT COUNT(DISTINCT m_id) FROM received WHERE by=%s;", (receive["by"],))
        results = cur.fetchall()
        receive["by"] = receive["by"] + " (" + str(results[0][0]) + ")"

    cur.close()

    print(mail_json_dict)
    return mail_json_dict
        
if __name__ == "__main__":
    mail_json_dict = json_string2dict(test_data)
    compare_data(mail_json_dict)