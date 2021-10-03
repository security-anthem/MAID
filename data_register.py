# parse raw json data and store parsed data in database

# 不明な点
#
# ・引数のjsonデータは，ファイル名の文字列？データそのもの？（ファイル名と仮定してコーディングしました）

import psycopg2
import os
import json

r_id = 1
a_id = 1
p_id = 1
m_id = 1
            
# store data received from clients in database
def recvDataRegister(text filename):
    # prepare for database connection
    DATABASE_URL = os.environ['DATABASE_URL'] # get database URL from export
    connection = psycopg2.connect(DATABASE_URL, sslmode='require') # establish connection using the database URL
    cur = connection.cursor()

    # open json file and load it as dictionary
    json_file = open(filename, 'r')
    json_dict = json.load(json_file)
    
    # parse and store "received" section
    x = 1
    for x in json_dict
      json_rec_dict = json_dict['received'][x]
      json_rec_from_dict = json_rec_dict['from']

      cur.execute(
          """
          insert into 
          
          'received' (
          r_id,
          m_id,
          display,
          reverse,
          ip,
          by,
          protocol,
          ssl,
          spf,
          dkim,
          dmarc)
          
          VALUES (
          r_id++,
          m_id,
          json_rec_from_dict[display],
          json_rec_from_dict[reverse],
          json_rec_from_dict[ip],
          json_rec_dict[by],
          json_rec_dict[protocol],
          json_rec_dict[ssl],
          json_rec_dict[spf],
          json_rec_dict[dkim],
          json_rec_dict[dmarc]);
          """
      )
    
    # parse and store "attach" section
    x = 1
    for x in json_dict
      cur.execute(
          """
          insert into 
          
          'attach' (
          a_id,
          m_id,
          attach)
          
          VALUES (
          a_id++,
          m_id,
          json_dict['attach'][x]);
          """
      )
    
    # parse and store "pattern" section
    x = 1
    for x in json_dict
      cur.execute(
          """
          insert into 
          
          'pattern' (
          p_id,
          m_id,
          pattern)
          
          VALUES (
          p_id++,
          m_id,
          json_dict['pattern'][x]);
          """
      )
        
    # parse and store "overview" section
    cur.execute(
        """
        insert into 
        
        'overview' (
        m_id,
        from_header,
        reply_to,
        subject)
        
        VALUES (
        m_id++,
        json_dict['from'],
        json_dict['reply-to'],
        json_dict['subject']);
        """
    )

    # commit and terminate database connection
    cur.execute('COMMIT')
    cur.close()
    connection.commit()
    connection.close()

if __name__ == "__main__":
    recvDataRegister()
