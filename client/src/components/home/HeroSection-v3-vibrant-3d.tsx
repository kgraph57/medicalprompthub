import { Search, ChevronDown, Rocket, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

// 案3: ビブラントグラデーション + 3D効果案
// 特徴: 鮮やかなグラデーション、浮き上がるような3D効果、インタラクティブな要素、ダイナミックなアニメーション
export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
      {/* ビブラントな背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_50%)]"></div>
      
      {/* 装飾的なグリッドパターン */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* メインメッセージ */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          {/* バッジ - 3D効果 */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-full shadow-2xl transform hover:scale-105 transition-transform">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-bold">2025年、医療AIの新時代</span>
            <Sparkles className="w-4 h-4" />
          </div>

          {/* メインタイトル - 3Dテキスト効果 */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-tight">
            <span className="block text-neutral-900 drop-shadow-2xl transform hover:scale-105 transition-transform inline-block">
              医療の未来を、
            </span>
            <span className="block mt-3 relative">
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 blur-2xl opacity-50"></span>
                <span className="relative bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent transform hover:scale-110 transition-transform inline-block">
                  共に創る
                </span>
              </span>
            </span>
          </h1>
          
          {/* サブタイトル - 浮き上がるカード */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative group">
              {/* 3Dシャドウ効果 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl transform group-hover:-translate-y-2 transition-all duration-300 border-2 border-white/50">
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                  あなたの専門性を
                  <span className="relative inline-block ml-2">
                    <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                      AMPLIFY
                    </span>
                    <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary-200 to-purple-200 rounded-full -z-10 transform rotate-2"></span>
                  </span>
                  する
                </p>
                <p className="text-lg md:text-xl text-neutral-700">
                  <span className="font-bold bg-gradient-to-r from-primary-700 to-purple-700 bg-clip-text text-transparent">
                    100以上の実践プロンプト
                  </span>
                  で、今日から始める医療の進化
                </p>
              </div>
            </div>
          </div>
          
          {/* コアメッセージ - グラデーションボックス */}
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 border-2 border-primary-200/50 shadow-xl transform group-hover:scale-[1.02] transition-transform">
                <p className="text-xl md:text-2xl text-primary-900 font-bold mb-3 flex items-center justify-center gap-3">
                  <span className="text-3xl animate-pulse">✨</span>
                  「医療の本質に、もっと時間を」
                </p>
                <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                  鑑別診断、症例報告、研究分析——<br className="hidden md:block" />
                  日常業務を効率化し、<span className="font-bold text-primary-800">患者との対話に集中できる時間</span>を生み出します。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 検索バー - 3D効果 */}
        <div className="max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-primary-100 overflow-hidden">
              <div className="flex items-center">
                <div className="pl-5 pr-3">
                  <Search className="w-6 h-6 text-primary-500" />
                </div>
                <input
                  type="text"
                  placeholder="必要なプロンプトを検索（例：鑑別診断、症例報告、統計解析）"
                  className="flex-1 h-16 md:h-18 lg:h-20 pr-5 text-base md:text-lg bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-neutral-400 text-neutral-700"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* プライマリアクション - 3Dボタン */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-6 mb-8">
          <button
            onClick={() => setLocation('/guides')}
            className="group relative px-10 md:px-12 lg:px-14 py-5 md:py-6 text-base md:text-lg font-black text-white bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              はじめる
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="px-10 md:px-12 lg:px-14 py-5 md:py-6 text-base md:text-lg font-bold text-primary-700 bg-white border-3 border-primary-300 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50"
          >
            プロンプトを探す
          </button>
        </div>
        
        {/* スクロールインジケーター - 3D */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors group"
            aria-label="下にスクロール"
          >
            <span className="text-sm md:text-base font-bold">さらに見る</span>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-purple-400 shadow-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-180 transition-all duration-300">
              <ChevronDown className="w-6 h-6 text-white animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
