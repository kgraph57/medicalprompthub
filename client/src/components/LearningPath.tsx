/**
 * 学習パスコンポーネント
 * 推奨される学習順序を表示
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { courses } from "@/pages/Courses";
import { cn } from "@/lib/utils";

interface LearningPathProps {
  currentCourseId?: string;
}

export function LearningPath({ currentCourseId }: LearningPathProps) {
  const [, setLocation] = useLocation();

  // 推奨される学習パス
  const recommendedPath = [
    {
      level: 1,
      title: "基礎理論編",
      courses: courses.filter(c => c.category === "基礎理論" && c.level === 1),
      description: "AIの基礎を理解する",
    },
    {
      level: 2,
      title: "ツール編",
      courses: courses.filter(c => c.category === "ツール" && c.level === 1),
      description: "実践的なツールの使い方を学ぶ",
    },
    {
      level: 3,
      title: "医療応用編",
      courses: courses.filter(c => c.category === "医療応用" && c.level <= 2),
      description: "医療現場での実践的な活用",
    },
    {
      level: 4,
      title: "技術編",
      courses: courses.filter(c => c.category === "技術" && c.level === 2),
      description: "より深い技術的理解",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">推奨学習パス</h2>
        <p className="text-muted-foreground">
          効率的に学習を進めるための推奨順序です。基礎から実践、そして専門へと段階的に進めましょう。
        </p>
      </div>

      <div className="space-y-8">
        {recommendedPath.map((path, pathIndex) => {
          if (path.courses.length === 0) return null;

          return (
            <motion.div
              key={pathIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pathIndex * 0.1 }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    {path.level}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{path.title}</h3>
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 pl-14">
                  {path.courses.map((course, courseIndex) => {
                    const isCurrent = course.id === currentCourseId;
                    const isLocked = course.locked;

                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pathIndex * 0.1 + courseIndex * 0.05 }}
                      >
                        <Card
                          className={cn(
                            "hover:shadow-md transition-all cursor-pointer",
                            isCurrent && "ring-2 ring-primary",
                            isLocked && "opacity-60"
                          )}
                          onClick={() => {
                            if (!isLocked) {
                              setLocation(`/courses/${course.id}`);
                            }
                          }}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <CardTitle className="text-base">{course.title}</CardTitle>
                                  {isCurrent && (
                                    <Badge variant="default" className="text-xs">
                                      現在
                                    </Badge>
                                  )}
                                  {isLocked && (
                                    <Badge variant="secondary" className="text-xs">
                                      <Lock className="w-3 h-3 mr-1" />
                                      Locked
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription className="text-xs line-clamp-2">
                                  {course.description}
                                </CardDescription>
                              </div>
                              <div className="text-2xl ml-2">{course.badge}</div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{course.lessons} レッスン</span>
                              <span>{course.xpReward} XP</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {pathIndex < recommendedPath.length - 1 && (
                  <div className="flex justify-center py-4 pl-14">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
