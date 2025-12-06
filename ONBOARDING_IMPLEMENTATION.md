# オンボーディングとワークフロー統合の実装計画

## 🎯 実装の優先順位

### Phase 1: オンボーディングウィザード（最優先）
ユーザーが最初に訪れた時に「どこから始めればいいか」を明確にする

### Phase 2: ガイドの改善（シナリオベース）
既存のガイドを「実際のタイムライン」に沿った形式に改善

### Phase 3: ワークフロービルダー
ユーザーが自分の業務フローをカスタマイズできる機能

### Phase 4: プログレストラッキング強化
学習の進捗を可視化し、次のステップを提案

---

## Phase 1: オンボーディングウィザードの実装

### コンポーネント設計

```typescript
// client/src/components/OnboardingWizard.tsx

interface OnboardingStep {
  id: string;
  title: string;
  content: React.ReactNode;
  action: {
    label: string;
    onClick: () => void;
  };
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "role-selection",
    title: "あなたの役割を教えてください",
    content: <RoleSelection />,
    action: { label: "次へ", onClick: () => {} }
  },
  {
    id: "scenario-selection",
    title: "よくあるシナリオから選んでください",
    content: <ScenarioSelection />,
    action: { label: "次へ", onClick: () => {} }
  },
  {
    id: "first-prompt",
    title: "最初のプロンプトを試してみましょう",
    content: <FirstPromptTrial />,
    action: { label: "試してみる", onClick: () => {} }
  },
  {
    id: "workflow-setup",
    title: "あなたのワークフローを設定",
    content: <WorkflowSetup />,
    action: { label: "完了", onClick: () => {} }
  }
];
```

### ロール選択画面

```typescript
const roles = [
  {
    id: "clinical-doctor",
    label: "臨床医",
    icon: <Stethoscope />,
    description: "外来・病棟での診療業務",
    scenarios: [
      "診療録作成の効率化",
      "患者説明の改善",
      "紹介状作成"
    ]
  },
  {
    id: "research-doctor",
    label: "研究医",
    icon: <Microscope />,
    description: "論文執筆・研究活動",
    scenarios: [
      "症例報告の作成",
      "統計解析",
      "学会発表準備"
    ]
  },
  {
    id: "nurse",
    label: "看護師",
    icon: <Heart />,
    description: "看護記録・看護計画",
    scenarios: [
      "看護記録の作成",
      "看護計画の立案",
      "患者教育"
    ]
  },
  {
    id: "student",
    label: "学生・研修医",
    icon: <GraduationCap />,
    description: "学習・試験対策",
    scenarios: [
      "OSCE対策",
      "国家試験対策",
      "症例カンファレンス準備"
    ]
  }
];
```

### シナリオ選択画面

選択されたロールに応じて、よくあるシナリオを表示：

```typescript
const scenarios = {
  "clinical-doctor": [
    {
      id: "soap-note",
      title: "診療録作成を効率化したい",
      description: "SOAP形式の診療録を素早く作成",
      estimatedTime: "5分",
      guideId: "soap-note-guide",
      firstPromptId: "soap-note-generator"
    },
    {
      id: "patient-explanation",
      title: "患者説明がうまくいかない",
      description: "専門用語を分かりやすく説明",
      estimatedTime: "10分",
      guideId: "patient-explanation-guide",
      firstPromptId: "patient-term-translation"
    },
    // ...
  ],
  // ...
};
```

### 最初のプロンプト試用画面

選択されたシナリオに基づいて、最初のプロンプトを表示し、実際に試してもらう：

```typescript
<FirstPromptTrial 
  promptId={selectedScenario.firstPromptId}
  sampleData={sampleData[selectedScenario.id]}
  onComplete={() => {
    // 次のステップへ
    // またはガイドページへ誘導
  }}
/>
```

---

## Phase 2: ガイドの改善（シナリオベース）

### 改善前後の比較

#### Before（現在）
```
Step 1: 症例の選定
Step 2: 文献検索
Step 3: 執筆
...
```

#### After（改善後）
```
【シナリオ】あなたは研修医で、初めて症例報告を書くことになりました。

【Day 1: 準備（所要時間: 30分）】
  09:00 - カンファレンスで症例を報告
  ↓
  10:00 - 「この症例、報告に値するか？」をAIに相談
  [プロンプト: 症例価値評価]
  ↓
  11:00 - CAREガイドラインでチェック
  [プロンプト: CAREチェックリスト]
  ↓
  12:00 - 不足情報をカルテから収集
  [プロンプト: タイムライン作成]

【実際のタイムライン】
  - 朝のカンファレンス後（10分）
  - 昼休みに文献検索（30分）
  - 帰宅後に執筆（1時間×3日）
```

### 実装例：症例報告ガイドの改善

```typescript
{
  id: "case-report-workflow",
  title: "【完全版】症例報告執筆ガイド：構想から投稿まで",
  description: "「何から始めればいいかわからない」を解決。症例の選び方から、文献検索、執筆、投稿、査読対応まで、成功への最短ルートをガイドします。",
  category: "Research",
  readTime: "20 min read",
  scenario: {
    role: "研修医",
    situation: "初めて症例報告を書くことになった",
    goal: "3週間で投稿まで完了する"
  },
  timeline: [
    {
      day: 1,
      title: "準備",
      duration: "30分",
      steps: [
        {
          time: "09:00",
          action: "カンファレンスで症例を報告",
          prompt: null,
          tip: "指導医の反応を見て、報告に値するか判断"
        },
        {
          time: "10:00",
          action: "症例の価値を評価",
          prompt: "case-value-evaluation",
          tip: "稀であることだけが価値ではない"
        },
        // ...
      ]
    },
    // ...
  ],
  steps: [
    // 既存のステップ構造を維持
  ]
}
```

---

## Phase 3: ワークフロービルダー

### 機能概要

ユーザーが自分の業務フローを可視化し、各ステップで使うプロンプトを設定できる

### UI設計

```typescript
// client/src/pages/WorkflowBuilder.tsx

interface WorkflowStep {
  id: string;
  time: string; // "09:00" or "Day 1"
  action: string;
  promptId?: string;
  duration?: string;
  notes?: string;
}

interface Workflow {
  id: string;
  name: string;
  role: string;
  steps: WorkflowStep[];
  isPublic: boolean;
}
```

### ワークフロービルダーの画面構成

1. **ワークフロー名とロール設定**
2. **ステップの追加・編集**
   - 時間/タイミング
   - アクション名
   - 使用するプロンプト
   - 所要時間
   - メモ
3. **プレビュー**
4. **保存・共有**

---

## Phase 4: プログレストラッキング強化

### 現在の機能
- ガイドの進捗（完了/未完了）
- 文字数カウント

### 追加すべき機能

1. **スキルレベル**
   ```typescript
   type SkillLevel = "beginner" | "intermediate" | "advanced";
   
   interface UserProgress {
     level: SkillLevel;
     completedGuides: string[];
     usedPrompts: Record<string, number>;
     achievements: string[];
   }
   ```

2. **学習パス**
   ```typescript
   interface LearningPath {
     id: string;
     name: string;
     description: string;
     guides: string[]; // guide IDs in order
     estimatedWeeks: number;
   }
   ```

3. **達成バッジ**
   - "初めてのプロンプト使用"
   - "症例報告完了"
   - "10個のプロンプト使用"
   - "ワークフロー作成"

4. **次のステップ提案**
   - 完了したガイドに基づいて、次のガイドを提案
   - 使用頻度の高いプロンプトに基づいて、関連ガイドを提案

---

## 実装の優先順位

### 即座に実装（Phase 1）
1. ✅ オンボーディングウィザード（ロール選択 → シナリオ選択 → 最初のプロンプト）
2. ✅ Homeページに「はじめに」セクションを追加

### 短期（1-2週間）
3. ✅ 既存ガイドをシナリオベースに改善（1-2個のガイドで試行）
4. ✅ プログレストラッキングの強化（スキルレベル、達成バッジ）

### 中期（1ヶ月）
5. ✅ ワークフロービルダーの実装
6. ✅ 学習パスの追加

### 長期（2-3ヶ月）
7. ✅ コミュニティ機能（他のユーザーのワークフローを見る）
8. ✅ ワークフローのテンプレートライブラリ

---

## 次のアクション

1. **オンボーディングウィザードの実装を開始**
2. **1つのガイド（例：症例報告）をシナリオベースに改善して試行**
3. **フィードバックを収集して改善**

