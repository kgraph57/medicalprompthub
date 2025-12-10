import { Search, Loader2 } from "lucide-react";
import { memo, useState } from "react";
import { PromptCard } from "./PromptCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface PromptGridSectionProps {
  prompts: Prompt[];
  searchQuery: string;
  selectedCategory: string | null;
  onClearFilters: () => void;
}

export const PromptGridSection = memo(function PromptGridSection({ 
  prompts, 
  searchQuery, 
  selectedCategory,
  onClearFilters 
}: PromptGridSectionProps) {
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLoadMore = () => {
    setIsLoading(true);
    // ローディングアニメーションを表示するための遅延
    setTimeout(() => {
      setVisibleCount(prev => prev + 10);
      setIsLoading(false);
    }, 300);
  };
  
  const hasMore = visibleCount < prompts.length;
  const sentinelRef = useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasMore,
    threshold: 200,
    enabled: true
  });
  
  const visiblePrompts = prompts.slice(0, visibleCount);
  
  return (
    <section className="py-3 md:py-4 bg-white">
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        {/* セクションヘッダー */}
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div>
            <h2 className="text-sm md:text-base font-semibold mb-0.5 md:mb-1 text-neutral-900">
              {searchQuery || selectedCategory ? '検索結果' : 'すべてのプロンプト'}
            </h2>
            <p className="text-xs md:text-sm text-neutral-600">
              {prompts.length}件のプロンプト
            </p>
          </div>
          
          {selectedCategory && (
            <button
              onClick={onClearFilters}
              className="px-2 py-1 md:px-2.5 md:py-1 rounded text-xs md:text-xs font-medium transition-colors duration-200 bg-primary-50 text-primary-700 hover:bg-primary-100"
            >
              {selectedCategory} ×
            </button>
          )}
        </div>
        
        {/* プロンプトカードグリッド - レスポンシブ */}
        {prompts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 md:gap-1">
              {visiblePrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
            
            {/* 無限スクロールセンチネル */}
            {hasMore && (
              <div ref={sentinelRef} className="flex justify-center mt-8 py-4">
                {isLoading && (
                  <div className="flex items-center gap-2 text-primary-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm font-medium">読み込み中...</span>
                  </div>
                )}
              </div>
            )}
            
            {/* 全て表示済みメッセージ */}
            {!hasMore && prompts.length > 9 && (
              <div className="text-center mt-8 py-4">
                <p className="text-sm text-neutral-500">すべてのプロンプトを表示しました</p>
              </div>
            )}
          </>
        ) : (
          // 検索結果なし
          <div className="text-center py-2 lg:py-2.5 md:py-8">
            <Search className="w-12 h-10 lg:h-11 md:w-16 md:h-10 lg:h-11 mx-auto mb-4 text-neutral-300" />
            <h3 className="text-lg md:text-h3 font-semibold mb-2 text-neutral-900">
              プロンプトが見つかりませんでした
            </h3>
            <p className="text-sm md:text-body mb-4 text-neutral-600">
              検索条件を変更してお試しください
            </p>
            <button
              onClick={onClearFilters}
              className="btn-secondary text-sm md:text-sm"
            >
              検索をクリア
            </button>
          </div>
        )}
      </div>
    </section>
  );
});
