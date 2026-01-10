# Vercel クイックスタート（5分で設定完了）

## 🚀 今すぐ始める

### Step 1: Vercelにアクセス
```
https://vercel.com
```

### Step 2: GitHubでログイン
- "Continue with GitHub" をクリック
- 認証を完了

### Step 3: プロジェクトをインポート
1. "Add New..." → "Project" をクリック
2. `kgraph57/medicalprompthub` を選択
3. 設定を確認（自動検出される）:
   - Framework: **Vite**
   - Build Command: `pnpm build:client`
   - Output Directory: `dist`
4. "Deploy" をクリック

### Step 4: 完了！
- 2-3分でデプロイ完了
- URLが表示されます: `medical-prompt-hub.vercel.app`

---

## 🎯 ブランチで試す

### 新しいブランチを作成

```bash
# mainブランチに戻る
git checkout main
git pull origin main

# 新しいブランチを作成（例：ゲーミフィケーション）
git checkout -b feature/gamification

# 開発...
git add .
git commit -m "feat: ゲーミフィケーション機能"
git push origin feature/gamification
```

**自動的に**:
- Vercelがブランチを検知
- プレビューURLが生成: `feature-gamification-xxx.vercel.app`
- Pull Requestにコメントで通知

---

## 📍 現在の状態

✅ **準備完了**:
- `vercel.json` 設定ファイル作成済み
- ブランチ `feature/gamification-setup` 作成済み
- ドキュメント追加済み

**次のステップ**: Vercelでプロジェクトをインポートするだけ！

---

## 🔗 便利なリンク

- **Vercel**: https://vercel.com
- **GitHubリポジトリ**: https://github.com/kgraph57/medicalprompthub
- **現在のブランチ**: `feature/gamification-setup`

---

## 💡 ヒント

### プレビューURLの確認方法

1. **Vercelダッシュボード**
   - プロジェクト → Deployments
   - 各ブランチのデプロイメントを確認

2. **GitHub Pull Request**
   - Pull Requestを作成すると、Vercelが自動的にコメントでURLを追加

3. **ブランチ名から推測**
   - `feature/gamification` → `feature-gamification-xxx.vercel.app`

---

**設定時間**: 約5分
**難易度**: ⭐（とても簡単）
