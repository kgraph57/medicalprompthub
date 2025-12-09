/**
 * コース詳細ページ
 * コース情報とレッスン一覧を表示
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle2, Lock, Star, Award, Clock, FileText, GraduationCap } from "lucide-react";
import { Certificate } from "@/components/Certificate";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// コースデータ（Courses.tsxから共有）
const courses = [
  {
    id: "ai-basics",
    title: "AIとは何か - 基礎から理解する人工知能",
    description: "AIの定義、知能の本質、機械学習の基礎、AIの種類と分類を体系的に学びます。松尾研の視点からAIの全体像を把握します",
    level: 1,
    lessons: 8,
    completedLessons: 0,
    xpReward: 80,
    badge: "🎓",
    category: "基礎",
    locked: false,
  },
  {
    id: "generative-ai-basics",
    title: "生成AIの基礎 - LLMとTransformerアーキテクチャ",
    description: "大規模言語モデル（LLM）の仕組み、Transformerアーキテクチャ、学習プロセス、トークン化、注意機構（Attention）の基礎を理解します",
    level: 1,
    lessons: 9,
    completedLessons: 0,
    xpReward: 90,
    badge: "🤖",
    category: "基礎",
    locked: false,
  },
  {
    id: "ai-usage-basics",
    title: "AIの実践的使い方 - 効果的な対話とプロンプト基礎",
    description: "AIチャットツールの基本操作、効果的な質問の仕方、コンテキストの管理、段階的な対話設計を実践的に学びます",
    level: 1,
    lessons: 7,
    completedLessons: 0,
    xpReward: 70,
    badge: "💬",
    category: "基礎",
    locked: false,
  },
  {
    id: "medical-ai-overview",
    title: "医療AIの全体像 - 応用領域と可能性",
    description: "医療分野におけるAIの活用領域（診断支援、画像解析、創薬、臨床意思決定支援）、現状の課題、今後の展望を包括的に理解します",
    level: 1,
    lessons: 7,
    completedLessons: 0,
    xpReward: 70,
    badge: "🏥",
    category: "基礎",
    locked: false,
  },
  {
    id: "ai-tools-comparison",
    title: "主要AIツールの比較と選び方",
    description: "ChatGPT、Claude、Gemini、医療特化型AIなど主要ツールの特徴、強み・弱み、用途別の選び方を実践的に学びます",
    level: 1,
    lessons: 5,
    completedLessons: 0,
    xpReward: 50,
    badge: "🛠️",
    category: "基礎",
    locked: false,
  },
  {
    id: "ai-terminology-basics",
    title: "AI・機械学習の専門用語基礎",
    description: "AI、機械学習、深層学習の基本的な専門用語を体系的に学びます。LLM、Transformer、Attention、Fine-tuningなど、よく使われる用語を理解します",
    level: 1,
    lessons: 6,
    completedLessons: 0,
    xpReward: 60,
    badge: "📖",
    category: "基礎",
    locked: false,
  },
  {
    id: "medical-terminology-ai",
    title: "医療AI関連の専門用語",
    description: "医療分野でAIを活用する際に必要な専門用語を学びます。診断支援、画像解析、臨床意思決定支援、バイオマーカーなど、医療AI特有の用語を理解します",
    level: 1,
    lessons: 5,
    completedLessons: 0,
    xpReward: 50,
    badge: "🏥",
    category: "基礎",
    locked: false,
  },
  {
    id: "chatgpt-practice",
    title: "ChatGPT実践ガイド - 基本から応用まで",
    description: "ChatGPTの基本操作、プロンプトの書き方、機能の活用法、医療分野での具体的な使い方をステップバイステップで学びます",
    level: 1,
    lessons: 8,
    completedLessons: 0,
    xpReward: 80,
    badge: "💬",
    category: "実践",
    locked: false,
  },
  {
    id: "claude-practice",
    title: "Claude実践ガイド - 長文処理と分析に強い",
    description: "Claudeの特徴、長文コンテキストの活用法、コード分析、医療文献の要約など、Claudeの強みを活かした使い方を学びます",
    level: 1,
    lessons: 7,
    completedLessons: 0,
    xpReward: 70,
    badge: "🧠",
    category: "実践",
    locked: false,
  },
  {
    id: "gemini-practice",
    title: "Google Gemini実践ガイド - マルチモーダル活用",
    description: "Geminiの基本操作、画像解析機能、Googleサービスとの連携、医療画像の分析など、Geminiの特徴を活かした使い方を学びます",
    level: 1,
    lessons: 7,
    completedLessons: 0,
    xpReward: 70,
    badge: "🔍",
    category: "実践",
    locked: false,
  },
  {
    id: "medical-ai-tools-practice",
    title: "医療特化型AIツール実践ガイド",
    description: "医療分野に特化したAIツール（例：UpToDate AI、Med-PaLM、医療文献検索AIなど）の使い方と活用法を実践的に学びます",
    level: 1,
    lessons: 6,
    completedLessons: 0,
    xpReward: 60,
    badge: "🏥",
    category: "実践",
    locked: false,
  },
  {
    id: "medical-data-legal",
    title: "医療情報の法的取り扱い - 個人情報保護法と医療法",
    description: "個人情報保護法、医療法、医師法における医療情報の取り扱い、AI利用時の法的要件、現在の法律と規制を詳しく学びます",
    level: 2,
    lessons: 7,
    completedLessons: 0,
    xpReward: 70,
    badge: "📜",
    category: "技術",
    locked: true,
  },
  {
    id: "ai-copyright-ethics",
    title: "AI生成コンテンツの著作権と倫理",
    description: "画像生成AIの著作権、生成コンテンツの利用規約、医療分野での利用における著作権問題、倫理的な使用法を学びます",
    level: 2,
    lessons: 5,
    completedLessons: 0,
    xpReward: 50,
    badge: "©️",
    category: "技術",
    locked: true,
  },
  {
    id: "advanced-ai-terminology",
    title: "高度なAI専門用語 - 論文を読むために",
    description: "最新のAI研究論文を読むために必要な高度な専門用語を学びます。RAG、Few-shot Learning、Chain-of-Thought、Prompt Engineering、LoRAなど、最新の技術用語を理解します",
    level: 2,
    lessons: 6,
    completedLessons: 0,
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
    completedLessons: 0,
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
    completedLessons: 0,
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
    completedLessons: 0,
    xpReward: 80,
    badge: "⚡",
    category: "実践",
    locked: true,
  },
  {
    id: "research-methodology",
    title: "AI研究の方法論 - 実験設計と再現性",
    description: "AI研究における実験設計、データ分割、交差検証、ハイパーパラメータ調整、再現性の確保、コード管理、実験ログの記録方法を学びます",
    level: 3,
    lessons: 6,
    completedLessons: 0,
    xpReward: 70,
    badge: "🔬",
    category: "実践",
    locked: true,
  },
  {
    id: "paper-reading-writing",
    title: "AI論文の読み方・書き方 - 批判的読解と執筆",
    description: "AI研究論文の構造、批判的読解の方法、先行研究の調査、論文執筆の構成、査読への対応、論文投稿のプロセスを体系的に学びます",
    level: 3,
    lessons: 7,
    completedLessons: 0,
    xpReward: 75,
    badge: "📄",
    category: "実践",
    locked: true,
  },
  {
    id: "research-ethics-open-science",
    title: "研究倫理とオープンサイエンス",
    description: "AI研究における研究倫理、データの適切な取り扱い、コード公開、データ共有、再現性の重要性、オープンサイエンスの実践を学びます",
    level: 3,
    lessons: 5,
    completedLessons: 0,
    xpReward: 60,
    badge: "🌍",
    category: "実践",
    locked: true,
  },
  {
    id: "advanced-model-architectures",
    title: "高度なモデルアーキテクチャ - Transformer発展形",
    description: "BERT、GPT、Vision Transformer、マルチモーダルモデルなど、最新のモデルアーキテクチャの理解と実装を学びます",
    level: 4,
    lessons: 6,
    completedLessons: 0,
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
    completedLessons: 0,
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
    completedLessons: 0,
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
    completedLessons: 0,
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
    completedLessons: 0,
    xpReward: 70,
    badge: "🧪",
    category: "実践",
    locked: true,
  },
  {
    id: "ai-era-mindset",
    title: "AI時代の働き方とマインドセット - 価値観の転換",
    description: "産業革命→インターネット→SNS→AI時代の変遷、人間に求められる価値の変化、知識量から創造性・判断力へ、新しい時代に適応する考え方を学びます",
    level: 3,
    lessons: 7,
    completedLessons: 0,
    xpReward: 75,
    badge: "🌱",
    category: "実践",
    locked: true,
  },
  {
    id: "future-of-work-medicine",
    title: "医療現場の未来の働き方 - AI時代の医師の価値",
    description: "AI時代における医師の役割の変化、知識の記憶から判断・創造へ、患者との関係性、AIと協働する新しい医療の形を学びます",
    level: 4,
    lessons: 6,
    completedLessons: 0,
    xpReward: 80,
    badge: "👨‍⚕️",
    category: "専門",
    locked: true,
  },
];

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:id");
  const [, setLocation] = useLocation();
  const courseId = match ? params.id : null;
  const course = courses.find((c) => c.id === courseId);

  // ローカルストレージから進捗を読み込む
  const [courseProgress, setCourseProgress] = useState<{ completedLessons: string[] }>(() => {
    if (!courseId) return { completedLessons: [] };
    const saved = localStorage.getItem(`course-progress-${courseId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { completedLessons: [] };
      }
    }
    return { completedLessons: [] };
  });

  useEffect(() => {
    // 進捗を定期的に更新
    const updateProgress = () => {
      if (courseId) {
        const saved = localStorage.getItem(`course-progress-${courseId}`);
        if (saved) {
          try {
            setCourseProgress(JSON.parse(saved));
          } catch (e) {
            // ignore
          }
        }
      }
    };

    updateProgress();
    // 定期的に更新（他のタブやページからの変更を検知）
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [courseId]);

  if (!course) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">The course you are looking for does not exist.</p>
          <Button onClick={() => setLocation("/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
        </div>
      </Layout>
    );
  }

  // モックデータ: レッスン一覧（実際のデータは後でデータベースから取得）
  const lessons = getLessonsForCourse(courseId || "");

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => courseProgress.completedLessons?.includes(l.id)).length;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCourseCompleted = completedLessons === totalLessons && totalLessons > 0;
  
  // コース完了日を取得
  const getCompletionDate = () => {
    const saved = localStorage.getItem(`course-completed-${courseId}`);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        return data.completedDate || new Date().toLocaleDateString("ja-JP");
      } catch (e) {
        return new Date().toLocaleDateString("ja-JP");
      }
    }
    return new Date().toLocaleDateString("ja-JP");
  };

  return (
    <Layout>
      <div className="space-y-4 pb-12">
        {/* ヘッダー */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-4"
        >
          <Button
            variant="ghost"
            onClick={() => setLocation("/courses")}
            className="mb-3 h-8 text-xs"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to Courses
          </Button>

          <div className="flex items-start gap-4">
            <div className="text-4xl">{course.badge}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <Badge variant="secondary" className="text-[10px]">Level {course.level}</Badge>
              </div>
              <p className="text-base text-muted-foreground">{course.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>約 {totalLessons * 10} 分</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{course.xpReward} XP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>バッジ: {course.badge}</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Course Progress</span>
                  <span>{completedLessons} / {totalLessons} completed</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
              
              {/* コース開始ボタン */}
              {lessons.length > 0 && (
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      // 最初の未完了レッスン、または最初のレッスンに進む
                      const firstIncompleteLesson = lessons.find(
                        (l, idx) => !courseProgress.completedLessons?.includes(l.id) && (idx === 0 || !courseProgress.completedLessons?.includes(lessons[idx - 1].id))
                      );
                      const targetLesson = firstIncompleteLesson || lessons[0];
                      setLocation(`/courses/${courseId}/lessons/${targetLesson.id}`);
                    }}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    {completedLessons === 0 ? "コースを開始" : completedLessons === totalLessons ? "コースを再開" : "続きから再開"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* 証明書表示（コース完了時） */}
        {isCourseCompleted && (
          <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mx-auto px-4"
          >
            <div className="mb-6 text-center">
              <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">🎉 コース完了おめでとうございます！</h2>
              <p className="text-muted-foreground">
                すべてのレッスンを完了しました。証明書をダウンロードできます。
              </p>
            </div>
            <Certificate
              courseTitle={course.title}
              courseId={course.id}
              completedDate={getCompletionDate()}
            />
          </motion.section>
        )}

        {/* レッスン一覧 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-6xl mx-auto px-4 space-y-2"
        >
          <h2 className="text-xl font-bold">Lessons</h2>
          <div className="space-y-2">
            {lessons.map((lesson, index) => {
              const isCompleted = courseProgress.completedLessons?.includes(lesson.id) || false;
              const isLocked = index > 0 && !courseProgress.completedLessons?.includes(lessons[index - 1].id);

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={isLocked ? "opacity-60" : "hover:shadow-md transition-shadow"}>
                    <CardHeader className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                              {index + 1}
                            </div>
                            <CardTitle className="text-base">{lesson.title}</CardTitle>
                            {isCompleted && (
                              <Badge variant="default" className="bg-green-500 text-[10px]">
                                <CheckCircle2 className="w-3 h-3 mr-0.5" />
                                Completed
                              </Badge>
                            )}
                            {isLocked && (
                              <Badge variant="secondary" className="text-[10px]">
                                <Lock className="w-3 h-3 mr-0.5" />
                                Locked
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">{lesson.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lesson.duration} 分</span>
                          </div>
                          {lesson.slides > 0 && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              <span>{lesson.slides} slides</span>
                            </div>
                          )}
                        </div>
                        <Button
                          variant={isCompleted ? "outline" : "default"}
                          disabled={isLocked}
                          onClick={() => {
                            if (!isLocked) {
                              setLocation(`/courses/${courseId}/lessons/${lesson.id}`);
                            }
                          }}
                          className="h-8 text-xs"
                        >
                          {isCompleted ? "Review" : isLocked ? "Locked" : "Start"}
                        </Button>
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

// レッスンデータ（モック、後でデータベースから取得）
function getLessonsForCourse(courseId: string) {
  const lessonsData: Record<string, Array<{
    id: string;
    title: string;
    description: string;
    duration: number;
    slides: number;
    completed: boolean;
  }>> = {
    "ai-basics": [
      {
        id: "ai-basics-1",
        title: "AIの定義と知能の本質",
        description: "AIとは何か、知能の定義、チューリングテスト、強いAIと弱いAIの違いを理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-basics-2",
        title: "AIの歴史と発展の軌跡",
        description: "1950年代のダートマス会議から現在までのAIの発展、AI冬の時代、深層学習革命をたどります",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "ai-basics-3",
        title: "AIの分類と種類",
        description: "ルールベースAI、機械学習、深層学習、専門家システムなど、AIの分類体系を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ai-basics-4",
        title: "機械学習の基本概念",
        description: "教師あり学習、教師なし学習、強化学習の違い、学習データの重要性を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-basics-5",
        title: "AIの能力と限界",
        description: "現在のAIが得意なこと、苦手なこと、汎化能力、バイアスの問題を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-basics-6",
        title: "AIの現状と医療分野での展望",
        description: "最新のAI技術動向、医療分野での活用例、今後の可能性と課題を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ai-basics-7",
        title: "AIの社会的影響と倫理",
        description: "AIの社会的影響、雇用への影響、倫理的課題、責任あるAI開発と使用を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-basics-8",
        title: "AI学習の次のステップ",
        description: "AI基礎を学んだ後の学習パス、実践的な活用方法、継続的な学習リソースを学びます",
        duration: 12,
        slides: 6,
        completed: false,
      },
    ],
    "generative-ai-basics": [
      {
        id: "generative-ai-1",
        title: "生成AIとは何か - 基本概念",
        description: "生成AIの定義、従来のAI（識別AI）との違い、生成モデルの種類（テキスト、画像、音声）を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "generative-ai-2",
        title: "大規模言語モデル（LLM）の基礎",
        description: "LLMとは何か、パラメータ数と能力の関係、事前学習とファインチューニングの違いを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "generative-ai-3",
        title: "Transformerアーキテクチャ入門",
        description: "Transformerの基本構造、Self-Attention機構、エンコーダー・デコーダーの仕組みを理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "generative-ai-4",
        title: "注意機構（Attention Mechanism）",
        description: "Attention機構の原理、Query/Key/Value、マルチヘッドアテンションの仕組みを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "generative-ai-5",
        title: "トークン化とコンテキストウィンドウ",
        description: "トークンとは何か、トークナイザーの仕組み、コンテキストウィンドウの制約と対処法を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "generative-ai-6",
        title: "生成プロセスとサンプリング",
        description: "テキスト生成の仕組み、温度パラメータ、Top-p/Top-kサンプリング、確率的生成を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "generative-ai-7",
        title: "主要な生成AIツールと比較",
        description: "GPT-4、Claude、Gemini、医療特化型AIの特徴、強み・弱み、用途別の選び方を実践的に学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "generative-ai-8",
        title: "生成AIの学習とファインチューニング",
        description: "生成AIの学習プロセス、事前学習、ファインチューニング、プロンプトチューニングの違いを理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "generative-ai-9",
        title: "生成AIの限界と注意点",
        description: "生成AIの限界、ハルシネーション、バイアス、適切な使い方、医療分野での注意点を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "ai-usage-basics": [
      {
        id: "ai-usage-1",
        title: "AIチャットインターフェースの基本操作",
        description: "主要なAIチャットツールの使い方、インターフェースの理解、基本的な対話の始め方を学びます",
        duration: 12,
        slides: 6,
        completed: false,
      },
      {
        id: "ai-usage-2",
        title: "プロンプトの基礎 - 良い質問の作り方",
        description: "プロンプトとは何か、明確な指示の書き方、コンテキストの提供方法、良いプロンプトと悪いプロンプトの違いを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ai-usage-3",
        title: "段階的な対話設計",
        description: "複雑な質問の分解、段階的な情報収集、前の回答を活用した次の質問の作り方を実践的に学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-usage-4",
        title: "コンテキストの管理と会話の継続",
        description: "会話履歴の活用、コンテキストウィンドウの制約への対処、長い対話の管理方法を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-usage-5",
        title: "回答の評価と改善",
        description: "AIの回答をどう評価するか、不正確な情報の見分け方、回答の改善と再質問のテクニックを学びます",
        duration: 12,
        slides: 6,
        completed: false,
      },
      {
        id: "ai-usage-6",
        title: "医療分野での実践例",
        description: "医療分野でのAI活用の実践例、診断支援、論文執筆、文献検索など、具体的な使用例を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ai-usage-7",
        title: "AI活用のベストプラクティス",
        description: "AIを効果的に活用するためのベストプラクティス、よくある失敗、継続的な改善方法を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "machine-learning-fundamentals": [
      {
        id: "ml-fundamentals-1",
        title: "機械学習とは何か",
        description: "機械学習の定義、従来のプログラミングとの違い、データ駆動型アプローチの本質を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ml-fundamentals-2",
        title: "教師あり学習の基礎",
        description: "分類と回帰、訓練データとテストデータ、過学習と汎化、評価指標（精度、再現率、F値）を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "ml-fundamentals-3",
        title: "教師なし学習の基礎",
        description: "クラスタリング、次元削減、異常検知など、ラベルなしデータからの学習を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ml-fundamentals-4",
        title: "強化学習の基礎",
        description: "エージェントと環境、報酬と方策、強化学習の医療分野での応用例を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ml-fundamentals-5",
        title: "学習アルゴリズムの基本",
        description: "線形回帰、ロジスティック回帰、決定木、ランダムフォレストなどの基本的なアルゴリズムを理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "ml-fundamentals-6",
        title: "モデルの評価と改善",
        description: "交差検証、ハイパーパラメータ調整、バリアンスとバイアスのトレードオフ、モデル選択を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ml-fundamentals-7",
        title: "医療データでの機械学習の実例",
        description: "医療データを使った機械学習の実例、診断予測、リスク評価、予後予測などの応用例を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ml-fundamentals-8",
        title: "機械学習の限界と注意点",
        description: "機械学習の限界、バイアスの問題、医療現場での適用時の注意点、適切な使い分けを理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "deep-learning-basics": [
      {
        id: "dl-basics-1",
        title: "ニューラルネットワークの基本構造",
        description: "パーセプトロン、多層パーセプトロン、ニューロンと層の概念、ネットワークの構造を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "dl-basics-2",
        title: "順伝播と逆伝播",
        description: "入力から出力への計算フロー、誤差逆伝播法（Backpropagation）の原理、勾配の計算を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "dl-basics-3",
        title: "活性化関数とその役割",
        description: "シグモイド、ReLU、tanhなどの活性化関数、なぜ非線形関数が必要か、各関数の特徴を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "dl-basics-4",
        title: "損失関数と最適化",
        description: "平均二乗誤差、交差エントロピー損失、勾配降下法、Adamなどの最適化アルゴリズムを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "dl-basics-5",
        title: "正則化とドロップアウト",
        description: "過学習の防止、L1/L2正則化、ドロップアウト、バッチ正規化の仕組みを理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "dl-basics-6",
        title: "畳み込みニューラルネットワーク（CNN）入門",
        description: "CNNの基本構造、畳み込み層、プーリング層、画像認識への応用を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "dl-basics-7",
        title: "リカレントニューラルネットワーク（RNN）入門",
        description: "RNNの基本構造、LSTM、GRU、時系列データの処理、医療時系列データへの応用を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "dl-basics-8",
        title: "深層学習の医療分野での応用",
        description: "医療画像解析、診断支援、創薬研究など、深層学習の医療分野での実用例と課題を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "medical-ai-overview": [
      {
        id: "medical-ai-1",
        title: "医療AIの全体像と応用領域",
        description: "診断支援、画像解析、創薬、臨床意思決定支援など、医療AIの主要な応用領域を俯瞰します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-ai-2",
        title: "医療画像解析AI",
        description: "X線、CT、MRI画像の解析、異常検知、セグメンテーション、診断支援システムの現状を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "medical-ai-3",
        title: "臨床意思決定支援システム",
        description: "診断支援、治療推奨、リスク予測、AIを活用した臨床判断の支援方法を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-ai-4",
        title: "創薬支援AI",
        description: "創薬研究でのAI活用、化合物の探索、薬物相互作用の予測、臨床試験の最適化を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-ai-5",
        title: "医療AIの課題と限界",
        description: "データの質と量、バイアスの問題、説明可能性、医療現場への統合の難しさを学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "medical-ai-6",
        title: "医療AIの実装と導入",
        description: "医療現場へのAI導入プロセス、システム統合、ユーザー教育、運用管理を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-ai-7",
        title: "医療AIの未来と展望",
        description: "パーソナライズド医療、創薬支援、予防医療、AIと医療専門家の協働の未来を展望します",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "ai-tools-comparison": [
      {
        id: "ai-tools-1",
        title: "主要AIツールの概要",
        description: "ChatGPT、Claude、Gemini、その他の主要な生成AIツールの基本情報と特徴を比較します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-tools-2",
        title: "ツール別の強みと弱み",
        description: "各ツールの得意分野、コンテキストウィンドウ、出力品質、コストなどの比較を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ai-tools-3",
        title: "医療特化型AIツール",
        description: "医療分野に特化したAIツール、医療データの取り扱い、専門性の高いタスクへの対応を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-tools-4",
        title: "用途別のツール選び方",
        description: "論文執筆、診断支援、データ分析など、用途に応じた最適なツールの選び方を実践的に学びます",
        duration: 12,
        slides: 6,
        completed: false,
      },
      {
        id: "ai-tools-5",
        title: "ツールの組み合わせとワークフロー",
        description: "複数のAIツールを組み合わせた効率的なワークフロー、ツール間の連携、最適な組み合わせ方を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "chatgpt-practice": [
      {
        id: "chatgpt-1",
        title: "ChatGPTの基本操作とアカウント設定",
        description: "ChatGPTのアカウント作成、基本インターフェース、プランの選び方、初期設定を学びます",
        duration: 12,
        slides: 6,
        completed: false,
      },
      {
        id: "chatgpt-2",
        title: "基本的なプロンプトの書き方",
        description: "ChatGPTでの効果的な質問の仕方、コンテキストの提供、明確な指示の出し方を実践的に学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "chatgpt-3",
        title: "医療分野での活用例 - 論文執筆支援",
        description: "ChatGPTを使った論文の下書き、要約、校正、参考文献の整理など、論文執筆を効率化する方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "chatgpt-4",
        title: "医療分野での活用例 - 診断支援",
        description: "症状の整理、鑑別診断の検討、治療方針の確認など、診断支援としてのChatGPTの使い方を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "chatgpt-5",
        title: "Code Interpreterとファイル分析",
        description: "ChatGPTのCode Interpreter機能を使ったデータ分析、CSVファイルの処理、統計解析の支援方法を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "chatgpt-6",
        title: "カスタムGPTの作成と活用",
        description: "医療分野に特化したカスタムGPTの作成、プロンプトの設計、医療情報の安全な取り扱いを学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "chatgpt-7",
        title: "API連携と自動化",
        description: "ChatGPT APIの基本的な使い方、医療業務への統合、自動化の可能性と注意点を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "chatgpt-8",
        title: "ChatGPTの限界と注意点",
        description: "ChatGPTの誤情報のリスク、医療判断への依存の危険性、適切な使い分けを理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "claude-practice": [
      {
        id: "claude-1",
        title: "Claudeの基本操作と特徴",
        description: "Claudeのアカウント作成、インターフェース、ChatGPTとの違い、Claudeの強みを理解します",
        duration: 12,
        slides: 6,
        completed: false,
      },
      {
        id: "claude-2",
        title: "長文コンテキストの活用法",
        description: "Claudeの大きなコンテキストウィンドウを活かした、長文医療文献の分析、要約、比較方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "claude-3",
        title: "医療文献の詳細分析",
        description: "複数の論文を同時に分析、比較、統合、システマティックレビューの支援方法を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "claude-4",
        title: "コード分析とデータ処理",
        description: "Claudeを使った医療データ分析コードのレビュー、改善提案、統計解析の支援を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "claude-5",
        title: "医療記録の整理と要約",
        description: "長い診療記録の要約、重要な情報の抽出、構造化された記録の作成をClaudeで効率化する方法を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "claude-6",
        title: "Claude APIと連携",
        description: "Claude APIの基本的な使い方、医療システムへの統合、自動化の実装方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "claude-7",
        title: "Claudeの適切な使い分け",
        description: "Claudeが得意なタスクと苦手なタスク、他のツールとの使い分け、医療現場での実践的な活用を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "gemini-practice": [
      {
        id: "gemini-1",
        title: "Geminiの基本操作と特徴",
        description: "Geminiのアカウント作成、インターフェース、マルチモーダル機能、Googleサービスとの連携を理解します",
        duration: 12,
        slides: 6,
        completed: false,
      },
      {
        id: "gemini-2",
        title: "画像解析機能の活用",
        description: "医療画像（X線、CT、MRI）のアップロードと分析、異常検知の支援、画像の説明生成を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "gemini-3",
        title: "Google Workspaceとの連携",
        description: "Google Docs、Sheets、Slidesとの連携、医療文書の作成支援、データ分析の効率化を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "gemini-4",
        title: "医療画像の分析実践",
        description: "実際の医療画像を使った分析、診断支援としての活用、注意点と限界を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "gemini-5",
        title: "マルチモーダル入力の活用",
        description: "テキストと画像を組み合わせた質問、複数の画像の比較、診療記録と画像の統合分析を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "gemini-6",
        title: "Gemini APIと連携",
        description: "Gemini APIの基本的な使い方、画像解析API、医療システムへの統合方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "gemini-7",
        title: "Geminiの適切な使い分け",
        description: "Geminiが得意なタスク、画像解析の精度、他のツールとの使い分け、医療現場での実践を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "medical-ai-tools-practice": [
      {
        id: "medical-tools-1",
        title: "医療特化型AIツールの概要",
        description: "UpToDate AI、Med-PaLM、PubMed AI、その他の医療特化型ツールの特徴と用途を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "medical-tools-2",
        title: "文献検索AIの活用",
        description: "医療文献検索AIの使い方、効率的な検索戦略、関連論文の抽出、最新研究の追跡を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-tools-3",
        title: "診断支援AIの活用",
        description: "診断支援AIツールの使い方、症状入力、鑑別診断の提示、信頼性の評価方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-tools-4",
        title: "創薬支援AIの活用",
        description: "創薬研究でのAI活用、化合物の探索、薬物相互作用の予測、研究効率化を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "medical-tools-5",
        title: "医療画像解析AIの活用",
        description: "医療画像解析AIの使い方、画像のアップロード、解析結果の解釈、診断への統合を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-tools-6",
        title: "医療特化型ツールの選び方",
        description: "用途に応じた最適な医療AIツールの選び方、コストと効果の比較、複数ツールの組み合わせを学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "medical-data-legal": [
      {
        id: "legal-1",
        title: "個人情報保護法の基礎",
        description: "個人情報保護法の基本概念、医療情報の位置づけ、AI利用時の法的要件を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "legal-2",
        title: "医療法と医師法における情報管理",
        description: "医療法、医師法における診療記録の管理義務、AI利用時の責任、記録保存の要件を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "legal-3",
        title: "AI利用時の同意取得と説明義務",
        description: "患者への説明と同意取得、AI利用の開示、リスクの説明、インフォームドコンセントの実践を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "legal-4",
        title: "データの匿名化と加工",
        description: "医療データの匿名化手法、再識別リスク、AI学習データとしての利用、適切な加工方法を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "legal-5",
        title: "クラウドサービス利用時の法的注意点",
        description: "クラウドAIサービスの利用、データの保存場所、海外サーバーへの送信、法的リスクの評価を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "legal-6",
        title: "AI診断支援の法的責任",
        description: "AI診断支援の利用における医師の責任、過失の判断基準、AIの誤診断時の法的対応を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "legal-7",
        title: "最新の法改正と動向",
        description: "2024年以降の個人情報保護法改正、AI規制法の動向、医療AIに関する最新の法的ガイドラインを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "ai-copyright-ethics": [
      {
        id: "copyright-1",
        title: "AI生成コンテンツの著作権の基礎",
        description: "著作権法の基本、AI生成物の著作権、生成AIの利用規約、著作権の帰属を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "copyright-2",
        title: "画像生成AIの著作権問題",
        description: "Stable Diffusion、Midjourney、DALL-Eなどの画像生成AIの著作権、学習データの権利、生成画像の利用を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "copyright-3",
        title: "医療分野での画像生成の利用",
        description: "医療教育資料、論文図表、プレゼンテーション資料でのAI生成画像の利用、適切な使用法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "copyright-4",
        title: "テキスト生成の著作権と引用",
        description: "AI生成テキストの引用方法、論文での使用、剽窃の回避、適切なクレジット表記を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "copyright-5",
        title: "AI利用時の倫理的ガイドライン",
        description: "医療分野でのAI利用における倫理的原則、透明性、説明責任、患者への影響を考慮した使用を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "ai-terminology-basics": [
      {
        id: "terminology-1",
        title: "AI・機械学習の基本用語",
        description: "人工知能（AI）、機械学習（ML）、深層学習（DL）、ニューラルネットワーク、教師あり学習、教師なし学習などの基本用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "terminology-2",
        title: "生成AI・LLM関連の用語",
        description: "大規模言語モデル（LLM）、生成AI、Transformer、Attention、トークン、コンテキストウィンドウ、プロンプトなどの用語を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "terminology-3",
        title: "学習・訓練関連の用語",
        description: "事前学習（Pre-training）、ファインチューニング（Fine-tuning）、転移学習、過学習、汎化、損失関数、最適化などの用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "terminology-4",
        title: "評価・性能関連の用語",
        description: "精度（Accuracy）、再現率（Recall）、適合率（Precision）、F値、ROC曲線、AUC、混同行列などの評価指標を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "terminology-5",
        title: "アーキテクチャ関連の用語",
        description: "CNN、RNN、LSTM、GRU、GAN、VAE、エンコーダー・デコーダー、マルチヘッドアテンションなどのアーキテクチャ用語を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "terminology-6",
        title: "実践でよく使う用語集",
        description: "API、エンドポイント、レート制限、ストリーミング、エンベディング、ベクトル、セマンティック検索など、実践でよく使う用語を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "medical-terminology-ai": [
      {
        id: "medical-term-1",
        title: "診断・臨床判断関連の用語",
        description: "診断支援システム、臨床意思決定支援（CDSS）、鑑別診断、診断精度、感度、特異度、陽性適中率、陰性適中率などの用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-term-2",
        title: "医療画像解析関連の用語",
        description: "画像分類、物体検出、セグメンテーション、異常検知、CAD（Computer-Aided Diagnosis）、DICOM、画像前処理などの用語を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "medical-term-3",
        title: "バイオマーカー・予測関連の用語",
        description: "バイオマーカー、予後予測、リスクスコア、予測モデル、予測因子、ハザード比、オッズ比、カプラン・マイヤー曲線などの用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-term-4",
        title: "データ・研究関連の用語",
        description: "電子健康記録（EHR）、PACS、オミクスデータ、ゲノムデータ、メタデータ、アノテーション、グラウンドトゥルースなどの用語を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-term-5",
        title: "医療AIの評価・検証用語",
        description: "外部検証、内部検証、交差検証、ランダム化比較試験（RCT）、観察研究、バイアス、交絡因子、説明可能性（Explainability）などの用語を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "medical-term-6",
        title: "医療AI実践で使う用語集",
        description: "実際の医療現場でAIを活用する際によく使われる用語、実践的な知識、現場でのコミュニケーションに必要な用語を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "advanced-ai-terminology": [
      {
        id: "advanced-term-1",
        title: "最新のプロンプト技術用語",
        description: "RAG（Retrieval-Augmented Generation）、Few-shot Learning、Zero-shot Learning、Chain-of-Thought（CoT）、Tree of Thoughts、Prompt Engineeringなどの用語を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "advanced-term-2",
        title: "モデル最適化・効率化の用語",
        description: "LoRA（Low-Rank Adaptation）、QLoRA、量子化（Quantization）、蒸留（Distillation）、プルーニング、モデル圧縮などの用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "advanced-term-3",
        title: "マルチモーダル・マルチタスクの用語",
        description: "マルチモーダル学習、ビジョン言語モデル（VLM）、マルチタスク学習、転移学習、ドメイン適応、Few-shot Adaptationなどの用語を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "advanced-term-4",
        title: "生成モデル・拡散モデルの用語",
        description: "拡散モデル（Diffusion Model）、Stable Diffusion、GAN、VAE、潜在空間、ノイズスケジュール、サンプリングなどの用語を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "advanced-term-5",
        title: "説明可能性・解釈性の用語",
        description: "XAI（Explainable AI）、SHAP、LIME、Attention可視化、勾配ベースの説明、反事実的説明、モデル解釈性などの用語を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "advanced-term-6",
        title: "最新研究でよく使う用語",
        description: "In-context Learning、Instruction Tuning、RLHF（Reinforcement Learning from Human Feedback）、対話型AI、エージェント、ツール使用などの最新用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "statistics-data-science-terms": [
      {
        id: "stats-term-1",
        title: "統計学の基本用語",
        description: "平均、中央値、標準偏差、分散、信頼区間、p値、有意水準、帰無仮説、対立仮説、第一種・第二種過誤などの基本統計用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "stats-term-2",
        title: "診断精度評価の用語",
        description: "感度（Sensitivity）、特異度（Specificity）、陽性適中率（PPV）、陰性適中率（NPV）、ROC曲線、AUC、尤度比などの診断精度評価用語を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "stats-term-3",
        title: "回帰分析・予測の用語",
        description: "線形回帰、ロジスティック回帰、Cox回帰、ハザード比、オッズ比、リスク比、調整変数、交互作用、非線形関係などの用語を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "stats-term-4",
        title: "データ前処理・特徴量の用語",
        description: "特徴量エンジニアリング、特徴選択、次元削減、主成分分析（PCA）、正規化、標準化、欠損値処理、外れ値検出などの用語を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "stats-term-5",
        title: "研究デザイン・バイアスの用語",
        description: "ランダム化比較試験（RCT）、観察研究、コホート研究、症例対照研究、交絡因子、選択バイアス、情報バイアス、生存時間解析などの用語を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "python-ai-programming": [
      {
        id: "python-1",
        title: "Python基礎と環境構築",
        description: "Pythonの基本文法、開発環境の構築（Jupyter Notebook、VS Code）、仮想環境の管理、パッケージ管理を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "python-2",
        title: "NumPyと配列操作",
        description: "NumPyの基礎、多次元配列の操作、ブロードキャスト、線形代数演算、AI研究でよく使う配列操作を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "python-3",
        title: "Pandasとデータ処理",
        description: "Pandasの基礎、データフレームの操作、データの読み込み・書き込み、データクリーニング、医療データの処理を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "python-4",
        title: "Matplotlibとデータ可視化",
        description: "Matplotlibの基礎、グラフの作成、論文用の図表作成、統計的可視化、医療データの可視化を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "python-5",
        title: "Scikit-learn基礎",
        description: "Scikit-learnの基本、データ前処理、機械学習モデルの実装、評価、医療データでの実践を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "python-6",
        title: "データ処理の実践",
        description: "実際の医療データを使ったデータ処理、前処理パイプラインの構築、効率的なデータ処理方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "python-7",
        title: "コードの品質とデバッグ",
        description: "コードの可読性、関数化、エラーハンドリング、デバッグ方法、テストの書き方を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "deep-learning-frameworks": [
      {
        id: "framework-1",
        title: "PyTorch基礎 - テンソルと自動微分",
        description: "PyTorchの基本、テンソル操作、自動微分、勾配計算、基本的なニューラルネットワークの実装を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "framework-2",
        title: "PyTorchでニューラルネットワーク実装",
        description: "nn.Module、レイヤーの定義、損失関数、最適化器、学習ループの実装を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "framework-3",
        title: "TensorFlow基礎とKeras",
        description: "TensorFlowの基本、Keras API、Sequentialモデル、Functional API、モデルの構築と学習を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "framework-4",
        title: "データローダーとデータセット",
        description: "Dataset、DataLoader、データ拡張、バッチ処理、カスタムデータセットの作成を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "framework-5",
        title: "モデルの保存と読み込み",
        description: "モデルの保存、チェックポイント、転移学習、事前学習済みモデルの活用を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "framework-6",
        title: "GPU活用とパフォーマンス最適化",
        description: "GPUの設定、CUDA、バッチサイズの調整、メモリ管理、学習速度の最適化を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "framework-7",
        title: "医療画像解析の実装",
        description: "医療画像データでのCNN実装、画像分類、セグメンテーション、転移学習の実践を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "framework-8",
        title: "フレームワーク比較と選び方",
        description: "PyTorchとTensorFlowの比較、用途別の選び方、両方を使いこなす方法を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "research-methodology": [
      {
        id: "methodology-1",
        title: "実験設計の基礎",
        description: "研究課題の設定、仮説の立て方、実験の設計、対照群の設定、変数の管理を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "methodology-2",
        title: "データ分割と交差検証",
        description: "訓練・検証・テストデータの分割、k-fold交差検証、層化サンプリング、時系列データの分割を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "methodology-3",
        title: "ハイパーパラメータ調整",
        description: "グリッドサーチ、ランダムサーチ、ベイズ最適化、ハイパーパラメータの重要性、調整戦略を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "methodology-4",
        title: "再現性の確保",
        description: "乱数シードの設定、環境の固定、依存関係の管理、実験ログの記録、再現性の重要性を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "methodology-5",
        title: "コード管理とバージョン管理",
        description: "Gitの基礎、GitHubの活用、コードの整理、実験の記録、コラボレーション方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "methodology-6",
        title: "実験ログとモニタリング",
        description: "TensorBoard、MLflow、W&Bなどの実験管理ツール、学習曲線の記録、実験の比較方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "paper-reading-writing": [
      {
        id: "paper-1",
        title: "AI論文の構造と読み方",
        description: "論文の構成（Abstract、Introduction、Method、Results、Discussion）、各セクションの読み方、重要な情報の抽出を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "paper-2",
        title: "批判的読解の方法",
        description: "論文の批判的評価、手法の妥当性、実験の信頼性、結果の解釈、限界の理解を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "paper-3",
        title: "先行研究の調査方法",
        description: "文献検索の戦略、PubMed、arXiv、Google Scholarの活用、関連研究の追跡、引用管理を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "paper-4",
        title: "論文執筆の構成",
        description: "各セクションの書き方、論理的な構成、図表の作成、参考文献の引用方法を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "paper-5",
        title: "査読への対応",
        description: "査読コメントの理解、適切な対応方法、リビジョンの書き方、再投稿の戦略を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "paper-6",
        title: "論文投稿のプロセス",
        description: "ジャーナルの選び方、投稿準備、カバーレターの書き方、投稿後の対応を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "paper-7",
        title: "オープンアクセスとプレプリント",
        description: "オープンアクセス、プレプリントサーバー（arXiv、medRxiv）、早期公開のメリット・デメリットを学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "research-ethics-open-science": [
      {
        id: "ethics-1",
        title: "AI研究における研究倫理",
        description: "研究倫理の基本、データの適切な取り扱い、被験者の保護、利益相反、研究不正の防止を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "ethics-2",
        title: "医療データの倫理的取り扱い",
        description: "医療データの匿名化、再識別リスク、患者の同意、データの適切な管理を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ethics-3",
        title: "コード公開とライセンス",
        description: "コード公開の重要性、適切なライセンスの選び方、GitHubでの公開、ドキュメントの重要性を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ethics-4",
        title: "データ共有とFAIR原則",
        description: "データ共有の重要性、FAIR原則（Findable、Accessible、Interoperable、Reusable）、データリポジトリの活用を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ethics-5",
        title: "オープンサイエンスの実践",
        description: "オープンサイエンスの理念、再現性の向上、コミュニティへの貢献、オープンサイエンスの実践方法を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "advanced-model-architectures": [
      {
        id: "arch-1",
        title: "BERTとTransformerエンコーダー",
        description: "BERTのアーキテクチャ、事前学習、Fine-tuning、医療テキストデータへの応用を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "arch-2",
        title: "GPTとTransformerデコーダー",
        description: "GPTシリーズのアーキテクチャ、生成タスク、Few-shot Learning、医療分野での応用を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "arch-3",
        title: "Vision Transformer（ViT）",
        description: "ViTのアーキテクチャ、画像へのTransformer適用、医療画像解析への応用を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "arch-4",
        title: "マルチモーダルモデル",
        description: "CLIP、DALL-E、医療画像とテキストの統合、マルチモーダル学習の実装を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "arch-5",
        title: "最新アーキテクチャの動向",
        description: "最新のモデルアーキテクチャ（LLaMA、Mistral、Geminiなど）の理解、トレンドの把握を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "arch-6",
        title: "アーキテクチャの実装とカスタマイズ",
        description: "既存アーキテクチャの実装、カスタマイズ、医療分野への適応、実践的な応用を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
    ],
    "ai-research-project": [
      {
        id: "project-1",
        title: "研究テーマの選定と問題設定",
        description: "研究テーマの選び方、問題の明確化、研究課題の設定、先行研究の調査を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "project-2",
        title: "データ収集と前処理",
        description: "データの収集方法、データの品質評価、前処理パイプラインの構築、データの可視化を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "project-3",
        title: "実験設計とベースライン構築",
        description: "実験の設計、ベースライン手法の選定、評価指標の設定、初期実験の実施を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "project-4",
        title: "モデル開発と改善",
        description: "モデルの設計、実装、学習、ハイパーパラメータ調整、モデルの改善を学びます",
        duration: 25,
        slides: 16,
        completed: false,
      },
      {
        id: "project-5",
        title: "評価と分析",
        description: "モデルの評価、結果の分析、可視化、エラー分析、限界の理解を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "project-6",
        title: "論文執筆 - IntroductionとMethod",
        description: "Introductionの書き方、先行研究の整理、Methodセクションの詳細な記述を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "project-7",
        title: "論文執筆 - ResultsとDiscussion",
        description: "Resultsセクションの書き方、図表の作成、Discussionの構成、限界の記述を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "project-8",
        title: "コード整理と再現性の確保",
        description: "コードの整理、ドキュメント化、再現性の確保、公開準備を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "project-9",
        title: "査読対応とリビジョン",
        description: "査読コメントへの対応、追加実験の実施、リビジョンの書き方、再投稿を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "project-10",
        title: "研究の継続と発展",
        description: "研究の継続、新たな研究課題の発見、コミュニティへの貢献、キャリア形成を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "ai-onboarding-workflow": [
      {
        id: "onboarding-1",
        title: "AIオンボーディングの基礎概念",
        description: "layerXのアプローチ、AIオンボーディングとは何か、段階的な導入の重要性、組織変革としてのAI活用を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "onboarding-2",
        title: "現状のワークフロー分析",
        description: "既存業務プロセスの分析、ボトルネックの特定、AI導入の優先順位付け、影響範囲の評価を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "onboarding-3",
        title: "PoCから始める段階的導入",
        description: "小規模なPoCの設計、成功指標の設定、段階的なスケールアップ、リスク管理を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "onboarding-4",
        title: "医療現場での具体的な統合例",
        description: "診療記録作成、診断支援、文献検索、患者説明など、具体的な医療業務へのAI統合事例を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "onboarding-5",
        title: "組織的な導入と変革管理",
        description: "ステークホルダーの巻き込み、教育・研修の設計、抵抗への対応、組織文化の変革を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "onboarding-6",
        title: "品質管理と継続的改善",
        description: "AI出力の品質管理、フィードバックループの構築、継続的な改善、パフォーマンスモニタリングを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "onboarding-7",
        title: "失敗事例から学ぶ",
        description: "よくある失敗パターン、導入の障壁、回避方法、失敗から学ぶ組織文化を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "onboarding-8",
        title: "本番環境への移行",
        description: "本番環境への移行計画、システム統合、セキュリティ対策、運用体制の構築を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "knowledge-work-ai": [
      {
        id: "knowledge-1",
        title: "ナレッジワークとは何か",
        description: "ナレッジワークの定義、知識労働の特徴、情報の創造・共有・活用、医療現場での知識労働を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "knowledge-2",
        title: "知識創造とAI",
        description: "知識創造プロセス、AIを活用した知識の生成、新しい洞察の発見、医療知識の拡張を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "knowledge-3",
        title: "知識共有とコラボレーション",
        description: "組織内での知識共有、AIを活用した情報の整理・要約、チーム間の協働、ベストプラクティスの共有を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "knowledge-4",
        title: "医療現場での知識管理",
        description: "診療ガイドラインの管理、症例の蓄積と活用、専門知識の体系化、AIを活用した知識ベースの構築を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "knowledge-5",
        title: "個人の知識労働の変革",
        description: "医師個人の知識労働の効率化、情報収集の自動化、意思決定支援、学習の加速を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "knowledge-6",
        title: "組織の知識資産の活用",
        description: "組織の知識資産の可視化、AIを活用した知識の検索・抽出、過去の経験の活用、組織学習を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "knowledge-7",
        title: "ナレッジワークの未来",
        description: "AI時代の知識労働、人間とAIの協働、新しい働き方、医療現場での知識労働の未来を展望します",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "poc-experimentation": [
      {
        id: "poc-1",
        title: "PoCとは何か - 概念と目的",
        description: "Proof of Conceptの定義、PoCの目的、PoCとプロトタイプの違い、医療現場でのPoCの重要性を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "poc-2",
        title: "PoCの設計と計画",
        description: "PoCの範囲設定、成功基準の定義、リソース計画、タイムライン、リスク評価を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "poc-3",
        title: "新技術の評価方法",
        description: "新技術の選定基準、比較評価、ベンチマークテスト、実環境での検証方法を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "poc-4",
        title: "ツールの比較検証",
        description: "複数ツールの並行検証、機能比較、コスト分析、使いやすさの評価、医療現場での適合性評価を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "poc-5",
        title: "失敗から学ぶ - PoCの振り返り",
        description: "PoCの失敗パターン、失敗の原因分析、学びの抽出、次のPoCへの改善、失敗を活かす文化を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "poc-6",
        title: "本番導入への判断基準",
        description: "PoCの結果評価、本番導入の判断基準、ROIの計算、リスクとベネフィットの評価、導入決定を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "ai-era-mindset": [
      {
        id: "mindset-1",
        title: "時代の変遷と価値観の変化",
        description: "産業革命時代、インターネット時代、SNS時代、AI時代の変遷、各時代で求められた価値、人間の役割の変化を理解します",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "mindset-2",
        title: "知識量から創造性へ - 価値の転換",
        description: "これまでの「博学な人」の価値、AI時代における知識の位置づけ、記憶力から創造性・判断力への価値転換を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "mindset-3",
        title: "AI時代に求められる能力",
        description: "批判的思考、創造性、共感力、判断力、適応力、協働力など、AI時代に人間が発揮すべき能力を理解します",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "mindset-4",
        title: "AIと人間の協働 - 新しい働き方",
        description: "AIに任せることと人間がやることの境界、AIをツールとして活用する考え方、人間とAIの協働モデルを学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "mindset-5",
        title: "学習の在り方の変化",
        description: "暗記から理解へ、知識の蓄積から活用へ、継続的学習、アンテナの張り方、新しい時代の学習方法を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "mindset-6",
        title: "キャリア形成の新しい考え方",
        description: "専門性の再定義、T字型人材、適応的キャリア、転換期のキャリア戦略、AI時代のキャリア形成を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "mindset-7",
        title: "組織と個人の変革",
        description: "組織文化の変革、個人のマインドセットシフト、変化への適応、AI時代を生き抜く心構えを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "future-of-work-medicine": [
      {
        id: "future-med-1",
        title: "医師の役割の歴史的変遷",
        description: "医療の歴史、医師の役割の変化、技術革新が医療にもたらした影響、AI時代の医師像を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "future-med-2",
        title: "知識の記憶から判断・創造へ",
        description: "これまでの医師の価値（知識の蓄積）、AI時代の医師の価値（判断力・創造性）、診断支援から意思決定支援へを学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "future-med-3",
        title: "患者との関係性の深化",
        description: "AIが情報処理を担う時代の患者との対話、共感と理解、患者中心の医療、人間性の重要性を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "future-med-4",
        title: "AIと協働する新しい医療",
        description: "AIを活用した診療の実践、AIの限界の理解、最終判断は人間、AIと医師の役割分担を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "future-med-5",
        title: "医療教育の変革",
        description: "AI時代の医学教育、暗記から理解へ、臨床推論の重要性、継続的学習、新しい医師の育成を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "future-med-6",
        title: "未来の医療現場の展望",
        description: "AI時代の医療現場の未来像、医師の新しい価値、医療の質の向上、患者体験の改善を展望します",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "api-basics": [
      {
        id: "api-1",
        title: "APIとは何か - 基本概念",
        description: "APIの定義、RESTful API、HTTPメソッド、エンドポイント、リクエストとレスポンスの基本を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "api-2",
        title: "AI APIの仕組み",
        description: "OpenAI API、Claude API、Gemini APIなどのAI APIの基本構造、認証、レート制限を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "api-3",
        title: "APIの実用例 - 医療分野での活用",
        description: "医療データの処理、診断支援、文献検索など、医療分野でのAI API活用事例を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "api-4",
        title: "API利用時の注意点とセキュリティ",
        description: "APIキーの管理、セキュリティ対策、医療データの取り扱い、コスト管理を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "mcp-basics": [
      {
        id: "mcp-1",
        title: "MCP（Model Context Protocol）とは",
        description: "MCPの定義、目的、従来のAPIとの違い、MCPが解決する課題を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "mcp-2",
        title: "MCPの基本構造と仕組み",
        description: "MCPのアーキテクチャ、プロトコルの仕組み、コンテキストの管理方法を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "mcp-3",
        title: "MCPの実装と活用",
        description: "MCPの実装方法、ツールとの連携、医療システムへの統合、実践的な活用を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "mcp-4",
        title: "MCPの未来と可能性",
        description: "MCPの今後の発展、医療分野での応用可能性、標準化の動向を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "prompt-engineering-basics": [
      {
        id: "prompt-eng-1",
        title: "プロンプトエンジニアリングとは",
        description: "プロンプトエンジニアリングの定義、重要性、良いプロンプトと悪いプロンプトの違いを理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "prompt-eng-2",
        title: "基本的なプロンプトテクニック",
        description: "明確な指示、コンテキストの提供、例示（Few-shot）、役割の設定などの基本テクニックを学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "prompt-eng-3",
        title: "医療分野でのプロンプト設計",
        description: "医療情報の正確性、専門用語の扱い、診断支援プロンプト、論文執筆プロンプトの設計を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "prompt-eng-4",
        title: "プロンプトの評価と改善",
        description: "プロンプトの効果測定、A/Bテスト、反復的な改善、ベストプラクティスの確立を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "prompt-eng-5",
        title: "実践的なプロンプト例",
        description: "実際の医療業務でのプロンプト例、症例分析、文献レビュー、診断支援などの実践例を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "medical-data-basics": [
      {
        id: "medical-data-1",
        title: "医療データの種類と特徴",
        description: "構造化データ、非構造化データ、時系列データ、画像データなど、医療データの種類と特徴を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "medical-data-2",
        title: "医療データの構造と標準",
        description: "HL7、FHIR、DICOM、ICD-10などの医療データ標準、データ構造の理解を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "medical-data-3",
        title: "医療データの前処理",
        description: "欠損値処理、外れ値検出、正規化、特徴量エンジニアリング、医療データ特有の前処理を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "medical-data-4",
        title: "医療データの取り扱いとプライバシー",
        description: "匿名化、再識別リスク、データの適切な管理、法的要件、倫理的配慮を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "medical-ai-ethics": [
      {
        id: "ethics-med-1",
        title: "医療AIの倫理原則",
        description: "医療AIにおける倫理的原則、患者の利益、害の回避、自律性の尊重、正義の原則を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "ethics-med-2",
        title: "バイアスと公平性",
        description: "AIのバイアス問題、医療における公平性、データバイアス、アルゴリズムバイアス、対策方法を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "ethics-med-3",
        title: "説明可能性と透明性",
        description: "AIの説明可能性（Explainability）、ブラックボックス問題、医療現場での説明責任を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "ethics-med-4",
        title: "患者の同意とインフォームドコンセント",
        description: "AI利用時の患者への説明、同意取得、リスクの開示、インフォームドコンセントの実践を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "ethics-med-5",
        title: "責任と説明責任",
        description: "AI診断支援の責任、医師の最終判断、過失の判断基準、法的責任を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "ethics-med-6",
        title: "医療AIのガイドラインと規制",
        description: "医療AIに関する国内外のガイドライン、規制動向、承認プロセス、実践的な対応を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "medical-ai-practice": [
      {
        id: "med-practice-1",
        title: "医療現場でのAI活用の現状",
        description: "現在の医療現場でのAI活用事例、導入状況、成功事例と失敗事例を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "med-practice-2",
        title: "診療記録作成へのAI活用",
        description: "音声認識、自動要約、構造化記録の作成、診療記録の効率化を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "med-practice-3",
        title: "診断支援システムの活用",
        description: "症状入力、鑑別診断の提示、診断支援AIの適切な使い方、限界の理解を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "med-practice-4",
        title: "AI活用時の注意点とベストプラクティス",
        description: "AIの限界の理解、最終判断は人間、継続的な学習、適切な使い分けを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "med-practice-5",
        title: "患者説明へのAI活用",
        description: "AIを活用した患者への説明資料作成、わかりやすい説明の生成、多言語対応を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "med-practice-6",
        title: "医療チームでのAI活用",
        description: "医療チーム内でのAI活用の共有、ベストプラクティスの共有、組織的な活用を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "paper-writing-support": [
      {
        id: "paper-support-1",
        title: "AIを活用した論文執筆の基本",
        description: "AIを活用した論文執筆のメリット、適切な使い方、限界の理解、倫理的な使用を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "paper-support-2",
        title: "論文の構成案作成",
        description: "AIを活用した論文の構成案作成、アウトラインの生成、論理的な流れの設計を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "paper-support-3",
        title: "各セクションの執筆支援",
        description: "Introduction、Method、Results、Discussionの各セクションでのAI活用方法を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "paper-support-4",
        title: "英文校正と改善",
        description: "AIを活用した英文校正、表現の改善、アカデミックな文体への調整を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "paper-support-5",
        title: "引用と参考文献の管理",
        description: "AIを活用した文献検索、引用の生成、参考文献の整理、剽窃の回避を学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "case-report-support": [
      {
        id: "case-support-1",
        title: "症例報告の構成とAI活用",
        description: "症例報告の基本構成、AIを活用した症例報告の効率化、適切な使い方を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "case-support-2",
        title: "Case Presentationの作成",
        description: "AIを活用した症例の要約、時系列の整理、重要な情報の抽出、Case Presentationの作成を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "case-support-3",
        title: "Discussionの執筆支援",
        description: "AIを活用したDiscussionの構成、文献との比較、考察の深め方、限界の記述を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "case-support-4",
        title: "症例報告の品質管理",
        description: "AI生成内容の検証、事実確認、専門家によるレビュー、品質管理のプロセスを学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
    "diagnostic-support": [
      {
        id: "diagnostic-1",
        title: "AI診断支援システムの理解",
        description: "診断支援AIの仕組み、能力と限界、医療現場での位置づけを理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "diagnostic-2",
        title: "症状入力と情報整理",
        description: "効果的な症状入力、情報の構造化、鑑別診断のための情報収集を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "diagnostic-3",
        title: "診断支援結果の解釈",
        description: "AIの診断支援結果の読み方、信頼性の評価、限界の理解、最終判断の方法を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "diagnostic-4",
        title: "臨床判断への統合",
        description: "AI診断支援を臨床判断に統合する方法、医師の判断との組み合わせ、患者への説明を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "medical-english-proofreading": [
      {
        id: "proofreading-1",
        title: "医療英語校正の基本",
        description: "医療英語の特徴、よくある誤り、AIを活用した校正の基本を理解します",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "proofreading-2",
        title: "AIを活用した英文校正",
        description: "AIツールを使った英文校正、文法チェック、表現の改善、アカデミックな文体への調整を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "proofreading-3",
        title: "医療専門用語の正確性",
        description: "医療専門用語の正確な使用、略語の適切な使用、用語の統一、AI校正の限界を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "proofreading-4",
        title: "論文校正の実践例",
        description: "実際の論文校正の例、よくある誤り、校正のポイント、最終チェックリストを学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
    ],
    "literature-review-support": [
      {
        id: "lit-review-1",
        title: "文献レビューの基本とAI活用",
        description: "文献レビューの目的、種類、AIを活用した効率的な文献レビューの方法を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "lit-review-2",
        title: "効率的な文献検索",
        description: "AIを活用した検索キーワードの生成、PubMed検索の最適化、関連論文の抽出を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "lit-review-3",
        title: "論文の要約と整理",
        description: "AIを活用した論文の要約、重要な情報の抽出、論文の分類と整理を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "lit-review-4",
        title: "レビュー文章の作成",
        description: "AIを活用したレビュー文章の構成、論文間の比較、統合的な考察の作成を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "advanced-prompt-techniques": [
      {
        id: "advanced-prompt-1",
        title: "Chain-of-Thought（CoT）プロンプティング",
        description: "CoTの原理、段階的思考の誘導、複雑な問題解決への応用を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "advanced-prompt-2",
        title: "Few-shot Learningと例示",
        description: "Few-shot Learningの原理、効果的な例示の選び方、医療分野での応用を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "advanced-prompt-3",
        title: "RAG（Retrieval-Augmented Generation）",
        description: "RAGの仕組み、外部知識の統合、医療知識ベースとの連携、実装方法を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "advanced-prompt-4",
        title: "マルチステッププロンプティング",
        description: "複雑なタスクの分解、段階的なプロンプト設計、中間結果の活用を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "advanced-prompt-5",
        title: "高度なプロンプトの実践例",
        description: "医療分野での高度なプロンプト例、診断支援、研究設計、論文執筆での実践を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
    ],
    "medical-ai-system-building": [
      {
        id: "system-1",
        title: "医療AIシステムの設計",
        description: "システム要件の定義、アーキテクチャ設計、セキュリティ要件、スケーラビリティの考慮を理解します",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "system-2",
        title: "データパイプラインの構築",
        description: "医療データの収集、前処理、保存、管理、データパイプラインの設計と実装を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "system-3",
        title: "モデルの統合とデプロイ",
        description: "AIモデルの統合、API化、デプロイメント、モニタリング、運用体制の構築を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "system-4",
        title: "品質管理と検証",
        description: "システムの品質管理、テスト、検証、パフォーマンス評価、継続的改善を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "system-5",
        title: "医療現場への導入",
        description: "医療現場への導入プロセス、ユーザー教育、フィードバック収集、改善サイクルを学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "research-data-analysis": [
      {
        id: "data-analysis-1",
        title: "研究データ分析の基本",
        description: "研究データの種類、分析の目的、AIを活用した分析の基本を理解します",
        duration: 18,
        slides: 10,
        completed: false,
      },
      {
        id: "data-analysis-2",
        title: "データの可視化と探索",
        description: "AIを活用したデータ可視化、探索的データ分析、パターンの発見、仮説の生成を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "data-analysis-3",
        title: "統計解析の支援",
        description: "AIを活用した統計解析、適切な手法の選択、結果の解釈、レポート生成を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "data-analysis-4",
        title: "結果の解釈と報告",
        description: "分析結果の解釈、統計的有意性の評価、結果の報告、論文への反映を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
    ],
    "ai-clinical-decision": [
      {
        id: "clinical-decision-1",
        title: "臨床意思決定支援システムの基礎",
        description: "臨床意思決定支援（CDSS）の概念、AIを活用した意思決定支援、システムの種類を理解します",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "clinical-decision-2",
        title: "意思決定支援の設計",
        description: "意思決定支援システムの設計、情報の提示方法、ユーザーインターフェース、統合方法を学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "clinical-decision-3",
        title: "リスク評価と予測モデル",
        description: "リスク評価モデル、予測モデルの構築、確率の提示、不確実性の扱いを学びます",
        duration: 22,
        slides: 14,
        completed: false,
      },
      {
        id: "clinical-decision-4",
        title: "臨床判断への統合",
        description: "AI支援を臨床判断に統合する方法、医師の判断との組み合わせ、意思決定プロセスの改善を学びます",
        duration: 20,
        slides: 12,
        completed: false,
      },
      {
        id: "clinical-decision-5",
        title: "評価と改善",
        description: "意思決定支援システムの評価、効果測定、継続的改善、フィードバックループの構築を学びます",
        duration: 18,
        slides: 10,
        completed: false,
      },
    ],
  };

  return lessonsData[courseId] || [];
}
