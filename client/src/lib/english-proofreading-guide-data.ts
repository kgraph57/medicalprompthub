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

export interface EnglishProofreadingGuide {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  phases: Phase[];
}

export const englishProofreadingGuideData: EnglishProofreadingGuide = {
  id: "english-proofreading-guide",
  title: "【完全版】医学英語校正ガイド:AIツール活用からプロ校正まで",
  description: "論文、症例報告、学会抄録、プレゼン資料まで。LLM時代の最新トレンドを反映。AIツール（Grammarly、DeepL Write、ChatGPT）の組み合わせで多くのケースに対応可能。プロ校正が必要なケースとの使い分けも徹底解説。",
  totalSteps: 6,
  phases: [
    {
      id: "basics",
      number: 1,
      title: "基礎編",
      titleEn: "Basics",
      steps: [
        {
          id: "intro",
          number: 0,
          title: "イントロダクション",
          duration: "5分"
        },
        {
          id: "step-01",
          number: 1,
          title: "日本語から英語への翻訳：特徴と限界点",
          duration: "15分"
        },
        {
          id: "step-02",
          number: 2,
          title: "学術英語の基本原則を理解する",
          duration: "10分"
        }
      ]
    },
    {
      id: "practice",
      number: 2,
      title: "実践編",
      titleEn: "Practice",
      steps: [
        {
          id: "step-03",
          number: 3,
          title: "AIツールを活用した一次校正",
          duration: "30分"
        },
        {
          id: "step-04",
          number: 4,
          title: "文書タイプ別の校正ポイント",
          duration: "1-2時間"
        },
        {
          id: "step-05",
          number: 5,
          title: "プロの英文校正サービスを活用する",
          duration: "3-7日"
        },
        {
          id: "step-06",
          number: 6,
          title: "最終チェックと提出前の確認",
          duration: "30分"
        }
      ]
    },
    {
      id: "reference",
      number: 3,
      title: "参考資料",
      titleEn: "Reference",
      steps: [
        {
          id: "trends",
          number: 7,
          title: "世界のトレンドと活用事例",
          duration: "参考情報"
        }
      ]
    }
  ]
};
