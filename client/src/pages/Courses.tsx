/**
 * 学習コース一覧ページ
 * 講習会形式で各コースを学習し、バッジとXPを獲得
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GamificationStats } from "@/components/GamificationStats";
import { LearningPath } from "@/components/LearningPath";
import { useGamification } from "@/hooks/useGamification";
import { BookOpen, Award, Star, CheckCircle2, Lock, GraduationCap } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// コース一覧（AI初心者から上級者まで）
export const courses = [
  // レベル1: AI基礎編（初心者向け）- 松尾研レベルの充実した内容
  {
    id: "ai-basics",
    title: "AIとは何か - 基礎から理解する人工知能",
    description: "AIの定義、知能の本質、機械学習の基礎、AIの種類と分類を体系的に学びます。松尾研の視点からAIの全体像を把握します",
    level: 1,
    lessons: 8,
    xpReward: 80,
    badge: "🎓",
    category: "基礎理論",
    locked: false,
  },
  {
    id: "generative-ai-basics",
    title: "生成AIの基礎 - LLMとTransformerアーキテクチャ",
    description: "大規模言語モデル（LLM）の仕組み、Transformerアーキテクチャ、学習プロセス、トークン化、注意機構（Attention）の基礎を理解します",
    level: 1,
    lessons: 9,
    xpReward: 90,
    badge: "🤖",
    category: "基礎理論",
    locked: false,
  },
  {
    id: "ai-usage-basics",
    title: "AIの実践的使い方 - 効果的な対話とプロンプト基礎",
    description: "AIチャットツールの基本操作、効果的な質問の仕方、コンテキストの管理、段階的な対話設計を実践的に学びます",
    level: 1,
    lessons: 7,
    xpReward: 70,
    badge: "💬",
    category: "基礎理論",
    locked: false,
  },
  // レベル1: 技術基礎編（初心者向け）
  {
    id: "machine-learning-fundamentals",
    title: "機械学習の基礎 - 教師あり・教師なし・強化学習",
    description: "機械学習の三大カテゴリ、学習アルゴリズムの基本、過学習と汎化、評価指標を理解し、AIの学習メカニズムを把握します",
    level: 1,
    lessons: 8,
    xpReward: 80,
    badge: "🧠",
    category: "技術",
    locked: false,
  },
  {
    id: "medical-ai-overview",
    title: "医療AIの全体像 - 応用領域と可能性",
    description: "医療分野におけるAIの活用領域（診断支援、画像解析、創薬、臨床意思決定支援）、現状の課題、今後の展望を包括的に理解します",
    level: 1,
    lessons: 7,
    xpReward: 70,
    badge: "🏥",
    category: "医療応用",
    locked: false,
  },
  {
    id: "ai-tools-comparison",
    title: "主要AIツールの比較と選び方",
    description: "ChatGPT、Claude、Gemini、医療特化型AIなど主要ツールの特徴、強み・弱み、用途別の選び方を実践的に学びます",
    level: 1,
    lessons: 5,
    xpReward: 50,
    badge: "🛠️",
    category: "ツール",
    locked: false,
  },
  {
    id: "ai-terminology-basics",
    title: "AI・機械学習の専門用語基礎",
    description: "AI、機械学習、深層学習の基本的な専門用語を体系的に学びます。LLM、Transformer、Attention、Fine-tuningなど、よく使われる用語を理解します",
    level: 1,
    lessons: 6,
    xpReward: 60,
    badge: "📖",
    category: "基礎理論",
    locked: false,
  },
  {
    id: "medical-terminology-ai",
    title: "医療AI関連の専門用語",
    description: "医療分野でAIを活用する際に必要な専門用語を学びます。診断支援、画像解析、臨床意思決定支援、バイオマーカーなど、医療AI特有の用語を理解します",
    level: 1,
    lessons: 5,
    xpReward: 50,
    badge: "🏥",
    category: "医療応用",
    locked: false,
  },
  // レベル1.5: ツール別実践編（初心者向け・実践重視）
  {
    id: "chatgpt-practice",
    title: "ChatGPT実践ガイド - 基本から応用まで",
    description: "ChatGPTの基本操作、プロンプトの書き方、機能の活用法、医療分野での具体的な使い方をステップバイステップで学びます",
    level: 1,
    lessons: 8,
    xpReward: 80,
    badge: "💬",
    category: "ツール",
    locked: false,
  },
  {
    id: "claude-practice",
    title: "Claude実践ガイド - 長文処理と分析に強い",
    description: "Claudeの特徴、長文コンテキストの活用法、コード分析、医療文献の要約など、Claudeの強みを活かした使い方を学びます",
    level: 1,
    lessons: 7,
    xpReward: 70,
    badge: "🧠",
    category: "ツール",
    locked: false,
  },
  {
    id: "gemini-practice",
    title: "Google Gemini実践ガイド - マルチモーダル活用",
    description: "Geminiの基本操作、画像解析機能、Googleサービスとの連携、医療画像の分析など、Geminiの特徴を活かした使い方を学びます",
    level: 1,
    lessons: 7,
    xpReward: 70,
    badge: "🔍",
    category: "ツール",
    locked: false,
  },
  {
    id: "medical-ai-tools-practice",
    title: "医療特化型AIツール実践ガイド",
    description: "医療分野に特化したAIツール（例：UpToDate AI、Med-PaLM、医療文献検索AIなど）の使い方と活用法を実践的に学びます",
    level: 1,
    lessons: 6,
    xpReward: 60,
    badge: "🏥",
    category: "ツール",
    locked: false,
  },
  // レベル2: 技術理解編（中級者向け）
  {
    id: "api-basics",
    title: "APIとは",
    description: "APIの基本概念とAI APIの仕組み、実用例を学びます",
    level: 2,
    lessons: 4,
    xpReward: 50,
    badge: "🔌",
    category: "技術",
    locked: true,
  },
  {
    id: "mcp-basics",
    title: "MCPとは",
    description: "MCP（Model Context Protocol）の仕組みと活用方法を理解します",
    level: 2,
    lessons: 4,
    xpReward: 50,
    badge: "🔗",
    category: "技術",
    locked: true,
  },
  {
    id: "prompt-engineering-basics",
    title: "プロンプトエンジニアリング基礎",
    description: "効果的なプロンプトを書くためのテクニックと実践例を学びます",
    level: 2,
    lessons: 5,
    xpReward: 60,
    badge: "✍️",
    category: "技術",
    locked: true,
  },
  {
    id: "medical-data-basics",
    title: "医療データの基礎知識",
    description: "医療データの種類、構造、取り扱いの基本を理解します",
    level: 2,
    lessons: 4,
    xpReward: 50,
    badge: "📊",
    category: "技術",
    locked: true,
  },
  {
    id: "llm-in-medicine",
    title: "医療におけるLLM実践 - 大規模言語モデルの医療応用",
    description: "LLMの基礎、プロンプトエンジニアリング、RAG、医療文書作成、診断支援、患者コミュニケーション、Fine-tuning、倫理的課題、ケーススタディを実践的に学びます",
    level: 2,
    lessons: 10,
    xpReward: 100,
    badge: "🤖",
    category: "医療応用",
    locked: false,
  },
  {
    id: "ai-implementation-framework",
    title: "医療AI導入フレームワーク - R.O.A.D.モデル",
    description: "R.O.A.D. Framework（Readiness, Optimization, Adoption, Deployment）に基づき、医療機関でのAI導入プロセス、組織の準備、変更管理、成功事例を体系的に学びます",
    level: 2,
    lessons: 8,
    xpReward: 80,
    badge: "🚀",
    category: "医療応用",
    locked: false,
  },
  {
    id: "medical-ai-ethics",
    title: "医療AI倫理とコンプライアンス - 法的・倫理的考慮",
    description: "医療AIの倫理原則、HIPAA・個人情報保護法・GDPR、バイアスと公平性、説明可能性、臨床試験、規制承認、法的責任、倫理委員会、未来と展望を包括的に学びます",
    level: 2,
    lessons: 10,
    xpReward: 100,
    badge: "⚖️",
    category: "法律倫理",
    locked: false,
  },
  {
    id: "medical-data-legal",
    title: "医療情報の法的取り扱い - 個人情報保護法と医療法",
    description: "個人情報保護法、医療法、医師法における医療情報の取り扱い、AI利用時の法的要件、現在の法律と規制を詳しく学びます",
    level: 2,
    lessons: 7,
    xpReward: 70,
    badge: "📜",
    category: "法律倫理",
    locked: true,
  },
  {
    id: "ai-copyright-ethics",
    title: "AI生成コンテンツの著作権と倫理",
    description: "画像生成AIの著作権、生成コンテンツの利用規約、医療分野での利用における著作権問題、倫理的な使用法を学びます",
    level: 2,
    lessons: 5,
    xpReward: 50,
    badge: "©️",
    category: "法律倫理",
    locked: true,
  },
  {
    id: "advanced-ai-terminology",
    title: "高度なAI専門用語 - 論文を読むために",
    description: "最新のAI研究論文を読むために必要な高度な専門用語を学びます。RAG、Few-shot Learning、Chain-of-Thought、Prompt Engineering、LoRAなど、最新の技術用語を理解します",
    level: 2,
    lessons: 6,
    xpReward: 60,
    badge: "📚",
    category: "技術",
    locked: true,
  },
  {
    id: "statistics-data-science-terms",
    title: "統計学・データサイエンスの専門用語",
    description: "AIと医療データ分析に必要な統計学・データサイエンスの専門用語を学びます。p値、信頼区間、ROC曲線、AUC、感度・特異度など、医療研究でよく使われる用語を理解します",
    level: 2,
    lessons: 5,
    xpReward: 50,
    badge: "📊",
    category: "技術",
    locked: true,
  },
  {
    id: "python-ai-programming",
    title: "PythonとAIプログラミング基礎",
    description: "AI研究に必要なPythonプログラミングの基礎を学びます。NumPy、Pandas、Matplotlib、基本的なデータ処理、AIライブラリの使い方を実践的に学びます",
    level: 2,
    lessons: 7,
    xpReward: 70,
    badge: "🐍",
    category: "技術",
    locked: true,
  },
  {
    id: "deep-learning-frameworks",
    title: "深層学習フレームワーク - PyTorch/TensorFlow",
    description: "PyTorchとTensorFlowの基礎、ニューラルネットワークの実装、学習ループの作成、モデルの保存と読み込み、GPU活用などを実践的に学びます",
    level: 3,
    lessons: 8,
    xpReward: 80,
    badge: "⚡",
    category: "ツール",
    locked: true,
  },
  {
    id: "research-methodology",
    title: "AI研究の方法論 - 実験設計と再現性",
    description: "AI研究における実験設計、データ分割、交差検証、ハイパーパラメータ調整、再現性の確保、コード管理、実験ログの記録方法を学びます",
    level: 3,
    lessons: 6,
    xpReward: 70,
    badge: "🔬",
    category: "ツール",
    locked: true,
  },
  {
    id: "paper-reading-writing",
    title: "AI論文の読み方・書き方 - 批判的読解と執筆",
    description: "AI研究論文の構造、批判的読解の方法、先行研究の調査、論文執筆の構成、査読への対応、論文投稿のプロセスを体系的に学びます",
    level: 3,
    lessons: 7,
    xpReward: 75,
    badge: "📄",
    category: "ツール",
    locked: true,
  },
  {
    id: "research-ethics-open-science",
    title: "研究倫理とオープンサイエンス",
    description: "AI研究における研究倫理、データの適切な取り扱い、コード公開、データ共有、再現性の重要性、オープンサイエンスの実践を学びます",
    level: 3,
    lessons: 5,
    xpReward: 60,
    badge: "🌍",
    category: "ツール",
    locked: true,
  },
  // レベル3: 実践編（上級者向け）
  {
    id: "deep-learning-basics",
    title: "深層学習の基礎 - ニューラルネットワーク入門",
    description: "ニューラルネットワークの基本構造、順伝播・逆伝播、活性化関数、損失関数、最適化手法の基礎を学びます",
    level: 3,
    lessons: 8,
    xpReward: 80,
    badge: "🔗",
    category: "ツール",
    locked: true,
  },
  {
    id: "medical-ai-practice",
    title: "医療AI活用実践",
    description: "医療現場でAIを効果的に活用する方法と注意点を学びます",
    level: 3,
    lessons: 6,
    xpReward: 60,
    badge: "🩺",
    category: "ツール",
    locked: true,
  },
  {
    id: "paper-writing-support",
    title: "医療論文執筆支援",
    description: "AIを活用した論文執筆の効率化と品質向上のテクニックを学びます",
    level: 3,
    lessons: 5,
    xpReward: 70,
    badge: "📝",
    category: "医療応用",
    locked: true,
  },
  {
    id: "case-report-support",
    title: "ケースレポート作成支援",
    description: "症例報告書の作成をAIで効率化する方法とベストプラクティスを学びます",
    level: 3,
    lessons: 4,
    xpReward: 65,
    badge: "📋",
    category: "医療応用",
    locked: true,
  },
  {
    id: "diagnostic-support",
    title: "診断支援と臨床判断",
    description: "AIを活用した診断支援システムの理解と臨床判断への統合方法を学びます",
    level: 3,
    lessons: 4,
    xpReward: 65,
    badge: "🔬",
    category: "医療応用",
    locked: true,
  },
  {
    id: "medical-english-proofreading",
    title: "医療英語校正",
    description: "AIを活用した医療英語の校正と改善テクニックを学びます",
    level: 3,
    lessons: 4,
    xpReward: 55,
    badge: "🌐",
    category: "医療応用",
    locked: true,
  },
  {
    id: "literature-review-support",
    title: "文献レビュー支援",
    description: "AIを活用した効率的な文献検索とレビュー作成の方法を学びます",
    level: 1,
    lessons: 4,
    xpReward: 60,
    badge: "📚",
    category: "研究",
    locked: false,
  },
  // レベル4: 専門編（エキスパート向け）
  {
    id: "advanced-prompt-techniques",
    title: "高度なプロンプトテクニック",
    description: "チェーン・オブ・思考、Few-shot学習、RAGなど高度なテクニックを学びます",
    level: 4,
    lessons: 5,
    xpReward: 80,
    badge: "🚀",
    category: "専門",
    locked: true,
  },
  {
    id: "medical-ai-system-building",
    title: "医療AIシステム構築",
    description: "医療現場向けのAIシステム設計と実装の基礎を学びます",
    level: 4,
    lessons: 5,
    xpReward: 85,
    badge: "⚙️",
    category: "専門",
    locked: true,
  },
  {
    id: "research-data-analysis",
    title: "研究データ分析支援",
    description: "AIを活用した研究データの分析と可視化、統計解析の支援方法を学びます",
    level: 4,
    lessons: 4,
    xpReward: 75,
    badge: "📈",
    category: "研究",
    locked: true,
  },
  {
    id: "ai-clinical-decision",
    title: "AI臨床意思決定支援",
    description: "臨床現場でのAI活用による意思決定支援システムの構築と運用を学びます",
    level: 4,
    lessons: 5,
    xpReward: 85,
    badge: "🎯",
    category: "医療応用",
    locked: true,
  },
  {
    id: "advanced-model-architectures",
    title: "高度なモデルアーキテクチャ - Transformer発展形",
    description: "BERT、GPT、Vision Transformer、マルチモーダルモデルなど、最新のモデルアーキテクチャの理解と実装を学びます",
    level: 4,
    lessons: 6,
    xpReward: 90,
    badge: "🏗️",
    category: "専門",
    locked: true,
  },
  {
    id: "ai-research-project",
    title: "AI研究プロジェクト実践 - ゼロから論文まで",
    description: "研究テーマの選定、データ収集、実験設計、モデル開発、評価、論文執筆まで、AI研究プロジェクトを一から完成させる実践的なコースです",
    level: 4,
    lessons: 10,
    xpReward: 100,
    badge: "🎓",
    category: "専門",
    locked: true,
  },
  {
    id: "ai-onboarding-workflow",
    title: "AIオンボーディング - ワークフローへの統合実践",
    description: "layerXのアプローチに基づく、実際の医療業務ワークフローにAIを段階的に組み込む方法を学びます。PoCから本番導入まで、組織的なAI活用の実践を学びます",
    level: 4,
    lessons: 8,
    xpReward: 90,
    badge: "🔄",
    category: "専門",
    locked: true,
  },
  {
    id: "knowledge-work-ai",
    title: "ナレッジワークとAI - 知識労働の変革",
    description: "ナレッジワークの概念、知識労働におけるAI活用、情報の創造・共有・活用、医療現場での知識管理とAIの統合を体系的に学びます",
    level: 4,
    lessons: 7,
    xpReward: 85,
    badge: "💡",
    category: "専門",
    locked: true,
  },
  {
    id: "poc-experimentation",
    title: "PoC実践 - 技術とツールの実験的試行",
    description: "Proof of Concept（PoC）の設計、新技術の評価、ツールの比較検証、失敗から学ぶ、本番導入への判断基準を実践的に学びます",
    level: 3,
    lessons: 6,
    xpReward: 70,
    badge: "🧪",
    category: "ツール",
    locked: true,
  },
  {
    id: "ai-era-mindset",
    title: "AI時代の働き方とマインドセット - 価値観の転換",
    description: "産業革命→インターネット→SNS→AI時代の変遷、人間に求められる価値の変化、知識量から創造性・判断力へ、新しい時代に適応する考え方を学びます",
    level: 3,
    lessons: 7,
    xpReward: 75,
    badge: "🌱",
    category: "ツール",
    locked: true,
  },
  {
    id: "future-of-work-medicine",
    title: "医療現場の未来の働き方 - AI時代の医師の価値",
    description: "AI時代における医師の役割の変化、知識の記憶から判断・創造へ、患者との関係性、AIと協働する新しい医療の形を学びます",
    level: 4,
    lessons: 6,
    xpReward: 80,
    badge: "👨‍⚕️",
    category: "専門",
    locked: true,
  },
];

export default function Courses() {
  const [, setLocation] = useLocation();
  const { stats } = useGamification();
  const [courseProgress, setCourseProgress] = useState<Record<string, { completedLessons: string[] }>>({});

  // ローカルストレージから進捗を読み込む
  useEffect(() => {
    const progress: Record<string, { completedLessons: string[] }> = {};
    courses.forEach((course) => {
      const saved = localStorage.getItem(`course-progress-${course.id}`);
      if (saved) {
        try {
          progress[course.id] = JSON.parse(saved);
        } catch (e) {
          progress[course.id] = { completedLessons: [] };
        }
      } else {
        progress[course.id] = { completedLessons: [] };
      }
    });
    setCourseProgress(progress);
  }, []);

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getCourseProgress = (courseId: string) => {
    const progress = courseProgress[courseId];
    if (!progress) return { completed: 0, total: 0 };
    
    // レッスン数を取得（暫定: コースデータから）
    const course = courses.find((c) => c.id === courseId);
    const total = course?.lessons || 0;
    const completed = progress.completedLessons?.length || 0;
    
    return { completed, total };
  };

  // コースをレベルとジャンルでグループ化
  const groupCoursesByLevelAndCategory = () => {
    const grouped: Record<number, Record<string, typeof courses>> = {};
    
    courses.forEach((course) => {
      if (!grouped[course.level]) {
        grouped[course.level] = {};
      }
      if (!grouped[course.level][course.category]) {
        grouped[course.level][course.category] = [];
      }
      grouped[course.level][course.category].push(course);
    });
    
    return grouped;
  };

  const groupedCourses = groupCoursesByLevelAndCategory();
  
  // ジャンルの表示名と順序（適度な粒度）
  const categoryLabels: Record<string, string> = {
    "基礎理論": "基礎理論編",
    "ツール": "ツール編",
    "技術": "技術編",
    "医療応用": "医療応用編",
    "法律倫理": "法律・倫理編",
    "研究": "研究編",
    "専門": "専門編",
  };
  
  const categoryOrder = ["基礎理論", "ツール", "技術", "医療応用", "法律倫理", "研究", "専門"];
  
  // レベル名
  const levelLabels: Record<number, string> = {
    1: "レベル1: 基礎編（初心者向け）",
    2: "レベル2: 技術理解編（中級者向け）",
    3: "レベル3: 実践編（上級者向け）",
    4: "レベル4: 専門編（エキスパート向け）",
  };

  return (
    <Layout>
      <div className="space-y-4 pb-12">
        {/* ヘッダー - コンパクト */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-2"
        >
          <h1 className="text-2xl font-bold tracking-tight">Learning Courses</h1>
        </motion.section>

        {/* コース一覧 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Available Courses</h2>
            <div className="text-xs text-muted-foreground">
              {courses.filter(c => !c.locked).length} / {courses.length} unlocked
            </div>
          </div>
          
          {/* ジャンル一覧のみ表示（階層構造） */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categoryOrder.map((category) => {
              // このジャンルの全コース数（全レベル）
              const allCategoryCourses = courses.filter(c => c.category === category);
              if (allCategoryCourses.length === 0) return null;
              
              const unlockedCount = allCategoryCourses.filter(c => !c.locked).length;
              const totalLessons = allCategoryCourses.reduce((sum, c) => sum + c.lessons, 0);
              const totalXP = allCategoryCourses.reduce((sum, c) => sum + c.xpReward, 0);
              
              // このジャンルの進捗を計算
              const categoryProgress = allCategoryCourses.reduce((sum, c) => {
                const { completed, total } = getCourseProgress(c.id);
                return sum + completed;
              }, 0);
              const categoryTotal = allCategoryCourses.reduce((sum, c) => sum + c.lessons, 0);
              const categoryProgressPercent = categoryTotal > 0 ? Math.round((categoryProgress / categoryTotal) * 100) : 0;
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * categoryOrder.indexOf(category) }}
                >
                  <Card 
                    className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 min-h-[320px] flex flex-col"
                    onClick={() => setLocation(`/courses/category/${category}`)}
                  >
                    <CardHeader className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                            <CardTitle className="text-2xl">
                              {categoryLabels[category] || category}
                            </CardTitle>
                          </div>
                          <CardDescription className="text-sm leading-relaxed line-clamp-3">
                            {category === "基礎理論" && "AIの基礎理論と概念を体系的に学びます。初心者向けの内容から始まり、AIの全体像を把握できます。"}
                            {category === "ツール" && "ChatGPT、Claude、GeminiなどのAIツールの実践的な使い方を学びます。医療現場で即座に活用できるスキルを習得します。"}
                            {category === "技術" && "AIの技術的な仕組みを深く理解します。機械学習、深層学習、API、プログラミングなど、技術的な側面を学びます。"}
                            {category === "医療応用" && "実際の医療現場でのAI活用方法を学びます。診断支援、論文執筆、症例報告など、医療業務での実践的な活用を習得します。"}
                            {category === "法律倫理" && "医療AI利用における法的要件と倫理的配慮を学びます。個人情報保護法、医療法、著作権、研究倫理などを理解します。"}
                            {category === "研究" && "AI研究の方法論、論文の読み書き、データ分析を学びます。研究を効率的に進めるためのスキルを習得します。"}
                            {category === "専門" && "高度なAI技術と専門的な応用を学びます。システム構築、組織的な導入、最新のアーキテクチャなど、エキスパート向けの内容です。"}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="secondary" className="text-xs">
                          {allCategoryCourses.length} コース
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <BookOpen className="w-4 h-4" />
                          <span>{totalLessons} レッスン</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{totalXP} XP</span>
                        </div>
                      </div>
                      
                      {categoryProgress > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>進捗</span>
                            <span>{categoryProgress} / {categoryTotal} レッスン完了</span>
                          </div>
                          <Progress value={categoryProgressPercent} className="h-2" />
                        </div>
                      )}
                      
                      <div className="pt-2">
                        <div className="text-xs text-muted-foreground text-center">
                          {unlockedCount} / {allCategoryCourses.length} コース利用可能
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
