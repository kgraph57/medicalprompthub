import { Layout } from "@/components/Layout";
import { LearnNavBar } from "@/components/learn/LearnNavBar";
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
import { hasLessonContent, getLessonContent } from "@/lib/lesson-content-loader";
import { UNIFIED_PROSE_CLASSES, UNIFIED_MARKDOWN_COMPONENTS } from "@/lib/markdownStyles";
import { ArrowRight } from "lucide-react";

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

  // 選択されたレッスンのコンテンツを取得
  const selectedLesson = selectedLessonId
    ? lessons.find((lesson) => lesson.id === selectedLessonId)
    : null;
  const lessonContent = selectedLessonId ? getLessonContent(selectedLessonId) : null;

  // 次のレッスンを取得
  const getNextLesson = () => {
    if (!selectedCourseId || !selectedLessonId) return null;
    const currentIndex = lessons.findIndex((l) => l.id === selectedLessonId);
    if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
      return lessons[currentIndex + 1];
    }
    return null;
  };

  const nextLesson = getNextLesson();

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
      <div className="p-6">
        {isMobile && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              学習トピック
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100"
              aria-label="サイドバーを閉じる"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
        
        {sections.map((section) => {
          const sectionStartIndex = globalIndex;
          return (
            <div key={section.id} className="mb-8">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
              <ul className="space-y-0.5">
                {section.topics.map((topic, index) => {
                  const topicIndex = sectionStartIndex + index + 1;
                  globalIndex++;
                  return (
                    <li key={topic.id}>
                      <button
                        onClick={() => handleCourseClick(topic)}
                        disabled={topic.comingSoon}
                        className={cn(
                          "w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex items-center gap-2 group",
                          selectedCourseId === topic.id
                            ? "bg-orange-50 text-gray-900 font-medium"
                            : topic.comingSoon
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <span className="text-xs text-gray-500 group-hover:text-gray-700 min-w-[20px]">
                          {topicIndex}.
                        </span>
                        <span className="flex-1 text-left">{topic.title}</span>
                        {topic.comingSoon && (
                          <Lock className="w-3 h-3 text-gray-400" />
                        )}
                        {selectedCourseId === topic.id && (
                          <ChevronRight className="w-3 h-3 text-gray-600" />
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
    <div className="flex flex-col h-screen bg-white">
      {/* Cursor Learn風のトップナビゲーションバー */}
      <LearnNavBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* モバイル用オーバーレイ */}
        {isMobile && isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}

        {/* 左サイドバー - Cursor Learn風 */}
        <aside
          className={cn(
            "w-64 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto transition-transform duration-300 z-50",
            isMobile
              ? cn(
                  "fixed left-0 top-14 bottom-0",
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )
              : "relative"
          )}
        >
          <SidebarContent />
        </aside>

        {/* メインコンテンツエリア - Cursor Learn風 */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* モバイル用サイドバートグルボタン */}
          {isMobile && (
            <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-2">
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
            <div className="max-w-4xl mx-auto px-8 py-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <Button
                    variant="ghost"
                    onClick={selectedLessonId ? handleBackToCourse : handleBackToList}
                    className="mb-6 text-gray-600 hover:text-gray-900"
                  >
                    ← {selectedLessonId ? "コースに戻る" : "一覧に戻る"}
                  </Button>
                  <h1 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">
                    {selectedTopic.title}
                  </h1>
                  {selectedTopic.description && (
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      {selectedTopic.description}
                    </p>
                  )}
                </motion.div>

                {/* レッスン詳細表示 - Cursor Learn風 */}
                {selectedLessonId && selectedLesson && lessonContent && (
                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold mb-4 text-gray-900 tracking-tight">
                        {selectedLesson.title}
                      </h2>
                      {selectedLesson.description && (
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                          {selectedLesson.description}
                        </p>
                      )}
                    </div>
                    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-orange-600 prose-code:bg-orange-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        components={UNIFIED_MARKDOWN_COMPONENTS}
                      >
                        {lessonContent}
                      </ReactMarkdown>
                    </div>
                    {/* 次のレッスンへのナビゲーション */}
                    {nextLesson && (
                      <div className="mt-12 pt-8 border-t border-gray-200">
                        <Button
                          onClick={() => handleLessonClick(nextLesson.id)}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          次のレッスン: {nextLesson.title}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* レッスン一覧 - Cursor Learn風 */}
                {!selectedLessonId && lessons.length > 0 && (
                  <motion.div variants={itemVariants} className="mb-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">レッスン一覧</h2>
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
                                  : "hover:shadow-md hover:border-orange-200 transition-all duration-200 cursor-pointer",
                                "border border-gray-200 bg-white"
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
                                        "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
                                        !isContentAvailable
                                          ? "bg-gray-100 text-gray-400"
                                          : "bg-orange-100 text-orange-600"
                                      )}
                                    >
                                      {index + 1}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        <CardTitle
                                          className={cn(
                                            "text-base font-semibold text-gray-900",
                                            !isContentAvailable && "text-gray-400"
                                          )}
                                        >
                                          {lesson.title}
                                        </CardTitle>
                                        {isCompleted && (
                                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        )}
                                        {!isContentAvailable && (
                                          <Construction className="w-4 h-4 text-gray-400" />
                                        )}
                                      </div>
                                      <CardDescription
                                        className={cn(
                                          "text-sm line-clamp-2 text-gray-600",
                                          !isContentAvailable && "text-gray-400"
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
                                        ? "text-gray-400"
                                        : "text-gray-500"
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
            <div className="max-w-4xl mx-auto px-8 py-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-12">
                  <h1 className="text-5xl font-bold mb-6 text-gray-900 tracking-tight">
                    Cursor Learn
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    Cursor Learnへようこそ!
                  </p>
                  <p className="text-gray-700 leading-relaxed text-base">
                    このコースでは、プログラマーがAIを効果的に活用する方法を学びます。
                    AIモデルやツールを使ったソフトウェア開発に焦点を当て、
                    機械学習やカスタムモデルのトレーニングではありません。
                    モデルの仕組み、種類、制限事項を理解することで、
                    AIをより効果的に活用できるようになります。
                  </p>
                </motion.div>

                {/* 動画プレイヤー部分は除外（プレースホルダーとして表示） */}
                <motion.div variants={itemVariants} className="mb-12">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="text-center text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">動画コンテンツは今後追加予定です</p>
                    </div>
                  </div>
                </motion.div>

                {/* アナロジー - Cursor Learn風 */}
                <motion.div variants={itemVariants}>
                  <div className="border border-gray-200 rounded-lg p-6 bg-white">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">移動手段のアナロジー</h3>
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      街を移動する方法には、いくつかの選択肢があります：
                    </p>
                    <ol className="space-y-3 list-decimal list-inside mb-4 text-gray-700">
                      <li>
                        <strong className="text-gray-900">徒歩</strong>: 無料ですが、時間がかかります。
                      </li>
                      <li>
                        <strong className="text-gray-900">自転車</strong>: 少し費用がかかり、やや速いです。
                      </li>
                      <li>
                        <strong className="text-gray-900">自動車</strong>: 最も高額ですが、最も速いです。
                      </li>
                    </ol>
                    <p className="text-gray-700 leading-relaxed">
                      AIモデルも同様に、コスト、速度、性能に応じていろいろな選択肢があります。
                      目的に応じて適切なモデルを選ぶことが重要です。
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
