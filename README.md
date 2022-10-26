# BulletinBoardDocker

# DEMO

掲示板サイトを docker 上で動かせるようにした

# Features

ログイン機能、投稿機能、いいね機能ができる

# Requirement

"hoge"を動かすのに必要なライブラリなどを列挙する

- Docker version 20.10.5, build 55c4c88
- node.js v16.9.1
- mysql Ver 14.14

# Installation

Requirement で列挙したライブラリなどのインストール方法を説明する

```bash
$ npm init
$ npm install express --save
$ npm install
$ npx sequelize-cli init
$ npm install -g express
$ npx sequelize-cli init
#config migrations models seeders　が作成される。
$ npm i mysql2 sequelize sequelize-cli
$ npm install --save dotenv
$ npm install -g nodemon
$ npm install body-parser --save
$ npm install mysql
$ npm install passport
$ npm install passport-local
$ npm install passport-jwt
$ npm install jsonwebtoken
$ npm install express-session
$ npm install --save express-validator


$ npx sequelize-cli model:generate --name users --attributes name:string,mail:string,password:string,passwordconfirm:string
#modelsフォルダにuser.jsができる
$ npx sequelize-cli seed:generate --name test-users
#seedファイルを作成
```

# Usage

```bash
git clone https://github.com/takahumi0806/BulletinBoardDocker
cd BulletinBoardDocker

imageを構築します
docker-compose build
コンテナを起動します。
docker-compose run --rm app /bin/bash

ライブラリーをインストール

$ npx sequelize-cli db:migrate
 マイグレーションをしてpostテーブルを作成

$ npx sequelize-cli db:seed:all
　seedを実行してテストユーザーを作る

　exit コンテナを抜ける

docker-compose up

http://localhost:3000/でブラウザにwelcome to expressと出る

mysql databaseが作られているか確認
docker ps
docker exec -it コンテナID bash
mysql -u root -p
パスワード入力
SHOW DATABASES;
データベースができているか確認
SHOW COLUMNS FROM users  FROM post;
カラム確認
USE post;
データベースの中に入るコマンド
Database changedと出てる
select * from users;
テストユーザーの確認
exit


```


# Author

作成情報

- 作成者　 yabuta
- 所属 千葉県
- E-mail yabuta@gmail.com

# License

BulletinBoardDocker is Confidential.
