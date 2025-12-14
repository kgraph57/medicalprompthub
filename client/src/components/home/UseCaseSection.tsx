import { Activity, FileText, BarChart3, GraduationCap, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Activity,
    title: "救急外来での診断支援",
    scene: "複雑な症状を持つ患者の鑑別診断をAIがサポート",
    feature: "Prompts（鑑別診断）",
    effect: "診断時間を30%短縮",
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: FileText,
    title: "症例報告の作成",
    scene: "症例報告の構成から執筆までをステップバイステップでガイド",
    feature: "Guides（症例報告ワークフロー）",
    effect: "作成時間を50%削減",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "研究データの統計解析",
    scene: "統計解析コードの生成から結果の解釈までをサポート",
    feature: "Prompts（統計解析）",
    effect: "解析時間を40%短縮",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: GraduationCap,
    title: "AI活用スキルの習得",
    scene: "AIの基礎から実践まで、体系的に学習",
    feature: "Courses（AI基礎コース）",
    effect: "2週間で実務レベルに到達",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export function UseCaseSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-8 md:py-12 lg:py-16 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Linear.app風：カテゴリ + パンチライン + 説明文 */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* カテゴリ/ラベル */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
              Use Cases
            </span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>
          
          {/* パンチライン */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            Real-world medical applications
          </h2>
          
          {/* 説明文 */}
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed tracking-[-0.01em]">
            See how healthcare professionals use AI to streamline diagnosis, research, and patient care in daily practice.
          </p>
        </div>

        {/* ユースケースカードグリッド（2x2レイアウト） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {useCases.slice(0, 4).map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-neutral-300/70 dark:hover:border-neutral-600/70 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {/* カテゴリ/ラベル */}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${useCase.iconColor}`} strokeWidth={2} />
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
                    {useCase.feature.split('（')[0]}
                  </span>
                </div>

                {/* パンチライン */}
                <h3 className="text-xl md:text-2xl font-black mb-3 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                  {useCase.title}
                </h3>

                {/* 説明文 */}
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed tracking-[-0.01em] flex-grow">
                  {useCase.scene}
                </p>

                {/* CTA */}
                <a
                  href="#prompts"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200 group"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
