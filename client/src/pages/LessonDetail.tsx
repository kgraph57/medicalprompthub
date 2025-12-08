/**
 * レッスン詳細ページ
 * Zenn風の読みやすいスクロール形式でレッスンコンテンツを表示
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Menu, X, ArrowRight } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Quiz } from "@/components/Quiz";
import { PracticeExercise, ExerciseResult } from "@/components/PracticeExercise";
import { lesson1Quizzes, lesson2Quizzes, lesson3Quizzes } from "@/data/courses/ai-basics/quizzes";
import { lesson1Exercises } from "@/data/courses/ai-basics/exercises";
import { useGamification } from "@/hooks/useGamification";

// レッスンコンテンツ（Markdownファイルから読み込み）
import lesson1Md from "@/data/courses/ai-basics/lesson-1.md?raw";
import lesson2Md from "@/data/courses/ai-basics/lesson-2.md?raw";
import lesson3Md from "@/data/courses/ai-basics/lesson-3.md?raw";

const lessonContent: Record<string, string> = {
  "ai-basics-1": lesson1Md,
  "ai-basics-2": lesson2Md,
  "ai-basics-3": lesson3Md,
};

// クイズデータ
const quizzesData: Record<string, typeof lesson1Quizzes> = {
  "ai-basics-1": lesson1Quizzes,
  "ai-basics-2": lesson2Quizzes,
  "ai-basics-3": lesson3Quizzes,
};

// 演習データ
const exercisesData: Record<string, typeof lesson1Exercises> = {
  "ai-basics-1": lesson1Exercises,
  "ai-basics-2": [],
  "ai-basics-3": [],
};

// セクションを抽出（## で区切る）
function extractSections(content: string): Array<{ id: string; title: string; level: number }> {
  const sections: Array<{ id: string; title: string; level: number }> = [];
  const lines = content.split("\n");
  let sectionIndex = 0;
  
  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      const title = line.replace(/^##\s+/, "").trim();
      const id = `section-${sectionIndex}`;
      sections.push({ id, title, level: 2 });
      sectionIndex++;
    } else if (line.startsWith("### ")) {
      const title = line.replace(/^###\s+/, "").trim();
      const id = `section-${sectionIndex}`;
      sections.push({ id, title, level: 3 });
      sectionIndex++;
    }
  });
  
  return sections;
}

// レッスンデータ（CourseDetail.tsxと同じ構造）
function getLessonsForCourse(courseId: string) {
  const lessonsData: Record<string, Array<{
    id: string;
    title: string;
  }>> = {
    "ai-basics": [
      { id: "ai-basics-1", title: "AIとは何か" },
      { id: "ai-basics-2", title: "AIの歴史" },
      { id: "ai-basics-3", title: "AIの現状と未来" },
    ],
    "generative-ai-basics": [
      { id: "generative-ai-1", title: "生成AIとは何か" },
      { id: "generative-ai-2", title: "生成AIの仕組み" },
      { id: "generative-ai-3", title: "主要な生成AIツール" },
    ],
    "ai-usage-basics": [
      { id: "ai-usage-1", title: "AIチャットの基本" },
      { id: "ai-usage-2", title: "効果的なプロンプトの書き方" },
      { id: "ai-usage-3", title: "AIとの対話のコツ" },
    ],
  };

  return lessonsData[courseId] || [];
}

export default function LessonDetail() {
  const [match, params] = useRoute("/courses/:courseId/lessons/:lessonId");
  const [, setLocation] = useLocation();
  const courseId = match ? params.courseId : null;
  const lessonId = match ? params.lessonId : null;

  const [completed, setCompleted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);
  const { addXP } = useGamification();

  // クイズと演習データを取得
  const quizzes = lessonId ? quizzesData[lessonId] || [] : [];
  const exercises = lessonId ? exercisesData[lessonId] || [] : [];

  // レッスンコンテンツを取得
  const content = lessonId ? lessonContent[lessonId] || "" : "";
  const sections = content ? extractSections(content) : [];

  // 次のレッスンを取得
  const getNextLesson = () => {
    if (!courseId || !lessonId) return null;
    const lessons = getLessonsForCourse(courseId);
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
      return lessons[currentIndex + 1];
    }
    return null;
  };

  const nextLesson = getNextLesson();

  // ローカルストレージから完了状態を読み込む
  useEffect(() => {
    if (lessonId) {
      const progressKey = `lesson-progress-${lessonId}`;
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        try {
          const progress = JSON.parse(saved);
          if (progress.completed) {
            setCompleted(true);
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }, [lessonId]);

  // スクロール位置に応じて進捗を更新
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);

      // アクティブなセクションを検出
      const sectionElements = element.querySelectorAll("h2[id], h3[id]");
      let currentSection = "";
      
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          currentSection = section.id;
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      handleScroll(); // 初期化
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [content]);

  // セクションへのジャンプ
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      const offset = 100; // ヘッダーの高さ分
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + contentRef.current.scrollTop - offset;
      
      contentRef.current.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsSidebarOpen(false);
  };

  // マークダウンコンテンツを処理（クイズと演習をインラインで配置）
  const renderContent = () => {
    if (!content) return null;

    // コンテンツを[QUIZ]と[EXERCISE]で分割
    const parts = content.split(/(\[QUIZ\]|\[EXERCISE\])/);
    const elements: React.ReactNode[] = [];
    let quizIndex = 0;
    let exerciseIndex = 0;
    let sectionIndex = 0;

    parts.forEach((part, index) => {
      if (part === "[QUIZ]" && quizzes.length > 0) {
        elements.push(
          <div key={`quiz-${quizIndex}`} className="my-12">
            <Quiz
              questions={quizzes}
              onComplete={(score, totalPoints) => {
                const percentage = Math.round((score / totalPoints) * 100);
                if (percentage >= 80) {
                  addXP(5, "クイズ80%以上正解");
                }
              }}
              showResults={true}
              allowRetry={true}
            />
          </div>
        );
        quizIndex++;
      } else if (part === "[EXERCISE]" && exercises.length > 0 && exerciseIndex < exercises.length) {
        elements.push(
          <div key={`exercise-${exerciseIndex}`} className="my-12">
            <PracticeExercise
              exercise={exercises[exerciseIndex]}
              onComplete={(result) => {
                addXP(3, "実践演習完了");
              }}
            />
          </div>
        );
        exerciseIndex++;
      } else if (part.trim()) {
        // Markdownコンテンツをレンダリング
        const markdownContent = part.trim();
        if (markdownContent) {
          elements.push(
            <div key={`content-${index}`} className="zenn-article">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold mb-6 mt-12 text-foreground scroll-mt-20" {...props} />
                  ),
                  h2: ({ node, ...props }) => {
                    const title = props.children?.toString() || "";
                    const id = `section-${sectionIndex}`;
                    sectionIndex++;
                    return (
                      <h2
                        id={id}
                        className="text-2xl font-bold mt-12 mb-6 text-foreground border-b border-border pb-3 scroll-mt-20"
                        {...props}
                      />
                    );
                  },
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold mt-10 mb-4 text-foreground scroll-mt-20" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-lg font-semibold mt-8 mb-3 text-foreground scroll-mt-20" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-6 text-foreground leading-[1.9]" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-foreground leading-[1.9]" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-foreground" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-muted p-5 rounded-lg overflow-x-auto my-6" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-border pl-4 italic my-6 text-muted-foreground leading-[1.9]" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="w-full border-collapse" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-border px-2 py-1.5 bg-muted font-semibold text-left text-xs" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-border px-2 py-1.5 text-xs" {...props} />
                  ),
                  img: ({ node, ...props }) => (
                    <img className="max-w-full h-auto my-6 rounded-lg" {...props} />
                  ),
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          );
        }
      }
    });

    return elements;
  };

  const handleComplete = () => {
    // レッスン完了を記録
    addXP(10, "レッスン完了");
    // ローカルストレージに進捗を保存
    const progressKey = `lesson-progress-${lessonId}`;
    localStorage.setItem(progressKey, JSON.stringify({ completed: true, completedAt: new Date().toISOString() }));
    
    // コースの進捗も更新
    const courseProgressKey = `course-progress-${courseId}`;
    const courseProgress = JSON.parse(localStorage.getItem(courseProgressKey) || "{}");
    const completedLessons = courseProgress.completedLessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem(courseProgressKey, JSON.stringify({
        ...courseProgress,
        completedLessons,
        lastUpdated: new Date().toISOString(),
      }));
    }
    
    setCompleted(true);
  };

  if (!courseId || !lessonId || !content) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson Not Found</h2>
          <p className="text-muted-foreground mb-6">The lesson you are looking for does not exist.</p>
          <Button onClick={() => setLocation(`/courses/${courseId || ""}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Course
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex bg-background">
        {/* サイドバー（目次）- デスクトップ */}
        <aside className="hidden lg:block w-64 border-r border-border bg-background/50 backdrop-blur-sm p-6 sticky top-0 h-screen overflow-y-auto">
          <div className="space-y-2">
            <h3 className="font-semibold text-xs uppercase text-muted-foreground mb-4 tracking-wider">目次</h3>
            {sections.map((section, index) => (
              <button
                key={`${section.id}-${index}`}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                style={{ 
                  paddingLeft: `${(section.level - 2) * 0.75 + 0.75}rem`,
                  fontSize: section.level === 3 ? "0.875rem" : "0.9375rem"
                }}
              >
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        {/* メインコンテンツ */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ヘッダー */}
          <header className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
            <div className="max-w-[680px] mx-auto px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* モバイル: サイドバートグル */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation(`/courses/${courseId}`)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> コースに戻る
                  </Button>
                </div>
                {completed && (
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold text-sm">完了</span>
                  </div>
                )}
              </div>
              <Progress value={scrollProgress} className="h-1" />
            </div>
          </header>

          {/* コンテンツエリア */}
          <div className="flex-1 overflow-y-auto" ref={contentRef}>
            <div className="max-w-[680px] mx-auto px-6 py-12">
              {completed ? (
                <Card className="text-center py-16 border-border">
                  <CardContent className="space-y-6">
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-3xl font-bold mb-4">レッスン完了！</h2>
                    <p className="text-muted-foreground text-lg">
                      おめでとうございます！このレッスンを完了しました。
                    </p>
                    <div className="flex items-center justify-center gap-2 text-primary mt-6">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-semibold">+10 XP 獲得</span>
                    </div>
                    <div className="flex justify-center pt-6">
                      <Button 
                        onClick={() => {
                          if (nextLesson) {
                            setLocation(`/courses/${courseId}/lessons/${nextLesson.id}`);
                          } else {
                            setLocation(`/courses/${courseId}`);
                          }
                        }}
                        size="lg"
                        className="min-w-[180px]"
                      >
                        <ArrowRight className="mr-2 h-4 w-4" />
                        次に進む
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Zenn風の記事コンテンツ */}
                  <article className="zenn-article bg-background rounded-lg">
                    {renderContent()}
                  </article>
                  
                  {/* 完了ボタン */}
                  <div className="mt-16 pt-8 border-t border-border">
                    <Button onClick={handleComplete} size="lg" className="w-full h-12 text-base">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      レッスンを完了する
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* モバイルサイドバー */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 h-full w-64 bg-background border-r border-border shadow-xl"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">目次</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                <div className="p-4 space-y-2">
                  {sections.map((section, index) => (
                    <button
                      key={`${section.id}-${index}`}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                      style={{ 
                        paddingLeft: `${(section.level - 2) * 0.75 + 0.75}rem`,
                        fontSize: section.level === 3 ? "0.875rem" : "0.9375rem"
                      }}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
}
