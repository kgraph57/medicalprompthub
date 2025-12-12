import { Search, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
      {/* 控えめな背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-primary-50/40 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center">
          {/* メインタイトル - Vercel風のクリーンなタイポグラフィ */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-900 leading-[1.1] tracking-tight">
              医療の情熱を
              <br />
              <span className="text-primary-600">プロンプトで解き放つ</span>
            </h1>
            
            {/* サブタイトル - シンプルで読みやすい */}
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-2">
                100以上の実践プロンプトで、あなたの専門性を高める
              </p>
              <p className="text-base md:text-lg text-neutral-500">
                日常業務を効率化し、患者との対話に集中できる時間を生み出します
              </p>
            </div>
          </div>

          {/* 検索バー - シンプルで洗練されたデザイン */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="flex items-center bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow focus-within:shadow-md focus-within:border-primary-300">
                <div className="pl-4 pr-3">
                  <Search className="w-5 h-5 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                  placeholder="プロンプトを検索..."
                  className="flex-1 h-12 md:h-14 pr-4 text-base bg-transparent border-0 focus:outline-none focus:ring-0 text-neutral-900 placeholder:text-neutral-400"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
              </div>
            </div>
          </div>
          
          {/* CTAボタン - ミニマルで洗練されたデザイン */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={() => setLocation('/guides')}
              className="group inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="ガイドページへ移動"
            >
                はじめる
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              プロンプトを探す
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
