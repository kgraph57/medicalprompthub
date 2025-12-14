import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, BookOpen, FileText, Microscope, ClipboardList, Mail, Image, Presentation, Search, Stethoscope, Pill, X, Lock } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { updateSEO } from "@/lib/seo";

type SortOption = "title-asc" | "title-desc" | "readTime-asc" | "readTime-desc";

// 実装済みのガイドIDリスト
const IMPLEMENTED_GUIDES = [
  "case-report-complete",
  "paper-reading-efficiency",
  "english-proofreading-guide",
  "marw-complete",
  // 新規追加ガイド
  "conference-presentation",
  "differential-diagnosis",
  "patient-explanation",
  "literature-search",
  "medical-documents",
  "research-protocol",
  "conference-presentation-slides",
  "ethics-review-application",
  "new-drug-information",
  "rare-disease-information",
  "guideline-comparison",
  "multilingual-medical-consultation",
  "medical-news-commentary",
  "patient-education-materials",
  "incident-report-creation",
  "consultation-email",
  "clinical-trial-search",
  "medical-statistics-consultation",
  "image-diagnosis-report-reading",
  "post-discharge-follow-up",
  "medical-safety-manual",
  "infection-control-manual",
  "polypharmacy-support",
  "palliative-care-planning"
];

// Updated: 2025-12-07
export default function Guides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("title-asc");

  // SEO設定
  useEffect(() => {
    updateSEO({
      title: "ワークフローガイド | Helix",
      description: "症例報告、論文執筆、統計解析など、医療従事者が直面する複雑なタスクを段階的にサポートするワークフローガイド。AIを活用して効率的に作業を進める方法を学べます。",
      path: "/guides",
      keywords: "ワークフローガイド,症例報告,論文執筆,統計解析,医療研究,AI活用"
    });
  }, []);

  const guides = [
    {
      id: "marw-complete",
      title: "【最新版】AI論文執筆ワークフロー:MARW完全ガイド",
      description: "世界標準に準拠したAI駆動型論文執筆の7段階ワークフロー。ハーバード大学、JAMA、ICMJEのガイドラインに基づき、24個の実践的プロンプト例を提供。研究のアイデア創出から論文出版まで完全サポート。",
      category: "Research",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      readTime: "45 min read",
      tags: ["AI Paper Writing", "Research Workflow", "MARW", "AI Tools", "Academic Writing"]
    },
    {
      id: "case-report-complete",
      title: "【完全版】症例報告執筆ガイド:構想から投稿まで",
      description: "読むだけで症例報告が実際にできるレベルの完全版ガイド。AI加速型の5ステップで、準備から投稿まで完全サポート。各ステップに具体的なプロンプト、AIツール活用法、チェックリストを完備。",
      category: "Research",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      readTime: "60 min read",
      tags: ["Case Report", "Writing", "Complete Guide", "AI Tools"]
    },
    {
      id: "case-report-workflow",
      title: "症例報告作成ワークフロー:AIを活用した効率化ガイド",
      description: "症例報告は「マラソン」ではなく「400m走」です。CAREガイドラインチェックから投稿用カバーレター作成まで、AIプロンプトを活用して最短距離で完走するためのステップバイステップガイド。",
      category: "Research",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      readTime: "20 min read",
      tags: ["Case Report", "Writing", "Beginner"]
    },
    {
      id: "statistical-analysis-guide",
      title: "【初心者向け】医療統計解析:データの準備から結果の解釈まで",
      description: "「p値って何?」からスタート。データの整理、適切な検定の選び方、Python/Rコードの生成までをサポートします。",
      category: "Research",
      icon: <Microscope className="h-6 w-6 text-purple-500" />,
      readTime: "20 min read",
      tags: ["Statistics", "Data Analysis", "Beginner"]
    },
    {
      id: "conference-presentation-guide",
      title: "【完全版】学会発表ガイド:抄録からスライド、質疑応答まで",
      description: "初めての学会発表でも安心。魅力的な抄録の書き方、見やすいスライド構成、想定問答集の作成までをトータルサポート。",
      category: "Presentation",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      readTime: "15 min read",
      tags: ["Conference", "Presentation", "Public Speaking"]
    },
    {
      id: "paper-reading-efficiency",
      title: "【時短】論文読解効率化ガイド",
      description: "忙しい臨床医が効率的に論文を読んで理解するための実践的なワークフロー。AIツールを活用することで、従来の2-3時間から約1時間に短縮。5ステップで準備から記録まで完全サポート。",
      category: "Research",
      icon: <BookOpen className="h-6 w-6 text-orange-500" />,
      readTime: "15 min read",
      tags: ["Paper Reading", "Literature Review", "Time-saving", "AI Tools"]
    },
    {
      id: "english-proofreading-guide",
      title: "【完全版】医学英語校正ガイド:AIツール活用からプロ校正まで",
      description: "論文、症例報告、学会抄録、プレゼン資料まで。LLM時代の最新トレンドを反映。AIツール（Grammarly、DeepL Write、ChatGPT）の組み合わせで多くのケースに対応可能。プロ校正が必要なケースとの使い分けも徹底解説。",
      category: "Research",
      icon: <FileText className="h-6 w-6 text-violet-500" />,
      readTime: "20 min read",
      tags: ["English Editing", "Proofreading", "Academic Writing", "AI Tools"]
    },
    {
      id: "journal-club-guide",
      title: "【時短】論文抄読会(Journal Club)効率化ガイド",
      description: "毎週の抄読会準備を30分で完了。論文の要約から批判的吟味、スライド作成までをAIがサポートします。",
      category: "Research",
      icon: <BookOpen className="h-6 w-6 text-orange-500" />,
      readTime: "10 min read",
      tags: ["Journal Club", "Literature Review", "Time-saving"]
    },
    {
      id: "patient-explanation-guide",
      title: "【臨床】患者説明・インフォームドコンセント(SDM)ガイド",
      description: "「専門用語が伝わらない」を解決。難しい病状や治療法を、患者さんが納得できる言葉で伝えるための翻訳ガイド。",
      category: "Clinical",
      icon: <FileText className="h-6 w-6 text-teal-500" />,
      readTime: "10 min read",
      tags: ["Patient Communication", "SDM", "Clinical"]
    },
    {
      id: "soap-note-guide",
      title: "【臨床】診療録(SOAP形式)作成ガイド",
      description: "構造化された診療録の書き方。主観的所見と客観的所見の分離、評価と計画の明確化で、診療の質を向上させます。",
      category: "Clinical",
      icon: <ClipboardList className="h-6 w-6 text-indigo-500" />,
      readTime: "10 min read",
      tags: ["SOAP Note", "Medical Records", "Documentation"]
    },
    {
      id: "referral-letter-guide",
      title: "【臨床】紹介状・診療情報提供書作成ガイド",
      description: "適切な情報量、専門用語の使い方、紹介目的の明確化。失礼のない紹介状で、スムーズな診療連携を実現します。",
      category: "Clinical",
      icon: <Mail className="h-6 w-6 text-pink-500" />,
      readTime: "10 min read",
      tags: ["Referral Letter", "Medical Communication", "Documentation"]
    },
    {
      id: "diagram-creation-guide",
      title: "【ツール別】医学図解作成ガイド:Nanobanana活用",
      description: "NotebookLMのNanobananaを使って、病態生理、診断フロー、治療アルゴリズムなどを視覚的に説明する図解を作成します。",
      category: "Presentation",
      icon: <Image className="h-6 w-6 text-amber-500" />,
      readTime: "12 min read",
      tags: ["Diagram", "Visualization", "Nanobanana", "Tools"]
    },
    {
      id: "poster-presentation-guide",
      title: "【完全版】ポスター発表作成ガイド",
      description: "学会ポスター発表の準備を効率化。レイアウト設計、情報の優先順位、視認性の向上、質疑応答対策までをサポートします。",
      category: "Presentation",
      icon: <Presentation className="h-6 w-6 text-cyan-500" />,
      readTime: "15 min read",
      tags: ["Poster Presentation", "Visual Design", "Conference"]
    },
    {
      id: "pubmed-search-guide",
      title: "【完全版】PubMed検索ガイド:効率的な文献検索",
      description: "PICOに基づいた検索式の作成、MeSH termsの活用、検索結果の絞り込みまで。効率的に文献を見つけるための完全ガイド。",
      category: "Research",
      icon: <Search className="h-6 w-6 text-blue-500" />,
      readTime: "12 min read",
      tags: ["PubMed", "Literature Search", "PICO", "MeSH"]
    },
    {
      id: "ebm-practice-guide",
      title: "【完全版】エビデンスに基づいた診療(EBM)実践ガイド",
      description: "臨床疑問の定式化(PICO)、文献検索、エビデンスの評価、臨床適用まで。EBMの5ステップを実践的に学びます。",
      category: "Clinical",
      icon: <Stethoscope className="h-6 w-6 text-emerald-500" />,
      readTime: "20 min read",
      tags: ["EBM", "Evidence-Based Medicine", "Clinical Decision Making"]
    },
    {
      id: "polypharmacy-guide",
      title: "【完全版】ポリファーマシー対策・処方見直しガイド",
      description: "高齢者の多剤併用を適切に管理。不要な薬剤の特定、相互作用チェック、減量・中止の判断基準までをサポートします。",
      category: "Clinical",
      icon: <Pill className="h-6 w-6 text-rose-500" />,
      readTime: "15 min read",
      tags: ["Polypharmacy", "Medication Review", "Drug Safety"]
    },
    {
      id: "discharge-summary-guide",
      title: "【完全版】退院サマリー作成ガイド",
      description: "必要な情報の選別、継続治療の明確化、フォローアップ計画。退院後の診療連携を円滑にするための完全ガイド。",
      category: "Clinical",
      icon: <FileText className="h-6 w-6 text-violet-500" />,
      readTime: "10 min read",
      tags: ["Discharge Summary", "Continuity of Care", "Documentation"]
    },
    // 新規追加ガイド
    {
      id: "conference-presentation",
      title: "カンファレンス発表資料作成支援",
      description: "AIを活用した効果的なカンファレンス発表資料の作成",
      category: "Presentation",
      icon: <Presentation className="h-6 w-6 text-blue-500" />,
      readTime: "40 min read",
      tags: ["カンファレンス", "発表資料", "プレゼンテーション"]
    },
    {
      id: "differential-diagnosis",
      title: "鑑別診断リスト生成",
      description: "AIによる包括的な鑑別診断リストの作成",
      category: "Clinical",
      icon: <Stethoscope className="h-6 w-6 text-red-500" />,
      readTime: "30 min read",
      tags: ["鑑別診断", "診断支援"]
    },
    {
      id: "patient-explanation",
      title: "患者説明シナリオ作成",
      description: "わかりやすく、配慮の行き届いた患者説明の作成",
      category: "Clinical",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      readTime: "40 min read",
      tags: ["患者説明", "インフォームド・コンセント"]
    },
    {
      id: "literature-search",
      title: "論文検索・読解サポート",
      description: "AIを活用した効率的な文献検索と読解",
      category: "Research",
      icon: <Search className="h-6 w-6 text-purple-500" />,
      readTime: "40 min read",
      tags: ["文献検索", "論文読解", "エビデンス"]
    },
    {
      id: "medical-documents",
      title: "診断書・紹介状作成支援",
      description: "AIで医療文書作成を効率化・標準化",
      category: "Clinical",
      icon: <FileText className="h-6 w-6 text-indigo-500" />,
      readTime: "40 min read",
      tags: ["診断書", "紹介状", "医療文書"]
    },
    {
      id: "research-protocol",
      title: "研究計画書作成支援",
      description: "AIを活用した質の高い研究計画書の作成",
      category: "Research",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      readTime: "50 min read",
      tags: ["研究計画書", "研究デザイン"]
    },
    {
      id: "conference-presentation-slides",
      title: "学会発表スライド作成支援",
      description: "インパクトのある学会発表スライドの作成",
      category: "Presentation",
      icon: <Presentation className="h-6 w-6 text-cyan-500" />,
      readTime: "45 min read",
      tags: ["学会発表", "スライド", "プレゼンテーション"]
    },
    {
      id: "ethics-review-application",
      title: "倫理審査申請書類作成支援",
      description: "倫理審査申請書類の効率的な作成",
      category: "Research",
      icon: <FileText className="h-6 w-6 text-amber-500" />,
      readTime: "45 min read",
      tags: ["倫理審査", "研究倫理"]
    },
    {
      id: "new-drug-information",
      title: "新薬情報収集・要約",
      description: "最新の新薬情報を効率的に収集・要約",
      category: "Clinical",
      icon: <Pill className="h-6 w-6 text-pink-500" />,
      readTime: "35 min read",
      tags: ["新薬", "薬剤情報"]
    },
    {
      id: "rare-disease-information",
      title: "希少疾患情報収集",
      description: "希少疾患に関する最新情報の収集",
      category: "Clinical",
      icon: <Microscope className="h-6 w-6 text-teal-500" />,
      readTime: "35 min read",
      tags: ["希少疾患", "疾患情報"]
    },
    {
      id: "guideline-comparison",
      title: "治療ガイドライン比較",
      description: "複数のガイドラインを比較・統合",
      category: "Clinical",
      icon: <BookOpen className="h-6 w-6 text-orange-600" />,
      readTime: "30 min read",
      tags: ["ガイドライン", "エビデンス"]
    },
    {
      id: "multilingual-medical-consultation",
      title: "多言語医療相談支援",
      description: "多言語での医療相談を円滑に",
      category: "Clinical",
      icon: <FileText className="h-6 w-6 text-lime-500" />,
      readTime: "25 min read",
      tags: ["多言語", "医療通訳"]
    },
    {
      id: "medical-news-commentary",
      title: "医療ニュース・トピック解説",
      description: "最新の医療ニュースをわかりやすく解説",
      category: "Research",
      icon: <FileText className="h-6 w-6 text-sky-500" />,
      readTime: "25 min read",
      tags: ["医療ニュース", "情報収集"]
    },
    {
      id: "patient-education-materials",
      title: "患者教育資料作成",
      description: "わかりやすい患者教育資料の作成",
      category: "Clinical",
      icon: <BookOpen className="h-6 w-6 text-emerald-600" />,
      readTime: "35 min read",
      tags: ["患者教育", "資料作成"]
    },
    {
      id: "incident-report-creation",
      title: "インシデントレポート作成支援",
      description: "正確で建設的なインシデントレポートの作成",
      category: "Clinical",
      icon: <ClipboardList className="h-6 w-6 text-rose-600" />,
      readTime: "30 min read",
      tags: ["インシデント", "医療安全"]
    },
    {
      id: "consultation-email",
      title: "専門医へのコンサルトメール作成",
      description: "効果的なコンサルトメールの作成",
      category: "Clinical",
      icon: <Mail className="h-6 w-6 text-violet-600" />,
      readTime: "30 min read",
      tags: ["コンサルト", "メール"]
    },
    {
      id: "clinical-trial-search",
      title: "臨床試験情報検索",
      description: "関連する臨床試験情報の効率的な検索",
      category: "Research",
      icon: <Search className="h-6 w-6 text-blue-700" />,
      readTime: "35 min read",
      tags: ["臨床試験", "情報検索"]
    },
    {
      id: "medical-statistics-consultation",
      title: "医療統計・データ分析相談",
      description: "AIを活用した医療統計の理解と分析",
      category: "Research",
      icon: <Microscope className="h-6 w-6 text-purple-600" />,
      readTime: "45 min read",
      tags: ["統計", "データ分析"]
    },
    {
      id: "image-diagnosis-report-reading",
      title: "画像診断レポート読解支援",
      description: "画像診断レポートの理解を深める",
      category: "Clinical",
      icon: <Image className="h-6 w-6 text-indigo-600" />,
      readTime: "30 min read",
      tags: ["画像診断", "レポート読解"]
    },
    {
      id: "post-discharge-follow-up",
      title: "退院後フォローアップ計画作成",
      description: "包括的な退院後フォローアップ計画の作成",
      category: "Clinical",
      icon: <FileText className="h-6 w-6 text-teal-600" />,
      readTime: "35 min read",
      tags: ["退院計画", "フォローアップ"]
    },
    {
      id: "medical-safety-manual",
      title: "医療安全マニュアル作成",
      description: "実践的な医療安全マニュアルの作成",
      category: "Clinical",
      icon: <ClipboardList className="h-6 w-6 text-red-600" />,
      readTime: "45 min read",
      tags: ["医療安全", "マニュアル"]
    },
    {
      id: "infection-control-manual",
      title: "感染対策マニュアル作成",
      description: "効果的な感染対策マニュアルの作成",
      category: "Clinical",
      icon: <Microscope className="h-6 w-6 text-green-600" />,
      readTime: "45 min read",
      tags: ["感染対策", "マニュアル"]
    },
    {
      id: "polypharmacy-support",
      title: "ポリファーマシー対策支援",
      description: "多剤併用の適正化を支援",
      category: "Clinical",
      icon: <Pill className="h-6 w-6 text-amber-600" />,
      readTime: "40 min read",
      tags: ["ポリファーマシー", "薬剤管理"]
    },
    {
      id: "palliative-care-planning",
      title: "緩和ケア計画立案支援",
      description: "患者中心の緩和ケア計画の立案",
      category: "Clinical",
      icon: <Stethoscope className="h-6 w-6 text-purple-700" />,
      readTime: "45 min read",
      tags: ["緩和ケア", "ケア計画"]
    }
  ];

  // フィルタリングとソート
  const filteredAndSortedGuides = useMemo(() => {
    let filtered = guides.filter((guide) => {
      // 検索クエリでフィルタ
      const matchesSearch = 
        searchQuery === "" ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // カテゴリでフィルタ
      const matchesCategory = selectedCategory === null || guide.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // 読了時間から数値を抽出するヘルパー関数
    const extractReadTime = (readTime: string): number => {
      const match = readTime.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };

    // ソート: 実装済みガイドを優先表示
    filtered.sort((a, b) => {
      const aImplemented = IMPLEMENTED_GUIDES.includes(a.id);
      const bImplemented = IMPLEMENTED_GUIDES.includes(b.id);
      
      // 実装済みガイドを優先
      if (aImplemented && !bImplemented) return -1;
      if (!aImplemented && bImplemented) return 1;
      
      // 同じ実装状態の場合は、選択されたソートオプションで並び替え
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title, "ja");
        case "title-desc":
          return b.title.localeCompare(a.title, "ja");
        case "readTime-asc":
          return extractReadTime(a.readTime) - extractReadTime(b.readTime);
        case "readTime-desc":
          return extractReadTime(b.readTime) - extractReadTime(a.readTime);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortOption]);

  const categories = Array.from(new Set(guides.map(g => g.category)));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Linear.app風：ページヘッダー */}
        <PageHeader
          category="Guides"
          title="Guides & Workflows"
          description="実際の臨床・研究プロセスでAIプロンプトをどう組み合わせるか、実践的なワークフローを解説します。"
        />

        {/* 検索・フィルタ・ソート - Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1.5"
        >
          <div className="relative max-w-2xl">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Input
              placeholder="ガイドを検索(タイトル、説明、タグ)..."
              className="pl-12 pr-10 h-10 lg:h-11 text-base bg-background/50 backdrop-blur-sm border focus:border-primary/50 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            {/* カテゴリフィルタ */}
            <div className="flex flex-wrap gap-1.5 flex-1">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-all duration-200 rounded-full shadow-sm hover:shadow-md"
                  onClick={() => setSelectedCategory(null)}
                >
                  すべて
                </Badge>
              </motion.div>
              {categories.map((cat) => {
                const categoryLabels: Record<string, string> = {
                  "Research": "研究",
                  "Presentation": "発表",
                  "Clinical": "臨床"
                };
                return (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1.5 text-sm font-medium hover:bg-primary/90 transition-all duration-200 rounded-full shadow-sm hover:shadow-md"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {categoryLabels[cat] || cat}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>

            {/* ソート */}
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">並び替え:</span>
              <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                <SelectTrigger className="w-full sm:w-[200px] h-11 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="title-asc">タイトル(昇順)</SelectItem>
                  <SelectItem value="title-desc">タイトル(降順)</SelectItem>
                  <SelectItem value="readTime-asc">読了時間(短い順)</SelectItem>
                  <SelectItem value="readTime-desc">読了時間(長い順)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* 結果数表示 */}
        <AnimatePresence>
          {filteredAndSortedGuides.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-medium text-muted-foreground my-6"
            >
              {filteredAndSortedGuides.length}件のガイドが見つかりました
            </motion.div>
          )}
        </AnimatePresence>

        {/* ガイド一覧 */}
        <AnimatePresence mode="wait">
          {filteredAndSortedGuides.length > 0 ? (
            <motion.div
              key="guides-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
              style={{gridAutoRows: '1fr'}}
            >
              {filteredAndSortedGuides.map((guide, index) => {
                const isImplemented = IMPLEMENTED_GUIDES.includes(guide.id);
                const categoryColors: Record<string, { border: string; badge: string; gradient: string }> = {
                  "Research": { 
                    border: "border-l-blue-500", 
                    badge: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                    gradient: "from-blue-50/50 to-transparent dark:from-blue-950/20"
                  },
                  "Presentation": { 
                    border: "border-l-green-500", 
                    badge: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                    gradient: "from-green-50/50 to-transparent dark:from-green-950/20"
                  },
                  "Clinical": { 
                    border: "border-l-teal-500", 
                    badge: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
                    gradient: "from-teal-50/50 to-transparent dark:from-teal-950/20"
                  },
                };
                const colors = categoryColors[guide.category] || categoryColors["Research"];
                
                const cardContent = (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={isImplemented ? { y: -8, scale: 1.02 } : {}}
                    whileTap={isImplemented ? { scale: 0.98 } : {}}
                    className="h-full"
                  >
                    <Card className={cn(
                      "h-full flex flex-col border-l-2 bg-card group overflow-hidden shadow-sm transition-all duration-200 border",
                      colors.border,
                      isImplemented 
                        ? "cursor-pointer hover:shadow-md hover:border-primary/30" 
                        : "opacity-60 cursor-not-allowed"
                    )}>
                      <CardHeader className="space-y-1.5 p-5 pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={cn("font-medium px-2 py-0.5 rounded-md text-xs", colors.badge)}>
                              {guide.category === "Research" ? "研究" : guide.category === "Presentation" ? "発表" : "臨床"}
                            </Badge>
                            {!isImplemented && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 font-medium px-2 py-0.5 rounded-md border-gray-300 dark:border-gray-600 text-xs">
                                <Lock className="h-3 w-3 mr-1" />
                                Soon
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {guide.readTime}
                          </span>
                        </div>
                        <CardTitle className={cn(
                          "text-sm font-semibold leading-tight line-clamp-2 transition-colors duration-200",
                          isImplemented && "group-hover:text-primary"
                        )}>
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="text-sm leading-snug line-clamp-2">
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-5 pt-0 space-y-3">
                        {isImplemented ? (
                          <div className="flex items-center text-sm font-semibold text-primary group-hover:gap-1.5 gap-1 transition-all duration-200">
                            <span>ガイドを読む</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </div>
                        ) : (
                          <div className="flex items-center text-sm font-semibold text-muted-foreground gap-1">
                            <Lock className="h-3.5 w-3.5" />
                            <span>準備中</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1">
                          {guide.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="text-xs px-3 py-1.5 bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-full text-muted-foreground font-medium border border-border/50"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );

                // 特別なルーティングが必要なガイド
                const getGuidePath = (id: string) => {
                  if (id === "case-report-complete") return "/guides/case-report-complete";
                  if (id === "paper-reading-efficiency") return "/guides/paper-reading-efficiency";
                  if (id === "english-proofreading-guide") return "/guides/english-proofreading-guide";
                  return `/guides/${id}`;
                };

                return isImplemented ? (
                  <Link 
                    key={guide.id}
                    href={getGuidePath(guide.id)}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div key={guide.id}>
                    {cardContent}
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20 text-muted-foreground"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              >
                <Search className="h-10 lg:h-11 w-16 mx-auto mb-6 opacity-40" />
              </motion.div>
              <p className="text-xl font-semibold mb-2 text-foreground">ガイドが見つかりませんでした</p>
              <p className="text-base mb-6">検索条件を変更してお試しください</p>
              {(searchQuery || selectedCategory) && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="px-6 py-2 lg:py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
                >
                  フィルタをリセット
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
