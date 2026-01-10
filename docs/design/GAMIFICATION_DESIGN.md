# ゲーミフィケーション機能設計（Duolingo風）

## 🎯 コンセプト

Medical Prompt HubでAIプロンプトの使い方を段階的に学習できるゲーミフィケーション機能。
Duolingoのように、レッスンをクリアしながら進んでいく学習システム。

---

## 📚 学習パス設計

### レベル構造
```
コース（Course）
  └─ レッスン（Lesson）
      └─ スライド（Slide）
          └─ クイズ/練習問題（Quiz/Practice）
```

### 例：AIプロンプト基礎コース

**レベル1: 基礎編**
- レッスン1: プロンプトとは？
- レッスン2: 基本的なプロンプトの書き方
- レッスン3: プロンプトのコピー&ペースト
- レッスン4: プロンプトのカスタマイズ

**レベル2: 実践編**
- レッスン5: 診断支援プロンプトの使い方
- レッスン6: 症例報告プロンプトの使い方
- レッスン7: 統計解析プロンプトの使い方

**レベル3: 応用編**
- レッスン8: 複数プロンプトの組み合わせ
- レッスン9: ワークフローの構築
- レッスン10: カスタムプロンプトの作成

---

## 🎮 ゲーミフィケーション要素

### 1. プログレスバー
- コース全体の進捗率
- 各レッスンの完了状況
- 視覚的な進捗表示

### 2. ストリーク（連続学習日数）
- 毎日学習するとストリークが続く
- ストリークが切れるとリセット
- 長いストリークでバッジ獲得

### 3. XP（経験値）システム
- レッスン完了: +10 XP
- クイズ正解: +5 XP
- プロンプト使用: +2 XP
- レベルアップで報酬

### 4. バッジ・達成システム
- 🏆 "初めてのレッスン完了"
- 🔥 "7日連続学習"
- 📚 "基礎コース完了"
- ⭐ "全レッスン完了"
- 💡 "プロンプトマスター"

### 5. レベルシステム
- レベル1: 初心者（0-100 XP）
- レベル2: 初級者（101-300 XP）
- レベル3: 中級者（301-600 XP）
- レベル4: 上級者（601-1000 XP）
- レベル5: エキスパート（1001+ XP）

### 6. ロック解除システム
- 前のレッスンを完了しないと次に進めない
- 段階的な学習を強制

### 7. 復習システム
- 完了したレッスンも復習可能
- 復習でストリーク維持
- 忘れた内容の再学習

---

## 📊 データベース設計

### 新しいテーブル

#### `user_stats` - ユーザー統計
```sql
CREATE TABLE user_stats (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  totalXP INT DEFAULT 0,
  currentLevel INT DEFAULT 1,
  currentStreak INT DEFAULT 0,
  longestStreak INT DEFAULT 0,
  lastStudyDate DATE,
  totalLessonsCompleted INT DEFAULT 0,
  totalQuizzesPassed INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);
```

#### `user_badges` - ユーザーバッジ
```sql
CREATE TABLE user_badges (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  badgeId VARCHAR(50) NOT NULL,
  badgeName VARCHAR(100) NOT NULL,
  badgeDescription TEXT,
  earnedAt TIMESTAMP DEFAULT NOW(),
  UNIQUE KEY unique_user_badge (userId, badgeId)
);
```

#### `badges` - バッジ定義
```sql
CREATE TABLE badges (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(50),
  requirement TEXT,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

#### `quizzes` - クイズ
```sql
CREATE TABLE quizzes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  lessonId INT NOT NULL,
  question TEXT NOT NULL,
  questionType ENUM('multiple_choice', 'true_false', 'fill_blank') NOT NULL,
  options JSON,
  correctAnswer TEXT NOT NULL,
  explanation TEXT,
  order INT NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

#### `user_quiz_attempts` - クイズ回答記録
```sql
CREATE TABLE user_quiz_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  quizId INT NOT NULL,
  userAnswer TEXT,
  isCorrect BOOLEAN,
  completedAt TIMESTAMP DEFAULT NOW()
);
```

#### `daily_goals` - 日次目標
```sql
CREATE TABLE daily_goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT NOT NULL,
  date DATE NOT NULL,
  targetXP INT DEFAULT 20,
  achievedXP INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE KEY unique_user_date (userId, date)
);
```

---

## 🎨 UI/UX設計

### ホーム画面
- 今日の目標（例: 20 XP獲得）
- 現在のストリーク表示
- 次のレッスンへのCTA
- プログレスバー

### レッスン画面
- スライド形式のコンテンツ
- インタラクティブな要素
- クイズ/練習問題
- 完了ボタン

### コース一覧画面
- コースカード（ロック/アンロック状態）
- 進捗率表示
- レベル表示

### プロフィール画面
- レベル表示
- 獲得バッジ一覧
- 統計情報（総XP、ストリーク等）
- 学習履歴

---

## 🔄 実装フロー

### Phase 1: 基礎機能
1. ユーザー統計の実装
2. XPシステムの実装
3. レベルシステムの実装
4. プログレスバーの実装

### Phase 2: ゲーミフィケーション要素
1. ストリークシステム
2. バッジシステム
3. ロック解除システム
4. 日次目標

### Phase 3: 学習コンテンツ
1. レッスンコンテンツの作成
2. クイズシステム
3. 復習システム

### Phase 4: UI/UX
1. ゲーミフィケーションUI
2. アニメーション
3. 報酬表示

---

## 📝 実装時の注意点

1. **既存システムとの統合**
   - 既存のcourses、lessons、userProgressテーブルを活用
   - 既存のAPIエンドポイントを拡張

2. **パフォーマンス**
   - 統計情報のキャッシュ
   - バッチ処理でのXP計算

3. **モチベーション維持**
   - 適切な難易度設定
   - 報酬のバランス
   - ストリーク維持のインセンティブ

4. **アクセシビリティ**
   - ゲーミフィケーション要素は補助的
   - 学習コンテンツ自体はアクセシブルに

---

## 🎯 成功指標（KPI）

- ユーザーの学習継続率
- 平均学習時間
- ストリーク維持率
- コース完了率
- ユーザーエンゲージメント

---

**作成日**: 2025-01-XX
**ステータス**: 設計段階（未実装）
