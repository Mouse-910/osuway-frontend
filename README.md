# Osuway Frontend — Vercel デプロイガイド

## Vercelへのデプロイ手順

### 1. GitHubにプッシュ

```bash
cd osuway-frontend
git init
git add .
git commit -m "feat: Osuway frontend initial"
git remote add origin https://github.com/YOUR_USERNAME/osuway-frontend.git
git push -u origin main
```

### 2. Vercelにデプロイ

1. [vercel.com](https://vercel.com) にログイン
2. **Add New Project** → GitHubリポジトリ `osuway-frontend` を選択
3. Framework: **Create React App** を選択
4. **Environment Variables** に追加:

```
REACT_APP_EDGE_FUNCTION_URL = https://kvxzaehzxfrrafawqpwo.supabase.co/functions/v1/search-watches
```

5. **Deploy** をクリック

### 3. 完了

`https://osuway-xxx.vercel.app` のようなURLが発行されます。

## ローカル開発

```bash
npm install
npm start
```

## フォルダ構成

```
src/
├── App.js              # メインコンポーネント・API呼び出し
├── index.js            # エントリーポイント
├── index.css           # グローバルスタイル
└── components/
    ├── Header.js       # ロゴ・言語バッジ
    ├── SearchBar.js    # 検索ボックス・サジェスト
    └── Results.js      # 結果表示・WatchCard
```
