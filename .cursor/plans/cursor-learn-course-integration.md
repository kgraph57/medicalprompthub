# Cursor Learn風コース統合実装計画

## 📋 概要

現在のHelixコースシステムを、Cursor Learnと同じUI/UX構造に統合するための詳細実装計画です。

## 🎯 目標

- 現在のコースコンテンツをCursor Learn風のトピック形式で表示
- 左サイドバーにセクションとトピック（コース）を表示
- メインコンテンツエリアにコース/レッスンの内容を表示
- 既存のコースデータとレッスンデータをそのまま活用

## 📊 現在の構造分析

### 既存のデータ構造

#### 1. コース定義 (`Courses.tsx`)
```typescript
{
  id: "ai-basics",
  title: "AIとは何か - 基礎から理解する人工知能",
  description: "...",
  level: 1,
  lessons: 8,
  xpReward: 80,
  badge: "🎓",
  category: "AI基礎",
  locked: false,
}
```

#### 2. レッスン定義 (`CourseDetail.tsx`)
```typescript
{
  id: "ai-basics-1",
  title: "AIの定義と知能の本質",
  description: "...",
  duration: 15,
  slides: 8,
  completed: false,
}
```

#### 3. レッスンコンテンツ
- Markdownファイル: `client/src/data/courses/{courseId}/lesson-{n}.md`
- 動的インポート: `import aiBasicsLesson1Md from "@/data/courses/ai-basics/lesson-1.md?raw"`

### Cursor Learnの構造

#### 左サイドバー
- **セクション**: "AI基礎", "近日公開"
- **トピック**: 番号付きリスト（1. AIモデルの仕組み、2. 幻覚と制限事項...）

#### メインコンテンツ
- **動画プレイヤー**（今回は除外）
- **タイトル**: "Cursor Learn"
- **説明**: コースの概要
- **アナロジー**: 移動手段の例え

## 🔄 構造マッピング

### 現在の構造 → Cursor Learn構造

| 現在 | Cursor Learn |
|------|--------------|
| コース一覧ページ (`/courses`) | メインページ (`/learn`) |
| コース詳細ページ (`/courses/:id`) | トピック詳細 (`/learn?topic=:id`) |
| レッスン詳細ページ (`/courses/:id/lessons/:lessonId`) | トピック内のセクション |

### セクション分類

現在のコースをCursor Learn風のセクションに分類：

#### セクション1: "AI基礎"（利用可能）
- `ai-basics` - AIとは何か
- `generative-ai-basics` - 生成AIの基礎
- `ai-usage-basics` - AIの実践的使い方
- `machine-learning-fundamentals` - 機械学習の基礎
- `ai-terminology-basics` - AI専門用語基礎
- `prompt-engineering-basics` - プロンプトエンジニアリング基礎

#### セクション2: "医療AI基礎"（利用可能）
- `medical-ai-overview` - 医療AIの全体像
- `medical-terminology-ai` - 医療AI専門用語
- `medical-data-basics` - 医療データの基礎知識
- `llm-in-medicine` - 医療におけるLLM実践

#### セクション3: "実践ツール"（利用可能）
- `chatgpt-practice` - ChatGPT実践ガイド
- `claude-practice` - Claude実践ガイド
- `gemini-practice` - Gemini実践ガイド
- `medical-ai-tools-practice` - 医療特化型AIツール

#### セクション4: "近日公開"（ロック状態）
- 上級者向けコース
- 専門的なトピック

## 🛠️ 実装ステップ

### Phase 1: データ構造の変換

#### 1.1 コースデータの変換関数作成
- `client/src/data/learn-topics.ts` を拡張
- 既存のコースデータをCursor Learn形式に変換
- セクション分類の実装

#### 1.2 レッスンデータの統合
- コース選択時にレッスン一覧を表示
- レッスン選択時にMarkdownコンテンツを表示
- 既存のレッスン読み込みロジックを再利用

### Phase 2: UI/UXの実装

#### 2.1 左サイドバーの改善
- セクションタイトル（AI基礎、医療AI基礎、実践ツール、近日公開）
- コースをトピックとして表示（番号付き）
- アクティブなコースのハイライト
- ロック状態の表示

#### 2.2 メインコンテンツエリア
- **コース選択時**: コースの説明とレッスン一覧
- **レッスン選択時**: レッスンのMarkdownコンテンツ
- 動画プレイヤー部分（プレースホルダー）
- アナロジーセクション（コース説明に統合）

### Phase 3: ナビゲーションの実装

#### 3.1 ルーティング
- `/learn` - メインページ（コース一覧）
- `/learn?course={courseId}` - コース詳細
- `/learn?course={courseId}&lesson={lessonId}` - レッスン詳細

#### 3.2 ナビゲーションロジック
- URLパラメータでコース/レッスンを管理
- ブラウザの戻る/進むボタン対応
- 直接URLアクセス対応

### Phase 4: コンテンツ表示の実装

#### 4.1 コース詳細表示
- コースタイトルと説明
- レッスン一覧（カード形式）
- 進捗表示（完了済みレッスン）
- バッジとXP表示

#### 4.2 レッスン詳細表示
- Markdownコンテンツの表示
- 既存の`LessonDetail.tsx`のスタイルを再利用
- セクション目次（オプション）
- 次のレッスンへのナビゲーション

### Phase 5: 統合と最適化

#### 5.1 既存機能の統合
- ゲーミフィケーション（XP、バッジ）
- 進捗管理（ローカルストレージ）
- クイズと実践のヒント

#### 5.2 パフォーマンス最適化
- レッスンコンテンツの遅延読み込み
- 画像の最適化
- コード分割

## 📁 ファイル構成

```
client/src/
├── data/
│   ├── learn-topics.ts              # 拡張: コースデータをCursor Learn形式に変換
│   └── courses/                     # 既存: レッスンMarkdownファイル（そのまま使用）
├── pages/
│   └── Learn.tsx                    # 更新: コース/レッスン表示ロジック
├── components/
│   └── learn/
│       ├── LearnNavBar.tsx          # 新規: トップナビゲーションバー
│       ├── LearnSidebar.tsx         # 新規: 左サイドバー（コース一覧）
│       ├── CourseContentView.tsx    # 新規: コース詳細表示
│       └── LessonContentView.tsx    # 新規: レッスン詳細表示
└── lib/
    └── course-mapper.ts             # 新規: コースデータ変換ユーティリティ
```

## 🔧 実装詳細

### 1. コースデータ変換 (`lib/course-mapper.ts`)

```typescript
import { courses } from "@/pages/Courses";
import { getLessonsForCourse } from "@/pages/CourseDetail";

export interface LearnTopic {
  id: string;
  title: string;
  description: string;
  content?: string;
  courseId: string;
  lessons?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  comingSoon?: boolean;
}

export interface LearnSection {
  id: string;
  title: string;
  topics: LearnTopic[];
}

// コースをセクションに分類
export function organizeCoursesIntoSections(): LearnSection[] {
  const sections: LearnSection[] = [
    {
      id: "ai-basics",
      title: "AI基礎",
      topics: []
    },
    {
      id: "medical-ai-basics",
      title: "医療AI基礎",
      topics: []
    },
    {
      id: "practice-tools",
      title: "実践ツール",
      topics: []
    },
    {
      id: "coming-soon",
      title: "近日公開",
      topics: []
    }
  ];

  // コースをセクションに分類
  courses.forEach(course => {
    const topic: LearnTopic = {
      id: course.id,
      title: course.title,
      description: course.description,
      courseId: course.id,
      lessons: getLessonsForCourse(course.id).map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description
      })),
      comingSoon: course.locked
    };

    // カテゴリに基づいてセクションに追加
    if (course.category === "AI基礎" || course.category === "生成AI基礎") {
      sections[0].topics.push(topic);
    } else if (course.category.includes("医療") || course.category === "診断支援") {
      sections[1].topics.push(topic);
    } else if (course.category === "AIチャットツール" || course.category === "医療特化ツール") {
      sections[2].topics.push(topic);
    } else if (course.locked) {
      sections[3].topics.push(topic);
    }
  });

  return sections;
}
```

### 2. Learnページの更新 (`pages/Learn.tsx`)

```typescript
// 3つの表示モード
// 1. メインページ: コース一覧
// 2. コース詳細: コース説明とレッスン一覧
// 3. レッスン詳細: レッスンコンテンツ

const [viewMode, setViewMode] = useState<'main' | 'course' | 'lesson'>('main');
const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
```

### 3. レッスンコンテンツの読み込み

既存の`LessonDetail.tsx`のロジックを再利用：
- Markdownファイルの動的インポート
- ReactMarkdownでの表示
- クイズと実践のヒントの統合

## ✅ チェックリスト

### Phase 1: データ構造
- [ ] `course-mapper.ts` の作成
- [ ] コースデータのセクション分類
- [ ] レッスンデータの統合

### Phase 2: UI/UX
- [ ] 左サイドバーの実装
- [ ] コース詳細表示の実装
- [ ] レッスン詳細表示の実装

### Phase 3: ナビゲーション
- [ ] URLパラメータ管理
- [ ] ルーティングロジック
- [ ] ブラウザ履歴対応

### Phase 4: コンテンツ表示
- [ ] Markdownコンテンツの表示
- [ ] レッスン一覧の表示
- [ ] 進捗表示の統合

### Phase 5: 統合
- [ ] ゲーミフィケーション統合
- [ ] パフォーマンス最適化
- [ ] テストとデバッグ

## 🎨 デザイン仕様

### 左サイドバー
- **セクションタイトル**: 14px, font-weight: 600, uppercase, letter-spacing: 0.05em
- **トピック**: 14px, font-weight: 400, padding: 8px 12px
- **アクティブ**: オレンジ背景 (#FF6B35), 白文字
- **ロック**: グレーアウト, ロックアイコン

### メインコンテンツ
- **コースタイトル**: 32px, font-weight: 700
- **説明**: 18px, line-height: 1.6
- **レッスンカード**: ホバーエフェクト, 完了状態の表示

## 🚀 実装の優先順位

1. **高優先度**: Phase 1, Phase 2（基本的な表示）
2. **中優先度**: Phase 3, Phase 4（ナビゲーションとコンテンツ）
3. **低優先度**: Phase 5（最適化と統合）

## 📝 注意事項

- 既存のコースデータとレッスンデータは変更しない
- 既存の`/courses`ルートは維持（後方互換性）
- ゲーミフィケーション機能はそのまま統合
- 進捗管理はローカルストレージを継続使用

## 🔄 移行戦略

1. **段階的移行**: まず`/learn`で新UIを実装
2. **並行運用**: `/courses`と`/learn`を並行して運用
3. **段階的リダイレクト**: ユーザーを`/learn`に誘導
4. **最終統合**: `/courses`を`/learn`に統合

## 📊 データフロー

```
ユーザーアクション
  ↓
URLパラメータ解析
  ↓
コース/レッスン選択
  ↓
データ取得（既存のコースデータ）
  ↓
UI表示（Cursor Learn風）
  ↓
コンテンツ表示（既存のMarkdown）
```

## 🎯 成功基準

- [ ] 既存のコースがすべて表示される
- [ ] レッスンコンテンツが正しく表示される
- [ ] 進捗管理が機能する
- [ ] ゲーミフィケーションが機能する
- [ ] Cursor Learnと同じUI/UX
- [ ] モバイル対応
- [ ] パフォーマンスが良好
