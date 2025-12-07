export interface Step {
  id: string;
  number: number;
  title: string;
  markdownPath: string;
  estimatedTime: string;
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  titleEn: string;
  steps: Step[];
}

export interface CaseReportGuide {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  phases: Phase[];
}

export const caseReportGuideData: CaseReportGuide = {
  id: "case-report-complete",
  title: "【完全版】症例報告執筆ガイド：構想から投稿まで",
  description: "読むだけで症例報告が実際にできるレベルの完全版ガイド。18ステップで、準備から投稿まで完全サポート。",
  totalSteps: 18,
  phases: [
    {
      id: "preparation",
      number: 1,
      title: "準備",
      titleEn: "Preparation",
      steps: [
        {
          id: "step-01",
          number: 1,
          title: "症例の選定",
          markdownPath: "/medicalprompthub/guides/case-report/01-preparation/step-01.md",
          estimatedTime: "30分"
        },
        {
          id: "step-02",
          number: 2,
          title: "症例の新規性確認",
          markdownPath: "/medicalprompthub/guides/case-report/01-preparation/step-02.md",
          estimatedTime: "1時間"
        },
        {
          id: "step-03",
          number: 3,
          title: "患者同意の取得",
          markdownPath: "/medicalprompthub/guides/case-report/01-preparation/step-03.md",
          estimatedTime: "30分"
        },
        {
          id: "step-04",
          number: 4,
          title: "文献レビュー",
          markdownPath: "/medicalprompthub/guides/case-report/01-preparation/step-04.md",
          estimatedTime: "2〜3時間"
        },
        {
          id: "step-05",
          number: 5,
          title: "症例データの整理",
          markdownPath: "/medicalprompthub/guides/case-report/01-preparation/step-05.md",
          estimatedTime: "1時間"
        }
      ]
    },
    {
      id: "writing",
      number: 2,
      title: "執筆",
      titleEn: "Writing",
      steps: [
        {
          id: "step-06",
          number: 6,
          title: "投稿先の選定",
          markdownPath: "/medicalprompthub/guides/case-report/02-writing/step-06.md",
          estimatedTime: "30分"
        },
        {
          id: "step-07",
          number: 7,
          title: "図表の作成",
          markdownPath: "/medicalprompthub/guides/case-report/02-writing/step-07.md",
          estimatedTime: "2〜3時間"
        },
        {
          id: "step-08",
          number: 8,
          title: "タイトル・抄録作成",
          markdownPath: "/medicalprompthub/guides/case-report/02-writing/step-08.md",
          estimatedTime: "1〜2時間"
        },
        {
          id: "step-09",
          number: 9,
          title: "緒言(Introduction)の執筆",
          markdownPath: "/medicalprompthub/guides/case-report/02-writing/step-09.md",
          estimatedTime: "1〜2時間"
        },
        {
          id: "step-10",
          number: 10,
          title: "症例提示(Case Presentation)の執筆",
          markdownPath: "/medicalprompthub/guides/case-report/02-writing/step-10.md",
          estimatedTime: "2〜3時間"
        },
        {
          id: "step-11",
          number: 11,
          title: "考察(Discussion)の執筆",
          markdownPath: "/medicalprompthub/guides/case-report/02-writing/step-11.md",
          estimatedTime: "3〜4時間"
        },
        {
          id: "step-12",
          number: 12,
          title: "結論(Conclusion)の執筆",
          markdownPath: "/medicalprompthub/guides/case-report/02-writing/step-12.md",
          estimatedTime: "30分"
        }
      ]
    },
    {
      id: "finishing",
      number: 3,
      title: "仕上げ",
      titleEn: "Finishing",
      steps: [
        {
          id: "step-13",
          number: 13,
          title: "謝辞・利益相反・研究助成",
          markdownPath: "/medicalprompthub/guides/case-report/03-finishing/step-13.md",
          estimatedTime: "30分"
        },
        {
          id: "step-14",
          number: 14,
          title: "参考文献リストの作成",
          markdownPath: "/medicalprompthub/guides/case-report/03-finishing/step-14.md",
          estimatedTime: "1〜2時間"
        },
        {
          id: "step-15",
          number: 15,
          title: "英文校正",
          markdownPath: "/medicalprompthub/guides/case-report/03-finishing/step-15.md",
          estimatedTime: "2〜3時間"
        },
        {
          id: "step-16",
          number: 16,
          title: "投稿規定の最終確認",
          markdownPath: "/medicalprompthub/guides/case-report/03-finishing/step-16.md",
          estimatedTime: "1〜2時間"
        },
        {
          id: "step-17",
          number: 17,
          title: "カバーレターの作成",
          markdownPath: "/medicalprompthub/guides/case-report/03-finishing/step-17.md",
          estimatedTime: "1時間"
        }
      ]
    },
    {
      id: "submission",
      number: 4,
      title: "投稿",
      titleEn: "Submission",
      steps: [
        {
          id: "step-18",
          number: 18,
          title: "オンライン投稿",
          markdownPath: "/medicalprompthub/guides/case-report/04-submission/step-18.md",
          estimatedTime: "1〜2時間"
        }
      ]
    }
  ]
};
