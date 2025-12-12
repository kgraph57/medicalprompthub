import { Search, ChevronDown, Play, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

// ビジュアル要素を組み込んだ2025年風デザイン案
// 特徴: 画像/イラスト/動画を活用したモダンなレイアウト
export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative py-12 md:py-20 lg:py-28 overflow-hidden min-h-screen flex items-center">
      {/* 動画背景（オプション） */}
      <div className="absolute inset-0 z-0">
        {/* 動画を使用する場合 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          onLoadedData={() => setIsVideoLoaded(true)}
          style={{ display: isVideoLoaded ? 'block' : 'none' }}
        >
          {/* 実際の動画ファイルのパスを指定 */}
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
        </video>
        
        {/* 動画が読み込まれていない場合のフォールバック背景 */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50"
          style={{ display: isVideoLoaded ? 'none' : 'block' }}
        />
        
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* 左側: テキストコンテンツ */}
          <div className="text-center lg:text-left">
            {/* バッジ */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/90 backdrop-blur-md border border-primary-200 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-neutral-700">AI × 医療の新時代</span>
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
              <div className="bg-white/90 backdrop-blur-md border-l-4 border-primary-600 p-6 rounded-r-xl shadow-xl">
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
              <div className="relative bg-white/90 backdrop-blur-md border-2 border-primary-200 rounded-xl shadow-xl overflow-hidden">
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
                className="px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-semibold text-primary-700 bg-white/90 backdrop-blur-md border-2 border-primary-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                プロンプトを探す
              </button>
            </div>
          </div>

          {/* 右側: ビジュアル要素 */}
          <div className="relative">
            {/* メイン画像/イラスト */}
            <div className="relative group">
              {/* 装飾的な背景 */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              {/* 画像コンテナ */}
              <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                {/* 実際の画像をここに配置 */}
                <img
                  src="/images/hero-illustration.png"
                  alt="医療AIの未来"
                  className="w-full h-auto rounded-2xl"
                  onError={(e) => {
                    // 画像が存在しない場合のフォールバック
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                {/* 画像が存在しない場合のプレースホルダー */}
                <div className="hidden flex-col items-center justify-center aspect-square bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl p-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-purple-400 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-neutral-600 font-semibold text-center">
                    医療AIイラスト<br />
                    <span className="text-sm font-normal">ここに画像を配置</span>
                  </p>
                </div>
              </div>

              {/* 浮遊する装飾要素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>

            {/* 統計情報カード（オプション） */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl md:text-3xl font-black text-primary-600 mb-1">100+</div>
                <div className="text-xs md:text-sm text-neutral-600">プロンプト</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform">
                <div className="text-2xl md:text-3xl font-black text-purple-600 mb-1">24/7</div>
                <div className="text-xs md:text-sm text-neutral-600">サポート</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg text-center transform hover:scale-105 transition-transform">
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
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-primary-200 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
