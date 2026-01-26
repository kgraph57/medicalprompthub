export interface Step {
  id: string;
  number: number;
  title: string;
  duration: string;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  steps: Step[];
}

export interface MARWGuide {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  phases: Phase[];
}

export const marwGuideData: MARWGuide = {
  id: "marw-complete",
  title: "【最新版】AI論文執筆ワークフロー：MARW完全ガイド",
  description: "世界標準に準拠したAI駆動型論文執筆の7段階ワークフロー。ハーバード大学、JAMA、ICMJEのガイドラインに基づき、24個の実践的プロンプト例を提供。",
  totalSteps: 7,
  phases: [
    {
      id: "workflow",
      number: 1,
      title: "医療AI論文執筆ワークフロー（MARW）",
      titleEn: "Medical AI Research Workflow",
      steps: [
        {
          id: "intro",
          number: 0,
          title: "イントロダクション",
          duration: "5分"
        },
        {
          id: "stage1",
          number: 1,
          title: "段階1: 研究課題の設定と文献探索",
          duration: "1-2週間"
        },
        {
          id: "stage2",
          number: 2,
          title: "段階2: 体系的文献レビュー",
          duration: "2-3週間"
        },
        {
          id: "stage3",
          number: 3,
          title: "段階3: 研究計画とアウトライン作成",
          duration: "1-2週間"
        },
        {
          id: "stage4",
          number: 4,
          title: "段階4: データ収集と分析",
          duration: "研究による"
        },
        {
          id: "stage5",
          number: 5,
          title: "段階5: 原稿執筆",
          duration: "2-4週間"
        },
        {
          id: "stage6",
          number: 6,
          title: "段階6: 編集と査読対応",
          duration: "1-3週間"
        },
        {
          id: "stage7",
          number: 7,
          title: "段階7: 倫理・コンプライアンス確認",
          duration: "全段階に横断"
        }
      ]
    }
  ]
};
