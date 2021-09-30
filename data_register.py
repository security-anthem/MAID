import psycopg2
import os
import ast

# parse data received from clients
def parseData():
    rawdata = argdata
    parsetree = ast.parse(rawdata)
    
# store parsed data in each tables
def storeData():

# store data received from clients in database
def recvDataRegister():
    DATABASE_URL = os.environ['DATABASE_URL'] # get database URL from export
    connection = psycopg2.connect(DATABASE_URL, sslmode='require') # establish connection using the database URL
    cur = connection.cursor()

    parseData()

    storeData()
"""
    cur.execute("INSERT INTO MAIL_HEADERS (host,ip,spf,dkim,dmarc,crypto_protocol) VALUES ('hostname.example.com','0.0.0.0','Pass','Pass','Pass','TLS');")
    cur.execute('COMMIT')
"""

    cur.close()
    connection.commit()
    connection.close()

if __name__ == "__main__":
    recvDataRegister()
