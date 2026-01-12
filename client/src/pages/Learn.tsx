import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { ChevronRight, Lock, BookOpen, Menu, X, CheckCircle2, Construction, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { organizeCoursesIntoSections, type LearnTopic, type LearnSection } from "@/lib/course-mapper";
import { getLessonsForCourse } from "@/pages/CourseDetail";
import { hasLessonContent } from "@/lib/lesson-content-loader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Learn() {
  const [location, setLocation] = useLocation();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // コースデータをCursor Learn形式に変換
  const sections = organizeCoursesIntoSections();

  useEffect(() => {
    updateSEO({
      title: "学習 | Helix",
      description: "AIの基礎から実践的な使い方まで、体系的に学べる学習プラットフォーム",
      path: "/learn",
      keywords: "AI学習,AI基礎,プロンプトエンジニアリング,AIリテラシー"
    });

    // URLパラメータからコースIDとレッスンIDを取得
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("course");
    const lessonId = params.get("lesson");
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    if (lessonId) {
      setSelectedLessonId(lessonId);
    }

    // モバイル判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 選択されたコース（トピック）を取得
  const selectedTopic = selectedCourseId
    ? sections
        .flatMap((section) => section.topics)
        .find((topic) => topic.id === selectedCourseId)
    : null;

  // コースの進捗情報をローカルストレージから読み込む
  const [courseProgress, setCourseProgress] = useState<{ completedLessons?: string[] }>(() => {
    if (!selectedCourseId) return { completedLessons: [] };
    const saved = localStorage.getItem(`course-progress-${selectedCourseId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { completedLessons: [] };
      }
    }
    return { completedLessons: [] };
  });

  // 選択されたコースのレッスン一覧を取得
  const lessons = selectedCourseId ? getLessonsForCourse(selectedCourseId) : [];

  const handleCourseClick = (topic: LearnTopic) => {
    if (topic.comingSoon) return;
    setSelectedCourseId(topic.id);
    setSelectedLessonId(null);
    setLocation(`/learn?course=${topic.id}`);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleLessonClick = (lessonId: string) => {
    if (!selectedCourseId) return;
    setSelectedLessonId(lessonId);
    setLocation(`/learn?course=${selectedCourseId}&lesson=${lessonId}`);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleBackToCourse = () => {
    setSelectedLessonId(null);
    if (selectedCourseId) {
      setLocation(`/learn?course=${selectedCourseId}`);
    }
  };

  const handleBackToList = () => {
    setSelectedCourseId(null);
    setSelectedLessonId(null);
    setLocation("/learn");
  };

  const SidebarContent = () => {
    // セクション内のトピック番号を計算（各セクションごとに1から開始）
    let globalIndex = 0;
    
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            学習トピック
          </h2>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-accent"
              aria-label="サイドバーを閉じる"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {sections.map((section) => {
          const sectionStartIndex = globalIndex;
          return (
            <div key={section.id} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.topics.map((topic, index) => {
                  const topicIndex = sectionStartIndex + index + 1;
                  globalIndex++;
                  return (
                    <li key={topic.id}>
                      <button
                        onClick={() => handleCourseClick(topic)}
                        disabled={topic.comingSoon}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 group",
                          selectedCourseId === topic.id
                            ? "bg-primary text-primary-foreground"
                            : topic.comingSoon
                            ? "text-muted-foreground/50 cursor-not-allowed"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <span className="text-xs text-muted-foreground group-hover:text-foreground">
                          {topicIndex}.
                        </span>
                        <span className="flex-1">{topic.title}</span>
                        {topic.comingSoon && (
                          <Lock className="w-3 h-3 text-muted-foreground" />
                        )}
                        {selectedCourseId === topic.id && (
                          <ChevronRight className="w-3 h-3" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-3.5rem)] relative">
        {/* モバイル用オーバーレイ */}
        {isMobile && isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}

        {/* 左サイドバー */}
        <aside
          className={cn(
            "w-64 flex-shrink-0 border-r border-border bg-muted/30 overflow-y-auto transition-transform duration-300 z-50",
            isMobile
              ? cn(
                  "fixed left-0 top-0 bottom-0",
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )
              : "relative"
          )}
        >
          <SidebarContent />
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-y-auto bg-background">
          {/* モバイル用サイドバートグルボタン */}
          {isMobile && (
            <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="サイドバーを開く"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          )}

          {selectedTopic ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <Button
                    variant="ghost"
                    onClick={selectedLessonId ? handleBackToCourse : handleBackToList}
                    className="mb-4"
                  >
                    ← {selectedLessonId ? "コースに戻る" : "一覧に戻る"}
                  </Button>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4">{selectedTopic.title}</h1>
                  {selectedTopic.description && (
                    <p className="text-muted-foreground text-base sm:text-lg mb-6">
                      {selectedTopic.description}
                    </p>
                  )}
                </motion.div>

                {/* レッスン一覧 */}
                {!selectedLessonId && lessons.length > 0 && (
                  <motion.div variants={itemVariants} className="mb-6">
                    <h2 className="text-lg font-bold mb-4">レッスン一覧</h2>
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => {
                        const isCompleted = courseProgress.completedLessons?.includes(lesson.id) || false;
                        const isContentAvailable = hasLessonContent(lesson.id);

                        return (
                          <motion.div
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <Card
                              className={cn(
                                !isContentAvailable
                                  ? "opacity-60 cursor-not-allowed"
                                  : "hover:shadow-sm hover:border-primary/30 transition-all duration-200 cursor-pointer",
                                "border-2 bg-gradient-to-r from-background to-accent/5"
                              )}
                              onClick={() => {
                                if (isContentAvailable) {
                                  handleLessonClick(lesson.id);
                                }
                              }}
                            >
                              <CardHeader className="p-3">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 flex-1">
                                    <div
                                      className={cn(
                                        "flex items-center justify-center w-8 h-8 rounded-full font-bold text-base",
                                        !isContentAvailable
                                          ? "bg-muted text-muted-foreground"
                                          : "bg-primary/10 text-primary"
                                      )}
                                    >
                                      {index + 1}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <CardTitle
                                          className={cn(
                                            "text-base font-semibold",
                                            !isContentAvailable && "text-muted-foreground"
                                          )}
                                        >
                                          {lesson.title}
                                        </CardTitle>
                                        {isCompleted && (
                                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                                        )}
                                        {!isContentAvailable && (
                                          <Construction className="w-4 h-4 text-muted-foreground" />
                                        )}
                                      </div>
                                      <CardDescription
                                        className={cn(
                                          "text-sm line-clamp-2",
                                          !isContentAvailable && "text-muted-foreground/70"
                                        )}
                                      >
                                        {lesson.description}
                                      </CardDescription>
                                    </div>
                                  </div>
                                  <div
                                    className={cn(
                                      "flex items-center gap-3 text-sm",
                                      !isContentAvailable
                                        ? "text-muted-foreground/60"
                                        : "text-muted-foreground"
                                    )}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <Clock className="w-3.5 h-3.5" />
                                      <span className="font-medium">{lesson.duration}分</span>
                                    </div>
                                    {lesson.slides > 0 && (
                                      <div className="flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5" />
                                        <span className="font-medium">{lesson.slides}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4">Cursor Learn</h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-2">
                    Cursor Learnへようこそ!
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    このコースでは、プログラマーがAIを効果的に活用する方法を学びます。
                    AIモデルやツールを使ったソフトウェア開発に焦点を当て、
                    機械学習やカスタムモデルのトレーニングではありません。
                    モデルの仕組み、種類、制限事項を理解することで、
                    AIをより効果的に活用できるようになります。
                  </p>
                </motion.div>

                {/* 動画プレイヤー部分は除外（プレースホルダーとして表示） */}
                <motion.div variants={itemVariants} className="mb-8">
                  <Card className="border-2 bg-muted/30">
                    <CardContent className="pt-6">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">動画コンテンツは今後追加予定です</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* アナロジー */}
                <motion.div variants={itemVariants}>
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>移動手段のアナロジー</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">
                        街を移動する方法には、いくつかの選択肢があります：
                      </p>
                      <ol className="space-y-3 list-decimal list-inside">
                        <li>
                          <strong>徒歩</strong>: 無料ですが、時間がかかります。
                        </li>
                        <li>
                          <strong>自転車</strong>: 少し費用がかかり、やや速いです。
                        </li>
                        <li>
                          <strong>自動車</strong>: 最も高額ですが、最も速いです。
                        </li>
                      </ol>
                      <p className="mt-4 text-muted-foreground">
                        AIモデルも同様に、コスト、速度、性能に応じていろいろな選択肢があります。
                        目的に応じて適切なモデルを選ぶことが重要です。
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
