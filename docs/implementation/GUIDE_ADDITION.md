# ガイド追加手順

## 概要
Medical Prompt Hubに新しいガイド（ワークフロー）を追加する手順です。

## 追加されたガイド一覧

現在、以下の5つのガイドが利用可能です：

1. **症例報告作成ワークフロー** (`case-report-workflow`)
   - カテゴリ: Research
   - 読了時間: 20分
   - タグ: Case Report, Writing, Beginner

2. **医療統計解析ガイド** (`statistical-analysis-guide`)
   - カテゴリ: Research
   - 読了時間: 20分
   - タグ: Statistics, Data Analysis, Beginner

3. **学会発表ガイド** (`conference-presentation-guide`)
   - カテゴリ: Presentation
   - 読了時間: 15分
   - タグ: Conference, Presentation, Public Speaking

4. **論文抄読会効率化ガイド** (`journal-club-guide`)
   - カテゴリ: Research
   - 読了時間: 10分
   - タグ: Journal Club, Literature Review, Time-saving

5. **患者説明・インフォームドコンセントガイド** (`patient-explanation-guide`)
   - カテゴリ: Clinical
   - 読了時間: 10分
   - タグ: Patient Communication, SDM, Clinical

## 新しいガイドを追加する方法

### ステップ1: `Guides.tsx` にガイド情報を追加

`client/src/pages/Guides.tsx` の `guides` 配列に新しいガイドオブジェクトを追加します：

```typescript
{
  id: "your-guide-id",  // 一意のID（URLに使用されます）
  title: "ガイドのタイトル",
  description: "ガイドの説明（2-3行）",
  category: "Research" | "Presentation" | "Clinical",  // カテゴリを選択
  icon: <FileText className="h-6 w-6 text-blue-500" />,  // アイコンを選択
  readTime: "15 min read",  // 読了時間の目安
  tags: ["Tag1", "Tag2", "Tag3"]  // 関連タグ
}
```

### ステップ2: `GuideDetail.tsx` にガイドの詳細コンテンツを追加

`client/src/pages/GuideDetail.tsx` の `guides` 配列に、同じIDで詳細なステップを追加します：

```typescript
{
  id: "your-guide-id",  // Guides.tsxと同じID
  title: "【完全版】ガイドのタイトル",
  description: "より詳細な説明",
  category: "Research",
  readTime: "15 min read",
  steps: [
    {
      title: "Step 1: ステップのタイトル",
      icon: Lightbulb,  // lucide-reactのアイコン
      content: (
        <div className="space-y-4">
          <p>ステップの説明...</p>
          <PromptCard promptId="prompt-id" />  // 関連プロンプトを表示
        </div>
      ),
      hasWordCount: false  // 文字数カウントが必要な場合はtrue
    },
    // 追加のステップ...
  ]
}
```

### ステップ3: プロンプトIDの確認

`PromptCard` コンポーネントで使用するプロンプトIDは、`client/src/lib/prompts-full.ts` に定義されている必要があります。

### ステップ4: カテゴリの色設定（オプション）

新しいカテゴリを追加する場合は、`Guides.tsx` の `categoryColors` オブジェクトに色を追加してください：

```typescript
const categoryColors: Record<string, { border: string; badge: string }> = {
  "Research": { border: "border-l-blue-500", badge: "bg-blue-50 text-blue-700..." },
  "YourCategory": { border: "border-l-purple-500", badge: "bg-purple-50..." },
  // ...
};
```

## ガイド作成のベストプラクティス

1. **ステップ数**: 4-10ステップが適切です。少なすぎると内容が薄く、多すぎると読者が疲れます。

2. **各ステップの構成**:
   - タイトル: 何をするステップか明確に
   - 説明: なぜそのステップが重要なのか
   - プロンプト: 実際に使えるプロンプトへのリンク

3. **プロンプトの統合**: 各ステップに関連するプロンプトを `PromptCard` で表示することで、読者がすぐに実践できます。

4. **進捗管理**: `GuideDetail.tsx` には自動的に進捗管理機能が組み込まれています。各ステップを完了としてマークできます。

5. **文字数カウント**: 執筆系のガイドでは、`hasWordCount: true` を設定することで、読者が目標文字数を追跡できます。

## 例：新しいガイドの追加

### 例：システマティックレビューガイド

```typescript
// Guides.tsx
{
  id: "systematic-review-guide",
  title: "【上級者向け】システマティックレビュー作成ガイド",
  description: "膨大な文献のスクリーニングからPRISMA準拠の報告まで。AIを「第二のスクリーナー」として活用する方法。",
  category: "Research",
  icon: <Microscope className="h-6 w-6 text-purple-500" />,
  readTime: "30 min read",
  tags: ["Systematic Review", "Advanced", "Literature Review"]
}

// GuideDetail.tsx
{
  id: "systematic-review-guide",
  title: "【完全版】システマティックレビュー作成ガイド",
  description: "PRISMAガイドラインに準拠したシステマティックレビューを、AIの力を借りて効率的に作成します。",
  category: "Research",
  readTime: "30 min read",
  steps: [
    {
      title: "Step 1: 研究質問の明確化 (PICO)",
      icon: Lightbulb,
      content: (
        <div className="space-y-4">
          <p>システマティックレビューの第一歩は、研究質問を明確にすることです...</p>
          <PromptCard promptId="res-pico-formulation" />
        </div>
      )
    },
    // 追加のステップ...
  ]
}
```

## トラブルシューティング

- **ガイドが表示されない**: `Guides.tsx` と `GuideDetail.tsx` のIDが一致しているか確認してください。
- **プロンプトが見つからない**: `prompts-full.ts` に該当するプロンプトIDが存在するか確認してください。
- **ルーティングエラー**: `App.tsx` で `/guides/:id` のルートが正しく設定されているか確認してください。

