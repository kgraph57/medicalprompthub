/**
 * レッスン詳細ページ
 * Zenn風の読みやすいスクロール形式でレッスンコンテンツを表示
 */

import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UNIFIED_PROSE_CLASSES, UNIFIED_MARKDOWN_COMPONENTS } from "@/lib/markdownStyles.tsx";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, ArrowRight, Clock, FileText, BookOpen } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Quiz } from "@/components/Quiz";
import { PracticeTips } from "@/components/PracticeTips";
import { lesson1Quizzes, lesson2Quizzes, lesson3Quizzes, lesson4Quizzes, lesson5Quizzes, lesson6Quizzes, lesson7Quizzes, lesson8Quizzes } from "@/data/courses/ai-basics/quizzes";
import { lesson1Tips } from "@/data/courses/ai-basics/tips";
import { useGamification } from "@/hooks/useGamification";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";
import { fastStorage } from "@/lib/fastJsonStorage";

// レッスンコンテンツ（Markdownファイルから読み込み）
// ai-basicsコース
import aiBasicsLesson1Md from "@/data/courses/ai-basics/lesson-1.md?raw";
import aiBasicsLesson2Md from "@/data/courses/ai-basics/lesson-2.md?raw";
import aiBasicsLesson3Md from "@/data/courses/ai-basics/lesson-3.md?raw";
import aiBasicsLesson4Md from "@/data/courses/ai-basics/lesson-4.md?raw";
import aiBasicsLesson5Md from "@/data/courses/ai-basics/lesson-5.md?raw";
import aiBasicsLesson6Md from "@/data/courses/ai-basics/lesson-6.md?raw";
import aiBasicsLesson7Md from "@/data/courses/ai-basics/lesson-7.md?raw";
import aiBasicsLesson8Md from "@/data/courses/ai-basics/lesson-8.md?raw";

// generative-ai-basicsコース
import genAiLesson1Md from "@/data/courses/generative-ai-basics/lesson-1.md?raw";
import genAiLesson2Md from "@/data/courses/generative-ai-basics/lesson-2.md?raw";
import genAiLesson3Md from "@/data/courses/generative-ai-basics/lesson-3.md?raw";
import genAiLesson4Md from "@/data/courses/generative-ai-basics/lesson-4.md?raw";
import genAiLesson5Md from "@/data/courses/generative-ai-basics/lesson-5.md?raw";
import genAiLesson6Md from "@/data/courses/generative-ai-basics/lesson-6.md?raw";
import genAiLesson7Md from "@/data/courses/generative-ai-basics/lesson-7.md?raw";
import genAiLesson8Md from "@/data/courses/generative-ai-basics/lesson-8.md?raw";
import genAiLesson9Md from "@/data/courses/generative-ai-basics/lesson-9.md?raw";

// ai-usage-basicsコース
import aiUsageLesson1Md from "@/data/courses/ai-usage-basics/lesson-1.md?raw";
import aiUsageLesson2Md from "@/data/courses/ai-usage-basics/lesson-2.md?raw";
import aiUsageLesson3Md from "@/data/courses/ai-usage-basics/lesson-3.md?raw";
import aiUsageLesson4Md from "@/data/courses/ai-usage-basics/lesson-4.md?raw";
import aiUsageLesson5Md from "@/data/courses/ai-usage-basics/lesson-5.md?raw";
import aiUsageLesson6Md from "@/data/courses/ai-usage-basics/lesson-6.md?raw";
import aiUsageLesson7Md from "@/data/courses/ai-usage-basics/lesson-7.md?raw";

// chatgpt-practiceコース
import chatgptLesson1Md from "@/data/courses/chatgpt-practice/lesson-1.md?raw";
import chatgptLesson2Md from "@/data/courses/chatgpt-practice/lesson-2.md?raw";
import chatgptLesson3Md from "@/data/courses/chatgpt-practice/lesson-3.md?raw";
import chatgptLesson4Md from "@/data/courses/chatgpt-practice/lesson-4.md?raw";
import chatgptLesson5Md from "@/data/courses/chatgpt-practice/lesson-5.md?raw";
import chatgptLesson6Md from "@/data/courses/chatgpt-practice/lesson-6.md?raw";
import chatgptLesson7Md from "@/data/courses/chatgpt-practice/lesson-7.md?raw";
import chatgptLesson8Md from "@/data/courses/chatgpt-practice/lesson-8.md?raw";

// claude-practiceコース
import claudeLesson1Md from "@/data/courses/claude-practice/lesson-1.md?raw";
import claudeLesson2Md from "@/data/courses/claude-practice/lesson-2.md?raw";
import claudeLesson3Md from "@/data/courses/claude-practice/lesson-3.md?raw";
import claudeLesson4Md from "@/data/courses/claude-practice/lesson-4.md?raw";
import claudeLesson5Md from "@/data/courses/claude-practice/lesson-5.md?raw";
import claudeLesson6Md from "@/data/courses/claude-practice/lesson-6.md?raw";
import claudeLesson7Md from "@/data/courses/claude-practice/lesson-7.md?raw";

// medical-ai-overviewコース
import medicalAiLesson1Md from "@/data/courses/medical-ai-overview/lesson-1.md?raw";
import medicalAiLesson2Md from "@/data/courses/medical-ai-overview/lesson-2.md?raw";
import medicalAiLesson3Md from "@/data/courses/medical-ai-overview/lesson-3.md?raw";
import medicalAiLesson4Md from "@/data/courses/medical-ai-overview/lesson-4.md?raw";
import medicalAiLesson5Md from "@/data/courses/medical-ai-overview/lesson-5.md?raw";
import medicalAiLesson6Md from "@/data/courses/medical-ai-overview/lesson-6.md?raw";
import medicalAiLesson7Md from "@/data/courses/medical-ai-overview/lesson-7.md?raw";

// prompt-engineering-basicsコース
import promptEngLesson1Md from "@/data/courses/prompt-engineering-basics/lesson-1.md?raw";
import promptEngLesson2Md from "@/data/courses/prompt-engineering-basics/lesson-2.md?raw";
import promptEngLesson3Md from "@/data/courses/prompt-engineering-basics/lesson-3.md?raw";
import promptEngLesson4Md from "@/data/courses/prompt-engineering-basics/lesson-4.md?raw";
import promptEngLesson5Md from "@/data/courses/prompt-engineering-basics/lesson-5.md?raw";

// gemini-practiceコース
import geminiLesson1Md from "@/data/courses/gemini-practice/lesson-1.md?raw";
import geminiLesson2Md from "@/data/courses/gemini-practice/lesson-2.md?raw";
import geminiLesson3Md from "@/data/courses/gemini-practice/lesson-3.md?raw";
import geminiLesson4Md from "@/data/courses/gemini-practice/lesson-4.md?raw";
import geminiLesson5Md from "@/data/courses/gemini-practice/lesson-5.md?raw";
import geminiLesson6Md from "@/data/courses/gemini-practice/lesson-6.md?raw";
import geminiLesson7Md from "@/data/courses/gemini-practice/lesson-7.md?raw";

// medical-ai-tools-practiceコース
import medicalToolsLesson1Md from "@/data/courses/medical-ai-tools-practice/lesson-1.md?raw";
import medicalToolsLesson2Md from "@/data/courses/medical-ai-tools-practice/lesson-2.md?raw";
import medicalToolsLesson3Md from "@/data/courses/medical-ai-tools-practice/lesson-3.md?raw";
import medicalToolsLesson4Md from "@/data/courses/medical-ai-tools-practice/lesson-4.md?raw";
import medicalToolsLesson5Md from "@/data/courses/medical-ai-tools-practice/lesson-5.md?raw";
import medicalToolsLesson6Md from "@/data/courses/medical-ai-tools-practice/lesson-6.md?raw";

// paper-writing-supportコース
import paperSupportLesson1Md from "@/data/courses/paper-writing-support/lesson-1.md?raw";
import paperSupportLesson2Md from "@/data/courses/paper-writing-support/lesson-2.md?raw";
import paperSupportLesson3Md from "@/data/courses/paper-writing-support/lesson-3.md?raw";
import paperSupportLesson4Md from "@/data/courses/paper-writing-support/lesson-4.md?raw";
import paperSupportLesson5Md from "@/data/courses/paper-writing-support/lesson-5.md?raw";

// case-report-supportコース
import caseSupportLesson1Md from "@/data/courses/case-report-support/lesson-1.md?raw";
import caseSupportLesson2Md from "@/data/courses/case-report-support/lesson-2.md?raw";
import caseSupportLesson3Md from "@/data/courses/case-report-support/lesson-3.md?raw";
import caseSupportLesson4Md from "@/data/courses/case-report-support/lesson-4.md?raw";

// diagnostic-supportコース
import diagnosticLesson1Md from "@/data/courses/diagnostic-support/lesson-1.md?raw";
import diagnosticLesson2Md from "@/data/courses/diagnostic-support/lesson-2.md?raw";
import diagnosticLesson3Md from "@/data/courses/diagnostic-support/lesson-3.md?raw";
import diagnosticLesson4Md from "@/data/courses/diagnostic-support/lesson-4.md?raw";

// medical-english-proofreadingコース
import proofreadingLesson1Md from "@/data/courses/medical-english-proofreading/lesson-1.md?raw";
import proofreadingLesson2Md from "@/data/courses/medical-english-proofreading/lesson-2.md?raw";
import proofreadingLesson3Md from "@/data/courses/medical-english-proofreading/lesson-3.md?raw";
import proofreadingLesson4Md from "@/data/courses/medical-english-proofreading/lesson-4.md?raw";

// literature-review-supportコース
import litReviewLesson1Md from "@/data/courses/literature-review-support/lesson-1.md?raw";
import litReviewLesson2Md from "@/data/courses/literature-review-support/lesson-2.md?raw";
import litReviewLesson3Md from "@/data/courses/literature-review-support/lesson-3.md?raw";
import litReviewLesson4Md from "@/data/courses/literature-review-support/lesson-4.md?raw";

// advanced-prompt-techniquesコース
import advancedPromptLesson1Md from "@/data/courses/advanced-prompt-techniques/lesson-1.md?raw";
import advancedPromptLesson2Md from "@/data/courses/advanced-prompt-techniques/lesson-2.md?raw";

// machine-learning-fundamentalsコース
import mlFundamentalsLesson1Md from "@/data/courses/machine-learning-fundamentals/lesson-1.md?raw";
import mlFundamentalsLesson2Md from "@/data/courses/machine-learning-fundamentals/lesson-2.md?raw";
import mlFundamentalsLesson3Md from "@/data/courses/machine-learning-fundamentals/lesson-3.md?raw";
import mlFundamentalsLesson4Md from "@/data/courses/machine-learning-fundamentals/lesson-4.md?raw";
import mlFundamentalsLesson5Md from "@/data/courses/machine-learning-fundamentals/lesson-5.md?raw";
import mlFundamentalsLesson6Md from "@/data/courses/machine-learning-fundamentals/lesson-6.md?raw";
import mlFundamentalsLesson7Md from "@/data/courses/machine-learning-fundamentals/lesson-7.md?raw";
import mlFundamentalsLesson8Md from "@/data/courses/machine-learning-fundamentals/lesson-8.md?raw";

// deep-learning-basicsコース
import dlBasicsLesson1Md from "@/data/courses/deep-learning-basics/lesson-1.md?raw";
import dlBasicsLesson2Md from "@/data/courses/deep-learning-basics/lesson-2.md?raw";
import dlBasicsLesson3Md from "@/data/courses/deep-learning-basics/lesson-3.md?raw";
import dlBasicsLesson4Md from "@/data/courses/deep-learning-basics/lesson-4.md?raw";
import dlBasicsLesson5Md from "@/data/courses/deep-learning-basics/lesson-5.md?raw";
import dlBasicsLesson6Md from "@/data/courses/deep-learning-basics/lesson-6.md?raw";
import dlBasicsLesson7Md from "@/data/courses/deep-learning-basics/lesson-7.md?raw";
import dlBasicsLesson8Md from "@/data/courses/deep-learning-basics/lesson-8.md?raw";

// ai-tools-comparisonコース
import aiToolsLesson1Md from "@/data/courses/ai-tools-comparison/lesson-1.md?raw";
import aiToolsLesson2Md from "@/data/courses/ai-tools-comparison/lesson-2.md?raw";
import aiToolsLesson3Md from "@/data/courses/ai-tools-comparison/lesson-3.md?raw";
import aiToolsLesson4Md from "@/data/courses/ai-tools-comparison/lesson-4.md?raw";
import aiToolsLesson5Md from "@/data/courses/ai-tools-comparison/lesson-5.md?raw";

const lessonContent: Record<string, string> = {
  // ai-basicsコース
  "ai-basics-1": aiBasicsLesson1Md,
  "ai-basics-2": aiBasicsLesson2Md,
  "ai-basics-3": aiBasicsLesson3Md,
  "ai-basics-4": aiBasicsLesson4Md,
  "ai-basics-5": aiBasicsLesson5Md,
  "ai-basics-6": aiBasicsLesson6Md,
  "ai-basics-7": aiBasicsLesson7Md,
  "ai-basics-8": aiBasicsLesson8Md,
  // generative-ai-basicsコース
  "generative-ai-1": genAiLesson1Md,
  "generative-ai-2": genAiLesson2Md,
  "generative-ai-3": genAiLesson3Md,
  "generative-ai-4": genAiLesson4Md,
  "generative-ai-5": genAiLesson5Md,
  "generative-ai-6": genAiLesson6Md,
  "generative-ai-7": genAiLesson7Md,
  "generative-ai-8": genAiLesson8Md,
  "generative-ai-9": genAiLesson9Md,
  // ai-usage-basicsコース
  "ai-usage-1": aiUsageLesson1Md,
  "ai-usage-2": aiUsageLesson2Md,
  "ai-usage-3": aiUsageLesson3Md,
  "ai-usage-4": aiUsageLesson4Md,
  "ai-usage-5": aiUsageLesson5Md,
  "ai-usage-6": aiUsageLesson6Md,
  "ai-usage-7": aiUsageLesson7Md,
  // chatgpt-practiceコース
  "chatgpt-1": chatgptLesson1Md,
  "chatgpt-2": chatgptLesson2Md,
  "chatgpt-3": chatgptLesson3Md,
  "chatgpt-4": chatgptLesson4Md,
  "chatgpt-5": chatgptLesson5Md,
  "chatgpt-6": chatgptLesson6Md,
  "chatgpt-7": chatgptLesson7Md,
  "chatgpt-8": chatgptLesson8Md,
  // claude-practiceコース
  "claude-1": claudeLesson1Md,
  "claude-2": claudeLesson2Md,
  "claude-3": claudeLesson3Md,
  "claude-4": claudeLesson4Md,
  "claude-5": claudeLesson5Md,
  "claude-6": claudeLesson6Md,
  "claude-7": claudeLesson7Md,
  // medical-ai-overviewコース
  "medical-ai-1": medicalAiLesson1Md,
  "medical-ai-2": medicalAiLesson2Md,
  "medical-ai-3": medicalAiLesson3Md,
  "medical-ai-4": medicalAiLesson4Md,
  "medical-ai-5": medicalAiLesson5Md,
  "medical-ai-6": medicalAiLesson6Md,
  "medical-ai-7": medicalAiLesson7Md,
  // prompt-engineering-basicsコース
  "prompt-eng-1": promptEngLesson1Md,
  "prompt-eng-2": promptEngLesson2Md,
  "prompt-eng-3": promptEngLesson3Md,
  "prompt-eng-4": promptEngLesson4Md,
  "prompt-eng-5": promptEngLesson5Md,
  // gemini-practiceコース
  "gemini-1": geminiLesson1Md,
  "gemini-2": geminiLesson2Md,
  "gemini-3": geminiLesson3Md,
  "gemini-4": geminiLesson4Md,
  "gemini-5": geminiLesson5Md,
  "gemini-6": geminiLesson6Md,
  "gemini-7": geminiLesson7Md,
  // medical-ai-tools-practiceコース
  "medical-tools-1": medicalToolsLesson1Md,
  "medical-tools-2": medicalToolsLesson2Md,
  "medical-tools-3": medicalToolsLesson3Md,
  "medical-tools-4": medicalToolsLesson4Md,
  "medical-tools-5": medicalToolsLesson5Md,
  "medical-tools-6": medicalToolsLesson6Md,
  // paper-writing-supportコース
  "paper-support-1": paperSupportLesson1Md,
  "paper-support-2": paperSupportLesson2Md,
  "paper-support-3": paperSupportLesson3Md,
  "paper-support-4": paperSupportLesson4Md,
  "paper-support-5": paperSupportLesson5Md,
  // case-report-supportコース
  "case-support-1": caseSupportLesson1Md,
  "case-support-2": caseSupportLesson2Md,
  "case-support-3": caseSupportLesson3Md,
  "case-support-4": caseSupportLesson4Md,
  // diagnostic-supportコース
  "diagnostic-1": diagnosticLesson1Md,
  "diagnostic-2": diagnosticLesson2Md,
  "diagnostic-3": diagnosticLesson3Md,
  "diagnostic-4": diagnosticLesson4Md,
  // medical-english-proofreadingコース
  "proofreading-1": proofreadingLesson1Md,
  "proofreading-2": proofreadingLesson2Md,
  "proofreading-3": proofreadingLesson3Md,
  "proofreading-4": proofreadingLesson4Md,
  // literature-review-supportコース
  "lit-review-1": litReviewLesson1Md,
  "lit-review-2": litReviewLesson2Md,
  "lit-review-3": litReviewLesson3Md,
  "lit-review-4": litReviewLesson4Md,
  // advanced-prompt-techniquesコース
  "advanced-prompt-1": advancedPromptLesson1Md,
  "advanced-prompt-2": advancedPromptLesson2Md,
  // machine-learning-fundamentalsコース
  "ml-fundamentals-1": mlFundamentalsLesson1Md,
  "ml-fundamentals-2": mlFundamentalsLesson2Md,
  "ml-fundamentals-3": mlFundamentalsLesson3Md,
  "ml-fundamentals-4": mlFundamentalsLesson4Md,
  "ml-fundamentals-5": mlFundamentalsLesson5Md,
  "ml-fundamentals-6": mlFundamentalsLesson6Md,
  "ml-fundamentals-7": mlFundamentalsLesson7Md,
  "ml-fundamentals-8": mlFundamentalsLesson8Md,
  // deep-learning-basicsコース
  "dl-basics-1": dlBasicsLesson1Md,
  "dl-basics-2": dlBasicsLesson2Md,
  "dl-basics-3": dlBasicsLesson3Md,
  "dl-basics-4": dlBasicsLesson4Md,
  "dl-basics-5": dlBasicsLesson5Md,
  "dl-basics-6": dlBasicsLesson6Md,
  "dl-basics-7": dlBasicsLesson7Md,
  "dl-basics-8": dlBasicsLesson8Md,
  // ai-tools-comparisonコース
  "ai-tools-1": aiToolsLesson1Md,
  "ai-tools-2": aiToolsLesson2Md,
  "ai-tools-3": aiToolsLesson3Md,
  "ai-tools-4": aiToolsLesson4Md,
  "ai-tools-5": aiToolsLesson5Md,
};

// レッスンコンテンツが存在するかチェックする関数
export function hasLessonContent(lessonId: string): boolean {
  return lessonId in lessonContent && lessonContent[lessonId] && lessonContent[lessonId].trim().length > 0;
}

// クイズデータ
const quizzesData: Record<string, typeof lesson1Quizzes> = {
  "ai-basics-1": lesson1Quizzes,
  "ai-basics-2": lesson2Quizzes,
  "ai-basics-3": lesson3Quizzes,
  "ai-basics-4": lesson4Quizzes,
  "ai-basics-5": lesson5Quizzes,
  "ai-basics-6": lesson6Quizzes,
  "ai-basics-7": lesson7Quizzes,
  "ai-basics-8": lesson8Quizzes,
};

// 実践のヒントデータ
const tipsData: Record<string, typeof lesson1Tips> = {
  "ai-basics-1": lesson1Tips,
  "ai-basics-2": [],
  "ai-basics-3": [],
  "ai-basics-4": [],
  "ai-basics-5": [],
  "ai-basics-6": [],
  "ai-basics-7": [],
  "ai-basics-8": [],
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

// CourseDetail.tsxからレッスンデータ取得関数をインポート
import { getLessonsForCourse } from "./CourseDetail";

export default function LessonDetail() {
  const [match, params] = useRoute("/courses/:courseId/lessons/:lessonId");
  const [, setLocation] = useLocation();
  const courseId = match ? params.courseId : null;
  const lessonId = match ? params.lessonId : null;

  // const [completed, setCompleted] = useState(false); // 削除: 完了画面は不要
  const [scrollProgress, setScrollProgress] = useState(0);

  const [activeSection, setActiveSection] = useState<string>("");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [completed, setCompleted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addXP } = useGamification();

  // クイズと実践のヒントデータを取得
  const quizzes = lessonId ? quizzesData[lessonId] || [] : [];
  const tips = lessonId ? tipsData[lessonId] || [] : [];

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

  // 現在のレッスン情報を取得
  const currentLesson = courseId && lessonId ? getLessonsForCourse(courseId).find(l => l.id === lessonId) : null;

  // コースの進捗情報をローカルストレージから読み込む
  const courseProgressKey = courseId ? `course-progress-${courseId}` : null;
  let courseProgress: { completedLessons?: string[] } = {};
  if (courseProgressKey) {
    try {
      const saved = localStorage.getItem(courseProgressKey);
      if (saved) {
        courseProgress = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse course progress from localStorage", e);
      courseProgress = {};
    }
  }

  // 全レッスンと進捗情報
  const allLessons = courseId ? getLessonsForCourse(courseId) : [];
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter(l => courseProgress.completedLessons?.includes(l.id)).length;

  // 前のレッスンを取得
  const getPreviousLesson = () => {
    if (!courseId || !lessonId) return null;
    const lessons = getLessonsForCourse(courseId);
    const currentIndex = lessons.findIndex(l => l.id === lessonId);
    if (currentIndex > 0) {
      return lessons[currentIndex - 1];
    }
    return null;
  };

  const previousLesson = getPreviousLesson();

  // SEO設定
  useEffect(() => {
    if (currentLesson && courseId) {
      updateSEO({
        title: `${currentLesson.title} | Helix`,
        description: currentLesson.description || `${currentLesson.title}のレッスン。医療従事者がAIを効果的に活用するための実践的なレッスンです。`,
        path: `/courses/${courseId}/lessons/${lessonId}`,
        keywords: `${currentLesson.title},AI学習,レッスン,医療従事者,教育`
      });

      // 構造化データ（LearningResource）を追加
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "name": currentLesson.title,
        "description": currentLesson.description || `${currentLesson.title}のレッスン`,
        "educationalLevel": "Professional",
        "learningResourceType": "Lesson",
        "url": `${BASE_URL}/courses/${courseId}/lessons/${lessonId}`,
        "timeRequired": currentLesson.duration ? `PT${currentLesson.duration}M` : undefined
      });
    }
  }, [currentLesson, courseId, lessonId]);

  // ローカルストレージから完了状態を読み込む
  useEffect(() => {
    if (lessonId) {
      // 完了画面は削除したので、進捗確認は不要
      // const progressKey = `lesson-progress-${lessonId}`;
      // const saved = localStorage.getItem(progressKey);
      // if (saved) {
      //   try {
      //     const progress = JSON.parse(saved);
      //     if (progress.completed) {
      //       setCompleted(true);
      //     }
      //   } catch (e) {
      //     // ignore
      //   }
      // }
    }
  }, [lessonId]);

  // レッスンが変わったときにページトップにスクロール
  // スクロール位置を監視して、確実に0になるまで繰り返し実行
  useLayoutEffect(() => {
    if (lessonId) {
      let attempts = 0;
      const maxAttempts = 20; // 最大20回試行
      
      const forceScrollToTop = () => {
        // すべての方法でスクロール位置を0に設定
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // 現在のスクロール位置を確認
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        
        // まだ0でない場合、次のフレームで再試行
        if (currentScroll > 0 && attempts < maxAttempts) {
          attempts++;
          requestAnimationFrame(forceScrollToTop);
        }
      };
      
      // 即座に実行
      forceScrollToTop();
    }
  }, [lessonId]);
  
  // さらに、少し遅延してからも実行（確実性のため）
  useEffect(() => {
    if (lessonId) {
      let attempts = 0;
      const maxAttempts = 15;
      
      const ensureScrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        
        if (currentScroll > 0 && attempts < maxAttempts) {
          attempts++;
          setTimeout(ensureScrollToTop, 50);
        }
      };
      
      // 複数のタイミングで実行
      const timeout1 = setTimeout(ensureScrollToTop, 50);
      const timeout2 = setTimeout(ensureScrollToTop, 150);
      const timeout3 = setTimeout(ensureScrollToTop, 300);
      const timeout4 = setTimeout(ensureScrollToTop, 500);
      
      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
      };
    }
  }, [lessonId]);

  // スクロール位置に応じて進捗を更新（Zenn風 - ページ全体のスクロールを検出）
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);

      // ヘッダーの表示/非表示を制御（モバイルのみ）
      if (window.innerWidth < 1024) {
        if (scrollTop > lastScrollY && scrollTop > 100) {
          // 下にスクロールしているときはヘッダーを隠す
          setIsHeaderVisible(false);
        } else {
          // 上にスクロールしているときはヘッダーを表示
          setIsHeaderVisible(true);
        }
        setLastScrollY(scrollTop);
      }

      // アクティブなセクションを検出（Zenn風）
      const sectionElements = document.querySelectorAll("h2[id], h3[id]");
      let currentSection = "";
      
      sectionElements.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
          currentSection = section.id;
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期化
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content, lastScrollY]);

  // セクションへのジャンプ（Zenn風）
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // ヘッダーの高さ分
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = window.scrollY + elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // マークダウンコンテンツを処理（クイズと実践のヒントをインラインで配置）
  const renderContent = () => {
    if (!content) return null;

    // コンテンツを[QUIZ]と[TIP]で分割
    const parts = content.split(/(\[QUIZ\]|\[TIP\])/);
    const elements: React.ReactNode[] = [];
    let quizIndex = 0;
    let tipIndex = 0;
    // extractSectionsと同じ順序でidを生成するため、sectionsのインデックスを使用
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
      } else if (part === "[TIP]" && tips.length > 0 && tipIndex < tips.length) {
        elements.push(
          <div key={`tip-${tipIndex}`} className="my-8">
            <PracticeTips
              tip={tips[tipIndex]}
            />
          </div>
        );
        tipIndex++;
      } else if (part.trim()) {
        // Markdownコンテンツをレンダリング
        let markdownContent = part.trim();
        
        // 最初のパートの場合、Markdownの最初のh1（# で始まる行）を削除
        // ページタイトルとして既に表示されているため
        if (index === 0 || (index === 2 && parts[0].trim() === "")) {
          const lines = markdownContent.split('\n');
          // 最初の行が # で始まる場合は削除
          if (lines.length > 0 && lines[0].trim().startsWith('# ')) {
            markdownContent = lines.slice(1).join('\n');
          }
        }
        
        // 連続する同じ参考文献をまとめる処理
        // リストアイテム内の参考文献パターンを検出して処理
        const refPattern = /\[([\d,]+?)\]/g;
        const lines = markdownContent.split('\n');
        const processedLines: string[] = [];
        let previousRefs: string | null = null;
        let inList = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmedLine = line.trim();
          
          // リストアイテムかどうかを判定
          const isListItem = /^[-*+]\s/.test(trimmedLine) || /^\d+\.\s/.test(trimmedLine);
          
          if (isListItem) {
            inList = true;
            const refMatches = Array.from(trimmedLine.matchAll(refPattern));
            
            if (refMatches.length > 0) {
              // 参考文献が見つかった場合、正規化（ソートして比較）
              const currentRefs = refMatches
                .map(m => m[1])
                .join(',')
                .split(',')
                .sort()
                .join(',');
              
              // 前のリストアイテムと同じ参考文献の場合は、この行から参考文献を削除
              if (previousRefs === currentRefs && previousRefs !== null) {
                // 参考文献を削除（末尾の空白も削除）
                const lineWithoutRefs = trimmedLine.replace(refPattern, '').trim();
                processedLines.push(line.replace(trimmedLine, lineWithoutRefs));
              } else {
                // 異なる参考文献の場合はそのまま
                processedLines.push(line);
                previousRefs = currentRefs;
              }
            } else {
              // 参考文献がない場合は、前の参考文献をリセット
              processedLines.push(line);
              previousRefs = null;
            }
          } else {
            // リストアイテムでない場合
            if (inList && trimmedLine === '') {
              // 空行でリストが終了した場合
              inList = false;
              previousRefs = null;
            }
            processedLines.push(line);
          }
        }
        
        markdownContent = processedLines.join('\n');
        
        if (markdownContent) {
          elements.push(
            <div key={`content-${index}`} className="zenn-article">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-0 first:mt-0 text-foreground scroll-mt-20 tracking-tight" {...props} />
                  ),
                  h2: ({ node, ...props }) => {
                    const title = props.children?.toString() || "";
                    const id = `section-${sectionIndex}`;
                    sectionIndex++;
                    return (
                      <h2
                        id={id}
                        className="text-2xl md:text-3xl font-bold mt-8 mb-6 first:mt-0 text-foreground scroll-mt-20 tracking-tight"
                        {...props}
                      />
                    );
                  },
                  h3: ({ node, ...props }) => {
                    const title = props.children?.toString() || "";
                    const id = `section-${sectionIndex}`;
                    sectionIndex++;
                    return (
                      <h3
                        id={id}
                        className="text-xl md:text-2xl font-semibold mt-8 mb-6 first:mt-0 text-foreground scroll-mt-20 tracking-tight"
                        {...props}
                      />
                    );
                  },
                  h4: ({ node, ...props }) => (
                    <h4 className="text-lg md:text-xl font-semibold mt-6 mb-4 first:mt-0 text-foreground scroll-mt-20" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-6 text-lg md:text-xl text-foreground leading-[1.85] max-w-[65ch]" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1.5" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1.5" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-base md:text-lg text-foreground leading-relaxed pl-1" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-foreground" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-muted/80 px-2 py-1 rounded-md text-base font-mono border border-border/50" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-muted/80 p-6 rounded-xl overflow-x-auto my-8 border border-border/50 shadow-sm" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-primary pl-6 italic my-8 text-lg md:text-xl text-muted-foreground leading-[1.85] bg-accent/30 py-4 pr-4 rounded-r-lg" {...props} />
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
                  hr: () => null, // 水平線を非表示にする
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
    // fast-json-stringifyを使用してローカルストレージに進捗を保存
    fastStorage.setLessonProgress(lessonId || "", {
      completed: true,
      completedAt: new Date().toISOString(),
    });
    
    // コースの進捗も更新
    if (courseId) {
      const courseProgress = fastStorage.getCourseProgress(courseId) || { completedLessons: [] };
      const completedLessons = courseProgress.completedLessons || [];
      if (lessonId && !completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        const updatedProgress = {
          completedLessons,
          lastUpdated: new Date().toISOString(),
        };
        fastStorage.setCourseProgress(courseId, updatedProgress);

        // コース完了チェック
        const allLessons = getLessonsForCourse(courseId);
        if (completedLessons.length + 1 === allLessons.length && allLessons.length > 0) {
          // コース完了
          const completionDate = new Date().toLocaleDateString("ja-JP");
          fastStorage.setCourseCompleted(courseId, {
            completed: true,
            completedDate: completionDate,
            completedAt: new Date().toISOString(),
          });
          addXP(20, "コース完了ボーナス");
        }
      }
    }
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 次のレッスンがあれば即座に遷移
    if (nextLesson) {
      // スクロール完了を待ってから遷移（少し遅延を入れる）
      setTimeout(() => {
        setLocation(`/courses/${courseId}/lessons/${nextLesson.id}`);
      }, 300);
    } else {
      // 最後のレッスンの場合はコース詳細ページに戻る
      setTimeout(() => {
        setLocation(`/courses/${courseId}`);
      }, 300);
    }
  };

  // レッスンコンテンツが存在しない場合のフォールバック
  if (!courseId || !lessonId) {
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

  // レッスンコンテンツが存在しない場合でも、レッスン情報を表示
  if (!content) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto pt-4 pb-8 px-4">
          <Button
            variant="ghost"
            onClick={() => setLocation(`/courses/${courseId}`)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> コースに戻る
          </Button>
          
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">{currentLesson?.title || "レッスン"}</h1>
            {currentLesson?.description && (
              <p className="text-lg text-muted-foreground mb-8">{currentLesson.description}</p>
            )}
            <div className="bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
              <p className="text-muted-foreground mb-4">
                このレッスンのコンテンツは現在準備中です。
              </p>
              <p className="text-sm text-muted-foreground">
                まもなく公開予定です。しばらくお待ちください。
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pt-4 pb-8 px-4">
        <div className="mb-6 space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation(`/courses/${courseId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            コースに戻る
          </Button>
          
          {/* レッスンナビゲーション */}
          {allLessons.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <span className="text-sm text-muted-foreground whitespace-nowrap">レッスン:</span>
              <div className="flex gap-2">
                {allLessons.map((lesson) => {
                  const isCompleted = courseProgress.completedLessons?.includes(lesson.id);
                  const isCurrent = lesson.id === lessonId;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setLocation(`/courses/${courseId}/lessons/${lesson.id}`)}
                      className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                        isCurrent
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                          ? "bg-muted text-foreground hover:bg-muted/80"
                          : "bg-background border border-border hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        {isCompleted && <CheckCircle2 className="w-3 h-3 flex-shrink-0" />}
                        <span>{lesson.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* メインコンテンツ */}
          <div className="lg:col-span-8 min-w-0">
            <Card>
              <CardContent className="pt-2 pb-6 px-6">
                <div className="max-w-none">
                  {/* レッスンタイトル */}
                  {currentLesson && (
                    <div className="mb-6">
                      <h1 className="text-3xl font-bold mb-2">{currentLesson.title}</h1>
                      {currentLesson.description && (
                        <p className="text-lg text-muted-foreground">{currentLesson.description}</p>
                      )}
                      {(currentLesson.duration || currentLesson.slides) && (
                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          {currentLesson.duration && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>約 {currentLesson.duration} 分</span>
                            </div>
                          )}
                          {currentLesson.slides && currentLesson.slides > 0 && (
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{currentLesson.slides} スライド</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* コンテンツ */}
                  <div className={`${UNIFIED_PROSE_CLASSES} [&>h1:first-child]:mt-0 [&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0`}>
                    {renderContent()}
                  </div>
                  
                  {/* ナビゲーションボタン */}
                  <div className="flex justify-between mt-8 pt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (previousLesson) {
                          setLocation(`/courses/${courseId}/lessons/${previousLesson.id}`);
                        }
                      }}
                      disabled={!previousLesson}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      前のステップ
                    </Button>
                    <Button
                      onClick={() => {
                        // レッスン完了を記録
                        addXP(10, "レッスン完了");
                        // fast-json-stringifyを使用してローカルストレージに進捗を保存
                        fastStorage.setLessonProgress(lessonId || "", {
                          completed: true,
                          completedAt: new Date().toISOString(),
                        });
                        
                        // コースの進捗も更新
                        if (courseId) {
                          const courseProgress = fastStorage.getCourseProgress(courseId) || { completedLessons: [] };
                          const completedLessons = courseProgress.completedLessons || [];
                          if (lessonId && !completedLessons.includes(lessonId)) {
                            completedLessons.push(lessonId);
                            const updatedProgress = {
                              completedLessons,
                              lastUpdated: new Date().toISOString(),
                            };
                            fastStorage.setCourseProgress(courseId, updatedProgress);

                            // コース完了チェック
                            const allLessons = getLessonsForCourse(courseId);
                            if (completedLessons.length === allLessons.length && allLessons.length > 0) {
                              const completionDate = new Date().toLocaleDateString("ja-JP");
                              fastStorage.setCourseCompleted(courseId, {
                                completed: true,
                                completedDate: completionDate,
                                completedAt: new Date().toISOString(),
                              });
                              addXP(20, "コース完了ボーナス");
                            }
                          }
                        }
                        
                        // 次のレッスンがあれば遷移（遷移後、確実にトップにスクロール）
                        if (nextLesson) {
                          // ページ遷移
                          setLocation(`/courses/${courseId}/lessons/${nextLesson.id}`);
                          
                          // 遷移後に確実にトップにスクロールする関数（繰り返し実行）
                          let attempts = 0;
                          const maxAttempts = 30;
                          
                          const ensureScrollToTop = () => {
                            // すべての方法でスクロール位置を0に設定
                            window.scrollTo(0, 0);
                            document.documentElement.scrollTop = 0;
                            document.body.scrollTop = 0;
                            
                            // 現在のスクロール位置を確認
                            const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                            
                            // まだ0でない場合、再試行
                            if (currentScroll > 0 && attempts < maxAttempts) {
                              attempts++;
                              setTimeout(ensureScrollToTop, 50);
                            }
                          };
                          
                          // 複数のタイミングで確実に実行
                          setTimeout(ensureScrollToTop, 0);
                          setTimeout(ensureScrollToTop, 100);
                          setTimeout(ensureScrollToTop, 300);
                        } else {
                          // コース一覧ページへの遷移
                          setLocation(`/courses/${courseId}`);
                          
                          let attempts = 0;
                          const maxAttempts = 20;
                          
                          const ensureScrollToTop = () => {
                            window.scrollTo(0, 0);
                            document.documentElement.scrollTop = 0;
                            document.body.scrollTop = 0;
                            
                            const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                            
                            if (currentScroll > 0 && attempts < maxAttempts) {
                              attempts++;
                              setTimeout(ensureScrollToTop, 50);
                            }
                          };
                          
                          setTimeout(ensureScrollToTop, 100);
                          setTimeout(ensureScrollToTop, 300);
                        }
                      }}
                      disabled={!nextLesson && currentLessonIndex === totalLessons - 1}
                    >
                      {nextLesson ? (
                        <>
                          次のステップ
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          終了
                          <CheckCircle2 className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー（目次） - Zenn風 */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24">
              <div className="relative">
                <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  目次
                </h3>
                {sections.length > 0 ? (
                  <nav className="space-y-1.5">
                    {sections.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left text-sm transition-colors relative ${
                            section.level === 3 ? "pl-6 text-xs" : "pl-0"
                          } ${
                            isActive
                              ? "text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary -ml-4" />
                          )}
                          <span className="truncate block">{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                ) : (
                  <p className="text-sm text-muted-foreground">目次はありません</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
