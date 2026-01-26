import { Search, ArrowRight, AlertTriangle } from "lucide-react";
import { memo, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { simpleCategories, getSimpleCategory, type SimpleCategory, type Prompt } from "@/lib/prompts";

interface PromptGridSectionProps {
  prompts: Prompt[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory?: SimpleCategory | 'all';
  onCategoryChange?: (category: SimpleCategory | 'all') => void;
}

const ITEMS_PER_PAGE = 12;

// シンプルなプロンプトカード
const PromptListItem = memo(function PromptListItem({
  prompt,
  searchQuery
}: {
  prompt: Prompt;
  searchQuery: string;
}) {
  const [, setLocation] = useLocation();

  const highlightText = (text: string) => {
    if (!searchQuery.trim()) return text;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">{part}</mark> : part
    );
  };

  return (
    <button
      onClick={() => setLocation(`/prompts/${prompt.id}`)}
      className="group w-full flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all duration-200 text-left"
    >
      {/* リスクインジケーター */}
      <div className="flex-shrink-0 mt-1">
        {prompt.riskLevel === 'high' ? (
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
        ) : prompt.riskLevel === 'medium' ? (
          <div className="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-neutral-400" />
          </div>
        )}
      </div>

      {/* コンテンツ */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
          {highlightText(prompt.title)}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
          {highlightText(prompt.description)}
        </p>
      </div>

      {/* 矢印 */}
      <ArrowRight className="flex-shrink-0 w-4 h-4 mt-1 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all" />
    </button>
  );
});

export const PromptGridSection = memo(function PromptGridSection({
  prompts,
  searchQuery,
  onSearchChange,
  selectedCategory = 'all',
  onCategoryChange
}: PromptGridSectionProps) {
  // 外部から制御可能、またはローカル状態で管理
  const [internalCategory, setInternalCategory] = useState<SimpleCategory | 'all'>('all');
  const activeCategory = onCategoryChange ? selectedCategory : internalCategory;
  const setActiveCategory = onCategoryChange || setInternalCategory;

  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // カテゴリごとのプロンプト数を計算
  const categoryCounts = useMemo(() => {
    const counts: Record<SimpleCategory | 'all', number> = {
      all: prompts.length,
      diagnosis: 0,
      treatment: 0,
      research: 0,
      documentation: 0,
      education: 0,
    };
    prompts.forEach(p => {
      const simpleCategory = getSimpleCategory(p);
      counts[simpleCategory]++;
    });
    return counts;
  }, [prompts]);

  // フィルタリングされたプロンプト
  const filteredPrompts = useMemo(() => {
    let result = prompts;

    // カテゴリフィルター
    if (activeCategory !== 'all') {
      result = result.filter(p => getSimpleCategory(p) === activeCategory);
    }

    // 検索フィルター
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        (p.tags?.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    return result;
  }, [prompts, activeCategory, searchQuery]);

  // 表示するプロンプト
  const displayedPrompts = filteredPrompts.slice(0, displayCount);
  const hasMore = displayCount < filteredPrompts.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + ITEMS_PER_PAGE);
  };

  const handleCategoryChange = (category: SimpleCategory | 'all') => {
    setActiveCategory(category);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  return (
    <section id="prompts" className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* ヘッダー */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Prompt Library
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400">
            {prompts.length}件のプロンプトをすぐに使えます
          </p>
        </div>

        {/* 検索ボックス */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="プロンプトを検索..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              クリア
            </button>
          )}
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            すべて
            <span className="ml-1.5 opacity-60">{categoryCounts.all}</span>
          </button>
          {simpleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.label}
              <span className="ml-1.5 opacity-60">{categoryCounts[cat.id]}</span>
            </button>
          ))}
        </div>

        {/* プロンプトリスト */}
        {displayedPrompts.length > 0 ? (
          <div className="space-y-3">
            {displayedPrompts.map((prompt) => (
              <PromptListItem
                key={prompt.id}
                prompt={prompt}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-12 h-12 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
            <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
              プロンプトが見つかりませんでした
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              検索条件を変更してお試しください
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                handleCategoryChange('all');
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              フィルターをクリア
            </button>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md transition-all"
            >
              もっと見る
              <span className="text-neutral-400">
                （残り{filteredPrompts.length - displayCount}件）
              </span>
            </button>
          </div>
        )}

        {/* 結果サマリー */}
        {searchQuery && displayedPrompts.length > 0 && (
          <p className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
            「{searchQuery}」で{filteredPrompts.length}件見つかりました
          </p>
        )}
      </div>
    </section>
  );
});
