# ⚠️ ブランチ安全注意事項

## 🚨 重要: Courses機能はブランチ内のみ

**Courses機能（ゲーミフィケーション機能）は現在 `feature/gamification-setup` ブランチ内にあります。**

### ❌ 絶対にやらないこと

1. **mainブランチへのマージ禁止**
   - まだ開発中・テスト中の機能です
   - 本番環境に影響を与える可能性があります

2. **誤ってmainブランチにコミットしない**
   - 常に現在のブランチを確認してください
   - `git branch --show-current` で確認

3. **プルリクエストの作成はまだ不要**
   - ローカルでの動作確認が完了するまで待機

### ✅ 安全に開発する方法

#### 現在のブランチを確認
```bash
git branch --show-current
# → feature/gamification-setup であることを確認
```

#### ブランチで作業を続ける
```bash
# 現在のブランチで作業
git add .
git commit -m "feat: 新しい機能を追加"
git push origin feature/gamification-setup
```

#### mainブランチに切り替える場合
```bash
# mainブランチに切り替え
git checkout main

# 作業を再開する場合
git checkout feature/gamification-setup
```

### 📍 現在の状態

- **ブランチ**: `feature/gamification-setup`
- **ステータス**: 開発中（ローカルテストのみ）
- **本番環境への影響**: なし（ブランチ内のみ）

### 🔒 安全確認チェックリスト

作業前に必ず確認：

- [ ] 現在のブランチが `feature/gamification-setup` であることを確認
- [ ] mainブランチに切り替えていないことを確認
- [ ] コミット前に `git status` で変更内容を確認
- [ ] 誤ってmainブランチにコミットしていないことを確認

### 📝 メモ

- Courses機能は完全に動作確認が完了するまでブランチ内で開発
- 本番環境（mainブランチ）には影響なし
- 安心してローカルでテスト・開発を続けられます

---

**最終更新日**: 2025-01-XX  
**注意**: この機能をmainブランチにマージする前に、必ず十分なテストを実施してください。
