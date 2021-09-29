-- declare initial SQL database tables

-- 参照サイト: https://qiita.com/IKEH/items/0211bf81b16c15bed1e2 (PythonでSQLを動かす手法)
--            https://www.sejuku.net/blog/54072(外部キーを含むSQLの書き方)
--
-- 参照サイト名は後で消します．

-- fixme: 各変数の意味，pythonの文法，マジックナンバーの使用などで間違いがある可能性があります．
--        間違いがないかご確認お願いします．

create table other( // fixme : otherは暫定名，よりよい名前が見つかれば変更する
  m_id int NOT NULL, -- id determins mail uniquely
  title int NOT NULL, -- fuzzy hash of mail's title
  from varchar(100), -- mail's "from" information
  reply_to varchar(100), -- mail's "reply-to" information
  subject int NOT NULL, -- hash of mail's subject
  primary key(mail-id)
)
;

create table received(
  r_id int NOT NULL, -- id determins "received" information uniquely
  m_id int NOT NULL, -- id determins mail uniquely
  from_display varchar(100), -- mail's "from" information expresses display information
  from_reverse varchar(100), -- mail's "from" information expresses reverse information
  from_ip varchar(100), -- mail's "from" information expresses ip adress information
  by varchar(100), -- mail's sender
  protocol varchar(100), -- mail's protocol
  ssl　varchar(100), -- ssl version, cipher and bits information
  spf bit, -- truth value whether spf used
  dkim bit, -- truth value whether dkim used
  dmarc bit, -- truth value whether dmarc used
  primary key(r_id),
  foreign key(m_id)
  references other(m_id)
)
;

create table attach(
  a_id int NOT NULL, -- id determins "attach" information uniquely
  m_id int NOT NULL, -- id determins mail uniquely
  attach int NOT NULL, -- fuzzy hash of attachment
  primary key(a_id),
  foreign key(m_id)
  references other(m_id)
)
;

create table pattern(
  p_id int NOT NULL, -- id determins "pattern" information uniquely
  m_id int NOT NULL, -- id determins mail uniquely
  pattern varchar(100), -- service name pattern
  primary key(p_id),
  foreign key(m_id)
  references other(m_id)
)
;
