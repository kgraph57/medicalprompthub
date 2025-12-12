# GitHub Pages セットアップガイド

## 現在の設定状況

### ✅ 設定済み項目

1. **Vite設定** (`vite.config.ts`)
   - `base: '/medicalprompthub/'` - GitHub Pagesのベースパス
   - 本番環境と開発環境の両方で同じパスを使用

2. **package.json**
   - `homepage: "https://kgraph57.github.io/medicalprompthub/"`
   - `build:client` スクリプトでクライアントのみビルド

3. **GitHub Actions** (`.github/workflows/deploy.yml`)
   - mainブランチへのpushで自動デプロイ
   - `VITE_BASE_PATH: /medicalprompthub/` 環境変数を設定
   - GitHub Pagesに自動デプロイ

4. **プレビュー環境** (`.github/workflows/preview.yml`)
   - Pull Requestでプレビュー環境をデプロイ

## デプロイフロー

### 自動デプロイ
1. `main`ブランチにpush
2. GitHub Actionsが自動的にビルド
3. `dist`フォルダをGitHub Pagesにデプロイ

### 手動デプロイ（必要な場合）
```bash
# ビルド
pnpm build:client

# distフォルダの内容を確認
ls -la dist/
```

## 開発環境での動作確認

### ローカル開発
```bash
# 開発サーバー起動（GitHub Pagesと同じパスで動作）
pnpm dev

# ブラウザで確認
# http://localhost:5173/medicalprompthub/
```

### 本番ビルドのプレビュー
```bash
# 本番ビルド
pnpm build:client

# プレビューサーバー起動
pnpm preview

# ブラウザで確認
# http://localhost:4173/medicalprompthub/
```

## 重要な設定ポイント

### 1. ベースパス
- **開発環境**: `/medicalprompthub/`
- **本番環境**: `/medicalprompthub/`
- 両環境で同じパスを使用することで、開発と本番の動作を一致させます

### 2. ルーティング
- `wouter`を使用したクライアントサイドルーティング
- GitHub PagesではSPAのフォールバックが必要（`404.html`へのリダイレクト）

### 3. アセットパス
- すべてのアセット（画像、CSS、JS）は`/medicalprompthub/`配下に配置
- Viteが自動的に正しいパスを生成

### 4. SEO設定
- 構造化データ（JSON-LD）で正しいURLを使用
- `BASE_URL`は`https://kgraph57.github.io/medicalprompthub`に設定

## トラブルシューティング

### 404エラーが発生する場合
- GitHub Pagesの設定で「Source」が「GitHub Actions」になっているか確認
- `dist`フォルダが正しくビルドされているか確認

### アセットが読み込まれない場合
- ブラウザの開発者ツールでネットワークタブを確認
- パスが`/medicalprompthub/`で始まっているか確認

### ルーティングが動作しない場合
- `404.html`ファイルが`dist`フォルダに存在するか確認
- Viteのビルド設定で`base`が正しく設定されているか確認

## ブランチ戦略

### メインブランチ
- `main`: 本番環境に自動デプロイ

### 機能ブランチ
- `feature/*`: 機能開発用
- Pull Requestでプレビュー環境にデプロイ

### プレビュー環境
- Pull RequestごとにプレビューURLが生成される
- マージ前に動作確認が可能

## パフォーマンス最適化

### ビルド最適化
- コード分割（chunk splitting）
- アセットの最適化（画像、フォント）
- Gzip/Brotli圧縮

### キャッシュ戦略
- Service Worker（PWA）によるキャッシュ
- 静的アセットの長期キャッシュ

## 次のステップ

1. ✅ デザイン改善の実装
2. ✅ GitHub Pages設定の確認
3. ⏳ 動作確認とテスト
4. ⏳ 本番デプロイ
