import { Layout, useToc } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronRight, Lock } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { updateSEO } from "@/lib/seo";

// 実装済みのガイドIDリスト
const IMPLEMENTED_GUIDES = [
  "case-report-complete",
  "paper-reading-efficiency",
  "english-proofreading-guide",
  "marw-complete",
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
  "palliative-care-planning",
  "systematic-review-meta-analysis",
  "data-visualization-figures",
  "grant-application",
  "observational-study-design",
  "conference-to-paper",
  "poster-presentation",
  "clinical-reasoning",
  "research-data-management",
  "diagram-creation-guide",
  "advanced-medical-illustration-guide",
  "pubmed-search-guide",
  // 新規追加
  "night-shift-handover",
  "surgical-record",
  "outpatient-preparation",
  "bad-news-delivery",
  "board-exam-preparation",
  "resident-training-plan"
];

interface Guide {
  id: string;
  title: string;
  description: string;
  category: "Research" | "Presentation" | "Clinical";
  readTime: string;
  hasIllustrations?: boolean;
}

const guides: Guide[] = [
  // Research - 使用頻度・時間短縮効果・人気順に並び替え
  {
    id: "paper-reading-efficiency",
    hasIllustrations: true,
    title: "論文読解効率化ガイド",
    description: "AIツールで従来の2-3時間から約1時間に短縮",
    category: "Research",
    readTime: "15 min",
  },
  {
    id: "pubmed-search-guide",
    hasIllustrations: true,
    title: "PubMed検索ガイド",
    description: "PICOに基づいた検索式の作成からMeSH terms活用まで",
    category: "Research",
    readTime: "12 min",
  },
  {
    id: "case-report-complete",
    hasIllustrations: true,
    title: "症例報告執筆ガイド: 構想から投稿まで",
    description: "AI加速型の5ステップで、準備から投稿まで完全サポート",
    category: "Research",
    readTime: "60 min",
  },
  {
    id: "english-proofreading-guide",
    title: "医学英語校正ガイド",
    description: "LLM時代の最新トレンドを反映したAIツール活用法",
    category: "Research",
    readTime: "20 min",
  },
  {
    id: "marw-complete",
    hasIllustrations: true,
    title: "医療AI論文執筆ワークフロー（MARW）完全ガイド",
    description: "世界標準に準拠したAI駆動型論文執筆の7段階ワークフロー",
    category: "Research",
    readTime: "45 min",
  },
  {
    id: "medical-statistics-consultation",
    hasIllustrations: true,
    title: "医療統計・データ分析相談",
    description: "AIを活用した医療統計の理解と分析",
    category: "Research",
    readTime: "45 min",
  },
  {
    id: "literature-search",
    hasIllustrations: true,
    title: "論文検索・読解サポート",
    description: "AIを活用した効率的な文献検索と読解",
    category: "Research",
    readTime: "40 min",
  },
  {
    id: "data-visualization-figures",
    title: "データ可視化・図表作成ガイド",
    description: "論文に掲載する高品質な図表の作成方法",
    category: "Research",
    readTime: "18 min",
  },
  {
    id: "conference-to-paper",
    title: "学会発表から論文投稿へのワークフロー",
    description: "学会発表の内容を効率的に論文に発展させる方法",
    category: "Research",
    readTime: "27 min",
  },
  {
    id: "grant-application",
    title: "グラント申請書作成ガイド",
    description: "科研費や厚労科研などのグラント申請書の作成方法",
    category: "Research",
    readTime: "28 min",
  },
  {
    id: "research-protocol",
    hasIllustrations: true,
    title: "研究計画書作成支援",
    description: "AIを活用した質の高い研究計画書の作成",
    category: "Research",
    readTime: "50 min",
  },
  {
    id: "ethics-review-application",
    hasIllustrations: true,
    title: "倫理審査申請書類作成支援",
    description: "倫理審査申請書類の効率的な作成",
    category: "Research",
    readTime: "45 min",
  },
  {
    id: "systematic-review-meta-analysis",
    title: "システマティックレビュー・メタアナリシス作成ガイド",
    description: "PRISMAガイドラインに準拠した作成方法",
    category: "Research",
    readTime: "35 min",
  },
  {
    id: "observational-study-design",
    title: "観察研究デザインガイド",
    description: "コホート研究・ケースコントロール研究の設計方法",
    category: "Research",
    readTime: "22 min",
  },
  {
    id: "clinical-trial-search",
    hasIllustrations: true,
    title: "臨床試験情報検索",
    description: "関連する臨床試験情報の効率的な検索",
    category: "Research",
    readTime: "35 min",
  },
  {
    id: "research-data-management",
    title: "研究データ管理ガイド",
    description: "研究データを効率的かつ安全に管理する方法",
    category: "Research",
    readTime: "23 min",
  },
  {
    id: "medical-news-commentary",
    title: "医療ニュース・トピック解説",
    description: "最新の医療ニュースをわかりやすく解説",
    category: "Research",
    readTime: "25 min",
  },
  {
    id: "board-exam-preparation",
    hasIllustrations: true,
    title: "専門医試験対策ガイド",
    description: "AIを活用した効率的な専門医試験の学習戦略",
    category: "Research",
    readTime: "30 min",
  },
  {
    id: "resident-training-plan",
    hasIllustrations: true,
    title: "研修医指導計画作成",
    description: "効果的な研修医教育プログラムの設計",
    category: "Research",
    readTime: "25 min",
  },
  // Clinical - 日常業務での使用頻度・影響度順に並び替え
  {
    id: "night-shift-handover",
    hasIllustrations: true,
    title: "当直引き継ぎサマリー作成",
    description: "効率的で漏れのない当直引き継ぎ文書の作成",
    category: "Clinical",
    readTime: "15 min",
  },
  {
    id: "surgical-record",
    hasIllustrations: true,
    title: "手術記録・処置記録作成",
    description: "正確で効率的な手術記録・処置記録の作成",
    category: "Clinical",
    readTime: "20 min",
  },
  {
    id: "outpatient-preparation",
    hasIllustrations: true,
    title: "外来予習ワークフロー",
    description: "次回外来患者の効率的な事前準備",
    category: "Clinical",
    readTime: "15 min",
  },
  {
    id: "differential-diagnosis",
    hasIllustrations: true,
    title: "鑑別診断リスト生成",
    description: "AIによる包括的な鑑別診断リストの作成",
    category: "Clinical",
    readTime: "30 min",
  },
  {
    id: "patient-explanation",
    title: "患者説明シナリオ作成",
    description: "わかりやすく、配慮の行き届いた患者説明の作成",
    category: "Clinical",
    readTime: "40 min",
  },
  {
    id: "bad-news-delivery",
    hasIllustrations: true,
    title: "Bad News Delivery（悪い知らせの伝え方）",
    description: "SPIKESプロトコルに基づく患者・家族への説明",
    category: "Clinical",
    readTime: "25 min",
  },
  {
    id: "medical-documents",
    title: "診断書・紹介状作成支援",
    description: "AIで医療文書作成を効率化・標準化",
    category: "Clinical",
    readTime: "40 min",
  },
  {
    id: "consultation-email",
    title: "専門医へのコンサルトメール作成",
    description: "効果的なコンサルトメールの作成",
    category: "Clinical",
    readTime: "30 min",
  },
  {
    id: "clinical-reasoning",
    title: "臨床推論プロセスガイド",
    description: "体系的で効率的な臨床推論の方法",
    category: "Clinical",
    readTime: "20 min",
  },
  {
    id: "image-diagnosis-report-reading",
    title: "画像診断レポート読解支援",
    description: "画像診断レポートの理解を深める",
    category: "Clinical",
    readTime: "30 min",
  },
  {
    id: "new-drug-information",
    hasIllustrations: true,
    title: "新薬情報収集・要約",
    description: "最新の新薬情報を効率的に収集・要約",
    category: "Clinical",
    readTime: "35 min",
  },
  {
    id: "guideline-comparison",
    title: "治療ガイドライン比較",
    description: "複数のガイドラインを比較・統合",
    category: "Clinical",
    readTime: "30 min",
  },
  {
    id: "polypharmacy-support",
    title: "ポリファーマシー対策支援",
    description: "多剤併用の適正化を支援",
    category: "Clinical",
    readTime: "40 min",
  },
  {
    id: "patient-education-materials",
    title: "患者教育資料作成",
    description: "わかりやすい患者教育資料の作成",
    category: "Clinical",
    readTime: "35 min",
  },
  {
    id: "post-discharge-follow-up",
    title: "退院後フォローアップ計画作成",
    description: "包括的な退院後フォローアップ計画の作成",
    category: "Clinical",
    readTime: "35 min",
  },
  {
    id: "incident-report-creation",
    title: "インシデントレポート作成支援",
    description: "正確で建設的なインシデントレポートの作成",
    category: "Clinical",
    readTime: "30 min",
  },
  {
    id: "medical-safety-manual",
    title: "医療安全マニュアル作成",
    description: "実践的な医療安全マニュアルの作成",
    category: "Clinical",
    readTime: "45 min",
  },
  {
    id: "infection-control-manual",
    hasIllustrations: true,
    title: "感染対策マニュアル作成",
    description: "効果的な感染対策マニュアルの作成",
    category: "Clinical",
    readTime: "45 min",
  },
  {
    id: "palliative-care-planning",
    title: "緩和ケア計画立案支援",
    description: "患者中心の緩和ケア計画の立案",
    category: "Clinical",
    readTime: "45 min",
  },
  {
    id: "multilingual-medical-consultation",
    title: "多言語医療相談支援",
    description: "多言語での医療相談を円滑に",
    category: "Clinical",
    readTime: "25 min",
  },
  {
    id: "rare-disease-information",
    title: "希少疾患情報収集",
    description: "希少疾患に関する最新情報の収集",
    category: "Clinical",
    readTime: "35 min",
  },
  // Presentation - 使用頻度・実用性順に並び替え
  {
    id: "conference-presentation",
    hasIllustrations: true,
    title: "カンファレンス発表資料作成支援",
    description: "AIを活用した効果的なカンファレンス発表資料の作成",
    category: "Presentation",
    readTime: "40 min",
  },
  {
    id: "conference-presentation-slides",
    title: "学会発表スライド作成支援",
    description: "インパクトのある学会発表スライドの作成",
    category: "Presentation",
    readTime: "45 min",
  },
  {
    id: "poster-presentation",
    title: "ポスター発表作成ガイド",
    description: "学会でのポスター発表の作成方法",
    category: "Presentation",
    readTime: "18 min",
  },
  {
    id: "diagram-creation-guide",
    hasIllustrations: true,
    title: "Nanobanana活用ガイド: 実践プロンプト集",
    description: "医学図解向けの実践的なプロンプト例を紹介",
    category: "Presentation",
    readTime: "12 min",
  },
  {
    id: "advanced-medical-illustration-guide",
    hasIllustrations: true,
    title: "高度な医学図解作成ガイド",
    description: "BioRender風の高品質な医学図解やVisual Abstractを作成",
    category: "Presentation",
    readTime: "20 min",
  },
];

const categoryConfig = {
  Research: { label: "Research" },
  Presentation: { label: "Presentation" },
  Clinical: { label: "Clinical" },
};

// ガイドアイテムコンポーネント
function GuideItem({ guide, index }: { guide: Guide; index: number }) {
  const isImplemented = IMPLEMENTED_GUIDES.includes(guide.id);

  const getGuidePath = (id: string) => {
    if (id === "case-report-complete") return "/guides/case-report-complete";
    if (id === "paper-reading-efficiency") return "/guides/paper-reading-efficiency";
    if (id === "english-proofreading-guide") return "/guides/english-proofreading-guide";
    return `/guides/${id}`;
  };

  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={cn(
        "group flex items-center justify-between gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 transition-colors duration-200",
        isImplemented
          ? "hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer -mx-4 px-4"
          : "opacity-40"
      )}
    >
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-medium text-neutral-900 dark:text-neutral-100 transition-colors",
          isImplemented && "group-hover:text-blue-600 dark:group-hover:text-blue-400"
        )}>
          {guide.title}
          {!isImplemented && (
            <Lock className="inline-block w-3.5 h-3.5 ml-2 text-neutral-400" />
          )}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
          {guide.description}
        </p>
      </div>

      {isImplemented && (
        <ChevronRight className="flex-shrink-0 w-5 h-5 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
    </motion.div>
  );

  if (isImplemented) {
    return (
      <Link href={getGuidePath(guide.id)} style={{ textDecoration: 'none', display: 'block' }}>
        {content}
      </Link>
    );
  }

  return content;
}

// カテゴリセクションコンポーネント
const INITIAL_DISPLAY_COUNT = 5; // 初期表示数

function CategorySection({ category, guides, searchQuery }: { category: "Research" | "Presentation" | "Clinical"; guides: Guide[]; searchQuery: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = categoryConfig[category];

  const filteredGuides = guides.filter(g => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      g.title.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query)
    );
  });

  if (filteredGuides.length === 0) return null;

  // 検索中は全て表示、そうでなければ制限
  const hasMore = !searchQuery && filteredGuides.length > INITIAL_DISPLAY_COUNT;
  const displayedGuides = (searchQuery || isExpanded)
    ? filteredGuides
    : filteredGuides.slice(0, INITIAL_DISPLAY_COUNT);
  const remainingCount = filteredGuides.length - INITIAL_DISPLAY_COUNT;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-16"
    >
      {/* カテゴリヘッダー */}
      <div className="flex items-baseline gap-3 mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          {config.label}
        </h2>
        <span className="text-xs text-neutral-300 dark:text-neutral-600">
          {filteredGuides.length}
        </span>
      </div>

      {/* ガイドリスト */}
      <div>
        {displayedGuides.map((guide, index) => (
          <GuideItem key={guide.id} guide={guide} index={index} />
        ))}
      </div>

      {/* すべて見る / 閉じる ボタン */}
      {hasMore && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          {isExpanded ? (
            <>閉じる</>
          ) : (
            <>他 {remainingCount} 件を見る</>
          )}
          <ChevronRight className={cn(
            "w-4 h-4 transition-transform",
            isExpanded && "rotate-90"
          )} />
        </motion.button>
      )}
    </motion.section>
  );
}

export default function Guides() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setTocItems } = useToc();

  useEffect(() => {
    updateSEO({
      title: "Workflow Guides | HELIX",
      description: "AI-powered workflow guides for medical professionals. From case reports to research papers.",
      path: "/guides",
      keywords: "workflow guides, case report, research paper, medical AI"
    });
  }, []);

  useEffect(() => {
    setTocItems([]);
  }, [setTocItems]);

  const researchGuides = useMemo(() => guides.filter(g => g.category === "Research"), []);
  const presentationGuides = useMemo(() => guides.filter(g => g.category === "Presentation"), []);
  const clinicalGuides = useMemo(() => guides.filter(g => g.category === "Clinical"), []);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* ヒーローセクション */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            {/* タイトル */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Workflow Guides
            </motion.h1>

            {/* サブタイトル */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-500 dark:text-neutral-400 mb-8"
            >
              Step-by-step guides to accelerate your clinical and research workflows with AI.
            </motion.p>

            {/* 検索 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-10 pr-10 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ガイド一覧 */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <CategorySection category="Research" guides={researchGuides} searchQuery={searchQuery} />
          <CategorySection category="Clinical" guides={clinicalGuides} searchQuery={searchQuery} />
          <CategorySection category="Presentation" guides={presentationGuides} searchQuery={searchQuery} />

          {/* 検索結果なし */}
          {searchQuery &&
            !researchGuides.some(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
            !clinicalGuides.some(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
            !presentationGuides.some(g => g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase())) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-12 h-12 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                No guides found
              </p>
              <p className="text-neutral-500 dark:text-neutral-500">
                Try a different search term
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </Layout>
  );
}
