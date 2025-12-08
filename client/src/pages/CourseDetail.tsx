/**
 * コース詳細ページ
 * コース情報とレッスン一覧を表示
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, CheckCircle2, Lock, Star, Award, Clock, FileText } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// コースデータ（Courses.tsxから共有）
const courses = [
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
];

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:id");
  const [, setLocation] = useLocation();
  const courseId = match ? params.id : null;
  const course = courses.find((c) => c.id === courseId);

  // ローカルストレージから進捗を読み込む
  const [courseProgress, setCourseProgress] = useState<{ completedLessons: string[] }>(() => {
    if (!courseId) return { completedLessons: [] };
    const saved = localStorage.getItem(`course-progress-${courseId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return { completedLessons: [] };
      }
    }
    return { completedLessons: [] };
  });

  useEffect(() => {
    // 進捗を定期的に更新
    if (courseId) {
      const saved = localStorage.getItem(`course-progress-${courseId}`);
      if (saved) {
        try {
          setCourseProgress(JSON.parse(saved));
        } catch (e) {
          // ignore
        }
      }
    }
  }, [courseId]);

  if (!course) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">The course you are looking for does not exist.</p>
          <Button onClick={() => setLocation("/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
        </div>
      </Layout>
    );
  }

  // モックデータ: レッスン一覧（実際のデータは後でデータベースから取得）
  const lessons = getLessonsForCourse(courseId || "");

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => courseProgress.completedLessons?.includes(l.id)).length;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <Layout>
      <div className="space-y-4 pb-12">
        {/* ヘッダー */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-4"
        >
          <Button
            variant="ghost"
            onClick={() => setLocation("/courses")}
            className="mb-3 h-8 text-xs"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Back to Courses
          </Button>

          <div className="flex items-start gap-4">
            <div className="text-4xl">{course.badge}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <Badge variant="secondary" className="text-[10px]">Level {course.level}</Badge>
              </div>
              <p className="text-base text-muted-foreground">{course.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>約 {totalLessons * 10} 分</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{course.xpReward} XP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>バッジ: {course.badge}</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Course Progress</span>
                  <span>{completedLessons} / {totalLessons} completed</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* レッスン一覧 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-6xl mx-auto px-4 space-y-2"
        >
          <h2 className="text-xl font-bold">Lessons</h2>
          <div className="space-y-2">
            {lessons.map((lesson, index) => {
              const isCompleted = courseProgress.completedLessons?.includes(lesson.id) || false;
              const isLocked = index > 0 && !courseProgress.completedLessons?.includes(lessons[index - 1].id);

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className={isLocked ? "opacity-60" : "hover:shadow-md transition-shadow"}>
                    <CardHeader className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs">
                              {index + 1}
                            </div>
                            <CardTitle className="text-base">{lesson.title}</CardTitle>
                            {isCompleted && (
                              <Badge variant="default" className="bg-green-500 text-[10px]">
                                <CheckCircle2 className="w-3 h-3 mr-0.5" />
                                Completed
                              </Badge>
                            )}
                            {isLocked && (
                              <Badge variant="secondary" className="text-[10px]">
                                <Lock className="w-3 h-3 mr-0.5" />
                                Locked
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">{lesson.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lesson.duration} 分</span>
                          </div>
                          {lesson.slides > 0 && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              <span>{lesson.slides} slides</span>
                            </div>
                          )}
                        </div>
                        <Button
                          variant={isCompleted ? "outline" : "default"}
                          disabled={isLocked}
                          onClick={() => {
                            if (!isLocked) {
                              setLocation(`/courses/${courseId}/lessons/${lesson.id}`);
                            }
                          }}
                          className="h-8 text-xs"
                        >
                          {isCompleted ? "Review" : isLocked ? "Locked" : "Start"}
                        </Button>
                      </div>
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

// レッスンデータ（モック、後でデータベースから取得）
function getLessonsForCourse(courseId: string) {
  const lessonsData: Record<string, Array<{
    id: string;
    title: string;
    description: string;
    duration: number;
    slides: number;
    completed: boolean;
  }>> = {
    "ai-basics": [
      {
        id: "ai-basics-1",
        title: "AIとは何か",
        description: "AIの定義、人間の知能との違い、AIの種類について学びます",
        duration: 10,
        slides: 5,
        completed: false,
      },
      {
        id: "ai-basics-2",
        title: "AIの歴史",
        description: "1950年代から現在までのAIの発展の歴史をたどります",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-basics-3",
        title: "AIの現状と未来",
        description: "現在のAIの能力、医療分野での活用例、今後の展望を学びます",
        duration: 12,
        slides: 6,
        completed: false,
      },
    ],
    "generative-ai-basics": [
      {
        id: "generative-ai-1",
        title: "生成AIとは何か",
        description: "生成AIの定義、従来のAIとの違い、生成AIの種類について学びます",
        duration: 10,
        slides: 5,
        completed: false,
      },
      {
        id: "generative-ai-2",
        title: "生成AIの仕組み",
        description: "大規模言語モデル（LLM）、学習プロセス、トークンとコンテキストについて学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "generative-ai-3",
        title: "主要な生成AIツール",
        description: "ChatGPT、Claude、Gemini、医療特化型AIなどの主要ツールを紹介します",
        duration: 12,
        slides: 6,
        completed: false,
      },
    ],
    "ai-usage-basics": [
      {
        id: "ai-usage-1",
        title: "AIチャットの基本",
        description: "チャットインターフェースの使い方、質問の仕方、回答の評価方法を学びます",
        duration: 10,
        slides: 5,
        completed: false,
      },
      {
        id: "ai-usage-2",
        title: "効果的なプロンプトの書き方",
        description: "プロンプトとは何か、良いプロンプトと悪いプロンプトの違い、基本的なテクニックを学びます",
        duration: 15,
        slides: 8,
        completed: false,
      },
      {
        id: "ai-usage-3",
        title: "AIとの対話のコツ",
        description: "段階的な質問、コンテキストの提供、回答の改善方法を学びます",
        duration: 12,
        slides: 6,
        completed: false,
      },
    ],
  };

  return lessonsData[courseId] || [];
}
