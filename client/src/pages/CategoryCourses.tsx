/**
 * ジャンル別コース一覧ページ
 * 特定のジャンル（カテゴリ）のコース一覧を表示
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { courses } from "./Courses";

// ジャンルの表示名（適度な粒度）
const categoryLabels: Record<string, string> = {
  "基礎理論": "基礎理論編",
  "ツール": "ツール編",
  "技術": "技術編",
  "医療応用": "医療応用編",
  "法律倫理": "法律・倫理編",
  "研究": "研究編",
  "専門": "専門編",
};

// ジャンルの説明
const categoryDescriptions: Record<string, string> = {
  "基礎理論": "AIの基礎理論と概念を体系的に学びます。初心者向けの内容から始まり、AIの全体像を把握できます。",
  "ツール": "ChatGPT、Claude、GeminiなどのAIツールの実践的な使い方を学びます。医療現場で即座に活用できるスキルを習得します。",
  "技術": "AIの技術的な仕組みを深く理解します。機械学習、深層学習、API、プログラミングなど、技術的な側面を学びます。",
  "医療応用": "実際の医療現場でのAI活用方法を学びます。診断支援、論文執筆、症例報告、英語校正など、医療業務での実践的な活用を習得します。",
  "法律倫理": "医療AI利用における法的要件と倫理的配慮を学びます。個人情報保護法、医療法、著作権、研究倫理などを理解します。",
  "研究": "AI研究の方法論、論文の読み書き、データ分析を学びます。研究を効率的に進めるためのスキルを習得します。",
  "専門": "高度なAI技術と専門的な応用を学びます。システム構築、組織的な導入、最新のアーキテクチャなど、エキスパート向けの内容です。",
};

export default function CategoryCourses() {
  const [match, params] = useRoute("/courses/category/:category");
  const [, setLocation] = useLocation();
  const category = match ? params.category : null;

  const [courseProgress, setCourseProgress] = useState<Record<string, { completedLessons: string[] }>>({});

  // ローカルストレージから進捗を読み込む
  useEffect(() => {
    const progress: Record<string, { completedLessons: string[] }> = {};
    courses.forEach((course) => {
      const saved = localStorage.getItem(`course-progress-${course.id}`);
      if (saved) {
        try {
          progress[course.id] = JSON.parse(saved);
        } catch (e) {
          progress[course.id] = { completedLessons: [] };
        }
      } else {
        progress[course.id] = { completedLessons: [] };
      }
    });
    setCourseProgress(progress);
  }, []);

  if (!category || !categoryLabels[category]) {
    return (
      <Layout>
        <div className="container py-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <p className="text-muted-foreground mb-6">The category you are looking for does not exist.</p>
          <Button onClick={() => setLocation("/courses")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
        </div>
      </Layout>
    );
  }

  // このジャンルのコースを取得
  const categoryCourses = courses.filter((c) => c.category === category);

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getCourseProgress = (courseId: string) => {
    const progress = courseProgress[courseId];
    if (!progress) return { completed: 0, total: 0 };
    
    const course = courses.find((c) => c.id === courseId);
    const total = course?.lessons || 0;
    const completed = progress.completedLessons?.length || 0;
    
    return { completed, total };
  };

  // レベル別にグループ化
  const coursesByLevel = categoryCourses.reduce((acc, course) => {
    if (!acc[course.level]) {
      acc[course.level] = [];
    }
    acc[course.level].push(course);
    return acc;
  }, {} as Record<number, typeof categoryCourses>);

  const levelLabels: Record<number, string> = {
    1: "レベル1: 基礎編",
    2: "レベル2: 技術理解編",
    3: "レベル3: 実践編",
    4: "レベル4: 専門編",
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* ヘッダー */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => setLocation("/courses")}
            className="mb-8 -ml-2 text-neutral-600 hover:text-neutral-900 hover:bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> コース一覧に戻る
          </Button>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
              {categoryLabels[category]}
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-3xl">
              {categoryDescriptions[category]}
            </p>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <BookOpen className="w-4 h-4" />
              <span>{categoryCourses.length} コース</span>
            </div>
          </div>
        </motion.section>

        {/* コース一覧 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-12"
        >
          {[1, 2, 3, 4].map((level) => {
            const levelCourses = coursesByLevel[level] || [];
            if (levelCourses.length === 0) return null;

            return (
              <div key={level} className="space-y-6">
                <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wide">
                  {levelLabels[level]}
                </h2>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {levelCourses.map((course, index) => {
                    const { completed, total } = getCourseProgress(course.id);
                    const progress = getProgressPercentage(completed, total);
                    const isCompleted = completed === total;

                    return (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        <Card 
                          className={cn(
                            "h-full bg-white border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 rounded-lg",
                            "cursor-pointer"
                          )}
                          onClick={() => {
                            setLocation(`/courses/${course.id}`);
                          }}
                        >
                          <CardHeader className="p-5 pb-3">
                            <div className="flex items-start gap-3">
                              <div className="text-2xl flex-shrink-0">{course.badge}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <CardTitle className="text-base font-medium text-neutral-900 leading-snug">
                                    {course.title}
                                  </CardTitle>
                                  {isCompleted && (
                                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  )}

                                </div>
                                <CardDescription className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                                  {course.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="px-5 pb-5 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4 text-neutral-500">
                                <div className="flex items-center gap-1.5">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span className="text-xs">{course.lessons}</span>
                                </div>

                              </div>
                              <Badge variant="secondary" className="text-xs font-normal bg-neutral-100 text-neutral-600 hover:bg-neutral-100">
                                Lv.{course.level}
                              </Badge>
                            </div>

                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.section>
      </div>
    </Layout>
  );
}
