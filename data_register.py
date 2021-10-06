# parse raw json data and store parsed data in database

import psycopg2
import os
import json
            
# store data received from clients in database
def recvDataRegister(jsontext):
    # prepare for database connection
    DATABASE_URL = os.environ['DATABASE_URL'] # get database URL from export
    connection = psycopg2.connect(DATABASE_URL, sslmode='require') # establish connection using the database URL
    cur = connection.cursor() # get cursor

    # open json text as dictionary
    json_dict = json.loads(jsontext)
    
    # parse and store "overview" section
    cur.execute(
        """
        insert into overview (
          from_header,
          reply_to,
          subject
        )
        
        VALUES (
          %s,
          %s,
          %s
        )
        returning m_id;
        """
        , (
            json_dict['from'],
            json_dict['reply-to'],
            json_dict['subject']
          )
    )
    cur.execute('COMMIT')
    
    # parse and store "received" section
    for json_rec_dict in json_dict['received']:
      json_rec_from_dict = json_rec_dict['from']

      cur.execute(
          """
          insert into received (
            m_id,
            from_display,
            from_reverse,
            from_ip,
            by,
            protocol,
            ssl,
            spf,
            dkim,
            dmarc
          )
          
          VALUES (
            setval('overview_m_id_seq', currval('overview_m_id_seq'), false),
            %s,
            %s,
            %s,
            %s,
            %s,
            %s,
            %s,
            %s,
            %s
          );
          """
          , (
              json_rec_from_dict['display'],
              json_rec_from_dict['reverse'],
              json_rec_from_dict['ip'],
              json_rec_dict['by'],
              json_rec_dict['protocol'],
              json_rec_dict['ssl'],
              str(json_rec_dict['spf']),
              str(json_rec_dict['dkim']),
              str(json_rec_dict['dmarc'])
            )
       )
      cur.execute('COMMIT')
      
    # parse and store "attach" section
    for att_str in json_dict['attach']:
      cur.execute(
          """
          insert into attach (
            m_id,
            attach
          )
          
          VALUES (
            setval('overview_m_id_seq', currval('overview_m_id_seq'), false),
            %s
          );
          """
          , (att_str,)
      )
      cur.execute('COMMIT')
  
    # parse and store "pattern" section
    for pat_str in json_dict['pattern']:
      cur.execute(
          """
          insert into pattern (
            m_id,
            pattern
          )
          
          VALUES (
            setval('overview_m_id_seq', currval('overview_m_id_seq'), true),
            %s
          );
          """
          , (pat_str,)
      )
      cur.execute('COMMIT')

    # commit and terminate database connection
    cur.close()
    connection.commit()
    connection.close()

if __name__ == "__main__":
    recvDataRegister('json_text')
