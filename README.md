# 概要
- Express.jsを用いてAPIを作成するテスト。
- TypeScriptで記述する。
- データベースにはRDBを用いる。

# 初期設定
初回コミットでしたことをまとめています。

## npmの設定

### 初期設定
```
npm init -y
```

### パッケージのインストール
expressの本体と開発用の各種パッケージをインストールする。
```
npm install express
npm install -D typescript @types/node @types/express tsx
```

### package.jsonの修正
ES Modules として扱うように修正する。
```JSON:package.json
{
  "name": "ankilot-api",
  "version": "1.0.0",
  "type": "module",  // 追加
  "scripts": { // 修正
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

## TypeScriptの設定

### 設定ファイルの生成
TypeScriptのコンパイラの設定ファイルを生成する。
設定ファイル内の`"outDir": "./dist"`や`"rootDir": "./src"`のコメントアウトを外しておく。
```
npx tsc --init
```

### tsconfig.jsonの修正
ES Modules として扱うように修正する。
```JSON:tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "typeRoots": ["./node_modules/@types"],
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```