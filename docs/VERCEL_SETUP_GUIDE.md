# Vercel設定ガイド（ステップバイステップ）

## 🎯 目的

ブランチごとに自動でプレビューURLを生成し、実際の環境で動作確認できるようにします。

---

## 📋 ステップバイステップ手順

### Step 1: Vercelアカウント作成

1. **Vercelにアクセス**
   ```
   https://vercel.com
   ```

2. **GitHubでログイン**
   - "Continue with GitHub" または "Sign Up" をクリック
   - GitHubアカウントで認証

---

### Step 2: プロジェクトをインポート

1. **ダッシュボードに移動**
   - ログイン後、ダッシュボードが表示されます

2. **"Add New..." をクリック**
   - 画面右上または中央の "Add New..." ボタン

3. **"Project" を選択**

4. **リポジトリを選択**
   - GitHubリポジトリ一覧から `kgraph57/medicalprompthub` を選択
   - 見つからない場合は "Configure GitHub App" で権限を確認

---

### Step 3: プロジェクト設定

Vercelが自動的に設定を検出しますが、確認・調整します：

#### Framework Preset
```
Vite
```
（自動検出されるはず）

#### Root Directory
```
./
```
（プロジェクトルート）

#### Build Command
```
pnpm build:client
```

#### Output Directory
```
dist
```

#### Install Command
```
pnpm install
```

#### Environment Variables（必要に応じて）
現在は設定不要ですが、将来的に以下を追加する場合：
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`
- `VITE_SENTRY_DSN`

---

### Step 4: デプロイ

1. **"Deploy" ボタンをクリック**
   - 設定を確認して "Deploy" をクリック

2. **ビルドの進行を確認**
   - ビルドログが表示されます
   - 通常2-3分で完了

3. **デプロイ完了**
   - 完了すると、本番URLが表示されます
   - 例: `medical-prompt-hub.vercel.app`

---

## 🚀 ブランチごとのプレビュー環境

### 自動プレビュー

ブランチをプッシュすると、自動的にプレビュー環境が作成されます：

```bash
# ブランチを作成
git checkout -b feature/gamification

# 開発・コミット
git add .
git commit -m "feat: ゲーミフィケーション機能"
git push origin feature/gamification
```

**自動的に**:
- Vercelがブランチを検知
- ビルドを実行
- プレビューURLを生成
- Pull RequestにコメントでURLを追加

### プレビューURLの形式

- **mainブランチ**: `medical-prompt-hub.vercel.app`
- **feature/gamification**: `feature-gamification-xxx.vercel.app`
- **feature/user-stats**: `feature-user-stats-xxx.vercel.app`

---

## 📊 Vercelダッシュボードでの確認

### デプロイメント一覧

1. **プロジェクトページを開く**
   - ダッシュボードからプロジェクトを選択

2. **"Deployments" タブ**
   - すべてのデプロイメントが表示されます
   - ブランチごとのデプロイメントを確認可能

3. **プレビューURLをクリック**
   - 各デプロイメントのURLをクリックして確認

---

## 🔄 実際の使い方

### 例：ゲーミフィケーション機能を実装

```bash
# 1. mainブランチから最新を取得
git checkout main
git pull origin main

# 2. 新しいブランチを作成
git checkout -b feature/gamification

# 3. 開発
# ファイルを編集...

# 4. コミット・プッシュ
git add .
git commit -m "feat: XPシステムの実装"
git push origin feature/gamification
```

**Vercelで自動的に**:
- ビルドが開始
- プレビューURLが生成
- Pull Requestにコメントで通知

**確認方法**:
1. GitHubのPull Requestページを開く
2. VercelのコメントでプレビューURLを確認
3. または、Vercelダッシュボードで確認

---

## 🎨 プレビュー環境の特徴

### ✅ メリット

1. **実際の環境で確認**
   - 本番環境と同じ設定
   - 実際のURLでアクセス可能

2. **自動デプロイ**
   - プッシュするだけで自動デプロイ
   - 手動操作不要

3. **複数ブランチを同時に試せる**
   - ブランチごとに独立したURL
   - 比較検討が容易

4. **無料**
   - 個人プロジェクトは完全無料

---

## 🔧 トラブルシューティング

### ビルドエラーが発生した場合

1. **Vercelダッシュボードでログを確認**
   - デプロイメントをクリック
   - "Build Logs" を確認

2. **ローカルでビルドを確認**
   ```bash
   pnpm build:client
   ```
   - ローカルでエラーが出る場合は修正

3. **環境変数を確認**
   - Vercelの設定で環境変数が正しく設定されているか

### プレビューURLが生成されない場合

1. **Vercelの設定を確認**
   - Settings → Git
   - ブランチの自動デプロイが有効か

2. **GitHub連携を確認**
   - VercelとGitHubの連携が正しいか

---

## 📝 設定の確認

### Vercelダッシュボードで確認

1. **Settings → General**
   - Framework: Vite
   - Build Command: `pnpm build:client`
   - Output Directory: `dist`

2. **Settings → Git**
   - Production Branch: `main`
   - Preview Branches: `All branches`（推奨）

---

## 🎯 次のステップ

1. **Vercelを設定**（上記の手順）
2. **ブランチで開発**
3. **自動プレビューで確認**
4. **問題なければマージ**

これで、ブランチごとに実際のURLで動作確認できます！

---

## 💡 ヒント

### カスタムドメイン（オプション）

Vercelでは、カスタムドメインも設定できます：
- Settings → Domains
- 独自ドメインを追加可能

### 環境変数の管理

- Settings → Environment Variables
- ブランチごとに異なる環境変数を設定可能

---

**最終更新日**: 2025-01-XX
