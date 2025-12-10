import { Search, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* メインメッセージ */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-display font-bold mb-3 md:mb-4 text-neutral-900 leading-tight">
            医療従事者のための
            <br />
            AIプロンプトライブラリ
          </h1>
          <p className="text-base md:text-h3 font-normal max-w-2xl mx-auto text-neutral-600">
            100以上の実践的なプロンプトで、診断、研究、文書作成を支援
          </p>
          <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-sm md:text-base text-primary-700 font-medium italic">
              「このツールで生まれた時間を、患者さんとの対話のために。」
            </p>
            <p className="text-xs md:text-sm text-neutral-500 mt-2">
              AIは医療を効率化するだけではなく、医師が患者と向き合う時間を増やすためのツールです。
            </p>
          </div>
        </div>
        
        {/* 検索バー - 最優先機能 */}
        <div className="max-w-2xl mx-auto mb-6 md:mb-8">
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="プロンプトを検索（例：鑑別診断、症例報告、統計解析）"
              className="input-field w-full h-12 md:h-14 pl-10 md:pl-12 pr-3 md:pr-4 text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        {/* セカンダリアクション */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setLocation('/guides')}
            className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-body font-semibold transition-colors duration-200 text-primary-600 hover:text-primary-700"
          >
            使い方を学ぶ →
          </button>
        </div>
        
        {/* スクロールインジケーター */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-neutral-500 hover:text-primary-600 transition-colors"
            aria-label="下にスクロール"
          >
            <span className="text-sm">もっと見る</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
