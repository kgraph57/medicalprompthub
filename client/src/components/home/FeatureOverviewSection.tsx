
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    iconSrc: "/medicalprompthub/icons/stethoscope.png",
    title: "診断支援",
    description: "100以上の実践的なプロンプトで、鑑別診断や症例分析をサポート。複雑な症状を持つ患者の診断プロセスを効率化します。",
  },
  {
    iconSrc: "/medicalprompthub/icons/graduation-cap.png",
    title: "学習支援",
    description: "体系的なコースとTipsで、AIの効果的な活用方法を学習。基礎から実践まで、ステップバイステップで習得できます。",
  },
  {
    iconSrc: "/medicalprompthub/icons/zap.png",
    title: "業務効率化",
    description: "症例報告、論文執筆、統計解析などの業務を効率化。時間のかかる作業をAIがサポートし、患者との対話に集中できます。",
  },
];

export function FeatureOverviewSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-3 md:py-12 bg-gray-50">
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
            医療従事者の業務を変革する3つの価値
          </h2>
          <p className="text-xs md:text-sm text-neutral-600 max-w-3xl mx-auto">
            AIを活用することで、診断の精度向上、学習の効率化、業務の自動化を実現します
          </p>
        </div>

        {/* 機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
          {features.map((feature, index) => {
            return (
              <div
                key={feature.title}
                className={`bg-white rounded-lg p-2 md:p-3 shadow-sm hover:shadow-md transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                }}
              >
                <div className="w-12 h-8 md:w-14 md:h-14 mb-1.5">
                  <img src={feature.iconSrc} alt={feature.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-sm md:text-base font-semibold mb-1 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-600 leading-snug">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
