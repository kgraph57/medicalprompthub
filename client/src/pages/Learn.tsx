import { LearnNavBar } from "@/components/learn/LearnNavBar";
import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "wouter";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { ChevronRight, Lock, BookOpen, X, CheckCircle2, Link as LinkIcon, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { organizeCoursesIntoSections, learningPaths, getCoursesForPath, type LearnTopic } from "@/lib/course-mapper";
import { getLessonsForCourse } from "@/pages/CourseDetail";
import { hasLessonContent, getLessonContent } from "@/lib/lesson-content-loader";
import { UNIFIED_MARKDOWN_COMPONENTS } from "@/lib/markdownStyles";
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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["getting-started"]));
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const mainContentRef = useRef<HTMLElement>(null);
  
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
  
  // コースデータをHELIX Learn形式に変換
  const sections = organizeCoursesIntoSections();
  
  // レッスンが変更されたらスクロール位置をリセット
  useEffect(() => {
    if (selectedLessonId && mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [selectedLessonId]);


  useEffect(() => {
    updateSEO({
      title: "学習 | HELIX",
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
      if (lessonId) {
        setSelectedLessonId(lessonId);
      }
    } else {
      // URLパラメータがない場合、最初のコースの最初のレッスンを自動選択
      const firstSection = sections[0];
      if (firstSection && firstSection.topics.length > 0) {
        const firstTopic = firstSection.topics[0];
        if (!firstTopic.comingSoon) {
          const firstLessons = getLessonsForCourse(firstTopic.id);
          if (firstLessons.length > 0 && hasLessonContent(firstLessons[0].id)) {
            setSelectedCourseId(firstTopic.id);
            setSelectedLessonId(firstLessons[0].id);
            // URLも更新（履歴には追加しない）
            window.history.replaceState({}, '', `/learn?course=${firstTopic.id}&lesson=${firstLessons[0].id}`);
          }
        }
      }
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

  // 選択されたコースがあるセクションを自動展開
  useEffect(() => {
    if (selectedCourseId) {
      const sectionWithCourse = sections.find((section) =>
        section.topics.some((topic) => topic.id === selectedCourseId)
      );
      if (sectionWithCourse) {
        setExpandedSections((prev) => new Set([...prev, sectionWithCourse.id]));
      }
    }
  }, [selectedCourseId]);

  // セクションの展開/折りたたみをトグル
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  // 学習パスの展開/折りたたみをトグル
  const togglePath = (pathId: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(pathId)) {
        next.delete(pathId);
      } else {
        next.add(pathId);
      }
      return next;
    });
  };

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

  // コースの進捗を取得
  const getCourseProgress = (courseId: string) => {
    const saved = localStorage.getItem(`course-progress-${courseId}`);
    const courseLessons = getLessonsForCourse(courseId);
    const availableLessons = courseLessons.filter(l => hasLessonContent(l.id));
    const total = availableLessons.length;

    if (!saved || total === 0) return { completed: 0, total, percentage: 0 };

    try {
      const progress = JSON.parse(saved);
      const completed = availableLessons.filter(l =>
        progress.completedLessons?.includes(l.id)
      ).length;
      return {
        completed,
        total,
        percentage: Math.round((completed / total) * 100)
      };
    } catch {
      return { completed: 0, total, percentage: 0 };
    }
  };

  // 「はじめに」全体の進捗
  const getGettingStartedProgress = () => {
    const requiredCourses = ["ai-basics", "generative-ai-basics"];
    let totalCompleted = 0;
    let totalLessons = 0;

    requiredCourses.forEach(courseId => {
      const progress = getCourseProgress(courseId);
      totalCompleted += progress.completed;
      totalLessons += progress.total;
    });

    return {
      completed: totalCompleted,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0
    };
  };

  const gettingStartedProgress = getGettingStartedProgress();
  const isGettingStartedCompleted = gettingStartedProgress.percentage === 100;

  const SidebarContent = () => {
    return (
      <div className="p-3">
        {isMobile && (
          <div className="flex items-center justify-between h-12 px-1 border-b border-neutral-200 dark:border-neutral-700">
            <Link href="/">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">HELIX</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              aria-label="サイドバーを閉じる"
            >
              <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
        )}

        {/* はじめにセクション */}
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.id);

          return (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors duration-200"
              >
                <ChevronRight className={cn(
                  "w-3 h-3 text-neutral-400 dark:text-neutral-500 transition-transform flex-shrink-0",
                  isExpanded && "rotate-90"
                )} />
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex-1">
                  {section.title}
                </span>
                {/* 全体進捗表示 */}
                <span className={cn(
                  "text-xs font-medium",
                  gettingStartedProgress.percentage === 100 ? "text-blue-600 dark:text-blue-400" : "text-neutral-400 dark:text-neutral-500"
                )}>
                  {gettingStartedProgress.percentage}%
                </span>
              </button>

              {/* 全体進捗バー */}
              {isExpanded && (
                <div className="mx-2 mt-1 mb-2">
                  <div className="h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-200"
                      style={{ width: `${gettingStartedProgress.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {gettingStartedProgress.completed} / {gettingStartedProgress.total} レッスン完了
                  </p>
                </div>
              )}

              {isExpanded && (
                <ul className="mt-1 ml-2 space-y-0.5">
                  {section.topics.map((topic) => {
                    const isSelected = selectedCourseId === topic.id;
                    const topicLessons = getLessonsForCourse(topic.id);
                    const hasContent = topicLessons.some((l) => hasLessonContent(l.id));
                    const topicProgress = getCourseProgress(topic.id);

                    return (
                      <li key={topic.id}>
                        <button
                          onClick={() => {
                            if (!topic.comingSoon && hasContent) {
                              const firstLesson = topicLessons.find((l) => hasLessonContent(l.id));
                              if (firstLesson) {
                                setSelectedCourseId(topic.id);
                                setSelectedLessonId(firstLesson.id);
                                setLocation(`/learn?course=${topic.id}&lesson=${firstLesson.id}`);
                                if (isMobile) setIsSidebarOpen(false);
                              }
                            }
                          }}
                          disabled={topic.comingSoon || !hasContent}
                          className={cn(
                            "w-full text-left px-2 py-1.5 rounded text-sm transition-colors duration-200",
                            isSelected
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                              : topic.comingSoon || !hasContent
                              ? "text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          )}
                        >
                          <div className="flex items-center gap-1.5">
                            {topicProgress.percentage === 100 ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-300 dark:border-neutral-600 flex-shrink-0" />
                            )}
                            <span className="flex-1 text-sm leading-tight truncate">{topic.shortTitle}</span>
                            {(topic.comingSoon || !hasContent) && (
                              <Lock className="w-3 h-3 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                            )}
                          </div>
                          {/* コース進捗バー */}
                          {hasContent && topicProgress.total > 0 && (
                            <div className="mt-1 ml-5">
                              <div className="h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-200"
                                  style={{ width: `${topicProgress.percentage}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </button>

                        {isSelected && topicLessons.length > 0 && (
                          <ul className="ml-3 mt-0.5 space-y-0.5 border-l border-neutral-200 dark:border-neutral-700 pl-2">
                            {topicLessons.map((lesson, index) => {
                              const isLessonSelected = selectedLessonId === lesson.id;
                              const isContentAvailable = hasLessonContent(lesson.id);
                              const isCompleted = courseProgress.completedLessons?.includes(lesson.id) || false;

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
                                      "w-full text-left px-2 py-0.5 rounded text-xs transition-colors duration-200 flex items-center gap-1.5",
                                      isLessonSelected
                                        ? "bg-blue-600 dark:bg-blue-500 text-white"
                                        : !isContentAvailable
                                        ? "text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                                    )}
                                  >
                                    <span className={cn(
                                      "min-w-[16px]",
                                      isLessonSelected ? "text-white" : "text-neutral-400 dark:text-neutral-500"
                                    )}>
                                      {index + 1}.
                                    </span>
                                    <span className="flex-1 leading-tight truncate">{lesson.title}</span>
                                    {isCompleted && (
                                      <CheckCircle2 className={cn(
                                        "w-3 h-3 flex-shrink-0",
                                        isLessonSelected ? "text-white" : "text-blue-600 dark:text-blue-400"
                                      )} />
                                    )}
                                    {!isContentAvailable && (
                                      <Lock className="w-3 h-3 text-neutral-400 dark:text-neutral-500 flex-shrink-0" />
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {/* 次のステップ（はじめに完了後に表示） */}
        {isGettingStartedCompleted && (
          <div className="mb-2 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div className="px-2 py-1.5">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                次のステップ
              </span>
            </div>
            <ul className="mt-1 space-y-1">
              {learningPaths.map((path) => {
                const isPathExpanded = expandedPaths.has(path.id);
                const pathCourses = getCoursesForPath(path.id);

                return (
                  <li key={path.id}>
                    <button
                      onClick={() => togglePath(path.id)}
                      className="w-full text-left px-2 py-1.5 rounded text-sm transition-colors duration-200 flex items-center gap-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <ChevronRight className={cn(
                        "w-3 h-3 text-neutral-400 dark:text-neutral-500 transition-transform flex-shrink-0",
                        isPathExpanded && "rotate-90"
                      )} />
                      <div className="flex-1 min-w-0">
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium">{path.title}</span>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{path.description}</p>
                      </div>
                    </button>

                    {isPathExpanded && (
                      <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-neutral-200 dark:border-neutral-700 pl-2">
                        {pathCourses.map((topic) => {
                          const topicLessons = getLessonsForCourse(topic.id);
                          const hasContent = topicLessons.some((l) => hasLessonContent(l.id));
                          const isSelected = selectedCourseId === topic.id;

                          return (
                            <li key={topic.id}>
                              <button
                                onClick={() => {
                                  if (hasContent) {
                                    const firstLesson = topicLessons.find((l) => hasLessonContent(l.id));
                                    if (firstLesson) {
                                      setSelectedCourseId(topic.id);
                                      setSelectedLessonId(firstLesson.id);
                                      setLocation(`/learn?course=${topic.id}&lesson=${firstLesson.id}`);
                                      if (isMobile) setIsSidebarOpen(false);
                                    }
                                  }
                                }}
                                disabled={!hasContent}
                                className={cn(
                                  "w-full text-left px-2 py-0.5 rounded text-xs transition-colors duration-200",
                                  isSelected
                                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                                    : !hasContent
                                    ? "text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                )}
                              >
                                <span className="truncate">{topic.shortTitle}</span>
                                {!hasContent && <Lock className="w-3 h-3 text-neutral-400 dark:text-neutral-500 ml-1 inline" />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-neutral-900">
      {/* Cursor Learn風のクリーンなナビゲーションバー */}
      <LearnNavBar
        showMenuButton={isMobile}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* モバイル用オーバーレイ */}
        {isMobile && isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 dark:bg-black/50 z-40 transition-opacity duration-200"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}

        {/* 左サイドバー - Cursor Learn風クリーンデザイン */}
        <aside
          className={cn(
            "w-[240px] flex-shrink-0 border-r border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto transition-transform duration-200 z-50",
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

        {/* メインコンテンツエリア - クリーンなライトテーマ */}
        <main ref={mainContentRef} key={selectedLessonId || selectedCourseId || 'default'} className="flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
          {selectedTopic ? (
            <div key={selectedLessonId || selectedCourseId || 'default'} className="max-w-3xl mx-auto px-6 sm:px-8 py-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >

                {/* レッスン詳細表示 - Cursor Learn風 */}
                {selectedLessonId && selectedLesson && lessonContent && (
                  <div key={selectedLessonId}>
                {(() => {
                  const quizzes = selectedLessonId ? quizzesData[selectedLessonId] || [] : [];
                  
                  // コードブロックコンポーネント（コピー機能付き）
                  const CodeBlock = ({ children, ...props }: any) => {
                    const [copied, setCopied] = useState(false);
                    const codeText = String(children).replace(/\n$/, '');
                    
                    const handleCopy = async () => {
                      try {
                        await navigator.clipboard.writeText(codeText);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      } catch (err) {
                        console.error('Failed to copy code:', err);
                      }
                    };
                    
                    return (
                      <div className="my-4 relative group">
                        <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md overflow-hidden">
                          <div className="overflow-x-auto">
                            <code
                              className="block p-3 text-neutral-700 dark:text-neutral-300 text-sm font-mono leading-normal"
                              {...props}
                            >
                              {children}
                            </code>
                          </div>
                          <button
                            onClick={handleCopy}
                            className="absolute top-2 right-2 p-1 rounded bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                            aria-label="コードをコピー"
                          >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    );
                  };
                  
                  // コンテンツを[QUIZ]で分割
                  const parts = lessonContent.split(/(\[QUIZ\])/);
                  const elements: React.ReactNode[] = [];
                  let quizIndex = 0;
                  
                  return (
                    <motion.div variants={itemVariants} className="mb-6">
                      <div className="mb-8">
                        <h1 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100 tracking-tight">
                          {selectedLesson.title}
                        </h1>
                        {selectedLesson.description && (
                          <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
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

                          // 絵文字を削除（Cursor風のクリーンなデザインのため）
                          markdownContent = markdownContent.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{1F900}-\u{1F9FF}]|✅|✓|✔|🎯|📚|💡|⚠️|❌|❓|🔹|🔸|▶️|▸|►|🔍|📝|📌|🎓|🏆|🌟|⭐|★|☆|🔗|🔒|🔓|🔑|📊|📈|📉|🖼️|💻|🤖|🧠|🏥|💊|🩺|📋/gu, '');
                          
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

                            // 「このレッスンで学ぶこと」はスキップ（本文に自然に統合）
                            if (title.includes('このレッスンで学ぶこと') || title.includes('学ぶこと')) {
                              return null;
                            }

                            // 「図解スペース」「実践演習」などは非表示
                            if (title.includes('図解スペース') || title.includes('実践演習') || title.includes('実践課題') || title.includes('レッスン完了')) {
                              return null;
                            }

                            // 「まとめ」セクション
                            if (title.includes('まとめ')) {
                              return (
                                <div className="mt-10 mb-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                                  <h2
                                    id={id}
                                    className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight"
                                    {...props}
                                  >
                                    {props.children}
                                  </h2>
                                </div>
                              );
                            }

                            // 通常のセクション
                            return (
                              <h2
                                id={id}
                                className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mt-10 mb-4"
                                {...props}
                              >
                                {props.children}
                              </h2>
                            );
                          },
                          h3: ({ node, ...props }: any) => (
                            <h3 className="text-base font-medium mt-8 mb-3 text-neutral-900 dark:text-neutral-100 tracking-tight" {...props} />
                          ),
                          p: ({ node, ...props }: any) => (
                            <p className="text-[15px] mb-4 leading-[1.75] text-neutral-600 dark:text-neutral-400" {...props} />
                          ),
                          ul: ({ node, ...props }: any) => (
                            <ul className="my-4 space-y-2 text-neutral-600 dark:text-neutral-400" {...props} />
                          ),
                          ol: ({ node, ...props }: any) => (
                            <ol className="list-decimal pl-5 my-4 space-y-2 text-neutral-600 dark:text-neutral-400 text-[15px]" {...props} />
                          ),
                          li: ({ node, ...props }: any) => (
                            <li className="text-[15px] leading-[1.75] pl-1" {...props} />
                          ),
                          strong: ({ node, ...props }: any) => (
                            <strong className="font-medium text-neutral-900 dark:text-neutral-100" {...props} />
                          ),
                          code: ({ node, inline, className, children, ...props }: any) => {
                            if (inline) {
                              return (
                                <code
                                  className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[0.9em]"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            }

                            return <CodeBlock {...props}>{children}</CodeBlock>;
                          },
                          blockquote: ({ node, ...props }: any) => (
                            <blockquote className="my-4 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700 text-[15px] text-neutral-500 dark:text-neutral-400 leading-[1.75]" {...props} />
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
                        <div className="mt-12 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                          <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-2">Next</p>
                          <Link
                            to={`/learn?course=${selectedCourseId}&lesson=${nextLesson.id}`}
                            className="group flex items-center justify-between py-2 -mx-2 px-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
                            onClick={() => handleLessonClick(nextLesson.id)}
                          >
                            <span className="text-neutral-900 dark:text-neutral-100 font-medium text-sm">{nextLesson.title}</span>
                            <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })()}
                  </div>
                )}

              </motion.div>
            </div>
          ) : (
            /* フォールバック: 通常は自動的に最初のレッスンが表示される */
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
                <p className="text-lg font-medium text-neutral-500 dark:text-neutral-400">左のサイドバーからコースを選択してください</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
