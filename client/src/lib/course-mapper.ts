/**
 * コースデータをHELIX Learn形式に変換するユーティリティ
 */

import { courses } from "@/pages/Courses";
import { getLessonsForCourse } from "@/pages/CourseDetail";

// サイドバー用の短いタイトル
const shortTitles: Record<string, string> = {
  "ai-basics": "AIの基礎",
  "generative-ai-basics": "生成AIの基礎",
  "ai-usage-basics": "AIの使い方",
  "machine-learning-fundamentals": "機械学習の基礎",
  "medical-ai-overview": "医療AIの全体像",
  "ai-tools-comparison": "AIツールの比較",
  "ai-terminology-basics": "AI専門用語",
  "medical-terminology-ai": "医療AI用語",
  "chatgpt-practice": "ChatGPT実践",
  "claude-practice": "Claude実践",
  "gemini-practice": "Gemini実践",
  "medical-ai-tools-practice": "医療特化AIツール",
  "api-basics": "APIとは",
  "mcp-basics": "MCPとは",
  "prompt-engineering-basics": "プロンプト基礎",
  "medical-data-basics": "医療データ基礎",
  "llm-in-medicine": "医療におけるLLM",
  "ai-implementation-framework": "AI導入フレームワーク",
  "medical-ai-ethics": "医療AI倫理",
  "medical-data-legal": "医療情報と法律",
  "ai-copyright-ethics": "AI著作権と倫理",
  "advanced-ai-terminology": "高度なAI用語",
  "statistics-data-science-terms": "統計学用語",
  "python-ai-programming": "Python基礎",
  "deep-learning-frameworks": "深層学習フレームワーク",
  "research-methodology": "AI研究方法論",
  "paper-reading-writing": "AI論文の読み書き",
  "research-ethics-open-science": "研究倫理",
  "deep-learning-basics": "深層学習の基礎",
  "medical-ai-practice": "医療AI活用",
  "paper-writing-support": "論文執筆支援",
  "case-report-support": "ケースレポート作成",
  "diagnostic-support": "診断支援",
  "medical-english-proofreading": "医療英語校正",
  "literature-review-support": "文献レビュー",
  "advanced-prompt-techniques": "高度なプロンプト",
  "medical-ai-system-building": "医療AIシステム構築",
  "research-data-analysis": "研究データ分析",
  "ai-clinical-decision": "AI臨床意思決定",
  "advanced-model-architectures": "高度なアーキテクチャ",
  "ai-research-project": "AI研究プロジェクト",
  "ai-onboarding-workflow": "AIオンボーディング",
  "knowledge-work-ai": "ナレッジワークとAI",
  "poc-experimentation": "PoC実践",
  "ai-era-mindset": "AI時代のマインドセット",
  "future-of-work-medicine": "医療の未来の働き方",
  "ai-history-evolution": "AIの歴史",
  "data-science-fundamentals": "データサイエンス基礎",
  "statistics-basics-medicine": "統計学基礎",
  "neural-networks-basics": "ニューラルネットワーク",
  "perplexity-practice": "Perplexity実践",
  "github-copilot-practice": "GitHub Copilot実践",
  "cursor-ide-practice": "Cursor IDE実践",
  "notion-ai-practice": "Notion AI実践",
  "midjourney-dalle-practice": "画像生成AI実践",
  "data-preprocessing-cleaning": "データ前処理",
  "model-evaluation-validation": "モデル評価",
  "cloud-ai-services": "クラウドAIサービス",
  "vector-databases-rag": "ベクトルDBとRAG",
  "fine-tuning-basics": "Fine-tuning基礎",
  "medical-imaging-ai-basics": "医療画像AI",
  "drug-discovery-ai-basics": "創薬AI",
  "patient-communication-ai": "患者コミュニケーション",
  "medical-records-ai": "医療記録AI",
  "clinical-pathway-optimization": "クリニカルパス最適化",
  "telemedicine-ai": "遠隔医療とAI",
  "ai-bias-fairness": "AIのバイアスと公平性",
  "ai-explainability-interpretability": "AIの説明可能性",
  "medical-device-regulation": "医療機器規制",
  "clinical-trial-data-analysis": "臨床試験データ分析",
  "meta-analysis-ai-support": "メタアナリシス支援",
  "research-protocol-ai": "研究プロトコル作成",
  "grant-writing-ai": "研究費申請書作成",
  "data-visualization-medical": "医療データ可視化",
  "multimodal-ai-medicine": "マルチモーダルAI",
  "edge-ai-medical-devices": "エッジAI",
  "ai-model-deployment": "AIモデルデプロイ",
  "federated-learning-medicine": "連合学習",
  "ai-robotics-medicine": "AIロボティクス",
  "ai-drug-interaction": "薬物相互作用予測",
  "ai-precision-medicine": "AI精密医療",
  "ai-healthcare-analytics": "ヘルスケア分析",
};

export interface LearnTopic {
  id: string;
  title: string;
  shortTitle: string;  // サイドバー用の短いタイトル
  description: string;
  courseId: string;
  lessons?: Array<{
    id: string;
    title: string;
    description: string;
    duration: number;
    slides: number;
  }>;
  comingSoon?: boolean;
  // コースのメタデータ
  level?: number;
  xpReward?: number;
  badge?: string;
  category?: string;
}

export interface LearnSection {
  id: string;
  title: string;
  topics: LearnTopic[];
}

// 推奨パス（はじめに）に含めるコースID
const recommendedCourseIds = ["ai-basics", "generative-ai-basics"];

// 学習パスの定義
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  courseIds: string[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "ai-tools",
    title: "AIツールを使う",
    description: "ChatGPT、Claude、Geminiなどを実践的に活用",
    courseIds: ["chatgpt-practice", "claude-practice", "gemini-practice", "perplexity-practice"]
  },
  {
    id: "medical-ai",
    title: "医療でAI活用",
    description: "医療現場でのAI活用と診断支援",
    courseIds: ["medical-ai-overview", "medical-ai-practice", "diagnostic-support", "llm-in-medicine"]
  },
  {
    id: "deep-theory",
    title: "理論を深める",
    description: "機械学習・深層学習の仕組みを理解",
    courseIds: ["machine-learning-fundamentals", "deep-learning-basics", "neural-networks-basics"]
  },
  {
    id: "research",
    title: "研究・論文執筆",
    description: "AI研究や論文執筆のスキルを磨く",
    courseIds: ["paper-writing-support", "literature-review-support", "research-methodology"]
  }
];

/**
 * コースをセクションに分類してHELIX Learn形式に変換
 * 推奨パス方式: 「はじめに」に必須2コース、「次のステップ」で学習パスを選択
 */
export function organizeCoursesIntoSections(): LearnSection[] {
  const sections: LearnSection[] = [
    {
      id: "getting-started",
      title: "はじめに",
      topics: []
    }
  ];

  // コースをセクションに分類（はじめにのみ）
  courses.forEach(course => {
    if (!recommendedCourseIds.includes(course.id)) return;

    // レッスンデータを取得
    const lessons = getLessonsForCourse(course.id);

    const topic: LearnTopic = {
      id: course.id,
      title: course.title,
      shortTitle: shortTitles[course.id] || course.title,
      description: course.description,
      courseId: course.id,
      lessons: lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        slides: lesson.slides
      })),
      comingSoon: course.locked,
      level: course.level,
      xpReward: course.xpReward,
      badge: course.badge,
      category: course.category
    };

    sections[0].topics.push(topic);
  });

  // 推奨コースを指定の順序でソート
  sections[0].topics.sort((a, b) => {
    return recommendedCourseIds.indexOf(a.id) - recommendedCourseIds.indexOf(b.id);
  });

  return sections;
}

/**
 * 学習パスIDからコーストピックを取得
 */
export function getCoursesForPath(pathId: string): LearnTopic[] {
  const path = learningPaths.find(p => p.id === pathId);
  if (!path) return [];

  return path.courseIds.map(courseId => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;

    const lessons = getLessonsForCourse(course.id);

    return {
      id: course.id,
      title: course.title,
      shortTitle: shortTitles[course.id] || course.title,
      description: course.description,
      courseId: course.id,
      lessons: lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        duration: lesson.duration,
        slides: lesson.slides
      })),
      comingSoon: course.locked,
      level: course.level,
      xpReward: course.xpReward,
      badge: course.badge,
      category: course.category
    } as LearnTopic;
  }).filter((t): t is LearnTopic => t !== null);
}

/**
 * コースIDからトピックを取得
 */
export function getTopicByCourseId(courseId: string): LearnTopic | null {
  const sections = organizeCoursesIntoSections();
  
  for (const section of sections) {
    const topic = section.topics.find(t => t.id === courseId);
    if (topic) {
      return topic;
    }
  }
  
  return null;
}

/**
 * セクションIDからセクションを取得
 */
export function getSectionById(sectionId: string): LearnSection | null {
  const sections = organizeCoursesIntoSections();
  return sections.find(s => s.id === sectionId) || null;
}
