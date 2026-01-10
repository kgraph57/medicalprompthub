# GitHubブランチでの開発フロー（初心者向けガイド）

## 🎯 このガイドの目的

コーディング初心者の方向けに、GitHubブランチを使った安全な開発フローを説明します。
「試してみて、良ければ使う」という流れで実装を進める方法です。

---

## 📚 基本的な概念

### ブランチとは？
- **mainブランチ**: 本番環境で動いている安定版のコード
- **featureブランチ**: 新機能を試すための作業用ブランチ
- ブランチを使うと、本番環境に影響を与えずに新機能を試せます

### なぜブランチを使うの？
✅ 本番環境を壊さない  
✅ 失敗しても元に戻せる  
✅ 複数の機能を同時に開発できる  
✅ 他の人と協力しやすい  

---

## 🚀 実践的な開発フロー

### Step 1: 新しいブランチを作成

```bash
# 現在のブランチを確認
git branch

# mainブランチにいることを確認
# 最新の状態に更新
git checkout main
git pull origin main

# 新しいブランチを作成（例: gamification機能）
git checkout -b feature/gamification
```

**ブランチ名の例**:
- `feature/gamification` - ゲーミフィケーション機能
- `feature/user-stats` - ユーザー統計機能
- `fix/error-handling` - バグ修正
- `improve/performance` - パフォーマンス改善

---

### Step 2: ブランチで開発・テスト

```bash
# ブランチでコードを編集
# ファイルを編集...

# 変更を確認
git status

# 変更をステージング（保存準備）
git add .

# コミット（変更を記録）
git commit -m "feat: ゲーミフィケーション機能の基礎実装"

# ブランチをGitHubにプッシュ
git push origin feature/gamification
```

---

### Step 3: ローカルでテスト

```bash
# 開発サーバーを起動
pnpm dev

# ブラウザで http://localhost:3000 を開く
# 新機能を試してみる
```

**テスト項目**:
- ✅ 新機能が正常に動作するか
- ✅ 既存機能が壊れていないか
- ✅ エラーが出ないか
- ✅ 使いやすさはどうか

---

### Step 4: 問題があれば修正

```bash
# 問題を修正
# ファイルを編集...

# 修正をコミット
git add .
git commit -m "fix: ゲーミフィケーションのバグ修正"
git push origin feature/gamification
```

---

### Step 5: 良ければ本番に統合（マージ）

**方法1: GitHub上でプルリクエスト（推奨）**

1. GitHubのリポジトリページを開く
2. "Compare & pull request" ボタンをクリック
3. 変更内容を説明
4. "Create pull request" をクリック
5. レビュー後、"Merge pull request" をクリック

**方法2: コマンドラインでマージ**

```bash
# mainブランチに戻る
git checkout main
git pull origin main

# featureブランチをマージ
git merge feature/gamification

# GitHubにプッシュ
git push origin main
```

---

### Step 6: 不要ならブランチを削除

```bash
# ローカルのブランチを削除
git branch -d feature/gamification

# GitHubのブランチを削除
git push origin --delete feature/gamification
```

---

## 🛡️ 安全に開発するためのベストプラクティス

### ✅ やるべきこと

1. **小さく始める**
   - 大きな機能は小さな機能に分割
   - 1つのブランチで1つの機能

2. **頻繁にコミット**
   - 動作する状態でコミット
   - 意味のあるコミットメッセージ

3. **テストを忘れずに**
   - 実装したら必ずテスト
   - 既存機能も確認

4. **定期的にmainブランチと同期**
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/gamification
   git merge main  # mainの変更を取り込む
   ```

### ❌ 避けるべきこと

1. **mainブランチで直接開発しない**
   - 必ずfeatureブランチを作成

2. **大きな変更を一度にコミットしない**
   - 小さな単位でコミット

3. **テストせずにマージしない**
   - 必ずローカルでテスト

---

## 📋 実践例：ゲーミフィケーション機能の実装

### 1. ブランチ作成
```bash
git checkout -b feature/gamification-phase1
```

### 2. データベーススキーマの追加
- `user_stats`テーブルの作成
- マイグレーションファイルの作成

### 3. バックエンドAPIの実装
- XP獲得API
- レベル計算API
- 統計取得API

### 4. フロントエンドUIの実装
- プログレスバー
- XP表示
- レベル表示

### 5. テスト
```bash
pnpm dev
# ブラウザで動作確認
```

### 6. コミット
```bash
git add .
git commit -m "feat: ゲーミフィケーション Phase 1 - XPとレベルシステム"
git push origin feature/gamification-phase1
```

### 7. プルリクエスト作成
- GitHubでプルリクエストを作成
- 説明を書く
- レビューを依頼（必要に応じて）

### 8. マージ or 改善
- **良ければ**: マージして本番に反映
- **改善が必要**: ブランチで修正を続ける

---

## 🔄 よくあるシナリオ

### シナリオ1: 実装中にmainブランチが更新された

```bash
# mainの最新変更を取り込む
git checkout feature/gamification
git merge main

# コンフリクト（競合）が発生したら解決
# その後、再度テスト
```

### シナリオ2: 実装がうまくいかなかった

```bash
# 変更を破棄して最初から
git checkout feature/gamification
git reset --hard origin/feature/gamification

# または、ブランチを削除して作り直し
git checkout main
git branch -D feature/gamification
git checkout -b feature/gamification-v2
```

### シナリオ3: 複数の機能を同時に開発

```bash
# 機能A
git checkout -b feature/feature-a
# 開発...

# 機能B
git checkout -b feature/feature-b
# 開発...

# 必要に応じて切り替え
git checkout feature/feature-a
```

---

## 📊 開発フローの図解

```
mainブランチ（本番）
    │
    ├─ feature/gamification（新機能開発）
    │   ├─ コミット1: データベース設計
    │   ├─ コミット2: API実装
    │   ├─ コミット3: UI実装
    │   └─ テスト → マージ
    │
    └─ feature/user-stats（別の新機能）
        └─ 並行して開発可能
```

---

## 🎯 初心者向けチェックリスト

### ブランチ作成時
- [ ] mainブランチにいる
- [ ] mainブランチが最新
- [ ] 意味のあるブランチ名

### 開発中
- [ ] 小さな単位でコミット
- [ ] 意味のあるコミットメッセージ
- [ ] 定期的にテスト

### マージ前
- [ ] ローカルで動作確認
- [ ] 既存機能が壊れていない
- [ ] エラーがない
- [ ] コードレビュー（可能であれば）

### マージ後
- [ ] 本番環境で動作確認
- [ ] 不要なブランチを削除

---

## 💡 便利なコマンド

```bash
# 現在のブランチを確認
git branch

# ブランチ一覧を確認
git branch -a

# 変更を確認
git status
git diff

# コミット履歴を確認
git log --oneline

# 特定のコミットに戻る（緊急時）
git checkout <commit-hash>
```

---

## 🚨 トラブルシューティング

### 問題: 間違えてmainブランチで作業してしまった

```bash
# 変更を保存
git stash

# featureブランチを作成
git checkout -b feature/my-feature

# 変更を復元
git stash pop
```

### 問題: コミットメッセージを間違えた

```bash
# 最後のコミットメッセージを修正
git commit --amend -m "正しいメッセージ"

# 既にプッシュ済みの場合
git push --force-with-lease origin feature/gamification
```

### 問題: 変更を元に戻したい

```bash
# 特定のファイルだけ元に戻す
git checkout -- <ファイル名>

# すべての変更を破棄（注意！）
git reset --hard HEAD
```

---

## 📚 学習リソース

- [Git公式ドキュメント](https://git-scm.com/doc)
- [GitHub公式ガイド](https://guides.github.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

---

## ✅ まとめ

1. **mainブランチは触らない** - 必ずfeatureブランチで作業
2. **小さく始める** - 大きな機能は分割
3. **テストを忘れずに** - 実装したら必ず確認
4. **頻繁にコミット** - 動作する状態で保存
5. **良ければマージ** - 試して問題なければ統合

このフローで、安全に新機能を試しながら開発できます！

---

**最終更新日**: 2025-01-XX
