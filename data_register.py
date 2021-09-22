import psycopg2
import os

def recvDataRegister():
    #クライアントから受信したデータをDBに格納
    DATABASE_URL = os.environ['DATABASE_URL']
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    """
    cur = connection.cursor()
    cur.execute("INSERT INTO MAIL_HEADERS (host,ip,spf,dkim,dmarc,crypto_protocol) VALUES ('hostname.example.com','0.0.0.0','Pass','Pass','Pass','TLS');")
    cur.execute('COMMIT')
    cur.close()
    connection.close()
    
    """
    connection.close()