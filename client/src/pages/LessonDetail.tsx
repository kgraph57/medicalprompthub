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
import { lesson1Quizzes, lesson2Quizzes, lesson3Quizzes, lesson4Quizzes, lesson5Quizzes, lesson6Quizzes, lesson7Quizzes, lesson8Quizzes } from "@/data/courses/ai-basics/quizzes";
import { lesson1Exercises } from "@/data/courses/ai-basics/exercises";
import { useGamification } from "@/hooks/useGamification";

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

// 演習データ
const exercisesData: Record<string, typeof lesson1Exercises> = {
  "ai-basics-1": lesson1Exercises,
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

// レッスンデータ（CourseDetail.tsxと同じ構造）
function getLessonsForCourse(courseId: string) {
  // CourseDetail.tsxからレッスンデータを取得する関数をインポート
  // ここでは簡易的に、主要コースのレッスンIDを返す
  const lessonsData: Record<string, Array<{
    id: string;
    title: string;
  }>> = {
    "ai-basics": [
      { id: "ai-basics-1", title: "AIとは何か" },
      { id: "ai-basics-2", title: "AIの歴史" },
      { id: "ai-basics-3", title: "AIの現状と未来" },
      { id: "ai-basics-4", title: "AIの分類と種類" },
      { id: "ai-basics-5", title: "機械学習の基本概念" },
      { id: "ai-basics-6", title: "AIの能力と限界" },
      { id: "ai-basics-7", title: "AIの社会的影響と倫理" },
      { id: "ai-basics-8", title: "AI学習の次のステップ" },
    ],
    "generative-ai-basics": [
      { id: "generative-ai-1", title: "生成AIとは何か - 基本概念" },
      { id: "generative-ai-2", title: "大規模言語モデル（LLM）の基礎" },
      { id: "generative-ai-3", title: "Transformerアーキテクチャ入門" },
      { id: "generative-ai-4", title: "注意機構（Attention Mechanism）" },
      { id: "generative-ai-5", title: "トークン化とコンテキストウィンドウ" },
      { id: "generative-ai-6", title: "生成プロセスとサンプリング" },
      { id: "generative-ai-7", title: "主要な生成AIツールと比較" },
      { id: "generative-ai-8", title: "生成AIの学習とファインチューニング" },
      { id: "generative-ai-9", title: "生成AIの限界と注意点" },
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
      const updatedProgress = {
        ...courseProgress,
        completedLessons,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(courseProgressKey, JSON.stringify(updatedProgress));

      // コース完了チェック
      const allLessons = getLessonsForCourse(courseId || "");
      if (completedLessons.length + 1 === allLessons.length && allLessons.length > 0) {
        // コース完了
        const completionDate = new Date().toLocaleDateString("ja-JP");
        localStorage.setItem(`course-completed-${courseId}`, JSON.stringify({
          completed: true,
          completedDate: completionDate,
          completedAt: new Date().toISOString(),
        }));
        addXP(20, "コース完了ボーナス");
      }
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
