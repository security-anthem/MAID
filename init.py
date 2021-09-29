// わからないところはC言語形式のコメントで記述します

// 参照サイト: https://qiita.com/IKEH/items/0211bf81b16c15bed1e2 (PythonでSQLを動かす手法)
//             https://www.sejuku.net/blog/54072(外部キーを含むSQLの書き方)

// 正規形にしていないため，今後正規系に修正
// 第三正規形まで正規化してみた（otherの場合，mail-idを主キーとすると，配列要素なし，mai-id以外のキーがmail-idに関数従属，
// さらにmail-id以外のキーがmail-id以外のいかなる属性についても関数従属しない）
//
// fixme : 正規化が間違っている可能性があるので，確認お願いします

create table other( // fixme : otherは暫定名，よりよい名前が見つかれば変更する
  mail-id int NOT NULL, -- mail's id // 独自に追加，titleやsubjectで一意にメールを決められないため
  title int NOT NULL, -- mail's title
  from, // 何が入るか不明
  reply-to, // 何が入るか不明
  subject int NOT NULL, -- mail's subject
  primary key(mail-id)
)
;

create table received(
  mail-id int NOT NULL,
  title int NOT NULL,
  from, // 何が入るか不明
  reply-to, // 何が入るか不明
  subject int NOT NULL,
  header-id int NOT NULL, -- mail header's id
  primary key(header-id),
  foreign key(mail-id)
  references other(mail-id)
)
;

// 正規化のためにテーブルを追加

create table header(
  header id int NOT NULL,
  from varchar(100),
  by varchar(100),
  protocol varchar(100),
  ssl　varchar(100),
  spf bit,
  dkim bit,
  dmarc bit
  primary key(header-id),
  foreign key(header-id)
  references received(header-id)
)
;

create table attach(
  mail-id int NOT NULL,
  title int NOT NULL,
  from, // 何が入るか不明
  reply-to, // 何が入るか不明
  subject int NOT NULL,
  fha1 int NOT NULL, -- fuzzy hash of attachment 1
  fha2 int NOT NULL, -- fuzzy hash of attachment 2
  primary key(header-id),
  foreign key(mail-id)
  references other(mail-id)
)
;

create table pattern(
  mail-id int NOT NULL,
  title int NOT NULL,
  from, // 何が入るか不明
  reply-to, // 何が入るか不明
  subject int NOT NULL,
  sn1 int NOT NULL, -- service name 1
  sn2 int NOT NULL, -- service name 2
  primary key(header-id),
  foreign key(mail-id)
  references other(mail-id)
)
;
