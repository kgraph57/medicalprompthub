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

export interface PaperReadingGuide {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  phases: Phase[];
}

export const paperReadingGuideData: PaperReadingGuide = {
  id: "paper-reading-efficiency",
  title: "【時短】論文読解効率化ガイド",
  description: "忙しい臨床医が効率的に論文を読んで理解するための実践的なワークフロー。AIツールを活用することで、従来の2-3時間から約1時間に短縮。",
  totalSteps: 5,
  phases: [
    {
      id: "preparation",
      number: 1,
      title: "準備編",
      titleEn: "Preparation",
      steps: [
        {
          id: "step-01",
          number: 1,
          title: "ステップ1: 論文の選定と準備",
          duration: "5-10分"
        }
      ]
    },
    {
      id: "reading",
      number: 2,
      title: "読解編",
      titleEn: "Reading",
      steps: [
        {
          id: "step-02",
          number: 2,
          title: "ステップ2: 論文の構造理解と効率的な読み方",
          duration: "10-15分"
        }
      ]
    },
    {
      id: "analysis",
      number: 3,
      title: "分析編",
      titleEn: "Analysis",
      steps: [
        {
          id: "step-03",
          number: 3,
          title: "ステップ3: AIツールを使った要約と分析",
          duration: "10-15分"
        }
      ]
    },
    {
      id: "critical-appraisal",
      number: 4,
      title: "批判的吟味編",
      titleEn: "Critical Appraisal",
      steps: [
        {
          id: "step-04",
          number: 4,
          title: "ステップ4: 批判的吟味（Critical Appraisal）",
          duration: "15-20分"
        }
      ]
    },
    {
      id: "summary",
      number: 5,
      title: "まとめ編",
      titleEn: "Summary",
      steps: [
        {
          id: "step-05",
          number: 5,
          title: "ステップ5: まとめと記録",
          duration: "5-10分"
        }
      ]
    }
  ]
};
