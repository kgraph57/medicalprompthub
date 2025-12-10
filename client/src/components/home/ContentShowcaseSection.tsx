import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const contentTypes = [
  {
    iconSrc: "/medicalprompthub/icons/book-open.png",
    title: "体系的に学ぶAI活用コース",
    description: "AIの基礎から実践まで、ステップバイステップで学べる構造化されたコース。医療現場での具体的な活用方法を習得できます。",
    cta: "コースを見る",
    link: "/courses",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    examples: [
      "AI基礎コース",
      "プロンプトエンジニアリング",
      "医療AI実践"
    ]
  },
  {
    iconSrc: "/medicalprompthub/icons/lightbulb.png",
    title: "すぐに使えるAI活用Tips",
    description: "プロンプトの書き方から高度なテクニックまで、実践的なTipsを提供。明日から使える具体的なノウハウが満載です。",
    cta: "Tipsを見る",
    link: "/tips",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    examples: [
      "Few-Shotプロンプティング",
      "Chain-of-Thought",
      "構造化出力"
    ]
  },
  {
    iconSrc: "/medicalprompthub/icons/workflow.png",
    title: "実務に使えるワークフローガイド",
    description: "症例報告、論文執筆、英文校正など、実務に直結するステップバイステップガイド。複雑な業務を効率化します。",
    cta: "ガイドを見る",
    link: "/guides",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    examples: [
      "症例報告作成",
      "論文執筆支援",
      "英文校正"
    ]
  },
  {
    iconSrc: "/medicalprompthub/icons/file-text.png",
    title: "100以上の実践的プロンプト",
    description: "診断、研究、文書作成など、あらゆる場面で使えるプロンプトライブラリ。コピー&ペーストですぐに使えます。",
    cta: "プロンプトを探す",
    link: "#prompts",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    examples: [
      "鑑別診断",
      "統計解析",
      "文献レビュー"
    ]
  }
];

export function ContentShowcaseSection() {
  const [, setLocation] = useLocation();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleNavigation = (link: string) => {
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setLocation(link);
    }
  };

  return (
    <section ref={ref} className="py-3 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-2 md:px-3">
        {/* セクションヘッダー */}
        <div
          className={`text-center mb-2 md:mb-3 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-sm md:text-lg font-semibold mb-2 text-neutral-900">
            あなたに最適なコンテンツを見つけよう
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 max-w-3xl mx-auto">
            学習スタイルや目的に応じて、4つのコンテンツタイプから選べます
          </p>
        </div>

        {/* コンテンツカードグリッド */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3">
          {contentTypes.map((content, index) => {
            return (
              <div
                key={content.title}
                className={`rounded-lg p-2 md:p-3 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                {/* アイコンとタイトル */}
                <div className="flex items-start gap-2 mb-1.5">
                  <div className="w-10 h-8 flex-shrink-0">
                    <img src={content.iconSrc} alt={content.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-neutral-900 leading-tight">
                    {content.title}
                  </h3>
                </div>

                {/* 説明 */}
                <p className="text-xs md:text-sm text-neutral-600 mb-1.5 leading-snug">
                  {content.description}
                </p>

                {/* 例 */}
                <div className="mb-1.5">
                  <div className="flex flex-wrap gap-1">
                    {content.examples.map((example) => (
                      <span
                        key={example}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] md:text-xs rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleNavigation(content.link)}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-sm transition-colors group"
                >
                  {content.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
