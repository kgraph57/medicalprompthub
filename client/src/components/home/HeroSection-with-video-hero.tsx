import { Search, ChevronDown, Play, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useRef } from "react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

// 動画をメインにしたヒーローセクション
// 特徴: フルスクリーン動画背景、オーバーレイコンテンツ、モダンなレイアウト
export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 動画背景 */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* 実際の動画ファイルのパスを指定 */}
          <source src="/videos/hero-background.mp4" type="video/mp4" />
          <source src="/videos/hero-background.webm" type="video/webm" />
          {/* フォールバック: 動画が存在しない場合 */}
        </video>
        
        {/* 動画が読み込まれない場合のフォールバック背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600">
          {/* アニメーション背景パターン */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)] animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.3),transparent_50%)] animate-pulse delay-1000"></div>
          </div>
        </div>
        
        {/* オーバーレイ（コンテンツを見やすくする） */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* 動画コントロール（オプション） */}
      <button
        onClick={togglePlay}
        className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all"
        aria-label={isPlaying ? "動画を一時停止" : "動画を再生"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <Play className="w-6 h-6" />
        )}
      </button>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full py-20">
        <div className="text-center">
          {/* バッジ */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">2025年、医療AIの新時代</span>
          </div>

          {/* メインタイトル */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 leading-tight text-white drop-shadow-2xl">
            <span className="block">医療の未来を、</span>
            <span className="block mt-3 bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent">
              共に創る
            </span>
          </h1>
          
          {/* サブタイトル */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold max-w-4xl mx-auto text-white/90 mb-4 leading-relaxed drop-shadow-lg">
            あなたの専門性を
            <span className="relative inline-block mx-2">
              <span className="text-white font-black">AMPLIFY</span>
              <span className="absolute -bottom-1 left-0 right-0 h-2 bg-white/30 rounded-full -z-10"></span>
            </span>
            する
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            <span className="font-bold text-white">100以上の実践プロンプト</span>で、<br className="hidden md:block" />
            今日から始める医療の進化
          </p>
          
          {/* コアメッセージ */}
          <div className="mb-10 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border-l-4 border-white/50 p-6 md:p-8 rounded-r-xl shadow-2xl">
              <p className="text-xl md:text-2xl text-white font-bold italic mb-3">
                「医療の本質に、もっと時間を」
              </p>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                鑑別診断、症例報告、研究分析——<br className="hidden md:block" />
                日常業務を効率化し、<span className="font-semibold text-white">患者との対話に集中できる時間</span>を生み出します。
              </p>
            </div>
          </div>
          
          {/* 検索バー */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative bg-white/95 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-2xl overflow-hidden">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-500" />
              <input
                type="text"
                placeholder="必要なプロンプトを検索（例：鑑別診断、症例報告、統計解析）"
                className="w-full h-16 md:h-18 lg:h-20 pl-14 pr-5 text-base md:text-lg bg-transparent border-0 focus:outline-none placeholder:text-neutral-400 text-neutral-700"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          
          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-12">
            <button
              onClick={() => setLocation('/guides')}
              className="group px-10 md:px-12 lg:px-14 py-5 md:py-6 text-base md:text-lg font-black text-white bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
            >
              <span className="flex items-center gap-2">
                はじめる
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
              className="px-10 md:px-12 lg:px-14 py-5 md:py-6 text-base md:text-lg font-bold text-white bg-white/10 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-xl hover:bg-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              プロンプトを探す
            </button>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl text-center transform hover:scale-105 transition-transform border border-white/20">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">100+</div>
              <div className="text-sm md:text-base text-white/80">プロンプト</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl text-center transform hover:scale-105 transition-transform border border-white/20">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">24/7</div>
              <div className="text-sm md:text-base text-white/80">サポート</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl text-center transform hover:scale-105 transition-transform border border-white/20">
              <div className="text-3xl md:text-4xl font-black text-white mb-2">AI</div>
              <div className="text-sm md:text-base text-white/80">パワード</div>
            </div>
          </div>
        </div>

        {/* スクロールインジケーター */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
            className="flex flex-col items-center gap-3 text-white/80 hover:text-white transition-colors group"
            aria-label="下にスクロール"
          >
            <span className="text-sm md:text-base font-medium">さらに見る</span>
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl group-hover:bg-white/20 transition-all">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
