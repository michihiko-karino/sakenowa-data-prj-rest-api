# さけのわデータプロジェクトREST API

さけのわデータプロジェクトにて提供されているデータをmysqlデータベースに保存、[NestJS](https://nestjs.com/)を利用したREST API実装

## 帰属表示
https://sakenowa.com

このプログラムではさけのわデータプロジェクトにて公開されている情報を取得、加工し利用する手段を提供します
このプログラムを用いるいかなる場合でも、さけのわデータプロジェクトへの帰属表示が必要です
帰属表示については[こちら](https://muro.sakenowa.com/sakenowa-data/)を参照してください

またこのプログラムを参考、利用する場合において発生した損害について、このプログラムの作者である [michihiko.karino](https://github.com/michihiko-karino) は一切の責任を負いません
またこのプログラムではさけのわデータプロジェクトのデータを取得する方法を提供しますが、その内容について保証するものではありません

## 事前準備
docker, docker-compose, npm, Node.js

```sh
npm install
```

## 使い方

### 1. データベースを準備する

```sh
docker-compose up
npx ts-node $(npm bin)/typeorm migration:run 
```

### 2. データ取得

```sh
npx ts-node database/lib/fetchSakenowaApi.ts
npx ts-node database/lib/insertSeedData.ts
```

### 3. REST APIサーバ起動

```sh
npm run start
```

## 補足

- API定義書の確認方法
サーバを起動したあと、`/swagger`へアクセスするとSwaggerUIを確認できる

