# declare initial SQL database tables

import psycopg2
import os

# mail id as global variable
def init():
    # prepare for SQL database connection
    DATABASE_URL = os.environ['DATABASE_URL'] # get database's URL
    connection = psycopg2.connect(DATABASE_URL, sslmode='require') # establish connection
    cur = connection.cursor() # get cursor
    cur.execute('drop table overview,pattern,attach,received;')
    
    # prototype of 'overview' table
    cur.execute(
        """
        create table overview(
          m_id serial NOT NULL, -- id determins mail uniquely
          from_header text, -- mail's "from" information
          reply_to text, -- mail's "reply-to" information
          subject text NOT NULL, -- hash of mail's subject
          primary key(m_id)
        );
        """
    )
    
    # prototype of 'received' table
    cur.execute(
        """
        create table received(
          r_id serial NOT NULL, -- id determins "received" information uniquely
          m_id serial NOT NULL, -- id determins mail uniquely
          from_display text, -- mail's "from" information expresses display information
          from_reverse text, -- mail's "from" information expresses reverse information
          from_ip text, -- mail's "from" information expresses ip adress information
          by text, -- mail's sender
          protocol text, -- mail's protocol
          ssl text, -- ssl version, cipher and bits information
          spf boolean, -- truth value whether spf used
          dkim boolean, -- truth value whether dkim used
          dmarc boolean, -- truth value whether dmarc used
          primary key(r_id),
          foreign key(m_id)
          references overview(m_id)
        );
        """
    )

    # prototype of 'attach' table
    cur.execute(
        """
        create table attach(
          a_id serial NOT NULL, -- id determins "attach" information uniquely
          m_id serial NOT NULL, -- id determins mail uniquely
          attach text, -- fuzzy hash of attachment
          primary key(a_id),
          foreign key(m_id)
          references overview(m_id)
        );
        """
    )
    
    # prototype of 'pattern' table        
    cur.execute(
        """
        create table pattern(
          p_id serial NOT NULL, -- id determins "pattern" information uniquely
          m_id serial NOT NULL, -- id determins mail uniquely
          pattern text, -- service name pattern
          primary key(p_id),
          foreign key(m_id)
          references overview(m_id)
        );
        """
    )
        
    # terminate connection    
    cur.close()
    connection.commit()
    connection.close()
    
if __name__ == "__main__":
    init()
    
