import { useRoute, useLocation } from "wouter";
import { useState, useEffect } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { ArrowLeft, Clock, Loader2, ChevronRight, ChevronLeft, Menu, X, Circle, CheckCircle2, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateSEO } from "@/lib/seo";
import { CodeBlock } from '@/components/CodeBlock';
import { Layout, useSidebar, useToc } from '@/components/Layout';

// 絵文字を削除する関数
function removeEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

// ガイドのメタデータ定義
const guideMetadata: Record<string, {
  title: string;
  description: string;
  readTime: string;
  category: string;
  basePath: string;
  steps: Array<{ id: string; title: string; file: string }>;
}> = {
  "conference-presentation": {
    title: "カンファレンス発表資料作成支援",
    description: "AIを活用した効果的なカンファレンス発表資料の作成",
    readTime: "40 min",
    category: "Presentation",
    basePath: "/assets/guides/conference-presentation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "differential-diagnosis": {
    title: "鑑別診断リスト生成",
    description: "AIによる包括的な鑑別診断リストの作成",
    readTime: "30 min",
    category: "Clinical",
    basePath: "/assets/guides/differential-diagnosis",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "patient-explanation": {
    title: "患者説明シナリオ作成",
    description: "わかりやすく、配慮の行き届いた患者説明の作成",
    readTime: "40 min",
    category: "Clinical",
    basePath: "/assets/guides/patient-explanation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "literature-search": {
    title: "論文検索・読解サポート",
    description: "AIを活用した効率的な文献検索と読解",
    readTime: "40 min",
    category: "Research",
    basePath: "/assets/guides/literature-search",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "medical-documents": {
    title: "診断書・紹介状作成支援",
    description: "AIで医療文書作成を効率化・標準化",
    readTime: "40 min",
    category: "Clinical",
    basePath: "/assets/guides/medical-documents",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "polypharmacy-support": {
    title: "ポリファーマシー対策支援",
    description: "多剤併用の適正化を支援",
    readTime: "40 min",
    category: "臨床",
    basePath: "/assets/guides/polypharmacy-support",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "medical-news-commentary": {
    title: "医療ニュース・トピック解説",
    description: "最新の医療ニュースをわかりやすく解説",
    readTime: "25 min",
    category: "研究",
    basePath: "/assets/guides/medical-news-commentary",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "medical-safety-manual": {
    title: "医療安全マニュアル作成",
    description: "実践的な医療安全マニュアルの作成",
    readTime: "45 min",
    category: "臨床",
    basePath: "/assets/guides/medical-safety-manual",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "medical-statistics-consultation": {
    title: "医療統計・データ分析相談",
    description: "AIを活用した医療統計の理解と分析",
    readTime: "45 min",
    category: "研究",
    basePath: "/assets/guides/medical-statistics-consultation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "image-diagnosis-report-reading": {
    title: "画像診断レポート読解支援",
    description: "画像診断レポートの理解を深める",
    readTime: "30 min",
    category: "臨床",
    basePath: "/assets/guides/image-diagnosis-report-reading",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "conference-presentation-slides": {
    title: "学会発表スライド作成支援",
    description: "インパクトのある学会発表スライドの作成",
    readTime: "45 min",
    category: "発表",
    basePath: "/assets/guides/conference-presentation-slides",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "clinical-trial-search": {
    title: "臨床試験検索支援",
    description: "効率的な臨床試験情報の検索",
    readTime: "30 min",
    category: "研究",
    basePath: "/assets/guides/clinical-trial-search",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "consultation-email": {
    title: "コンサルテーションメール作成",
    description: "専門医へのコンサルテーションメール作成",
    readTime: "25 min",
    category: "臨床",
    basePath: "/assets/guides/consultation-email",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "ethics-review-application": {
    title: "倫理審査申請書作成",
    description: "研究倫理審査申請書の作成支援",
    readTime: "45 min",
    category: "研究",
    basePath: "/assets/guides/ethics-review-application",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "guideline-comparison": {
    title: "ガイドライン比較分析",
    description: "複数のガイドラインを比較分析",
    readTime: "40 min",
    category: "研究",
    basePath: "/assets/guides/guideline-comparison",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "incident-report-creation": {
    title: "インシデントレポート作成",
    description: "医療安全のためのインシデントレポート作成",
    readTime: "30 min",
    category: "臨床",
    basePath: "/assets/guides/incident-report-creation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "infection-control-manual": {
    title: "感染対策マニュアル作成",
    description: "実践的な感染対策マニュアルの作成",
    readTime: "45 min",
    category: "臨床",
    basePath: "/assets/guides/infection-control-manual",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "multilingual-medical-consultation": {
    title: "多言語医療相談支援",
    description: "外国人患者への医療相談支援",
    readTime: "35 min",
    category: "臨床",
    basePath: "/assets/guides/multilingual-medical-consultation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "new-drug-information": {
    title: "新薬情報整理",
    description: "新薬の情報を効率的に整理",
    readTime: "30 min",
    category: "研究",
    basePath: "/assets/guides/new-drug-information",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "palliative-care-planning": {
    title: "緩和ケア計画立案",
    description: "患者中心の緩和ケア計画の立案",
    readTime: "40 min",
    category: "臨床",
    basePath: "/assets/guides/palliative-care-planning",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "patient-education-materials": {
    title: "患者教育資料作成",
    description: "わかりやすい患者教育資料の作成",
    readTime: "35 min",
    category: "臨床",
    basePath: "/assets/guides/patient-education-materials",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "post-discharge-follow-up": {
    title: "退院後フォローアップ計画",
    description: "効果的な退院後フォローアップ計画の作成",
    readTime: "30 min",
    category: "臨床",
    basePath: "/assets/guides/post-discharge-follow-up",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "rare-disease-information": {
    title: "希少疾患情報収集",
    description: "希少疾患の情報を効率的に収集",
    readTime: "35 min",
    category: "研究",
    basePath: "/assets/guides/rare-disease-information",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "research-protocol": {
    title: "研究プロトコル作成",
    description: "研究プロトコルの作成支援",
    readTime: "45 min",
    category: "研究",
    basePath: "/assets/guides/research-protocol",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "case-report": {
    title: "症例報告執筆ガイド",
    description: "AI活用により、従来の90%の時間を削減する革新的ワークフロー",
    readTime: "40 min",
    category: "研究",
    basePath: "/assets/guides/case-report",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-preparation-step-01", title: "準備編 - ステップ1", file: "01-preparation/step-01.md" },
      { id: "01-preparation-step-02", title: "準備編 - ステップ2", file: "01-preparation/step-02.md" },
      { id: "01-preparation-step-03", title: "準備編 - ステップ3", file: "01-preparation/step-03.md" },
      { id: "01-preparation-step-04", title: "準備編 - ステップ4", file: "01-preparation/step-04.md" },
      { id: "01-preparation-step-05", title: "準備編 - ステップ5", file: "01-preparation/step-05.md" },
      { id: "02-writing-step-06", title: "執筆編 - ステップ6", file: "02-writing/step-06.md" },
      { id: "02-writing-step-07", title: "執筆編 - ステップ7", file: "02-writing/step-07.md" },
      { id: "02-writing-step-08", title: "執筆編 - ステップ8", file: "02-writing/step-08.md" },
      { id: "02-writing-step-09", title: "執筆編 - ステップ9", file: "02-writing/step-09.md" },
      { id: "02-writing-step-10", title: "執筆編 - ステップ10", file: "02-writing/step-10.md" },
      { id: "02-writing-step-11", title: "執筆編 - ステップ11", file: "02-writing/step-11.md" },
      { id: "02-writing-step-12", title: "執筆編 - ステップ12", file: "02-writing/step-12.md" },
      { id: "03-finishing-step-13", title: "仕上げ編 - ステップ13", file: "03-finishing/step-13.md" },
      { id: "03-finishing-step-14", title: "仕上げ編 - ステップ14", file: "03-finishing/step-14.md" },
      { id: "03-finishing-step-15", title: "仕上げ編 - ステップ15", file: "03-finishing/step-15.md" },
      { id: "03-finishing-step-16", title: "仕上げ編 - ステップ16", file: "03-finishing/step-16.md" },
      { id: "03-finishing-step-17", title: "仕上げ編 - ステップ17", file: "03-finishing/step-17.md" },
      { id: "04-submission-step-18", title: "投稿編 - ステップ18", file: "04-submission/step-18.md" }
    ]
  },
  "ai-paper-writing": {
    title: "AI論文執筆ガイド",
    description: "MARW原則に基づく責任あるAI論文執筆",
    readTime: "60 min",
    category: "研究",
    basePath: "/assets/guides/ai-paper-writing",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "marw_workflow", title: "MARWワークフロー", file: "marw_workflow.md" },
      { id: "marw_stage1", title: "Stage 1: 研究計画とデータ収集", file: "marw_stage1.md" },
      { id: "marw_stage2", title: "Stage 2: データ分析と結果の解釈", file: "marw_stage2.md" },
      { id: "marw_stage3", title: "Stage 3: AIを活用した執筆", file: "marw_stage3.md" },
      { id: "marw_stage4", title: "Stage 4: ファクトチェックと検証", file: "marw_stage4.md" },
      { id: "marw_stage5", title: "Stage 5: 共著者レビューと改訂", file: "marw_stage5.md" },
      { id: "marw_stage6", title: "Stage 6: 最終確認と投稿準備", file: "marw_stage6.md" },
      { id: "marw_stage7", title: "Stage 7: 投稿後の対応", file: "marw_stage7.md" }
    ]
  },
  "paper-reading": {
    title: "論文読解ガイド",
    description: "AIを活用した効率的な論文読解法",
    readTime: "35 min",
    category: "研究",
    basePath: "/assets/guides/paper-reading",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-preparation-step-01", title: "準備編 - ステップ1", file: "01-preparation/step-01.md" },
      { id: "02-reading-step-02", title: "読解編 - ステップ2", file: "02-reading/step-02.md" },
      { id: "03-analysis-step-03", title: "分析編 - ステップ3", file: "03-analysis/step-03.md" },
      { id: "04-critical-appraisal-step-04", title: "批判的吉味編 - ステップ4", file: "04-critical-appraisal/step-04.md" },
      { id: "05-summary-step-05", title: "まとめ編 - ステップ5", file: "05-summary/step-05.md" }
    ]
  },
  "tone-manner-guidelines": {
    title: "トーンマナー修正ガイドライン",
    description: "読みやすく、親しみやすいドキュメントを作成するための指示書",
    readTime: "60 min",
    category: "文書作成",
    basePath: "/assets/guides/tone-manner-guidelines",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "step-01", title: "ステップ1: 目標とする文体を理解する", file: "step-01.md" },
      { id: "step-02", title: "ステップ2: 修正の具体的ルールを学ぶ", file: "step-02.md" },
      { id: "step-03", title: "ステップ3: 避けるべき表現を確認する", file: "step-03.md" },
      { id: "step-04", title: "ステップ4: 修正の手順を実践する", file: "step-04.md" },
      { id: "step-05", title: "ステップ5: 図解を挿入する", file: "step-05.md" }
    ]
  }
};

export default function MarkdownGuide() {
  const [, params] = useRoute("/guides/:guideId");
  const [, setLocation] = useLocation();
  const navigate = (path: string) => setLocation(path);
  const guideId = params?.guideId || "";
  
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar(); // Layoutコンポーネントから状態を取得
  const { setTocItems } = useToc(); // 目次データを設定

  const metadata = guideMetadata[guideId];

  // LocalStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem(`markdown-guide-progress-${guideId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse progress:', e);
      }
    }
  }, [guideId]);

  // 進捗をLocalStorageに保存
  useEffect(() => {
    localStorage.setItem(`markdown-guide-progress-${guideId}`, JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps, guideId]);

  // SEO設定
  useEffect(() => {
    if (metadata) {
      updateSEO({
        title: `${metadata.title} | Helix`,
        description: metadata.description,
        path: `/guides/${guideId}`,
        keywords: `${metadata.title},医療AI,プロンプト,ワークフロー`
      });
    }
  }, [guideId, metadata]);

  // 目次データを設定
  useEffect(() => {
    if (metadata && metadata.steps) {
      const tocItems = metadata.steps.map((step, index) => ({
        id: step.id || `step-${index}`,
        title: step.title.replace(/^(基本編|実践編|応用編) - /, ''),
        level: 2,
        onClick: () => {
          setCurrentStep(index);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        isActive: currentStep === index,
      }));
      setTocItems(tocItems);
    } else {
      setTocItems([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata, currentStep, setTocItems]);

  useEffect(() => {
    const loadContent = async () => {
      if (!metadata) {
        setError("ガイドが見つかりません");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const step = metadata.steps[currentStep];
        // GitHub Pagesのベースパスを考慮
        const basePath = import.meta.env.VITE_BASE_PATH || '/Helix/';
        const filePath = `${basePath.replace(/\/$/, '')}${metadata.basePath}/${step.file}`;
        
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        
        const text = await response.text();
        
        // 読み込んだマークダウンファイルにHTMLコードが含まれている場合はフィルタリング
        // HTMLコードブロックを検出して削除
        const htmlCodeBlockPattern = /```[\s\S]*?```/g;
        let filteredText = text;
        const matches = text.match(htmlCodeBlockPattern);
        
        if (matches) {
          matches.forEach((match) => {
            // HTMLコードが含まれているかチェック
            const hasViteClient = /vite\/client|@vite\/client|spa-github-pages|window\.history\.replaceState|rafgraph|MIT License|Start Single Page Apps|Cache-Control|Pragma|Expires|no-cache|no-store|must-revalidate/i.test(match);
            const hasHTMLStructure = /(&lt;|<)(!DOCTYPE|html|head|body|script.*type.*module|meta.*charset|Single Page Apps for GitHub Pages)/i.test(match);
            const htmlTagCount = (match.match(/(&lt;|<)\/?[a-z]+/gi) || []).length;
            
            // 医療関連のキーワードをチェック
            const medicalKeywords = [
              'プロンプト', '指示', '例', '実践', 'AI', 'ChatGPT', 'Claude', '患者', '症例', 
              'メール', 'コンサルト', '専門医', '医療', '診断', '治療', '臨床', '医師', '病院', 
              '診療', '疾患', '症状', '検査', '薬剤', '手術', '入院', '退院', '診察', '診断書',
              '紹介状', 'カルテ', 'SOAP', 'バイタル', '所見', '経過', '既往歴', '現病歴'
            ];
            const hasMedicalContent = medicalKeywords.some(keyword => match.includes(keyword));
            
            // 本のサンプルコード（HTMLコードのみ）の場合は削除
            if ((hasViteClient || hasHTMLStructure || htmlTagCount >= 3) && !hasMedicalContent && match.length > 200) {
              filteredText = filteredText.replace(match, '');
            }
          });
        }
        
        setContent(filteredText);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError("コンテンツの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [guideId, currentStep, metadata]);

  const toggleComplete = (stepIndex: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepIndex)) {
        newSet.delete(stepIndex);
      } else {
        newSet.add(stepIndex);
      }
      return newSet;
    });
  };

  if (!metadata) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">ガイドが見つかりません</p>
        </div>
      </div>
    );
  }

  const totalSteps = metadata.steps.length;
  const completedCount = completedSteps.size;
  const progressPercentage = (completedCount / totalSteps) * 100;
  const hasPrevious = currentStep > 0;
  const hasNext = currentStep < totalSteps - 1;

  // currentStepが変更されたらスクロール位置をトップにリセット
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const goToPrevious = () => {
    if (hasPrevious) {
      setCurrentStep(currentStep - 1);
      // 同時にスクロール位置をトップにリセット
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (hasNext) {
      setCurrentStep(currentStep + 1);
      // ページ遷移後にヘッダーにスクロール
      setTimeout(() => {
        const scrollToHeader = () => {
          const header = document.getElementById('page-header');
          if (header) {
            const headerTop = header.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: headerTop - 20, behavior: 'smooth' });
          } else {
            // ヘッダーが見つからない場合は少し待って再試行
            setTimeout(scrollToHeader, 100);
          }
        };
        scrollToHeader();
      }, 300);
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Table of Contents Dropdown */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* TOC Dropdown Container - positioned near the header button */}
          <div 
            className="fixed top-[112px] right-4 z-[100] lg:hidden w-[350px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-5rem)] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[calc(100vh-5rem)] p-4">
              {/* Page Top Button */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                  <span>ページトップへ</span>
                </button>
              </div>
              
              {/* Table of Contents */}
              <nav className="space-y-0">
                {metadata.steps.map((step, index) => {
                  const isCurrent = currentStep === index;
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        setCurrentStep(index);
                        setIsSidebarOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left py-2 px-0 text-sm transition-colors break-words flex items-start gap-2 ${
                        isCurrent
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {isCurrent && (
                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      )}
                      {!isCurrent && (
                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5"></span>
                      )}
                      <span className="leading-relaxed">
                        {step.title.replace(/^(基本編|実践編|応用編) - /, '')}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="w-full max-w-full lg:max-w-[1800px] xl:max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-10 py-4 sm:py-6 lg:py-8 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-4 relative">
          {/* Right Content - Scrollable Article */}
          <main className="flex-1 min-w-0 order-2 lg:order-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  再読み込み
                </Button>
              </div>
            ) : (
              <>
                <article className="zenn-article">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    h1: ({ node, ...props }: any) => {
                      const children = React.Children.map(props.children, (child) => {
                        if (typeof child === 'string') {
                          return removeEmojis(child);
                        }
                        return child;
                      });
                      return (
                        <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-4 text-foreground scroll-mt-20 tracking-tight" {...props}>
                          {children}
                        </h1>
                      );
                    },
                    h2: ({ node, ...props }: any) => {
                      const title = typeof props.children === 'string' ? removeEmojis(props.children) : props.children?.toString() || '';
                      const id = typeof title === 'string' 
                        ? title.toLowerCase().replace(/\s+/g, '-')
                        : undefined;
                      const children = React.Children.map(props.children, (child) => {
                        if (typeof child === 'string') {
                          return removeEmojis(child);
                        }
                        return child;
                      });
                      return (
                        <h2
                          id={id}
                          className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-foreground scroll-mt-20 tracking-tight"
                          {...props}
                        >
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ node, ...props }: any) => {
                      const children = React.Children.map(props.children, (child) => {
                        if (typeof child === 'string') {
                          return removeEmojis(child);
                        }
                        return child;
                      });
                      return (
                        <h3 className="text-xl md:text-2xl font-semibold mt-12 mb-6 text-foreground scroll-mt-20 tracking-tight" {...props}>
                          {children}
                        </h3>
                      );
                    },
                    h4: ({ node, ...props }: any) => {
                      const children = React.Children.map(props.children, (child) => {
                        if (typeof child === 'string') {
                          return removeEmojis(child);
                        }
                        return child;
                      });
                      return (
                        <h4 className="text-lg md:text-xl font-semibold mt-10 mb-4 text-foreground scroll-mt-20" {...props}>
                          {children}
                        </h4>
                      );
                    },
                    p: ({ node, ...props }) => (
                      <p className="mb-6 text-lg md:text-xl text-foreground leading-[1.85]" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-8 mb-6 space-y-3" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-8 mb-6 space-y-3" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="text-lg md:text-xl text-foreground leading-[1.85] pl-2" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-semibold text-foreground" {...props} />
                    ),
                    code({ node, className, children, ...props }: any) {
                      const inline = (props as any).inline;
                      if (inline) {
                        return <code className="bg-muted/80 px-2 py-1 rounded-md text-base font-mono" {...props}>{children}</code>;
                      }
                      return (
                        <CodeBlock className={className}>
                          {String(children).replace(/\n$/, '')}
                        </CodeBlock>
                      );
                    },
                    pre: ({ node, ...props }) => (
                      <pre className="bg-muted/80 p-6 rounded-xl overflow-x-auto my-8 shadow-sm" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="pl-6 italic my-8 text-lg md:text-xl text-muted-foreground leading-[1.85] bg-accent/30 py-4 pr-4 rounded-r-lg" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
              </>
            )}

            {/* Navigation Buttons */}
            {metadata && (
            <div className="mt-8 flex items-center justify-between gap-4">
              {/* Previous Button */}
              <Button
                onClick={goToPrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="h-9"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                前へ
              </Button>

              {/* Next Button */}
              <Button
                onClick={goToNext}
                  disabled={currentStep >= metadata.steps.length - 1}
                  variant="outline"
                className="h-9"
              >
                次へ
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            )}
          </main>

          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:static w-64 flex-shrink-0 order-2">
            <div className="h-full sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {/* Page Top Button - Zenn style */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-1.5
                    text-sm text-gray-600 dark:text-gray-400
                    hover:text-gray-900 dark:hover:text-gray-200
                    transition-colors
                  "
                >
                  <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                  <span>ページトップへ</span>
                </button>
              </div>
              
              {/* Table of Contents - Zenn style */}
              <nav className="space-y-0">
                {metadata.steps.map((step, index) => {
                  const isCurrent = currentStep === index;
                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        setCurrentStep(index);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left py-2 px-0 text-sm transition-colors break-words flex items-start gap-2 ${
                        isCurrent
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {isCurrent && (
                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                      )}
                      {!isCurrent && (
                        <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5"></span>
                      )}
                      <span className="leading-relaxed">
                        {step.title.replace(/^(基本編|実践編|応用編) - /, '')}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </Layout>
  );
}
