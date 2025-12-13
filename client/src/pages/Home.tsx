import { Layout } from "@/components/Layout";
import { loadPrompts } from "@/lib/prompts-loader";
import { preloadDataFiles } from "@/lib/preload";
import { useState, useMemo, useCallback, useEffect, lazy, Suspense } from "react";
import { updateSEO, addHomeStructuredData } from "@/lib/seo";
import { trackSearch, trackCategorySelect } from "@/lib/analytics";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureOverviewSection } from "@/components/home/FeatureOverviewSection";
import { StatsBannerSection } from "@/components/home/StatsBannerSection";
import { FeaturedPromptsSection } from "@/components/home/FeaturedPromptsSection";
import { ContentShowcaseSection } from "@/components/home/ContentShowcaseSection";
import { UseCaseSection } from "@/components/home/UseCaseSection";
import type { Prompt } from "@/lib/prompts";

import { toast } from "sonner";

// 遅延ローディング
const PromptGridSection = lazy(() => import("@/components/home/PromptGridSection").then(m => ({ default: m.PromptGridSection })));

// ローディングコンポーネント
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-10 lg:h-11 w-12 border-b-2 border-primary-600"></div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "医療従事者のためのAIプロンプトライブラリ",
      description: "医師や研究者がAI（ChatGPT, Claudeなど）を臨床、研究、教育に効果的に活用するためのプロンプト集。症例報告の作成、統計解析のコード生成、学会発表の準備など、具体的なタスクに特化した「使える」プロンプトを提供します。",
      path: "/",
      keywords: "医療,AI,プロンプト,症例報告,統計解析,学会発表,医学研究,医療従事者,医師,看護師,薬剤師"
    });
    addHomeStructuredData();
    
    // プリロード戦略: よく使われるデータを事前に読み込む
    preloadDataFiles();
  }, []);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(true);

  // プロンプトデータの遅延ロード（アイドル時間を利用）
  useEffect(() => {
    // requestIdleCallbackを使用して、ブラウザがアイドル状態の時にデータを読み込む
    const loadData = () => {
      loadPrompts().then((loadedPrompts) => {
        setPrompts(loadedPrompts);
        setIsLoadingPrompts(false);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: 2000 });
    } else {
      // requestIdleCallbackがサポートされていない場合は、短い遅延後に読み込む
      setTimeout(loadData, 100);
    }
  }, []);

  // 検索イベントを追跡
  useEffect(() => {
    if (searchQuery.trim() && !isLoadingPrompts) {
      trackSearch(searchQuery, filteredPrompts.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, isLoadingPrompts]);

  // カテゴリ選択イベントを追跡
  useEffect(() => {
    if (selectedCategory) {
      trackCategorySelect(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // 検索・フィルタリングされたプロンプト（全文検索とタグ検索を含む）
  const filteredPrompts = useMemo(() => {
    if (isLoadingPrompts) return [];
    const filtered = prompts.filter((prompt) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.template.toLowerCase().includes(query) ||
        (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(query)));
      const matchesCategory = selectedCategory ? prompt.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [searchQuery, selectedCategory, prompts, isLoadingPrompts]);



  // フィルタークリア（メモ化）
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
  }, []);

  // 検索変更ハンドラ（メモ化）
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return (
    <Layout>

      <div className="min-h-screen">
        {/* ヒーローセクション */}
        <HeroSection />

        {/* 統計情報バナーセクション */}
        {!isLoadingPrompts && prompts.length > 0 && (
          <StatsBannerSection prompts={prompts} />
        )}

        {/* 機能概要セクション */}
        <FeatureOverviewSection />

        {/* フィーチャードプロンプトセクション */}
        {!isLoadingPrompts && prompts.length > 0 && (
          <FeaturedPromptsSection prompts={prompts} />
        )}

        {/* コンテンツ紹介セクション */}
        <ContentShowcaseSection />

        {/* ユースケースセクション */}
        <UseCaseSection />

        {/* プロンプトグリッドセクション - 遅延ローディング */}
        <div id="prompts">
          <Suspense fallback={<LoadingSpinner />}>
            <PromptGridSection 
              prompts={filteredPrompts}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onClearFilters={handleClearFilters}
            />
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
