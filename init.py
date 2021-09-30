-- declare initial SQL database tables

create table other(
  m_id serial NOT NULL, -- id determins mail uniquely
  title text NOT NULL, -- fuzzy hash of mail's title
  from_header text, -- mail's "from" information
  reply_to text, -- mail's "reply-to" information
  subject text NOT NULL, -- hash of mail's subject
  primary key(m_id)
)
;

create table received(
  r_id serial NOT NULL, -- id determins "received" information uniquely
  m_id serial NOT NULL, -- id determins mail uniquely
  from_display text, -- mail's "from" information expresses display information
  from_reverse text, -- mail's "from" information expresses reverse information
  from_ip text, -- mail's "from" information expresses ip adress information
  by text, -- mail's sender
  protocol text, -- mail's protocol
  ssl text, -- ssl version, cipher and bits information
  spf bit, -- truth value whether spf used
  dkim bit, -- truth value whether dkim used
  dmarc bit, -- truth value whether dmarc used
  primary key(r_id),
  foreign key(m_id)
  references other(m_id)
)
;

create table attach(
  a_id serial NOT NULL, -- id determins "attach" information uniquely
  m_id serial NOT NULL, -- id determins mail uniquely
  attach text NOT NULL, -- fuzzy hash of attachment
  primary key(a_id),
  foreign key(m_id)
  references other(m_id)
)
;

create table pattern(
  p_id serial NOT NULL, -- id determins "pattern" information uniquely
  m_id serial NOT NULL, -- id determins mail uniquely
  pattern text, -- service name pattern
  primary key(p_id),
  foreign key(m_id)
  references other(m_id)
)
;
