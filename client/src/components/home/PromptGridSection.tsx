import { Search, ChevronRight } from "lucide-react";
import { memo, useState, useMemo, useRef, useEffect } from "react";
import { PromptCard } from "./PromptCard";
import { categories, type PromptCategory } from "@/lib/prompts";
import type { Prompt } from "@/lib/prompts";

interface PromptGridSectionProps {
  prompts: Prompt[];
  searchQuery: string;
  selectedCategory: string | null;
  onClearFilters: () => void;
}

// カテゴリごとの色設定（シンプルで洗練されたカラーパレット）
const categoryConfig: Record<PromptCategory, { 
  color: string; 
  bgColor: string;
  borderColor: string;
}> = {
  'diagnosis': { 
    color: 'text-blue-600 dark:text-blue-400', 
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  'treatment': { 
    color: 'text-emerald-600 dark:text-emerald-400', 
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800'
  },
  'documentation': { 
    color: 'text-purple-600 dark:text-purple-400', 
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  'medication': { 
    color: 'text-orange-600 dark:text-orange-400', 
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    borderColor: 'border-orange-200 dark:border-orange-800'
  },
  'communication': { 
    color: 'text-cyan-600 dark:text-cyan-400', 
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
    borderColor: 'border-cyan-200 dark:border-cyan-800'
  },
  'shared-decision-making': { 
    color: 'text-rose-600 dark:text-rose-400', 
    bgColor: 'bg-rose-50 dark:bg-rose-950/20',
    borderColor: 'border-rose-200 dark:border-rose-800'
  },
  'literature': { 
    color: 'text-indigo-600 dark:text-indigo-400', 
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800'
  },
  'research': { 
    color: 'text-violet-600 dark:text-violet-400', 
    bgColor: 'bg-violet-50 dark:bg-violet-950/20',
    borderColor: 'border-violet-200 dark:border-violet-800'
  },
  'case-analysis': { 
    color: 'text-teal-600 dark:text-teal-400', 
    bgColor: 'bg-teal-50 dark:bg-teal-950/20',
    borderColor: 'border-teal-200 dark:border-teal-800'
  },
  'education': { 
    color: 'text-lime-600 dark:text-lime-400', 
    bgColor: 'bg-lime-50 dark:bg-lime-950/20',
    borderColor: 'border-lime-200 dark:border-lime-800'
  },
  'administrative': { 
    color: 'text-slate-600 dark:text-slate-400', 
    bgColor: 'bg-slate-50 dark:bg-slate-950/20',
    borderColor: 'border-slate-200 dark:border-slate-800'
  },
};

const INITIAL_DISPLAY_COUNT = 9; // 各カテゴリの初期表示数

export const PromptGridSection = memo(function PromptGridSection({ 
  prompts, 
  searchQuery, 
  selectedCategory,
  onClearFilters 
}: PromptGridSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<PromptCategory>>(new Set());
  const [activeTab, setActiveTab] = useState<PromptCategory | 'all'>(
    (selectedCategory as PromptCategory) || 'all'
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  // カテゴリごとにプロンプトをグループ化
  const promptsByCategory = useMemo(() => {
    const grouped: Record<string, Prompt[]> = {};
    categories.forEach(cat => {
      grouped[cat.id] = prompts.filter(p => p.category === cat.id);
    });
    grouped['all'] = prompts;
    return grouped;
  }, [prompts]);

  // カテゴリごとの表示プロンプトを決定（「すべて」タブ用）
  const getCategoryDisplayPrompts = (categoryId: PromptCategory) => {
    const categoryPrompts = promptsByCategory[categoryId] || [];
    if (expandedCategories.has(categoryId) || searchQuery) {
      return categoryPrompts;
    }
    return categoryPrompts.slice(0, INITIAL_DISPLAY_COUNT);
  };

  // 単一カテゴリ表示用のプロンプト
  const displayPrompts = useMemo(() => {
    if (activeTab === 'all') return [];
    const categoryPrompts = promptsByCategory[activeTab] || [];
    if (searchQuery || expandedCategories.has(activeTab as PromptCategory)) {
      return categoryPrompts;
    }
    return categoryPrompts.slice(0, INITIAL_DISPLAY_COUNT);
  }, [promptsByCategory, activeTab, expandedCategories, searchQuery]);

  const hasMorePrompts = (categoryId: PromptCategory) => {
    if (searchQuery || expandedCategories.has(categoryId)) return false;
    return (promptsByCategory[categoryId]?.length || 0) > INITIAL_DISPLAY_COUNT;
  };

  const toggleExpand = (category: PromptCategory) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // スクロール位置を監視してグラデーションの表示を制御
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateGradients = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1);
    };

    updateGradients();
    container.addEventListener('scroll', updateGradients);
    
    // リサイズ時も更新
    const resizeObserver = new ResizeObserver(updateGradients);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', updateGradients);
      resizeObserver.disconnect();
    };
  }, []);

  // プロンプトリストの表示コンポーネント（3つ以上は横スクロール、それ以下はグリッド）
  const PromptList = ({ prompts: promptList, categoryId }: { prompts: Prompt[]; categoryId?: string }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    useEffect(() => {
      const container = scrollRef.current;
      if (!container) return;

      const updateGradients = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
      };

      updateGradients();
      container.addEventListener('scroll', updateGradients);
      
      const resizeObserver = new ResizeObserver(updateGradients);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener('scroll', updateGradients);
        resizeObserver.disconnect();
      };
    }, [promptList]);

    // 3つ未満の場合はグリッドレイアウト
    if (promptList.length < 3) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {promptList.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} searchQuery={searchQuery} />
          ))}
        </div>
      );
    }

    // 3つ以上の場合は横スクロール
    return (
      <div className="relative -mx-4 md:-mx-6 px-4 md:px-6">
        {/* 左側のグラデーション */}
        {showLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        )}
        {/* 右側のグラデーション */}
        {showRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        )}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promptList.map((prompt) => (
            <div key={prompt.id} className="flex-shrink-0 w-full sm:w-[calc(50vw-2rem)] md:w-[320px] lg:w-[360px] snap-start">
              <PromptCard prompt={prompt} searchQuery={searchQuery} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 検索やフィルターが適用されている場合は従来の表示
  const isFiltered = searchQuery || selectedCategory;
  
  if (isFiltered) {
    return (
      <section className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                検索結果
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {prompts.length}件のプロンプト
              </p>
            </div>
            
            {selectedCategory && (
              <button
                onClick={onClearFilters}
                className="px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                クリア
              </button>
            )}
          </div>
          
          {prompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} searchQuery={searchQuery} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-24">
              <Search className="w-12 h-12 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                プロンプトが見つかりませんでした
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                検索条件を変更してお試しください
              </p>
              <button
                onClick={onClearFilters}
                className="px-4 py-2 text-sm font-medium text-white bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg transition-colors"
              >
                検索をクリア
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* セクションヘッダー */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            プロンプトライブラリ
          </h2>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400">
            {prompts.length}件のプロンプトから選べます（{categories.filter(cat => (promptsByCategory[cat.id] || []).length > 0).length}ジャンル）
          </p>
        </div>

        {/* カテゴリタブ */}
        <div className="mb-8 md:mb-12">
          <div className="relative -mx-4 md:-mx-6 px-4 md:px-6">
            {/* 左側のグラデーション */}
            {showLeftGradient && (
              <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            )}
            {/* 右側のグラデーション */}
            {showRightGradient && (
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
            )}
            <div 
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            >
              <button
                onClick={() => {
                  setActiveTab('all');
                  onClearFilters();
                }}
                className={`
                  flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap
                  ${activeTab === 'all' 
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }
                `}
              >
                すべて
              </button>
              {categories.map((category) => {
                const config = categoryConfig[category.id];
                const categoryPrompts = promptsByCategory[category.id] || [];
                const isActive = activeTab === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    disabled={categoryPrompts.length === 0}
                    className={`
                      flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                      disabled:opacity-40 disabled:cursor-not-allowed
                      ${isActive 
                        ? `${config.bgColor} ${config.color} border ${config.borderColor}` 
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }
                    `}
                  >
                    {category.label}
                    <span className="ml-1.5 text-xs opacity-60">({categoryPrompts.length})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* プロンプトグリッド */}
        {activeTab === 'all' ? (
          // 「すべて」タブ: カテゴリごとにグループ化
          <div className="space-y-12 md:space-y-16">
            {categories
              .filter(cat => (promptsByCategory[cat.id] || []).length > 0)
              .map((category) => {
                const config = categoryConfig[category.id];
                const categoryPrompts = promptsByCategory[category.id] || [];
                const displayPrompts = getCategoryDisplayPrompts(category.id);
                const hasMore = hasMorePrompts(category.id);
                
                return (
                  <div key={category.id} className="space-y-6">
                    {/* カテゴリヘッダー */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg md:text-xl font-semibold ${config.color} mb-1`}>
                          {category.label}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {category.description} · {categoryPrompts.length}件
                        </p>
                      </div>
                    </div>

                    {/* プロンプトリスト */}
                    <PromptList prompts={displayPrompts} categoryId={category.id} />

                    {/* 「もっと見る」ボタン */}
                    {hasMore && (
                      <div className="flex justify-center pt-2">
                        <button
                          onClick={() => toggleExpand(category.id)}
                          className={`
                            flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                            transition-colors
                            ${config.bgColor} ${config.color}
                            border ${config.borderColor}
                            hover:opacity-80
                          `}
                        >
                          {expandedCategories.has(category.id) ? '折りたたむ' : 'もっと見る'}
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            expandedCategories.has(category.id) ? 'rotate-90' : ''
                          }`} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        ) : (
          // 単一カテゴリ表示
          displayPrompts.length > 0 ? (
            <div className="space-y-6">
              {/* カテゴリヘッダー */}
              {(() => {
                const config = categoryConfig[activeTab as PromptCategory];
                const categoryInfo = categories.find(c => c.id === activeTab);
                return (
                  <div className="mb-6">
                    <h3 className={`text-xl md:text-2xl font-semibold ${config.color} mb-2`}>
                      {categoryInfo?.label}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
                      {categoryInfo?.description}
                    </p>
                  </div>
                );
              })()}

              {/* プロンプトリスト */}
              <PromptList prompts={displayPrompts} categoryId={activeTab} />

              {/* 「もっと見る」ボタン */}
              {hasMorePrompts(activeTab as PromptCategory) && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => toggleExpand(activeTab as PromptCategory)}
                    className={`
                      flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                      transition-colors
                      ${categoryConfig[activeTab as PromptCategory].bgColor}
                      ${categoryConfig[activeTab as PromptCategory].color}
                      border ${categoryConfig[activeTab as PromptCategory].borderColor}
                      hover:opacity-80
                    `}
                  >
                    {expandedCategories.has(activeTab as PromptCategory) ? '折りたたむ' : 'もっと見る'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      expandedCategories.has(activeTab as PromptCategory) ? 'rotate-90' : ''
                    }`} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 md:py-24">
              <Search className="w-12 h-12 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                プロンプトが見つかりませんでした
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                このカテゴリにはまだプロンプトがありません
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
});
