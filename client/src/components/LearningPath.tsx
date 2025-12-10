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
    <div className="space-y-2">
      <div>
        <h2 className="text-sm font-bold mb-0.5">推奨学習パス</h2>
        <p className="text-xs text-muted-foreground">
          効率的に学習を進めるための推奨順序です。基礎から実践、そして専門へと段階的に進めましょう。
        </p>
      </div>

      <div className="space-y-1.5">
        {recommendedPath.map((path, pathIndex) => {
          if (path.courses.length === 0) return null;

          return (
            <motion.div
              key={pathIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pathIndex * 0.1 }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
                    {path.level}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{path.title}</h3>
                    <p className="text-xs text-muted-foreground">{path.description}</p>
                  </div>
                </div>

                <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3 pl-6">
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
                          <CardHeader className="pb-1 p-1.5">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <CardTitle className="text-xs">{course.title}</CardTitle>
                                  {isCurrent && (
                                    <Badge variant="default" className="text-[8px]">
                                      現在
                                    </Badge>
                                  )}
                                  {isLocked && (
                                    <Badge variant="secondary" className="text-[8px]">
                                      <Lock className="w-2.5 h-2.5 mr-0.5" />
                                      Locked
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription className="text-[10px] line-clamp-1">
                                  {course.description}
                                </CardDescription>
                              </div>
                              <div className="text-lg ml-1">{course.badge}</div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0 pb-1 p-1.5">
                            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
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
                  <div className="flex justify-center py-1 pl-8">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
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


