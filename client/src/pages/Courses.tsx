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
import { useGamification } from "@/hooks/useGamification";
import { BookOpen, Award, Star, CheckCircle2, Lock } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

// モックデータ: コース一覧
const courses = [
  {
    id: "ai-prompt-basics",
    title: "AIプロンプト基礎",
    description: "プロンプトの基本から実践まで、段階的に学習します",
    level: 1,
    lessons: 4,
    completedLessons: 0,
    xpReward: 40,
    badge: "🎉",
    locked: false,
  },
  {
    id: "diagnosis-prompts",
    title: "診断支援プロンプト",
    description: "診断支援に役立つプロンプトの使い方を学びます",
    level: 2,
    lessons: 3,
    completedLessons: 0,
    xpReward: 30,
    badge: "🏥",
    locked: false,
  },
  {
    id: "case-report-prompts",
    title: "症例報告プロンプト",
    description: "症例報告書作成に使えるプロンプトを学習します",
    level: 2,
    lessons: 3,
    completedLessons: 0,
    xpReward: 30,
    badge: "📋",
    locked: false,
  },
  {
    id: "advanced-prompts",
    title: "応用プロンプト",
    description: "複数プロンプトの組み合わせや高度な使い方",
    level: 3,
    lessons: 4,
    completedLessons: 0,
    xpReward: 40,
    badge: "⭐",
    locked: true,
  },
];

export default function Courses() {
  const [, setLocation] = useLocation();
  const { stats } = useGamification();

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <Layout>
      <div className="space-y-8 pb-24">
        {/* ヘッダー */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 py-8"
        >
          <h1 className="text-4xl font-bold tracking-tight">Learning Courses</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            各コースを完了するとバッジとXPを獲得できます。レベルアップを目指しましょう！
          </p>
        </motion.section>

        {/* 統計表示 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-6xl mx-auto px-4"
        >
          <GamificationStats
            totalXP={stats.totalXP}
            currentLevel={stats.currentLevel}
            totalLessonsCompleted={stats.totalLessonsCompleted}
            totalBadges={0}
          />
        </motion.section>

        {/* コース一覧 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 space-y-6"
        >
          <h2 className="text-2xl font-bold">Available Courses</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course, index) => {
              const progress = getProgressPercentage(course.completedLessons, course.lessons);
              const isCompleted = course.completedLessons === course.lessons;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={course.locked ? "opacity-60" : ""}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            {isCompleted && (
                              <Badge variant="default" className="bg-green-500">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                            {course.locked && (
                              <Badge variant="secondary">
                                <Lock className="w-3 h-3 mr-1" />
                                Locked
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{course.description}</CardDescription>
                        </div>
                        <div className="text-3xl">{course.badge}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{course.xpReward} XP</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>Level {course.level}</span>
                        </div>
                      </div>

                      {!course.locked && (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Progress</span>
                              <span>{course.completedLessons} / {course.lessons}</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <Button
                            className="w-full"
                            variant={isCompleted ? "outline" : "default"}
                            onClick={() => {
                              // TODO: コース詳細ページに遷移
                              setLocation(`/courses/${course.id}`);
                            }}
                          >
                            {isCompleted ? "Review Course" : "Start Learning"}
                          </Button>
                        </>
                      )}

                      {course.locked && (
                        <div className="text-sm text-muted-foreground text-center py-2">
                          Complete previous courses to unlock
                        </div>
                      )}
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
