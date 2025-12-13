import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export function HeroSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* メインタイトル - Vercel風のシンプルで明確なタイポグラフィ */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-900 leading-[1.1] tracking-tight">
            医療の情熱を
            <br />
            <span className="text-primary-600">プロンプトで解き放つ</span>
          </h1>
          
          {/* サブタイトル - 簡潔で明確な価値提案 */}
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            100以上の実践プロンプトで、あなたの専門性を高める
          </p>
          
          {/* CTA - 明確なアクション */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <button
              onClick={() => setLocation('/guides')}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              はじめる
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => {
                const element = document.getElementById('prompts');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              プロンプトを探す
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
