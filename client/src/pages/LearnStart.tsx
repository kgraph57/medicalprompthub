/**
 * 学習開始ページ - コースジャンル選択
 * ヒーローから遷移し、学習パスを選択する
 */

import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  Stethoscope,
  Brain,
  FileText,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { learningPaths } from "@/lib/course-mapper";
import { getLessonsForCourse } from "@/pages/CourseDetail";
import { hasLessonContent } from "@/lib/lesson-content-loader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// パスごとのアイコン（配色は統一して控えめに）
const pathStyles: Record<string, { icon: typeof BookOpen }> = {
  "getting-started": { icon: Sparkles },
  "ai-tools": { icon: BookOpen },
  "medical-ai": { icon: Stethoscope },
  "deep-theory": { icon: Brain },
  "research": { icon: FileText },
};

// 「はじめに」の進捗をチェック
const getGettingStartedProgress = () => {
  const requiredCourses = ["ai-basics", "generative-ai-basics"];
  let totalCompleted = 0;
  let totalLessons = 0;

  requiredCourses.forEach(courseId => {
    const saved = localStorage.getItem(`course-progress-${courseId}`);
    const courseLessons = getLessonsForCourse(courseId);
    const availableLessons = courseLessons.filter(l => hasLessonContent(l.id));
    totalLessons += availableLessons.length;

    if (saved) {
      try {
        const progress = JSON.parse(saved);
        totalCompleted += availableLessons.filter(l =>
          progress.completedLessons?.includes(l.id)
        ).length;
      } catch {
        // ignore
      }
    }
  });

  return {
    completed: totalCompleted,
    total: totalLessons,
    percentage: totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0
  };
};

export default function LearnStart() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    updateSEO({
      title: "学習を始める | HELIX",
      description: "あなたの目的に合った学習パスを選んで、AIの基礎から実践まで学びましょう",
      path: "/learn/start",
    });
  }, []);

  const gettingStartedProgress = getGettingStartedProgress();
  const isGettingStartedCompleted = gettingStartedProgress.percentage === 100;

  const handleStartGettingStarted = () => {
    // 「はじめに」の最初のレッスンに遷移
    setLocation("/learn?course=ai-basics&lesson=ai-basics-1");
  };

  const handleSelectPath = (pathId: string) => {
    // 学習パスの最初のコースに遷移（コンテンツがあれば）
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return;

    // コンテンツがあるコースを探す
    for (const courseId of path.courseIds) {
      const lessons = getLessonsForCourse(courseId);
      const firstLesson = lessons.find(l => hasLessonContent(l.id));
      if (firstLesson) {
        setLocation(`/learn?course=${courseId}&lesson=${firstLesson.id}`);
        return;
      }
    }

    // コンテンツがない場合は学習ページへ
    setLocation("/learn");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">HELIX</span>
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* タイトル */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 px-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-3 sm:mb-4">
              学習を始めましょう
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto break-words">
              あなたの目的に合った学習パスを選んでください。
              {!isGettingStartedCompleted && "まずは「はじめに」から始めることをおすすめします。"}
            </p>
          </motion.div>

          {/* 推奨: はじめに */}
          <motion.div variants={itemVariants} className="mb-8">
            <button
              onClick={handleStartGettingStarted}
              className="w-full p-4 sm:p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors text-left min-h-[44px] touch-manipulation"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 shrink-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">はじめに</h2>
                    <span className="px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-700 rounded">
                      推奨
                    </span>
                    {isGettingStartedCompleted && (
                      <CheckCircle2 className="w-5 h-5 text-neutral-500" />
                    )}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 break-words">
                    AIの基礎と生成AIの仕組みを学ぶ、最初の2コース
                  </p>
                  {/* 進捗バー */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1 min-w-0 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300 rounded-full"
                        style={{ width: `${gettingStartedProgress.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tabular-nums">
                      {gettingStartedProgress.percentage}%
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-1" aria-hidden />
              </div>
            </button>
          </motion.div>

          {/* 区切り線 */}
          {isGettingStartedCompleted && (
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">次のステップを選ぶ</span>
              <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
            </motion.div>
          )}

          {/* 学習パス一覧 */}
          {isGettingStartedCompleted && (
            <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {learningPaths.map((path) => {
                const style = pathStyles[path.id] ?? pathStyles["ai-tools"];
                const Icon = style.icon;

                return (
                  <button
                    key={path.id}
                    onClick={() => handleSelectPath(path.id)}
                    className="p-4 sm:p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 active:bg-neutral-100 dark:active:bg-neutral-800 transition-colors text-left min-h-[44px] touch-manipulation"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 sm:p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 shrink-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1 text-left">{path.title}</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 text-left">{path.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0 mt-1" aria-hidden />
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* 未完了時のヒント */}
          {!isGettingStartedCompleted && (
            <motion.div variants={itemVariants} className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-lg bg-neutral-50/80 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center break-words">
                「はじめに」を完了すると、さらに多くの学習パスが表示されます
              </p>
            </motion.div>
          )}

          {/* 直接学習ページへ */}
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8 text-center">
            <Link
              href="/learn"
              className="inline-block py-3 px-4 -my-1 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors touch-manipulation"
            >
              すべてのコースを見る →
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
