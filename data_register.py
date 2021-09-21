import psycopg2

def recvDataRegister():
    #クライアントから受信したデータをDBに格納
    """
    connection=psycopg2.connect('DBのURL')
    cur = connection.cursor()
    cur.execute("INSERT INTO MAIL_HEADERS (host,ip,spf,dkim,dmarc,crypto_protocol) VALUES ('hostname.example.com','0.0.0.0','Pass','Pass','Pass','TLS');")
    cur.execute('COMMIT')
    cur.close()
    connection.close()
    
    """