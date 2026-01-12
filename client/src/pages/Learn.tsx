import { Layout } from "@/components/Layout";
import { LearnNavBar } from "@/components/learn/LearnNavBar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { ChevronRight, Lock, BookOpen, Menu, X, CheckCircle2, Construction, Clock, FileText, Link as LinkIcon } from "lucide-react";
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
import { Quiz } from "@/components/Quiz";
import { SimpleQuiz } from "@/components/learn/SimpleQuiz";
import { TokenizerDemo } from "@/components/learn/TokenizerDemo";
import { lesson1Quizzes, lesson2Quizzes, lesson3Quizzes, lesson4Quizzes, lesson5Quizzes, lesson6Quizzes, lesson7Quizzes, lesson8Quizzes } from "@/data/courses/ai-basics/quizzes";
import { lesson1Quizzes as genAiLesson1Quizzes, lesson2Quizzes as genAiLesson2Quizzes, lesson3Quizzes as genAiLesson3Quizzes, lesson4Quizzes as genAiLesson4Quizzes, lesson5Quizzes as genAiLesson5Quizzes, lesson6Quizzes as genAiLesson6Quizzes, lesson7Quizzes as genAiLesson7Quizzes, lesson8Quizzes as genAiLesson8Quizzes, lesson9Quizzes as genAiLesson9Quizzes } from "@/data/courses/generative-ai-basics/quizzes";

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
  const sectionCounterRef = useRef(1);
  
  // クイズデータ
  const quizzesData: Record<string, typeof lesson1Quizzes> = {
    // ai-basicsコース
    "ai-basics-1": lesson1Quizzes,
    "ai-basics-2": lesson2Quizzes,
    "ai-basics-3": lesson3Quizzes,
    "ai-basics-4": lesson4Quizzes,
    "ai-basics-5": lesson5Quizzes,
    "ai-basics-6": lesson6Quizzes,
    "ai-basics-7": lesson7Quizzes,
    "ai-basics-8": lesson8Quizzes,
    // generative-ai-basicsコース
    "generative-ai-1": genAiLesson1Quizzes,
    "generative-ai-2": genAiLesson2Quizzes,
    "generative-ai-3": genAiLesson3Quizzes,
    "generative-ai-4": genAiLesson4Quizzes,
    "generative-ai-5": genAiLesson5Quizzes,
    "generative-ai-6": genAiLesson6Quizzes,
    "generative-ai-7": genAiLesson7Quizzes,
    "generative-ai-8": genAiLesson8Quizzes,
    "generative-ai-9": genAiLesson9Quizzes,
  };
  
  // コースデータをHelix Learn形式に変換
  const sections = organizeCoursesIntoSections();
  
  // レッスンが変更されたらセクションカウンターをリセット
  useEffect(() => {
    if (selectedLessonId) {
      sectionCounterRef.current = 1;
    }
  }, [selectedLessonId]);

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
    // コースが選択されている場合は、そのコースのレッスン一覧のみを表示
    if (selectedCourseId && lessons.length > 0) {
      return (
        <div className="p-4">
          {isMobile && (
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                レッスン
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="サイドバーを閉じる"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          )}
          
          <div className="mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {selectedTopic?.title || "レッスン"}
            </h3>
          </div>
          
          <ul className="space-y-0">
            {lessons.map((lesson, index) => {
              const isCompleted = courseProgress.completedLessons?.includes(lesson.id) || false;
              const isContentAvailable = hasLessonContent(lesson.id);
              const isSelected = selectedLessonId === lesson.id;
              
              return (
                <li key={lesson.id}>
                  <button
                    onClick={() => {
                      if (isContentAvailable) {
                        handleLessonClick(lesson.id);
                      }
                    }}
                    disabled={!isContentAvailable}
                    className={cn(
                      "w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex items-center gap-2 group",
                      isSelected
                        ? "bg-primary-500 text-white font-medium"
                        : !isContentAvailable
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span className={cn(
                      "text-xs min-w-[18px]",
                      isSelected ? "text-white" : "text-gray-500"
                    )}>
                      {index + 1}.
                    </span>
                    <span className="flex-1 text-left text-sm leading-tight">{lesson.title}</span>
                    {isCompleted && (
                      <CheckCircle2 className={cn(
                        "w-3 h-3 flex-shrink-0",
                        isSelected ? "text-white" : "text-green-600"
                      )} />
                    )}
                    {!isContentAvailable && (
                      <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    )}
                    {isSelected && (
                      <ChevronRight className="w-3 h-3 text-white flex-shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    
    // コースが選択されていない場合は、コース一覧を表示（シンプルに）
    return (
      <div className="p-4">
        {isMobile && (
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              コース
            </h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded hover:bg-gray-100"
              aria-label="サイドバーを閉じる"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
        
        {/* 最初の2つのコースのみを表示（シンプルに） */}
        {sections.slice(0, 1).map((section) => {
          // AI基礎セクションの最初の2つのコースのみを表示
          const displayTopics = section.topics.slice(0, 2);
          
          return (
            <div key={section.id} className="mb-6">
              <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
                {section.title}
              </h3>
              <ul className="space-y-0">
                {displayTopics.map((topic, index) => {
                  return (
                    <li key={topic.id}>
                      <button
                        onClick={() => handleCourseClick(topic)}
                        disabled={topic.comingSoon}
                        className={cn(
                          "w-full text-left px-2 py-1.5 rounded text-sm transition-colors flex items-center gap-2 group",
                          selectedCourseId === topic.id
                            ? "bg-primary-500 text-white font-medium"
                            : topic.comingSoon
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                      >
                        <span className={cn(
                          "text-xs min-w-[18px]",
                          selectedCourseId === topic.id ? "text-white" : "text-gray-500"
                        )}>
                          {index + 1}.
                        </span>
                        <span className="flex-1 text-left text-sm leading-tight">{topic.title}</span>
                        {topic.comingSoon && (
                          <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        )}
                        {selectedCourseId === topic.id && (
                          <ChevronRight className="w-3 h-3 text-white flex-shrink-0" />
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
      {/* Helix Learn風のトップナビゲーションバー */}
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

        {/* 左サイドバー - Cursor Learn風（約200px幅） */}
        <aside
          className={cn(
            "w-[200px] flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto transition-transform duration-300 z-50",
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

        {/* メインコンテンツエリア - Helix Learn風 */}
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
            <div className="max-w-3xl mx-auto px-8 py-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <Button
                    variant="ghost"
                    onClick={selectedLessonId ? handleBackToCourse : handleBackToList}
                    className="mb-6 text-gray-600 hover:text-gray-900 -ml-2"
                  >
                    ← {selectedLessonId ? "コースに戻る" : "一覧に戻る"}
                  </Button>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {selectedTopic.category || "AI基礎"}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">
                    {selectedTopic.title}
                  </h1>
                  {selectedTopic.description && (
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                      {selectedTopic.description}
                    </p>
                  )}
                </motion.div>

                {/* レッスン詳細表示 - Cursor Learn風 */}
                {selectedLessonId && selectedLesson && lessonContent && (() => {
                  const quizzes = selectedLessonId ? quizzesData[selectedLessonId] || [] : [];
                  
                  // コンテンツを[QUIZ]で分割
                  const parts = lessonContent.split(/(\[QUIZ\])/);
                  const elements: React.ReactNode[] = [];
                  let quizIndex = 0;
                  
                  return (
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
                      {parts.map((part, index) => {
                        if (part === "[QUIZ]" && quizzes.length > 0 && quizIndex < quizzes.length) {
                          const currentQuiz = quizzes[quizIndex];
                          quizIndex++;
                          return (
                            <div key={`quiz-${quizIndex}`} className="my-8">
                              <Quiz
                                questions={[currentQuiz]}
                                showResults={true}
                                allowRetry={true}
                              />
                            </div>
                          );
                        } else if (part === "[TOKENIZER]") {
                          return (
                            <div key={`tokenizer-${index}`} className="my-8">
                              <TokenizerDemo />
                            </div>
                          );
                        } else if (part === "[SIMPLE_QUIZ]" && quizzes.length > 0 && quizIndex < quizzes.length) {
                          const currentQuiz = quizzes[quizIndex];
                          quizIndex++;
                          // 既存のQuizQuestionをSimpleQuizQuestionに変換
                          if (currentQuiz.type === "multiple_choice" && currentQuiz.options) {
                            const simpleQuiz = {
                              question: currentQuiz.question,
                              options: currentQuiz.options,
                              correctAnswer: typeof currentQuiz.correctAnswer === "string" 
                                ? currentQuiz.correctAnswer.toLowerCase() 
                                : "a",
                              explanation: currentQuiz.explanation,
                            };
                            return (
                              <div key={`simple-quiz-${quizIndex}`} className="my-8">
                                <SimpleQuiz question={simpleQuiz} />
                              </div>
                            );
                          }
                        } else if (part.trim()) {
                          // Markdownコンテンツをレンダリング
                          let markdownContent = part.trim();
                          
                          // 最初のパートの場合、Markdownの最初のh1を削除
                          if (index === 0 || (index === 2 && parts[0].trim() === "")) {
                            const lines = markdownContent.split('\n');
                            if (lines.length > 0 && lines[0].trim().startsWith('# ')) {
                              markdownContent = lines.slice(1).join('\n');
                            }
                          }
                          
                          return (
                            <div key={`content-${index}`} className="prose prose-lg max-w-none">
                              <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        components={{
                          ...UNIFIED_MARKDOWN_COMPONENTS,
                          h2: ({ node, ...props }: any) => {
                            const title = typeof props.children === 'string' 
                              ? props.children 
                              : props.children?.toString() || '';
                            const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                            
                            // セクション番号をインクリメント（レンダリング順序に基づく）
                            const currentSectionNumber = sectionCounterRef.current;
                            sectionCounterRef.current += 1;
                            
                            const copyLink = () => {
                              const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${id}`;
                              navigator.clipboard.writeText(url);
                            };
                            
                            return (
                              <div className="my-8 border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50/50">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex-shrink-0">
                                    {currentSectionNumber}
                                  </div>
                                  <h2
                                    id={id}
                                    className="text-2xl font-bold text-gray-900 tracking-tight flex-1"
                                    {...props}
                                  >
                                    {props.children}
                                  </h2>
                                  <button
                                    onClick={copyLink}
                                    className="p-1.5 rounded hover:bg-gray-200 transition-colors flex-shrink-0"
                                    aria-label="セクションへのリンクをコピー"
                                    title="リンクをコピー"
                                  >
                                    <LinkIcon className="w-4 h-4 text-gray-500" />
                                  </button>
                                </div>
                              </div>
                            );
                          },
                          h3: ({ node, ...props }: any) => (
                            <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 tracking-tight" {...props} />
                          ),
                          p: ({ node, ...props }: any) => (
                            <p className="text-base text-gray-700 leading-relaxed my-4" {...props} />
                          ),
                          ul: ({ node, ...props }: any) => (
                            <ul className="list-disc pl-6 my-4 space-y-2 text-gray-700" {...props} />
                          ),
                          ol: ({ node, ...props }: any) => (
                            <ol className="list-decimal pl-6 my-4 space-y-2 text-gray-700" {...props} />
                          ),
                          strong: ({ node, ...props }: any) => (
                            <strong className="font-semibold text-gray-900" {...props} />
                          ),
                          code: ({ node, inline, className, children, ...props }: any) => {
                            if (inline) {
                              return (
                                <code
                                  className="px-1.5 py-0.5 rounded bg-primary-50 text-primary-700 font-mono text-sm"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            }
                            return (
                              <div className="my-6 overflow-x-auto">
                                <code
                                  className="block p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono"
                                  {...props}
                                >
                                  {children}
                                </code>
                              </div>
                            );
                          },
                          blockquote: ({ node, ...props }: any) => (
                            <blockquote className="border-l-4 border-primary-500 bg-primary-50 pl-4 py-2 my-6 italic text-gray-700" {...props} />
                          ),
                        }}
                      >
                        {markdownContent}
                      </ReactMarkdown>
                            </div>
                          );
                        }
                        return null;
                      })}
                      {/* レッスン完了時の表示 */}
                      {nextLesson && (
                        <div className="mt-12">
                          <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <p className="text-gray-900 mb-4 text-center">この章を完了しました</p>
                            <div className="flex justify-center">
                              <Button
                                onClick={() => handleLessonClick(nextLesson.id)}
                                className="bg-primary-500 hover:bg-primary-600 text-white"
                              >
                                次のレッスンに進む
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })()}

                {/* レッスン一覧 - Helix Learn風 */}
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
                                  : "hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer",
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
                                          : "bg-primary-100 text-primary-600"
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
            <div className="max-w-3xl mx-auto px-8 py-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-12">
                  <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
                    Helix Learn
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-2">
                    Helix Learnへようこそ!
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                    このコースでは、プログラマーがAIを効果的に活用する方法を学びます。
                    AIモデルやツールを使ったソフトウェア開発に焦点を当て、
                    機械学習やカスタムモデルのトレーニングではありません。
                    モデルの仕組み、種類、制限事項を理解することで、
                    AIをより効果的に活用できるようになります。
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-3 text-gray-900">このコースで学べること</h2>
                      <ul className="space-y-2 text-gray-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span><strong className="text-gray-900">AIモデルの基礎理解</strong>: トークン、コンテキスト、ハルシネーション、モデルの種類と特徴を理解します</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span><strong className="text-gray-900">実践的な活用方法</strong>: プロンプトエンジニアリング、ツール呼び出し、エージェントの使い方を実践的に学びます</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span><strong className="text-gray-900">コストとパフォーマンス</strong>: トークンと料金の仕組み、モデルの選択基準、コスト最適化を理解します</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span><strong className="text-gray-900">実践的なツール活用</strong>: ChatGPT、Claude、Geminiなどの主要AIツールの特徴と使い分け方を学びます</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-3 text-gray-900">コースの構成</h2>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        このコースは、基礎から応用まで段階的に学習できるよう設計されています。
                        各レッスンには、理論的な説明、実践的なデモ、理解度を確認するクイズが含まれています。
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-2">AI基礎</h3>
                          <p className="text-sm text-gray-600">
                            AIモデルの仕組み、トークン、コンテキスト、ハルシネーションなど、AIを使う上で知っておくべき基礎を学びます
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-2">実践ツール</h3>
                          <p className="text-sm text-gray-600">
                            ChatGPT、Claude、Geminiなどの主要AIツールの特徴と使い分け方を実践的に学びます
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-2">高度な活用</h3>
                          <p className="text-sm text-gray-600">
                            ツール呼び出し、エージェント、RAG、Fine-tuningなど、より高度な活用方法を学びます
                          </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-2">最適化とコスト</h3>
                          <p className="text-sm text-gray-600">
                            トークンと料金の仕組み、モデルの選択基準、コスト最適化の方法を理解します
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-3 text-gray-900">前提知識</h2>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        このコースは、プログラミングの基礎知識があることを前提としていますが、
                        AIや機械学習の専門知識は必要ありません。
                      </p>
                      <ul className="space-y-2 text-gray-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>基本的なプログラミング経験（任意の言語）</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>ソフトウェア開発の基礎知識</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>AIや機械学習の専門知識は不要です</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-3 text-gray-900">学習方法</h2>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        このコースは、インタラクティブな学習体験を提供します：
                      </p>
                      <ol className="space-y-3 list-decimal list-inside text-gray-600 leading-relaxed">
                        <li>
                          <strong className="text-gray-900">理論的な説明</strong>: 各概念を段階的に説明し、理解を深めます
                        </li>
                        <li>
                          <strong className="text-gray-900">実践的なデモ</strong>: トークナイザーなどのインタラクティブなデモで、抽象的な概念を可視化します
                        </li>
                        <li>
                          <strong className="text-gray-900">理解度の確認</strong>: 各セクションの最後にクイズで理解度を確認します
                        </li>
                        <li>
                          <strong className="text-gray-900">実践的な演習</strong>: 実際のプロジェクトで使えるスキルを身につけます
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-3 text-gray-900">期待される成果</h2>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        このコースを完了すると、以下のことができるようになります：
                      </p>
                      <ul className="space-y-2 text-gray-600 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>AIモデルの仕組みと制限事項を理解し、適切なモデルを選択できる</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>効果的なプロンプトを書いて、AIツールを最大限に活用できる</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>トークンと料金の仕組みを理解し、コストを最適化できる</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>ツール呼び出しやエージェントなど、高度な機能を活用できる</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary-500 mt-1">•</span>
                          <span>実際のプロジェクトでAIを効果的に統合できる</span>
                        </li>
                      </ul>
                    </div>
                  </div>
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
                <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">移動手段のアナロジー</h3>
                  <p className="mb-4 text-gray-900 leading-relaxed">
                    街を移動する方法には、いくつかの選択肢があります：
                  </p>
                  <ol className="space-y-3 list-decimal list-inside text-gray-900 mb-4 pl-0">
                    <li className="pl-0">
                      <strong className="text-gray-900">徒歩</strong>: 無料ですが、時間がかかります。
                    </li>
                    <li className="pl-0">
                      <strong className="text-gray-900">自転車</strong>: 少し費用がかかり、やや速いです。
                    </li>
                    <li className="pl-0">
                      <strong className="text-gray-900">自動車</strong>: 最も高額ですが、最も速いです。
                    </li>
                  </ol>
                  <p className="text-gray-900 leading-relaxed">
                    AIモデルも同様に、コスト、速度、性能に応じていろいろな選択肢があります。目的に応じて適切なモデルを選ぶことが重要です。
                  </p>
                </motion.div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
