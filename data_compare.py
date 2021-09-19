import psycopg2

def recvDataCompare():
    #受信データとDBに保存されたデータを比較し、比較結果を返す
    """
    connection=psycopg2.connect(host="localhost",dbname="postgres",port="5432",user="postgres",password="postgres")
    cur = connection.cursor()
    cur.execute("SELECT COUNT(host='hostname.example.com') AS HOST_MATCH, COUNT(ip='0.0.0.0') AS IP_MATCH FROM MAIL_HEADERS;")
    results = cur.fetchall()
    cur.close()
    connection.close()

    """
    results="IPアドレスの一致件数：2件,ドメインの一致件数：1件"
    
    return results