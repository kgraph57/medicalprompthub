import { useRoute, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
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
      { id: "marw_workflow", title: "医療AI論文執筆ワークフロー", file: "marw_workflow.md" },
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
  },
  "systematic-review-meta-analysis": {
    title: "【上級者向け】システマティックレビュー・メタアナリシス作成ガイド",
    description: "PRISMAガイドラインに準拠したシステマティックレビューとメタアナリシスの作成方法。文献検索から統計的統合、論文投稿まで完全サポート。",
    readTime: "35 min",
    category: "Research",
    basePath: "/assets/guides/systematic-review-meta-analysis",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-preparation-step-01", title: "ステップ1: 研究課題の明確化（PICO形式）", file: "01-preparation/step-01.md" },
      { id: "02-search-step-02", title: "ステップ2: 文献検索戦略の設計", file: "02-search/step-02.md" },
      { id: "03-screening-step-03", title: "ステップ3: 文献スクリーニング", file: "03-screening/step-03.md" },
      { id: "04-data-extraction-step-04", title: "ステップ4: データ抽出", file: "04-data-extraction/step-04.md" },
      { id: "05-quality-assessment-step-05", title: "ステップ5: 研究の質の評価", file: "05-quality-assessment/step-05.md" },
      { id: "06-meta-analysis-step-06", title: "ステップ6: メタアナリシス（統計的統合）", file: "06-meta-analysis/step-06.md" },
      { id: "07-reporting-step-07", title: "ステップ7: 結果の報告（PRISMAガイドライン準拠）", file: "07-reporting/step-07.md" },
      { id: "08-submission-step-08", title: "ステップ8: 論文の投稿準備", file: "08-submission/step-08.md" }
    ]
  },
  "data-visualization-figures": {
    title: "【初心者向け】データ可視化・図表作成ガイド（論文用）",
    description: "論文に掲載する高品質な図表の作成方法。適切なグラフの選択、統計的表現、Figure Legendの書き方、表の作成まで完全サポート。",
    readTime: "18 min",
    category: "Research",
    basePath: "/assets/guides/data-visualization-figures",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: データの種類と適切なグラフの選択", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: 統計的表現の方法", file: "02-basics/step-02.md" },
      { id: "03-practice-step-03", title: "ステップ3: Figure Legendの書き方", file: "03-practice/step-03.md" },
      { id: "04-practice-step-04", title: "ステップ4: 表の作成方法", file: "04-practice/step-04.md" },
      { id: "05-reference-step-05", title: "ステップ5: 実践的なワークフロー", file: "05-reference/step-05.md" }
    ]
  },
  "grant-application": {
    title: "【中級者向け】グラント申請書作成ガイド（科研費・厚労科研）",
    description: "科研費や厚労科研などのグラント申請書の作成方法。研究計画書、予算計画、研究体制、期待される成果まで完全サポート。",
    readTime: "28 min",
    category: "Research",
    basePath: "/assets/guides/grant-application",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-preparation-step-01", title: "ステップ1: 申請書の構成と要件の確認", file: "01-preparation/step-01.md" },
      { id: "02-planning-step-02", title: "ステップ2: 研究計画書の作成", file: "02-planning/step-02.md" },
      { id: "03-budget-step-03", title: "ステップ3: 予算計画の作成", file: "03-budget/step-03.md" },
      { id: "04-team-step-04", title: "ステップ4: 研究体制の構築", file: "04-team/step-04.md" },
      { id: "05-outcomes-step-05", title: "ステップ5: 期待される成果の明確化", file: "05-outcomes/step-05.md" },
      { id: "06-finalization-step-06", title: "ステップ6: 申請書の最終確認と提出", file: "06-finalization/step-06.md" }
    ]
  },
  "observational-study-design": {
    title: "【中級者向け】観察研究デザインガイド",
    description: "コホート研究・ケースコントロール研究の設計方法。研究デザインの選択、サンプルサイズ計算、バイアス対策、倫理審査申請まで完全サポート。",
    readTime: "22 min",
    category: "Research",
    basePath: "/assets/guides/observational-study-design",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: 研究デザインの選択", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: サンプルサイズ計算", file: "02-basics/step-02.md" },
      { id: "03-practice-step-03", title: "ステップ3: バイアス対策", file: "03-practice/step-03.md" },
      { id: "04-practice-step-04", title: "ステップ4: データ収集方法の設計", file: "04-practice/step-04.md" },
      { id: "05-reference-step-05", title: "ステップ5: 倫理審査申請", file: "05-reference/step-05.md" }
    ]
  },
  "poster-presentation": {
    title: "【初心者向け】ポスター発表作成ガイド",
    description: "学会でのポスター発表の作成方法。レイアウト設計、視認性の向上、情報の整理、質疑応答対策まで完全サポート。",
    readTime: "18 min",
    category: "Presentation",
    basePath: "/assets/guides/poster-presentation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: レイアウト設計", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: 情報の優先順位付け", file: "02-basics/step-02.md" },
      { id: "03-practice-step-03", title: "ステップ3: 視認性の向上", file: "03-practice/step-03.md" },
      { id: "04-practice-step-04", title: "ステップ4: 質疑応答対策", file: "04-practice/step-04.md" }
    ]
  },
  "clinical-reasoning": {
    title: "【中級者向け】臨床推論プロセス（Clinical Reasoning）ガイド",
    description: "体系的で効率的な臨床推論の方法。仮説生成、情報収集の優先順位、診断の絞り込み、見逃し防止まで完全サポート。",
    readTime: "20 min",
    category: "Clinical",
    basePath: "/assets/guides/clinical-reasoning",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: 初期情報の整理と仮説生成", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: 情報収集の優先順位", file: "02-basics/step-02.md" },
      { id: "03-practice-step-03", title: "ステップ3: 診断の絞り込み", file: "03-practice/step-03.md" },
      { id: "04-practice-step-04", title: "ステップ4: 見逃し防止のチェック", file: "04-practice/step-04.md" },
      { id: "05-reference-step-05", title: "ステップ5: 臨床推論の実践的ワークフロー", file: "05-reference/step-05.md" }
    ]
  },
  "research-data-management": {
    title: "【中級者向け】研究データ管理ガイド",
    description: "研究データを効率的かつ安全に管理する方法。データ管理計画、収集と記録、保存とバックアップ、整理、共有と公開まで完全サポート。",
    readTime: "23 min",
    category: "Research",
    basePath: "/assets/guides/research-data-management",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-preparation-step-01", title: "ステップ1: データ管理計画の策定", file: "01-preparation/step-01.md" },
      { id: "02-collection-step-02", title: "ステップ2: データの収集と記録", file: "02-collection/step-02.md" },
      { id: "03-storage-step-03", title: "ステップ3: データの保存とバックアップ", file: "03-storage/step-03.md" },
      { id: "04-organization-step-04", title: "ステップ4: データの整理と整理", file: "04-organization/step-04.md" },
      { id: "05-sharing-step-05", title: "ステップ5: データの共有と公開", file: "05-sharing/step-05.md" }
    ]
  },
  "conference-to-paper": {
    title: "【実践】学会発表から論文投稿へのワークフロー",
    description: "学会発表の内容を効率的に論文に発展させる方法。発表内容の評価、論文への展開計画、追加データの収集、論文構成の設計、執筆の効率化、ジャーナル選定まで完全サポート。",
    readTime: "27 min",
    category: "Research",
    basePath: "/assets/guides/conference-to-paper",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-preparation-step-01", title: "ステップ1: 発表内容の評価と論文への展開可能性", file: "01-preparation/step-01.md" },
      { id: "02-planning-step-02", title: "ステップ2: 論文への展開計画の立案", file: "02-planning/step-02.md" },
      { id: "03-data-step-03", title: "ステップ3: 追加データの収集と解析", file: "03-data/step-03.md" },
      { id: "04-structure-step-04", title: "ステップ4: 論文構成の設計", file: "04-structure/step-04.md" },
      { id: "05-writing-step-05", title: "ステップ5: 論文執筆の効率化", file: "05-writing/step-05.md" },
      { id: "06-journal-step-06", title: "ステップ6: ジャーナル選定と投稿準備", file: "06-journal/step-06.md" }
    ]
  },
  "diagram-creation-guide": {
    title: "【ツール別】医学図解作成ガイド:Nanobanana活用",
    description: "NotebookLMのNanobananaを使って、病態生理、診断フロー、治療アルゴリズムなどを視覚的に説明する図解を作成します。",
    readTime: "12 min",
    category: "Presentation",
    basePath: "/assets/guides/diagram-creation-guide",
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
  "advanced-medical-illustration-guide": {
    title: "【応用編】高度な医学図解作成ガイド:BioRender風・Visual Abstract",
    description: "Nanobananaを使って、BioRender風の高品質な医学図解やVisual Abstractを作成する方法。世界標準のデザイン原則とプロンプトエンジニアリング技術を解説。",
    readTime: "20 min",
    category: "Presentation",
    basePath: "/assets/guides/advanced-medical-illustration-guide",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-biorender-style-step-01", title: "BioRender風図解の基本原則", file: "01-biorender-style/step-01.md" },
      { id: "02-visual-abstract-step-01", title: "Visual Abstractの作成", file: "02-visual-abstract/step-01.md" },
      { id: "03-advanced-techniques-step-01", title: "高度なプロンプトエンジニアリング", file: "03-advanced-techniques/step-01.md" }
    ]
  },
  "pubmed-search-guide": {
    title: "【完全版】PubMed検索ガイド:効率的な文献検索",
    description: "PICOに基づいた検索式の作成、MeSH termsの活用、検索結果の絞り込みまで。効率的に文献を見つけるための完全ガイド。",
    readTime: "12 min",
    category: "Research",
    basePath: "/assets/guides/pubmed-search-guide",
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
  // 新規追加ワークフロー
  "night-shift-handover": {
    title: "【実践】当直引き継ぎサマリー作成ガイド",
    description: "効率的で漏れのない当直引き継ぎ文書の作成方法。I-PASSフレームワークに基づいた安全な引き継ぎを実現。",
    readTime: "15 min",
    category: "Clinical",
    basePath: "/assets/guides/night-shift-handover",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: I-PASSフレームワークの理解", file: "01-basics/step-01.md" },
      { id: "02-practice-step-01", title: "ステップ2: 患者情報の構造化", file: "02-practice/step-01.md" },
      { id: "03-practice-step-02", title: "ステップ3: AIを活用した効率化", file: "03-practice/step-02.md" },
      { id: "04-reference-step-01", title: "ステップ4: 実践的なテンプレート", file: "04-reference/step-01.md" }
    ]
  },
  "surgical-record": {
    title: "【実践】手術記録・処置記録作成ガイド",
    description: "正確で効率的な手術記録・処置記録の作成方法。法的要件を満たしつつ、AIで作成時間を短縮。",
    readTime: "20 min",
    category: "Clinical",
    basePath: "/assets/guides/surgical-record",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: 手術記録の必須要素", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: 処置記録の構造化", file: "02-basics/step-02.md" },
      { id: "03-practice-step-01", title: "ステップ3: AIを活用した記録作成", file: "03-practice/step-01.md" },
      { id: "04-practice-step-02", title: "ステップ4: 術式別テンプレート", file: "04-practice/step-02.md" },
      { id: "05-reference-step-01", title: "ステップ5: 法的・保険請求上の注意点", file: "05-reference/step-01.md" }
    ]
  },
  "outpatient-preparation": {
    title: "【実践】外来予習ワークフロー",
    description: "次回外来患者の効率的な事前準備方法。限られた時間で最大限の準備を行うAI活用術。",
    readTime: "15 min",
    category: "Clinical",
    basePath: "/assets/guides/outpatient-preparation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: 外来予習の基本フレームワーク", file: "01-basics/step-01.md" },
      { id: "02-practice-step-01", title: "ステップ2: 患者情報の効率的な抽出", file: "02-practice/step-01.md" },
      { id: "03-practice-step-02", title: "ステップ3: 予習メモの作成", file: "03-practice/step-02.md" },
      { id: "04-reference-step-01", title: "ステップ4: 診療科別の予習ポイント", file: "04-reference/step-01.md" }
    ]
  },
  "bad-news-delivery": {
    title: "【コミュニケーション】Bad News Delivery（悪い知らせの伝え方）ガイド",
    description: "SPIKESプロトコルに基づく患者・家族への悪い知らせの伝え方。共感的で適切なコミュニケーションを実現。",
    readTime: "25 min",
    category: "Clinical",
    basePath: "/assets/guides/bad-news-delivery",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: SPIKESプロトコルの理解", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: 事前準備（Setting）", file: "02-basics/step-02.md" },
      { id: "03-practice-step-01", title: "ステップ3: 患者の認識確認（Perception）", file: "03-practice/step-01.md" },
      { id: "04-practice-step-02", title: "ステップ4: 情報提供と感情対応", file: "04-practice/step-02.md" },
      { id: "05-reference-step-01", title: "ステップ5: 状況別シナリオ集", file: "05-reference/step-01.md" }
    ]
  },
  "board-exam-preparation": {
    title: "【キャリア】専門医試験対策ガイド",
    description: "AIを活用した効率的な専門医試験の学習戦略。問題分析、弱点克服、暗記効率化を実現。",
    readTime: "30 min",
    category: "Research",
    basePath: "/assets/guides/board-exam-preparation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: 試験の傾向分析", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: 学習計画の立案", file: "02-basics/step-02.md" },
      { id: "03-practice-step-01", title: "ステップ3: AIを活用した問題演習", file: "03-practice/step-01.md" },
      { id: "04-practice-step-02", title: "ステップ4: 弱点の分析と克服", file: "04-practice/step-02.md" },
      { id: "05-reference-step-01", title: "ステップ5: 暗記効率化テクニック", file: "05-reference/step-01.md" },
      { id: "06-reference-step-02", title: "ステップ6: 試験直前の最終確認", file: "06-reference/step-02.md" }
    ]
  },
  "resident-training-plan": {
    title: "【教育】研修医指導計画作成ガイド",
    description: "効果的な研修医教育プログラムの設計方法。目標設定、評価方法、フィードバック技法を習得。",
    readTime: "25 min",
    category: "Research",
    basePath: "/assets/guides/resident-training-plan",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "ステップ1: 研修目標の設定（マイルストーン）", file: "01-basics/step-01.md" },
      { id: "02-basics-step-02", title: "ステップ2: 到達度評価の設計", file: "02-basics/step-02.md" },
      { id: "03-practice-step-01", title: "ステップ3: 効果的なフィードバック技法", file: "03-practice/step-01.md" },
      { id: "04-practice-step-02", title: "ステップ4: 困難な研修医への対応", file: "04-practice/step-02.md" },
      { id: "05-reference-step-01", title: "ステップ5: AIを活用した教育資料作成", file: "05-reference/step-01.md" }
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
  const isInReferencesSection = useRef(false); // 参考文献セクション内かどうかの状態

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
        title: `${metadata.title} | HELIX`,
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
        // 開発環境と本番環境でパスを調整
        const isProduction = import.meta.env.PROD;
        const basePath = isProduction 
          ? (import.meta.env.VITE_BASE_PATH || '/Helix/')
          : '';
        const filePath = `${basePath.replace(/\/$/, '')}${metadata.basePath}/${step.file}`;
        
        console.log('Loading file from:', filePath); // デバッグ用
        
        const response = await fetch(filePath);
        if (!response.ok) {
          console.error('Failed to load file:', filePath, 'Status:', response.status);
          throw new Error(`Failed to load: ${response.status} - ${filePath}`);
        }
        
        const text = await response.text();
        
        // 空のレスポンスやHTMLが返ってきた場合のチェック
        if (!text || text.trim().length === 0) {
          throw new Error('Empty response');
        }
        
        // HTMLが返ってきた場合（404ページなど）のチェック
        if (text.includes('<!DOCTYPE') || text.includes('<html') || text.includes('vite/client')) {
          console.error('HTML response received instead of markdown:', filePath);
          throw new Error('HTML response received instead of markdown');
        }
        
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
        isInReferencesSection.current = false; // マークダウン変更時に状態をリセット
      } catch (err) {
        console.error("Error loading markdown:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`コンテンツの読み込みに失敗しました: ${errorMessage}`);
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
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Mobile Table of Contents Dropdown */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* TOC Dropdown Container - positioned near the header button */}
          <div 
            className="fixed top-[112px] right-4 z-[100] lg:hidden w-[350px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-5rem)] bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[calc(100vh-5rem)] p-4">
              {/* Page Top Button */}
              <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
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
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
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
                <article key={currentStep} className="zenn-article">
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
                      const isReferences = title === '参考文献';
                      // 参考文献セクションの開始/終了を管理
                      if (isReferences) {
                        isInReferencesSection.current = true;
                      } else {
                        isInReferencesSection.current = false;
                      }
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
                          className={`text-2xl md:text-3xl font-bold mt-16 mb-8 text-foreground scroll-mt-20 tracking-tight ${isReferences ? 'text-sm md:text-base' : ''}`}
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
                      <p className={`mb-6 text-foreground leading-[1.85] ${isInReferencesSection.current ? 'text-xs md:text-sm' : 'text-lg md:text-xl'}`} {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className={`list-disc pl-8 mb-6 space-y-3 ${isInReferencesSection.current ? 'text-xs md:text-sm' : ''}`} {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className={`list-decimal pl-8 mb-6 space-y-3 ${isInReferencesSection.current ? 'text-xs md:text-sm' : ''}`} {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className={`text-foreground leading-[1.85] pl-2 ${isInReferencesSection.current ? 'text-xs md:text-sm' : 'text-lg md:text-xl'}`} {...props} />
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
                    img: ({ node, src, ...props }: any) => {
                      // 開発環境では /Helix/ プレフィックスを除去
                      const isProduction = import.meta.env.PROD;
                      let imageSrc = src;
                      if (!isProduction && src && src.startsWith('/Helix/')) {
                        imageSrc = src.replace('/Helix/', '/');
                      }
                      return (
                        <img className="w-full h-auto rounded-lg shadow-md my-8" src={imageSrc} {...props} />
                      );
                    },
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
              <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-1.5
                    text-sm text-neutral-600 dark:text-neutral-400
                    hover:text-neutral-900 dark:hover:text-neutral-200
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
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
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
