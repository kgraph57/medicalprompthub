import { Search, ChevronDown, Zap } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

// 案2: ネオモーフィズム + ミニマル案
// 特徴: ソフトシャドウ、洗練されたタイポグラフィ、余白を活かしたデザイン、エレガントなアニメーション
export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* メインメッセージ */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          {/* メインタイトル - ミニマルで洗練されたデザイン */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-4 text-neutral-900 leading-none tracking-tight">
              <span className="block font-extralight">医療の未来を、</span>
              <span className="block mt-2 font-medium bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
                共に創る
              </span>
            </h1>
          </div>
          
          {/* サブタイトル - ネオモーフィズムカード */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              {/* ネオモーフィズム効果 */}
              <div className="absolute inset-0 bg-neutral-100 rounded-3xl shadow-[8px_8px_16px_#d1d5db,-8px_-8px_16px_#ffffff]"></div>
              <div className="relative p-8 md:p-10 rounded-3xl">
                <p className="text-xl md:text-2xl lg:text-3xl font-light text-neutral-800 mb-3 leading-relaxed">
                  あなたの専門性を
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary-700 mb-4">
                  AMPLIFY
                </p>
                <p className="text-lg md:text-xl text-neutral-600 font-light">
                  <span className="font-normal text-primary-800">100以上の実践プロンプト</span>で、<br className="hidden md:block" />
                  今日から始める医療の進化
                </p>
              </div>
            </div>
          </div>
          
          {/* コアメッセージ - エレガントなデザイン */}
          <div className="max-w-3xl mx-auto">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-200 to-purple-200 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-neutral-100">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                  <p className="text-lg md:text-xl text-primary-900 font-medium italic">
                    「医療の本質に、もっと時間を」
                  </p>
                </div>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed pl-9">
                  鑑別診断、症例報告、研究分析——<br className="hidden md:block" />
                  日常業務を効率化し、<span className="font-medium text-primary-800">患者との対話に集中できる時間</span>を生み出します。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 検索バー - ネオモーフィズム */}
        <div className="max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-neutral-100 rounded-2xl shadow-[inset_4px_4px_8px_#d1d5db,inset_-4px_-4px_8px_#ffffff]"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-5 h-5 text-neutral-400 z-10" />
              <input
                type="text"
                placeholder="必要なプロンプトを検索（例：鑑別診断、症例報告、統計解析）"
                className="w-full h-16 md:h-18 pl-14 pr-6 text-base md:text-lg bg-transparent border-0 focus:outline-none placeholder:text-neutral-400 text-neutral-700"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* プライマリアクション - ネオモーフィズムボタン */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-6 mb-10">
          <button
            onClick={() => setLocation('/guides')}
            className="group relative px-10 md:px-12 py-4 md:py-5 text-base md:text-lg font-medium text-white bg-primary-600 rounded-2xl shadow-[4px_4px_8px_#9333ea,-4px_-4px_8px_#a855f7] hover:shadow-[2px_2px_4px_#9333ea,-2px_-2px_4px_#a855f7] transition-all duration-200 active:shadow-[inset_2px_2px_4px_#9333ea,inset_-2px_-2px_4px_#a855f7]"
          >
            <span className="flex items-center gap-2">
              はじめる
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="px-10 md:px-12 py-4 md:py-5 text-base md:text-lg font-medium text-primary-700 bg-neutral-50 rounded-2xl shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff] transition-all duration-200 active:shadow-[inset_2px_2px_4px_#d1d5db,inset_-2px_-2px_4px_#ffffff]"
          >
            プロンプトを探す
          </button>
        </div>
        
        {/* スクロールインジケーター - ミニマル */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center gap-3 text-neutral-400 hover:text-primary-600 transition-colors group"
            aria-label="下にスクロール"
          >
            <span className="text-xs md:text-sm font-light tracking-wider uppercase">さらに見る</span>
            <div className="w-12 h-12 rounded-full bg-neutral-50 shadow-[4px_4px_8px_#d1d5db,-4px_-4px_8px_#ffffff] flex items-center justify-center group-hover:shadow-[2px_2px_4px_#d1d5db,-2px_-2px_4px_#ffffff] transition-all">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
