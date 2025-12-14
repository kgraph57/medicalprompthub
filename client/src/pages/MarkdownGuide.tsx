import { useRoute, useLocation } from "wouter";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { ArrowLeft, Clock, Loader2, ChevronRight, ChevronLeft, Menu, X, Circle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateSEO } from "@/lib/seo";
import { CodeBlock } from '@/components/CodeBlock';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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
        const filePath = `/medicalprompthub${metadata.basePath}/${step.file}`;
        
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
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

  const goToPrevious = () => {
    if (hasPrevious) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-2.5">
          <div className="flex items-center gap-2">
            {/* Hamburger Menu Button - Mobile Only */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex-shrink-0 h-7 w-7"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => navigate('/guides')}
              className="flex items-center flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">ガイド一覧に戻る</span>
            </Button>
            <h1 className="text-sm sm:text-base lg:text-xl font-bold text-gray-900 dark:text-white truncate">
              {metadata.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Fixed Navigation */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 lg:z-0
            w-80 lg:w-80 flex-shrink-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            bg-gray-50 dark:bg-gray-900 lg:bg-transparent
          `}>
            <div className="h-full lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] overflow-y-auto p-4 lg:p-0">
              {/* Close Button - Mobile Only */}
              <div className="lg:hidden flex justify-end mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="h-7 w-7"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {/* Progress Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  進捗状況
                </h3>
                <div className="mb-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {completedCount} / {totalSteps} 完了
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-6">
                {/* Introduction Link */}
                {metadata.steps[0]?.id === '00-introduction' && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <button
                      onClick={() => {
                        setCurrentStep(0);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        currentStep === 0
                          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-medium">イントロダクション</div>
                    </button>
                  </div>
                )}

                {/* Group steps by phase (基本編, 実践編, 応用編) */}
                {(() => {
                  // ステップをフェーズごとにグループ化
                  const otherSteps = metadata.steps.filter((step, index) => step.id !== '00-introduction' || index !== 0);
                  const phases: Array<{ title: string; steps: Array<{ step: typeof metadata.steps[0]; index: number }> }> = [];
                  
                  otherSteps.forEach((step, filteredIndex) => {
                    const originalIndex = metadata.steps.findIndex(s => s.id === step.id);
                    // タイトルからフェーズ名を抽出（例: "基本編 - ステップ1" -> "基本編"）
                    const phaseMatch = step.title.match(/^(基本編|実践編|応用編)/);
                    const phaseTitle = phaseMatch ? phaseMatch[1] : 'その他';
                    
                    let phase = phases.find(p => p.title === phaseTitle);
                    if (!phase) {
                      phase = { title: phaseTitle, steps: [] };
                      phases.push(phase);
                    }
                    phase.steps.push({ step, index: originalIndex });
                  });

                  return phases.map((phase, phaseIndex) => (
                    <div key={phase.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm font-bold">
                          {phaseIndex + 1}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {phase.title}
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {phase.steps.map(({ step, index: originalIndex }) => {
                          const isCompleted = completedSteps.has(originalIndex);
                          const isCurrent = currentStep === originalIndex;
                          return (
                            <div key={step.id} className="flex items-center gap-2">
                              <button
                                onClick={() => toggleComplete(originalIndex)}
                                className="flex-shrink-0"
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-400" />
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  setCurrentStep(originalIndex);
                                  setIsSidebarOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors break-words ${
                                  isCurrent
                                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                              >
                                <div className="font-medium">
                                  {step.title.replace(/^(基本編|実践編|応用編) - /, '')}
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </nav>
            </div>
          </aside>

          {/* Right Content - Scrollable Article */}
          <main className="flex-1 min-w-0">
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
              <article className="zenn-article">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-16 text-foreground scroll-mt-20 tracking-tight" {...props} />
                    ),
                    h2: ({ node, ...props }) => {
                      const id = typeof props.children === 'string' 
                        ? props.children.toLowerCase().replace(/\s+/g, '-')
                        : undefined;
                      return (
                        <h2
                          id={id}
                          className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-foreground scroll-mt-20 tracking-tight"
                          {...props}
                        />
                      );
                    },
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl md:text-2xl font-semibold mt-12 mb-6 text-foreground scroll-mt-20 tracking-tight" {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4 className="text-lg md:text-xl font-semibold mt-10 mb-4 text-foreground scroll-mt-20" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-6 text-lg md:text-xl text-foreground leading-[1.85] max-w-[65ch]" {...props} />
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
                        return <code className="bg-muted/80 px-2 py-1 rounded-md text-base font-mono border border-border/50" {...props}>{children}</code>;
                      }
                      return (
                        <CodeBlock className={className}>
                          {String(children).replace(/\n$/, '')}
                        </CodeBlock>
                      );
                    },
                    pre: ({ node, ...props }) => (
                      <pre className="bg-muted/80 p-6 rounded-xl overflow-x-auto my-8 border border-border/50 shadow-sm" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-4 border-primary pl-6 italic my-8 text-lg md:text-xl text-muted-foreground leading-[1.85] bg-accent/30 py-4 pr-4 rounded-r-lg" {...props} />
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </article>
            )}

            {/* Navigation and Completion Buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {/* Previous Button */}
              <Button
                onClick={goToPrevious}
                disabled={!hasPrevious}
                variant="outline"
                size="lg"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                前へ
              </Button>

              {/* Next Button */}
              <Button
                onClick={goToNext}
                disabled={!hasNext}
                variant="default"
                size="lg"
              >
                次へ
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
