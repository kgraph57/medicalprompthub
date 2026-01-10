# ブランチ用プレビューURLの設定方法

## 🎯 目的

ブランチごとにプレビュー環境を作成し、実際のURLで動作確認できるようにします。

---

## 📋 方法1: GitHub Pages プレビュー（推奨）

### 設定手順

1. **GitHubリポジトリの設定**
   - Settings → Pages
   - Source: "GitHub Actions" を選択

2. **Pull Requestを作成**
   ```bash
   # ブランチを作成
   git checkout -b feature/gamification
   
   # 変更をコミット・プッシュ
   git add .
   git commit -m "feat: ゲーミフィケーション機能"
   git push origin feature/gamification
   ```

3. **GitHub上でPull Requestを作成**
   - リポジトリページで "Compare & pull request" をクリック
   - Pull Requestを作成

4. **プレビューURLの確認**
   - Pull Requestページの "Checks" タブ
   - または "Deployments" セクション
   - プレビューURLが表示されます

### メリット
- ✅ GitHub内で完結
- ✅ 自動的にデプロイ
- ✅ Pull RequestごとにURLが生成

### デメリット
- ⚠️ GitHub Pagesの制限（1つのリポジトリで1つのプレビュー環境のみ）

---

## 📋 方法2: Vercel（最も簡単・推奨）

### 設定手順

1. **Vercelアカウント作成**
   - https://vercel.com にアクセス
   - GitHubアカウントでログイン

2. **プロジェクトをインポート**
   - "Add New Project" をクリック
   - GitHubリポジトリを選択
   - 設定:
     - Framework Preset: Vite
     - Root Directory: `./`
     - Build Command: `pnpm build:client`
     - Output Directory: `dist`

3. **環境変数の設定（必要に応じて）**
   - Project Settings → Environment Variables

4. **自動デプロイ**
   - ブランチをプッシュすると自動的にプレビューURLが生成
   - 例: `feature-gamification-xxx.vercel.app`

### メリット
- ✅ 完全無料
- ✅ ブランチごとに自動でプレビューURL生成
- ✅ 高速なデプロイ
- ✅ 簡単な設定

### デメリット
- ⚠️ 外部サービスを使用

---

## 📋 方法3: Netlify

### 設定手順

1. **Netlifyアカウント作成**
   - https://netlify.com にアクセス
   - GitHubアカウントでログイン

2. **プロジェクトをインポート**
   - "Add new site" → "Import an existing project"
   - GitHubリポジトリを選択
   - 設定:
     - Build command: `pnpm build:client`
     - Publish directory: `dist`

3. **自動デプロイ**
   - ブランチをプッシュすると自動的にプレビューURLが生成
   - 例: `feature-gamification--xxx.netlify.app`

### メリット
- ✅ 完全無料
- ✅ ブランチごとに自動でプレビューURL生成
- ✅ GitHub Pagesと同様の機能

---

## 🚀 推奨: Vercelを使う方法

### 理由
1. **最も簡単**: 数クリックで設定完了
2. **自動プレビュー**: ブランチごとにURLが自動生成
3. **高速**: デプロイが速い
4. **無料**: 個人プロジェクトは無料

### セットアップ手順（詳細）

1. **Vercelにアクセス**
   ```
   https://vercel.com
   ```

2. **GitHubでログイン**
   - "Continue with GitHub" をクリック

3. **プロジェクトをインポート**
   - "Add New..." → "Project"
   - リポジトリを選択: `kgraph57/medicalprompthub`

4. **設定**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: pnpm build:client
   Output Directory: dist
   Install Command: pnpm install
   ```

5. **環境変数（必要に応じて）**
   - 環境変数があれば設定

6. **デプロイ**
   - "Deploy" をクリック
   - 数分でデプロイ完了

### 使い方

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

**プレビューURL例**:
- `feature-gamification-xxx.vercel.app`
- または `feature-gamification--medical-prompt-hub.vercel.app`

---

## 📊 比較表

| 方法 | 難易度 | コスト | 自動プレビュー | 推奨度 |
|------|--------|--------|---------------|--------|
| GitHub Pages | 中 | 無料 | 制限あり | ⭐⭐⭐ |
| Vercel | 低 | 無料 | ✅ 完全対応 | ⭐⭐⭐⭐⭐ |
| Netlify | 低 | 無料 | ✅ 完全対応 | ⭐⭐⭐⭐ |

---

## 🎯 実践的な使い方

### 1. Vercelを設定（推奨）

1. Vercelにアクセスしてプロジェクトをインポート
2. 設定を完了

### 2. ブランチで開発

```bash
git checkout -b feature/gamification
# 開発...
git push origin feature/gamification
```

### 3. 自動でプレビューURLが生成

- Vercelが自動的にビルド
- プレビューURLが生成される
- Pull Requestにコメントで通知

### 4. 動作確認

- プレビューURLで実際に試す
- 問題なければマージ
- 問題があればブランチで修正

---

## 💡 ヒント

### 複数のブランチを同時に試す

```bash
# ブランチA
git checkout -b feature/feature-a
git push origin feature/feature-a
# → プレビューURL: feature-feature-a-xxx.vercel.app

# ブランチB
git checkout -b feature/feature-b
git push origin feature/feature-b
# → プレビューURL: feature-feature-b-xxx.vercel.app
```

両方のブランチが同時にプレビュー環境で動作します！

---

## ✅ まとめ

**推奨**: Vercelを使う
- 最も簡単
- ブランチごとに自動でプレビューURL
- 完全無料
- 数分で設定完了

これで、ブランチごとに実際のURLで動作確認できます！

---

**最終更新日**: 2025-01-XX
