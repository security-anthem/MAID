MAID
================

MAID（<u>MAI</u>L <u>D</u>ETECTIVE）は、怪しいメールの情報を収集する脅威インテリジェンスです。

Thunderbirdで不審なメールを受け取ったとき、MAIDにドラッグアンドドロップするだけで、
過去に他の人が同じような不審なメールを受け取ったか確認できます。
これにより、MAIDは現在流行している悪質なメールを蓄積します。

使い方
-----------------------


インストール方法
---------------------
本プログラムは、Ubuntu 20.04での使用を想定している。

### テスト環境
```bash
sudo apt install python3-pip
pip3 install -r requirements.txt
python3 routing.py
```
起動したら[http://localhost:5000](http://localhost:5000)にアクセスする。

### 本番環境
```bash
sudo apt install python3-pip
pip3 install -r requirements.txt
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
git push heroku main
heroku open
```


VS
--------------------

