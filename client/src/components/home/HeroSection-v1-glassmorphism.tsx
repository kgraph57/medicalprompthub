import { Search, ChevronDown, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

// 案1: グラスモーフィズム + アニメーション案
// 特徴: ガラス効果、微細なアニメーション、グラデーション背景、浮遊する装飾要素
export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
      {/* アニメーション背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-shift"></div>
      
      {/* 浮遊する装飾要素 */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* メインメッセージ */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          {/* バッジ */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 backdrop-blur-md bg-white/60 border border-white/80 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-neutral-700">AI × 医療の新時代</span>
          </div>

          {/* メインタイトル - グラスモーフィズム効果 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
            <span className="block text-neutral-900 drop-shadow-sm">医療の未来を、</span>
            <span className="block mt-2 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              共に創る
            </span>
          </h1>
          
          {/* サブタイトル - グラスモーフィズムカード */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="backdrop-blur-xl bg-white/70 border border-white/80 rounded-2xl p-6 md:p-8 shadow-2xl">
              <p className="text-lg md:text-xl lg:text-2xl font-bold max-w-3xl mx-auto text-neutral-800 mb-4 leading-relaxed">
                あなたの専門性を<span className="relative inline-block">
                  <span className="text-primary-700 font-black">AMPLIFY</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-primary-200/50 rounded-full -z-10"></span>
                </span>する
              </p>
              <p className="text-base md:text-lg text-neutral-700">
                <span className="font-bold text-primary-800">100以上の実践プロンプト</span>で、今日から始める医療の進化
              </p>
            </div>
          </div>
          
          {/* コアメッセージ - グラスモーフィズム */}
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-md bg-gradient-to-r from-primary-50/80 to-purple-50/80 border border-primary-200/50 p-6 md:p-8 rounded-2xl shadow-xl">
              <p className="text-lg md:text-xl text-primary-900 font-bold mb-3 flex items-center justify-center gap-2">
                <span className="text-2xl">✨</span>
                「医療の本質に、もっと時間を」
              </p>
              <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                鑑別診断、症例報告、研究分析——<br className="hidden md:block" />
                日常業務を効率化し、<span className="font-bold text-primary-800">患者との対話に集中できる時間</span>を生み出します。
              </p>
            </div>
          </div>
        </div>
        
        {/* 検索バー - グラスモーフィズム */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="relative backdrop-blur-xl bg-white/80 border-2 border-white/90 rounded-2xl shadow-2xl overflow-hidden">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-500" />
            <input
              type="text"
              placeholder="必要なプロンプトを検索（例：鑑別診断、症例報告、統計解析）"
              className="w-full h-14 md:h-16 lg:h-18 pl-14 pr-5 text-base md:text-lg bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-neutral-400"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        
        {/* プライマリアクション */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-8">
          <button
            onClick={() => setLocation('/guides')}
            className="group relative px-8 md:px-10 lg:px-12 py-4 md:py-5 text-base md:text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              はじめる
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="px-8 md:px-10 lg:px-12 py-4 md:py-5 text-base md:text-lg font-semibold text-primary-700 backdrop-blur-md bg-white/70 border-2 border-primary-300/50 hover:bg-white/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            プロンプトを探す
          </button>
        </div>
        
        {/* スクロールインジケーター */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors group"
            aria-label="下にスクロール"
          >
            <span className="text-sm md:text-base font-medium">さらに見る</span>
            <div className="w-10 h-10 rounded-full backdrop-blur-md bg-white/60 border border-white/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <ChevronDown className="w-5 h-5 animate-bounce group-hover:text-primary-600" />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
