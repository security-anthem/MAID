MAID
================

MAID（<u>MAI</u>L <u>D</u>ETECTIVE）は、怪しいメールの情報を収集する脅威インテリジェンスです。

Thunderbirdで不審なメールを受け取ったとき、MAIDにドラッグアンドドロップするだけで、
過去に他の人が同じような不審なメールを受け取ったか確認できます。
これにより、MAIDは現在流行している悪質なメールを蓄積します。

使い方
-----------------------
`static/usage.html`をご覧ください。

インストール方法
---------------------
本プログラムは、Ubuntu 20.04での使用を想定している。

### テスト環境
```bash
git clone 
git submodule init
git submodule update
sudo apt install python3-pip postgresql
pip3 install -r requirements.txt
```
次にpostgresqlの設定を行う.

```bash
sudo -u postgres bash
createdb testdb
psql testdb
create role username with login password 'password';
\q
exit
```

これにより、Ubuntuのユーザusernameでtestdbが使えるようになる。
usernameでログインしたbashで以下のコマンドを実行することで確認できる。
```bash
psql testdb
\q
```

起動
```bash
export DATABASE_URL=postgres://username:password@localhost:5432/testdb
python3 init.py
python3 routing.py
```
起動したら[http://localhost:5000](http://localhost:5000)にアクセスする。

### 本番環境
export DATABASE_URLは用意したpostgresqlのサーバの設定に合わせて書き直す。
```bash
sudo apt install python3-pip
pip3 install -r requirements.txt
export DATABASE_URL=postgres://username:password@hostname:5432/database_name
python3 init.py
gunicorn routing:app
```

### HEROKU
本リポジトリはHEROKUに対応している。HEROKUにアップロードすることで、使うことができる。

```bash
git clone https://github.com/security-anthem/MAID.git
cd MAID
sudo snap install heroku --classic
heroku login
heroku create
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
heroku run python3 init.py
heroku open
```


VS
--------------------
TODO: 新規性を示すため関連する他のツールをここにまとめる.

SpamAssassinは，スパムを識別するためのメールフィルターとして機能するプログラムである．
SpamAssassinは，ヘッダとテキストの分析，ベイジアンフィルタリング，DNSブロックリスト，協調フィルタリングなどの様々なメカニズムを導入する．
SpamAssassinは，サーバ上で実行され，メールボックスに到達する前にスパムをフィルタリングする．
しかし，別々のサーバ環境で送られるメールの関係を分析することは難しい．
