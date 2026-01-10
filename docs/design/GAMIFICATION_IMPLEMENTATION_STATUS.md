# ゲーミフィケーション機能 実装状況

## 📍 現在のブランチ

**ブランチ**: `feature/gamification-setup`  
**ステータス**: 開発中（本番環境に影響なし）

---

## ✅ 実装完了項目

### 1. データベース設計 ✅
- **ファイル**: `drizzle/0019_gamification.sql`
- **テーブル**:
  - `user_stats` - ユーザー統計（XP、レベル、ストリーク）
  - `badges` - バッジ定義
  - `user_badges` - ユーザーが獲得したバッジ
  - `quizzes` - クイズ
  - `user_quiz_attempts` - クイズ回答記録
  - `daily_goals` - 日次目標

### 2. バックエンドロジック ✅
- **ファイル**: `server/_core/gamification.ts`
- **機能**:
  - レベル計算
  - XP進捗計算
  - ストリーク更新
  - XP獲得アクション定義
  - バッジ定義

### 3. データベース関数 ✅
- **ファイル**: `server/db.ts`（追加）
- **関数**:
  - `getUserStats()` - ユーザー統計取得
  - `upsertUserStats()` - 統計更新/作成
  - `addXP()` - XP追加
  - `getUserBadges()` - バッジ取得
  - `awardBadge()` - バッジ付与

### 4. APIエンドポイント ✅
- **ファイル**: `server/routers.ts`（追加）
- **エンドポイント**:
  - `gamification.getStats` - 統計取得
  - `gamification.addXP` - XP追加
  - `gamification.getBadges` - バッジ一覧
  - `gamification.updateStreak` - ストリーク更新

### 5. フロントエンドUI ✅
- **ファイル**: 
  - `client/src/components/GamificationStats.tsx` - 統計表示コンポーネント
  - `client/src/hooks/useGamification.ts` - カスタムフック
  - `client/src/components/ui/progress.tsx` - プログレスバーコンポーネント

---

## ⚠️ 注意事項

### データベーススキーマについて

現在、データベーススキーマファイル（`drizzle/schema.ts`）が見つからないため、以下の関数は**プレースホルダー実装**になっています：

- `getUserStats()`
- `upsertUserStats()`
- `getUserBadges()`
- `awardBadge()`

**次のステップ**:
1. スキーマファイルを確認
2. 適切なスキーマ定義を追加
3. 関数を実装

### tRPCクライアントについて

フロントエンドの`useGamification`フックは、tRPCクライアントが設定されたら実装を完了します。

---

## 🚧 実装が必要な項目

### 優先度: 高

1. **データベーススキーマの実装**
   - `drizzle/schema.ts`にテーブル定義を追加
   - マイグレーションの実行

2. **データベース関数の実装**
   - プレースホルダーを実際の実装に置き換え

3. **tRPCクライアントの設定**
   - フロントエンドでtRPCを使用できるように設定

### 優先度: 中

4. **UI統合**
   - ホームページに統計表示を追加
   - レッスン完了時にXP追加

5. **バッジシステム**
   - バッジ獲得ロジック
   - バッジ表示UI

6. **クイズシステム**
   - クイズ表示
   - 回答処理
   - 正解時のXP追加

---

## 📝 実装ガイド

### データベーススキーマの実装

1. `drizzle/schema.ts`を確認または作成
2. ゲーミフィケーション用のテーブル定義を追加
3. マイグレーションを実行

### フロントエンド統合

1. ホームページに`GamificationStats`コンポーネントを追加
2. レッスン完了時に`addXP`を呼び出す
3. ストリーク更新を実装

---

## 🧪 テスト方法

### ローカルでテスト

```bash
# ブランチで開発サーバーを起動
git checkout feature/gamification-setup
pnpm dev

# ブラウザで http://localhost:3000 を開く
# ゲーミフィケーション機能を確認
```

### プレビュー環境でテスト

1. Vercelを設定（`docs/VERCEL_SETUP_GUIDE.md`参照）
2. ブランチをプッシュ
3. プレビューURLで確認

---

## 📊 実装進捗

- **データベース設計**: ✅ 100%
- **バックエンドロジック**: ✅ 100%
- **APIエンドポイント**: ✅ 80%（スキーマ実装待ち）
- **フロントエンドUI**: ✅ 70%（tRPC統合待ち）
- **統合テスト**: ⏳ 0%

**総合進捗**: 約75%

---

## 🎯 次のステップ

1. **データベーススキーマの実装**（最優先）
2. **tRPCクライアントの設定**
3. **UI統合**
4. **テスト**

---

**最終更新日**: 2025-01-XX  
**ブランチ**: `feature/gamification-setup`
