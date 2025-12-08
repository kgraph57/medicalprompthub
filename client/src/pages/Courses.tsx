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

// コース一覧（AI初心者から上級者まで）
const courses = [
  // レベル1: AI基礎編（初心者向け）
  {
    id: "ai-basics",
    title: "AIとは何か",
    description: "AIの基本概念と歴史を理解し、AIの全体像を把握します",
    level: 1,
    lessons: 3,
    completedLessons: 0,
    xpReward: 30,
    badge: "🎓",
    category: "基礎",
    locked: false,
  },
  {
    id: "generative-ai-basics",
    title: "生成AIとは",
    description: "生成AIの仕組みと特徴を理解し、主要なツールを知ります",
    level: 1,
    lessons: 3,
    completedLessons: 0,
    xpReward: 30,
    badge: "🤖",
    category: "基礎",
    locked: false,
  },
  {
    id: "ai-usage-basics",
    title: "AIの使い方基礎",
    description: "実際にAIを使い始めるための基本操作と対話のコツを学びます",
    level: 1,
    lessons: 3,
    completedLessons: 0,
    xpReward: 40,
    badge: "💬",
    category: "基礎",
    locked: false,
  },
  // レベル2: 技術理解編（中級者向け）
  {
    id: "api-basics",
    title: "APIとは",
    description: "APIの基本概念とAI APIの仕組み、実用例を学びます",
    level: 2,
    lessons: 3,
    completedLessons: 0,
    xpReward: 40,
    badge: "🔌",
    category: "技術",
    locked: true, // 基礎編完了後にアンロック
  },
  {
    id: "mcp-basics",
    title: "MCPとは",
    description: "MCP（Model Context Protocol）の仕組みと活用方法を理解します",
    level: 2,
    lessons: 3,
    completedLessons: 0,
    xpReward: 40,
    badge: "🔗",
    category: "技術",
    locked: true,
  },
  // レベル3: 実践編（上級者向け）
  {
    id: "prompt-engineering",
    title: "プロンプトエンジニアリング基礎",
    description: "効果的なプロンプトを書くためのテクニックと実践例を学びます",
    level: 3,
    lessons: 3,
    completedLessons: 0,
    xpReward: 50,
    badge: "✍️",
    category: "実践",
    locked: true,
  },
  {
    id: "medical-ai-practice",
    title: "医療AI活用実践",
    description: "医療現場でAIを効果的に活用する方法と注意点を学びます",
    level: 3,
    lessons: 3,
    completedLessons: 0,
    xpReward: 50,
    badge: "🏥",
    category: "実践",
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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Available Courses</h2>
            <div className="text-sm text-muted-foreground">
              {courses.filter(c => !c.locked).length} / {courses.length} unlocked
            </div>
          </div>
          
          {/* レベル1: 基礎編 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">レベル1: 基礎編（初心者向け）</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(c => c.level === 1).map((course, index) => {
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
          </div>

          {/* レベル2: 技術理解編 */}
          <div className="space-y-4 pt-8">
            <h3 className="text-lg font-semibold text-muted-foreground">レベル2: 技術理解編（中級者向け）</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.filter(c => c.level === 2).map((course, index) => {
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
          </div>

          {/* レベル3: 実践編 */}
          <div className="space-y-4 pt-8">
            <h3 className="text-lg font-semibold text-muted-foreground">レベル3: 実践編（上級者向け）</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {courses.filter(c => c.level === 3).map((course, index) => {
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
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
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
