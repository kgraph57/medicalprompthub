/**
 * レッスン詳細ページ
 * Zenn風の読みやすいスクロール形式でレッスンコンテンツを表示
 */

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { UNIFIED_PROSE_CLASSES, UNIFIED_MARKDOWN_COMPONENTS } from "@/lib/markdownStyles.tsx";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, ArrowRight, Clock, FileText, BookOpen } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
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
import advancedPromptLesson3Md from "@/data/courses/advanced-prompt-techniques/lesson-3.md?raw";
import advancedPromptLesson4Md from "@/data/courses/advanced-prompt-techniques/lesson-4.md?raw";
import advancedPromptLesson5Md from "@/data/courses/advanced-prompt-techniques/lesson-5.md?raw";

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

// ai-history-evolutionコース
import aiHistoryLesson1Md from "@/data/courses/ai-history-evolution/lesson-1.md?raw";
import aiHistoryLesson2Md from "@/data/courses/ai-history-evolution/lesson-2.md?raw";
import aiHistoryLesson3Md from "@/data/courses/ai-history-evolution/lesson-3.md?raw";
import aiHistoryLesson4Md from "@/data/courses/ai-history-evolution/lesson-4.md?raw";
import aiHistoryLesson5Md from "@/data/courses/ai-history-evolution/lesson-5.md?raw";
import aiHistoryLesson6Md from "@/data/courses/ai-history-evolution/lesson-6.md?raw";

// perplexity-practiceコース
import perplexityLesson1Md from "@/data/courses/perplexity-practice/lesson-1.md?raw";
import perplexityLesson2Md from "@/data/courses/perplexity-practice/lesson-2.md?raw";
import perplexityLesson3Md from "@/data/courses/perplexity-practice/lesson-3.md?raw";
import perplexityLesson4Md from "@/data/courses/perplexity-practice/lesson-4.md?raw";
import perplexityLesson5Md from "@/data/courses/perplexity-practice/lesson-5.md?raw";

// data-preprocessing-cleaningコース
import dataPreprocessingLesson1Md from "@/data/courses/data-preprocessing-cleaning/lesson-1.md?raw";
import dataPreprocessingLesson2Md from "@/data/courses/data-preprocessing-cleaning/lesson-2.md?raw";
import dataPreprocessingLesson3Md from "@/data/courses/data-preprocessing-cleaning/lesson-3.md?raw";
import dataPreprocessingLesson4Md from "@/data/courses/data-preprocessing-cleaning/lesson-4.md?raw";
import dataPreprocessingLesson5Md from "@/data/courses/data-preprocessing-cleaning/lesson-5.md?raw";
import dataPreprocessingLesson6Md from "@/data/courses/data-preprocessing-cleaning/lesson-6.md?raw";

// medical-imaging-ai-basicsコース
import medicalImagingLesson1Md from "@/data/courses/medical-imaging-ai-basics/lesson-1.md?raw";
import medicalImagingLesson2Md from "@/data/courses/medical-imaging-ai-basics/lesson-2.md?raw";
import medicalImagingLesson3Md from "@/data/courses/medical-imaging-ai-basics/lesson-3.md?raw";
import medicalImagingLesson4Md from "@/data/courses/medical-imaging-ai-basics/lesson-4.md?raw";
import medicalImagingLesson5Md from "@/data/courses/medical-imaging-ai-basics/lesson-5.md?raw";
import medicalImagingLesson6Md from "@/data/courses/medical-imaging-ai-basics/lesson-6.md?raw";
import medicalImagingLesson7Md from "@/data/courses/medical-imaging-ai-basics/lesson-7.md?raw";

// statistics-basics-medicineコース
import statisticsLesson1Md from "@/data/courses/statistics-basics-medicine/lesson-1.md?raw";
import statisticsLesson2Md from "@/data/courses/statistics-basics-medicine/lesson-2.md?raw";
import statisticsLesson3Md from "@/data/courses/statistics-basics-medicine/lesson-3.md?raw";
import statisticsLesson4Md from "@/data/courses/statistics-basics-medicine/lesson-4.md?raw";
import statisticsLesson5Md from "@/data/courses/statistics-basics-medicine/lesson-5.md?raw";
import statisticsLesson6Md from "@/data/courses/statistics-basics-medicine/lesson-6.md?raw";
import statisticsLesson7Md from "@/data/courses/statistics-basics-medicine/lesson-7.md?raw";
import statisticsLesson8Md from "@/data/courses/statistics-basics-medicine/lesson-8.md?raw";

// model-evaluation-validationコース
import modelEvalLesson1Md from "@/data/courses/model-evaluation-validation/lesson-1.md?raw";
import modelEvalLesson2Md from "@/data/courses/model-evaluation-validation/lesson-2.md?raw";
import modelEvalLesson3Md from "@/data/courses/model-evaluation-validation/lesson-3.md?raw";
import modelEvalLesson4Md from "@/data/courses/model-evaluation-validation/lesson-4.md?raw";
import modelEvalLesson5Md from "@/data/courses/model-evaluation-validation/lesson-5.md?raw";
import modelEvalLesson6Md from "@/data/courses/model-evaluation-validation/lesson-6.md?raw";
import modelEvalLesson7Md from "@/data/courses/model-evaluation-validation/lesson-7.md?raw";

// patient-communication-aiコース
import patientCommLesson1Md from "@/data/courses/patient-communication-ai/lesson-1.md?raw";
import patientCommLesson2Md from "@/data/courses/patient-communication-ai/lesson-2.md?raw";
import patientCommLesson3Md from "@/data/courses/patient-communication-ai/lesson-3.md?raw";
import patientCommLesson4Md from "@/data/courses/patient-communication-ai/lesson-4.md?raw";
import patientCommLesson5Md from "@/data/courses/patient-communication-ai/lesson-5.md?raw";

// ai-bias-fairnessコース
import aiBiasLesson1Md from "@/data/courses/ai-bias-fairness/lesson-1.md?raw";
import aiBiasLesson2Md from "@/data/courses/ai-bias-fairness/lesson-2.md?raw";
import aiBiasLesson3Md from "@/data/courses/ai-bias-fairness/lesson-3.md?raw";
import aiBiasLesson4Md from "@/data/courses/ai-bias-fairness/lesson-4.md?raw";
import aiBiasLesson5Md from "@/data/courses/ai-bias-fairness/lesson-5.md?raw";
import aiBiasLesson6Md from "@/data/courses/ai-bias-fairness/lesson-6.md?raw";

// research-protocol-aiコース
import researchProtocolLesson1Md from "@/data/courses/research-protocol-ai/lesson-1.md?raw";
import researchProtocolLesson2Md from "@/data/courses/research-protocol-ai/lesson-2.md?raw";
import researchProtocolLesson3Md from "@/data/courses/research-protocol-ai/lesson-3.md?raw";
import researchProtocolLesson4Md from "@/data/courses/research-protocol-ai/lesson-4.md?raw";
import researchProtocolLesson5Md from "@/data/courses/research-protocol-ai/lesson-5.md?raw";

// data-science-fundamentalsコース
import dataScienceLesson1Md from "@/data/courses/data-science-fundamentals/lesson-1.md?raw";
import dataScienceLesson2Md from "@/data/courses/data-science-fundamentals/lesson-2.md?raw";
import dataScienceLesson3Md from "@/data/courses/data-science-fundamentals/lesson-3.md?raw";
import dataScienceLesson4Md from "@/data/courses/data-science-fundamentals/lesson-4.md?raw";
import dataScienceLesson5Md from "@/data/courses/data-science-fundamentals/lesson-5.md?raw";
import dataScienceLesson6Md from "@/data/courses/data-science-fundamentals/lesson-6.md?raw";
import dataScienceLesson7Md from "@/data/courses/data-science-fundamentals/lesson-7.md?raw";

// medical-ai-ethicsコース
import medicalAiEthicsLesson1Md from "@/data/courses/medical-ai-ethics/lesson-1.md?raw";
import medicalAiEthicsLesson2Md from "@/data/courses/medical-ai-ethics/lesson-2.md?raw";
import medicalAiEthicsLesson3Md from "@/data/courses/medical-ai-ethics/lesson-3.md?raw";
import medicalAiEthicsLesson4Md from "@/data/courses/medical-ai-ethics/lesson-4.md?raw";
import medicalAiEthicsLesson5Md from "@/data/courses/medical-ai-ethics/lesson-5.md?raw";
import medicalAiEthicsLesson6Md from "@/data/courses/medical-ai-ethics/lesson-6.md?raw";

// レッスンコンテンツをエクスポートして他のコンポーネントから再利用可能にする
export const lessonContent: Record<string, string> = {
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
  "advanced-prompt-3": advancedPromptLesson3Md,
  "advanced-prompt-4": advancedPromptLesson4Md,
  "advanced-prompt-5": advancedPromptLesson5Md,
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
  // ai-history-evolutionコース
  "ai-history-1": aiHistoryLesson1Md,
  "ai-history-2": aiHistoryLesson2Md,
  "ai-history-3": aiHistoryLesson3Md,
  "ai-history-4": aiHistoryLesson4Md,
  "ai-history-5": aiHistoryLesson5Md,
  "ai-history-6": aiHistoryLesson6Md,
  // perplexity-practiceコース
  "perplexity-1": perplexityLesson1Md,
  "perplexity-2": perplexityLesson2Md,
  "perplexity-3": perplexityLesson3Md,
  "perplexity-4": perplexityLesson4Md,
  "perplexity-5": perplexityLesson5Md,
  // data-preprocessing-cleaningコース
  "data-preprocessing-1": dataPreprocessingLesson1Md,
  "data-preprocessing-2": dataPreprocessingLesson2Md,
  "data-preprocessing-3": dataPreprocessingLesson3Md,
  "data-preprocessing-4": dataPreprocessingLesson4Md,
  "data-preprocessing-5": dataPreprocessingLesson5Md,
  "data-preprocessing-6": dataPreprocessingLesson6Md,
  // medical-imaging-ai-basicsコース
  "medical-imaging-1": medicalImagingLesson1Md,
  "medical-imaging-2": medicalImagingLesson2Md,
  "medical-imaging-3": medicalImagingLesson3Md,
  "medical-imaging-4": medicalImagingLesson4Md,
  "medical-imaging-5": medicalImagingLesson5Md,
  "medical-imaging-6": medicalImagingLesson6Md,
  "medical-imaging-7": medicalImagingLesson7Md,
  // statistics-basics-medicineコース
  "statistics-basics-1": statisticsLesson1Md,
  "statistics-basics-2": statisticsLesson2Md,
  "statistics-basics-3": statisticsLesson3Md,
  "statistics-basics-4": statisticsLesson4Md,
  "statistics-basics-5": statisticsLesson5Md,
  "statistics-basics-6": statisticsLesson6Md,
  "statistics-basics-7": statisticsLesson7Md,
  "statistics-basics-8": statisticsLesson8Md,
  // model-evaluation-validationコース
  "model-evaluation-1": modelEvalLesson1Md,
  "model-evaluation-2": modelEvalLesson2Md,
  "model-evaluation-3": modelEvalLesson3Md,
  "model-evaluation-4": modelEvalLesson4Md,
  "model-evaluation-5": modelEvalLesson5Md,
  "model-evaluation-6": modelEvalLesson6Md,
  "model-evaluation-7": modelEvalLesson7Md,
  // patient-communication-aiコース
  "patient-communication-1": patientCommLesson1Md,
  "patient-communication-2": patientCommLesson2Md,
  "patient-communication-3": patientCommLesson3Md,
  "patient-communication-4": patientCommLesson4Md,
  "patient-communication-5": patientCommLesson5Md,
  // ai-bias-fairnessコース
  "ai-bias-1": aiBiasLesson1Md,
  "ai-bias-2": aiBiasLesson2Md,
  "ai-bias-3": aiBiasLesson3Md,
  "ai-bias-4": aiBiasLesson4Md,
  "ai-bias-5": aiBiasLesson5Md,
  "ai-bias-6": aiBiasLesson6Md,
  // research-protocol-aiコース
  "research-protocol-1": researchProtocolLesson1Md,
  "research-protocol-2": researchProtocolLesson2Md,
  "research-protocol-3": researchProtocolLesson3Md,
  "research-protocol-4": researchProtocolLesson4Md,
  "research-protocol-5": researchProtocolLesson5Md,
  // data-science-fundamentalsコース
  "data-science-1": dataScienceLesson1Md,
  "data-science-2": dataScienceLesson2Md,
  "data-science-3": dataScienceLesson3Md,
  "data-science-4": dataScienceLesson4Md,
  "data-science-5": dataScienceLesson5Md,
  "data-science-6": dataScienceLesson6Md,
  "data-science-7": dataScienceLesson7Md,
  // medical-ai-ethicsコース
  "ethics-med-1": medicalAiEthicsLesson1Md,
  "ethics-med-2": medicalAiEthicsLesson2Md,
  "ethics-med-3": medicalAiEthicsLesson3Md,
  "ethics-med-4": medicalAiEthicsLesson4Md,
  "ethics-med-5": medicalAiEthicsLesson5Md,
  "ethics-med-6": medicalAiEthicsLesson6Md,
};

// レッスンコンテンツが存在するかチェックする関数
export function hasLessonContent(lessonId: string): boolean {
  return !!(lessonId in lessonContent && lessonContent[lessonId] && typeof lessonContent[lessonId] === 'string' && lessonContent[lessonId].trim().length > 0);
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

// 絵文字を削除する関数
function removeEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

// セクションを抽出（## で区切る）
// タイトルからidを生成する関数（Zenn風のスラッグ化）
function generateIdFromTitle(title: string): string {
  // 日本語や特殊文字も含めて処理
  return title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // Unicode文字（日本語含む）と数字、スペース、ハイフンのみ残す
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 連続するハイフンを1つに
    .replace(/^-|-$/g, '') // 先頭と末尾のハイフンを削除
    .trim();
}

function extractSections(content: string): Array<{ id: string; title: string; level: number }> {
  const sections: Array<{ id: string; title: string; level: number }> = [];
  const lines = content.split("\n");
  
  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      const title = removeEmojis(line.replace(/^##\s+/, "").trim());
      const id = generateIdFromTitle(title);
      sections.push({ id, title, level: 2 });
    } else if (line.startsWith("### ")) {
      const title = removeEmojis(line.replace(/^###\s+/, "").trim());
      const id = generateIdFromTitle(title);
      sections.push({ id, title, level: 3 });
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
        title: `${currentLesson.title} | HELIX`,
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

  // ページ遷移時にスクロール位置をリセット（即座に実行）
  useLayoutEffect(() => {
    // 即座にスクロール位置をリセット
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [courseId, lessonId]);

  // ページ遷移時にスクロール位置をリセット（確実性のため複数回実行）
  useEffect(() => {
    // 即座に実行
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 次のフレームでも実行
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    
    // 少し遅延してからも実行（DOM更新を待つ）
    const timeout1 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    const timeout2 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [courseId, lessonId]);

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
  }, [courseId, lessonId]);
  
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
  }, [courseId, lessonId]);

  // ページ読み込み時にURLのハッシュがある場合、そのセクションにスクロール（Zenn風）
  useEffect(() => {
    if (content && sections.length > 0) {
      const hash = window.location.hash.slice(1); // #を削除
      if (hash) {
        // DOMが完全にレンダリングされた後にスクロール
        const timer = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // scrollIntoViewを使用（Zennと同じ方法）
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            
            setActiveSection(hash);
          }
        }, 300);
        
        return () => clearTimeout(timer);
      }
    }
  }, [content, sections]);

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
      // スクロール位置に応じて、最も上に近い見出しをアクティブにする
      const sectionElements = document.querySelectorAll("h2[id], h3[id]");
      let currentSection = "";
      const scrollOffset = 100; // scroll-mt-20 (80px) + 少しの余白
      
      // 逆順にチェックして、最初に見つかった（最も上に近い）セクションを選択
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i] as HTMLElement;
        const rect = section.getBoundingClientRect();
        // 見出しが画面の上部（オフセット分）を超えたらアクティブ
        if (rect.top <= scrollOffset) {
          currentSection = section.id;
          break;
        }
      }
      
      // 最初のセクションがまだ表示されていない場合は、最初のセクションをアクティブに
      if (!currentSection && sectionElements.length > 0) {
        const firstSection = sectionElements[0] as HTMLElement;
        const firstRect = firstSection.getBoundingClientRect();
        if (firstRect.top > scrollOffset) {
          currentSection = firstSection.id;
        }
      }
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        // URLのハッシュも更新（スクロールに応じて自動更新）
        // ただし、ユーザーが手動でスクロールしている場合のみ
        if (window.location.hash !== `#${currentSection}`) {
          // デバウンスして、頻繁な更新を防ぐ
          clearTimeout((window as any).hashUpdateTimeout);
          (window as any).hashUpdateTimeout = setTimeout(() => {
            window.history.replaceState(null, '', `#${currentSection}`);
          }, 150);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期化
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout((window as any).hashUpdateTimeout);
    };
  }, [content, lastScrollY]);

  // セクションへのジャンプ（Zenn風 - ブラウザのデフォルト動作を活用）
  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      e.preventDefault();
    }
    
    const element = document.getElementById(sectionId);
    
    if (element) {
      // CSSのscroll-mt-20が適用されているので、ブラウザのデフォルトのアンカーリンク動作を使用
      // ただし、スムーズスクロールを確実にするため、明示的にスクロール
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // URLのハッシュを更新
      window.history.replaceState(null, '', `#${sectionId}`);
      
      // アクティブセクションを更新
      setActiveSection(sectionId);
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
                  h1: ({ node, ...props }: any) => {
                    // 絵文字を削除
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-0 first:mt-0 text-foreground scroll-mt-20 tracking-tight" {...props}>
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ node, ...props }: any) => {
                    // 絵文字を削除したタイトルを取得
                    // ReactMarkdownのchildrenからテキストを抽出
                    const extractText = (children: any): string => {
                      if (typeof children === 'string') {
                        return children;
                      }
                      if (Array.isArray(children)) {
                        return children.map(extractText).join('');
                      }
                      if (children && typeof children === 'object' && 'props' in children) {
                        return extractText(children.props.children);
                      }
                      return '';
                    };
                    
                    const rawTitle = extractText(props.children);
                    const title = removeEmojis(rawTitle.trim());
                    // タイトルからidを生成（extractSectionsと同じロジック）
                    const id = generateIdFromTitle(title);
                    
                    // 絵文字を削除
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h2
                        id={id}
                        className="text-2xl md:text-3xl font-bold mt-8 mb-6 first:mt-0 text-foreground scroll-mt-20 tracking-tight"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ node, ...props }: any) => {
                    // 絵文字を削除したタイトルを取得
                    // ReactMarkdownのchildrenからテキストを抽出
                    const extractText = (children: any): string => {
                      if (typeof children === 'string') {
                        return children;
                      }
                      if (Array.isArray(children)) {
                        return children.map(extractText).join('');
                      }
                      if (children && typeof children === 'object' && 'props' in children) {
                        return extractText(children.props.children);
                      }
                      return '';
                    };
                    
                    const rawTitle = extractText(props.children);
                    const title = removeEmojis(rawTitle.trim());
                    // タイトルからidを生成（extractSectionsと同じロジック）
                    const id = generateIdFromTitle(title);
                    
                    // 絵文字を削除
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h3
                        id={id}
                        className="text-xl md:text-2xl font-semibold mt-8 mb-6 first:mt-0 text-foreground scroll-mt-20 tracking-tight"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ node, ...props }: any) => {
                    // 絵文字を削除
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h4 className="text-lg md:text-xl font-semibold mt-6 mb-4 first:mt-0 text-foreground scroll-mt-20" {...props}>
                        {children}
                      </h4>
                    );
                  },
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
      {/* Zenn風のレイアウト */}
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* メインコンテンツ - Zenn風 */}
            <main className="flex-1 min-w-0">
              <article className="zenn-article">
                {/* レッスンタイトル */}
                {currentLesson && (
                  <div className="mb-8">
                      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground tracking-tight">
                        {currentLesson.title}
                      </h1>
                      {currentLesson.description && (
                        <p className="text-lg text-muted-foreground mb-4">
                          {currentLesson.description}
                        </p>
                      )}
                      {(currentLesson.duration || currentLesson.slides) && (
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                <div key={lessonId} className="prose prose-slate dark:prose-invert max-w-none">
                  {renderContent()}
                </div>
                
                {/* ナビゲーションボタン - Zenn風 */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => {
                      // 即座にトップにスクロール（遷移前）
                      window.scrollTo(0, 0);
                      document.documentElement.scrollTop = 0;
                      document.body.scrollTop = 0;
                      
                      if (previousLesson) {
                        setLocation(`/courses/${courseId}/lessons/${previousLesson.id}`);
                      }
                      
                      // 遷移後にも確実にスクロール位置をリセット
                      // useLayoutEffectとuseEffectが実行されるまでの間も確実にリセット
                      // 複数のタイミングで実行して確実にリセット
                      const scrollToTop = () => {
                        window.scrollTo(0, 0);
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                      };
                      
                      // 即座に実行
                      scrollToTop();
                      
                      // 次のフレームで実行
                      requestAnimationFrame(() => {
                        scrollToTop();
                        requestAnimationFrame(() => {
                          scrollToTop();
                        });
                      });
                      
                      // DOM更新を待ってから実行
                      setTimeout(scrollToTop, 0);
                      setTimeout(scrollToTop, 10);
                      setTimeout(scrollToTop, 50);
                      setTimeout(scrollToTop, 100);
                      setTimeout(scrollToTop, 200);
                      setTimeout(scrollToTop, 300);
                    }}
                    disabled={!previousLesson}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    前のステップ
                  </Button>
                  <Button
                    onClick={() => {
                      // レッスン完了を記録
                      addXP(10, "レッスン完了");
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
                      
                      // 即座にトップにスクロール（遷移前）
                      window.scrollTo(0, 0);
                      document.documentElement.scrollTop = 0;
                      document.body.scrollTop = 0;
                      
                      // 次のレッスンがあれば遷移
                      if (nextLesson) {
                        setLocation(`/courses/${courseId}/lessons/${nextLesson.id}`);
                      } else {
                        setLocation(`/courses/${courseId}`);
                      }
                      
                      // 遷移後にも確実にスクロール位置をリセット
                      // useLayoutEffectとuseEffectが実行されるまでの間も確実にリセット
                      // 複数のタイミングで実行して確実にリセット
                      const scrollToTop = () => {
                        window.scrollTo(0, 0);
                        document.documentElement.scrollTop = 0;
                        document.body.scrollTop = 0;
                      };
                      
                      // 即座に実行
                      scrollToTop();
                      
                      // 次のフレームで実行
                      requestAnimationFrame(() => {
                        scrollToTop();
                        requestAnimationFrame(() => {
                          scrollToTop();
                        });
                      });
                      
                      // DOM更新を待ってから実行
                      setTimeout(scrollToTop, 0);
                      setTimeout(scrollToTop, 10);
                      setTimeout(scrollToTop, 50);
                      setTimeout(scrollToTop, 100);
                      setTimeout(scrollToTop, 200);
                      setTimeout(scrollToTop, 300);
                    }}
                    disabled={!nextLesson && currentLessonIndex === totalLessons - 1}
                    className="flex items-center gap-2"
                  >
                    {nextLesson ? (
                      <>
                        次のステップ
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        終了
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </article>
            </main>

            {/* サイドバー（目次） - Zenn風 */}
            <aside className="fixed lg:static inset-y-0 left-0 z-50 lg:z-0
            w-80 lg:w-80 flex-shrink-0
            transform transition-transform duration-200 ease-out
            -translate-x-full lg:translate-x-0
            bg-neutral-50 dark:bg-neutral-900 lg:bg-transparent">
              <div className="h-full lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] overflow-y-auto p-4 lg:p-0">
                <nav className="space-y-6">
                  {sections.length > 0 ? (
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                        目次
                      </h3>
                      <div className="space-y-0.5">
                        {sections.map((section) => {
                          const isActive = activeSection === section.id;
                          return (
                            <a
                              key={section.id}
                              href={`#${section.id}`}
                              onClick={(e) => scrollToSection(section.id, e)}
                              className={`block text-sm transition-colors relative py-1.5 px-0 ${
                                section.level === 3 ? "pl-4 text-xs" : "pl-0"
                              } ${
                                isActive
                                  ? "text-foreground font-medium"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                              style={{
                                lineHeight: '1.5',
                              }}
                            >
                            {isActive && (
                              <span 
                                className="absolute left-0 top-1 bottom-1 w-0.5 bg-border rounded-full" 
                              />
                            )}
                              <span className="block truncate" style={{ lineHeight: '1.5' }}>
                                {section.title}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                        目次
                      </h3>
                      <p className="text-sm text-muted-foreground">目次はありません</p>
                    </div>
                  )}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
