import { Search } from "lucide-react";
import { memo, useState } from "react";
import { PromptCard } from "./PromptCard";

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
  const [visibleCount, setVisibleCount] = useState(6);
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };
  
  const visiblePrompts = prompts.slice(0, visibleCount);
  
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* セクションヘッダー */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl md:text-h2 font-semibold mb-1 md:mb-2 text-neutral-900">
              {searchQuery || selectedCategory ? '検索結果' : 'すべてのプロンプト'}
            </h2>
            <p className="text-sm md:text-body text-neutral-600">
              {prompts.length}件のプロンプト
            </p>
          </div>
          
          {selectedCategory && (
            <button
              onClick={onClearFilters}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-medium transition-colors duration-200 bg-primary-50 text-primary-700 hover:bg-primary-100"
            >
              {selectedCategory} ×
            </button>
          )}
        </div>
        
        {/* プロンプトカードグリッド - レスポンシブ */}
        {prompts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {visiblePrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
            
            {/* もっと見るボタン */}
            {visibleCount < prompts.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  さらに表示 ({prompts.length - visibleCount}件)
                </button>
              </div>
            )}
          </>
        ) : (
          // 検索結果なし
          <div className="text-center py-12 md:py-20">
            <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-neutral-300" />
            <h3 className="text-lg md:text-h3 font-semibold mb-2 text-neutral-900">
              プロンプトが見つかりませんでした
            </h3>
            <p className="text-sm md:text-body mb-6 text-neutral-600">
              検索条件を変更してお試しください
            </p>
            <button
              onClick={onClearFilters}
              className="btn-secondary text-sm md:text-base"
            >
              検索をクリア
            </button>
          </div>
        )}
      </div>
    </section>
  );
});
