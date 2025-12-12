import { Search, ChevronDown, Sparkles, Zap, Brain, Heart } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

// アニメーションSVGイラストを組み込んだデザイン案
// 特徴: カスタムSVGアニメーション、インタラクティブな要素
export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50"></div>
      
      {/* 装飾的な背景パターン */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-primary-600" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左側: テキストコンテンツ */}
          <div className="text-center lg:text-left">
            {/* バッジ */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-primary-200 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-primary-600 animate-pulse" />
              <span className="text-sm font-semibold text-neutral-700">2025年、医療AIの新時代</span>
            </div>

            {/* メインタイトル */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
              <span className="block text-neutral-900">医療の未来を、</span>
              <span className="block mt-2 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                共に創る
              </span>
            </h1>
            
            {/* サブタイトル */}
            <p className="text-lg md:text-xl lg:text-2xl font-bold max-w-2xl mx-auto lg:mx-0 text-neutral-800 mb-4 leading-relaxed">
              あなたの専門性を
              <span className="relative inline-block mx-2">
                <span className="text-primary-700 font-black">AMPLIFY</span>
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-primary-200/50 rounded-full -z-10"></span>
              </span>
              する
            </p>
            <p className="text-base md:text-lg text-neutral-700 mb-8 max-w-2xl mx-auto lg:mx-0">
              <span className="font-bold text-primary-800">100以上の実践プロンプト</span>で、<br className="hidden md:block" />
              今日から始める医療の進化
            </p>
            
            {/* コアメッセージ */}
            <div className="mb-8 max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white border-l-4 border-primary-600 p-6 rounded-r-xl shadow-xl">
                <p className="text-lg md:text-xl text-primary-900 font-bold italic mb-2">
                  「医療の本質に、もっと時間を」
                </p>
                <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                  鑑別診断、症例報告、研究分析——<br className="hidden md:block" />
                  日常業務を効率化し、<span className="font-semibold text-primary-800">患者との対話に集中できる時間</span>を生み出します。
                </p>
              </div>
            </div>
            
            {/* 検索バー */}
            <div className="max-w-2xl mx-auto lg:mx-0 mb-6">
              <div className="relative bg-white border-2 border-primary-200 rounded-xl shadow-xl overflow-hidden">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
                <input
                  type="text"
                  placeholder="必要なプロンプトを検索..."
                  className="w-full h-14 md:h-16 pl-12 pr-5 text-base md:text-lg bg-transparent border-0 focus:outline-none placeholder:text-neutral-400"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
            
            {/* CTAボタン */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-8">
              <button
                onClick={() => setLocation('/guides')}
                className="group px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  はじめる
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              <button
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                className="px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-semibold text-primary-700 bg-white border-2 border-primary-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                プロンプトを探す
              </button>
            </div>
          </div>

          {/* 右側: アニメーションSVGイラスト */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* メインSVGイラスト */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 背景円 */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="url(#gradient1)"
                  className="animate-pulse"
                  opacity="0.1"
                />
                
                {/* グラデーション定義 */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>

                {/* 浮遊する円（アニメーション） */}
                <circle
                  cx="100"
                  cy="100"
                  r="30"
                  fill="url(#gradient2)"
                  opacity="0.6"
                  className="animate-float"
                >
                  <animate
                    attributeName="cy"
                    values="100;80;100"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="300"
                  cy="150"
                  r="25"
                  fill="url(#gradient1)"
                  opacity="0.5"
                  className="animate-float"
                >
                  <animate
                    attributeName="cy"
                    values="150;130;150"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx="150"
                  cy="300"
                  r="35"
                  fill="url(#gradient2)"
                  opacity="0.4"
                  className="animate-float"
                >
                  <animate
                    attributeName="cy"
                    values="300;280;300"
                    dur="5s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* 中央のメインシンボル（医療+AI） */}
                <g transform="translate(200, 200)">
                  {/* 脳のアイコン（AIを表現） */}
                  <g className="animate-pulse">
                    <circle cx="0" cy="-20" r="40" fill="url(#gradient1)" opacity="0.2" />
                    <path
                      d="M -30 -20 Q -30 -40 -10 -40 Q 10 -40 10 -20 Q 10 0 -10 0 Q -30 0 -30 -20"
                      fill="url(#gradient1)"
                      opacity="0.8"
                    />
                    <path
                      d="M -20 -15 Q -20 -25 -10 -25 Q 0 -25 0 -15 Q 0 -5 -10 -5 Q -20 -5 -20 -15"
                      fill="white"
                      opacity="0.9"
                    />
                  </g>
                  
                  {/* ハートのアイコン（医療を表現） */}
                  <g transform="translate(0, 30)" className="animate-pulse delay-500">
                    <path
                      d="M 0 -20 C -20 -20 -30 0 -30 10 C -30 20 -10 30 0 40 C 10 30 30 20 30 10 C 30 0 20 -20 0 -20 Z"
                      fill="url(#gradient2)"
                      opacity="0.8"
                    />
                  </g>

                  {/* 接続線 */}
                  <line
                    x1="0"
                    y1="-20"
                    x2="0"
                    y2="10"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    opacity="0.6"
                    className="animate-pulse"
                  />
                </g>

                {/* 装飾的な粒子 */}
                {[...Array(20)].map((_, i) => {
                  const angle = (i * 360) / 20;
                  const radius = 150;
                  const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                  const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="url(#gradient1)"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;0.8;0.3"
                        dur={`${2 + i * 0.1}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}
              </svg>

              {/* アイコンバッジ（SVGの周りに配置） */}
              <div className="absolute top-10 left-10 bg-white rounded-full p-3 shadow-xl transform hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-primary-600" />
              </div>
              <div className="absolute top-20 right-10 bg-white rounded-full p-3 shadow-xl transform hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div className="absolute bottom-20 left-20 bg-white rounded-full p-3 shadow-xl transform hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>

            {/* 統計情報カード */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl md:text-3xl font-black text-primary-600 mb-1">100+</div>
                <div className="text-xs md:text-sm text-neutral-600">プロンプト</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl md:text-3xl font-black text-purple-600 mb-1">24/7</div>
                <div className="text-xs md:text-sm text-neutral-600">サポート</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl md:text-3xl font-black text-pink-600 mb-1">AI</div>
                <div className="text-xs md:text-sm text-neutral-600">パワード</div>
              </div>
            </div>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors group"
            aria-label="下にスクロール"
          >
            <span className="text-sm md:text-base font-medium">さらに見る</span>
            <div className="w-12 h-12 rounded-full bg-white border border-primary-200 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
