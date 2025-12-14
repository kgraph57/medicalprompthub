import { Activity, FileText, BarChart3, GraduationCap, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // パララックス効果
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-8 md:py-12 lg:py-16 bg-white dark:bg-neutral-950 overflow-hidden"
    >
      {/* 背景装飾 */}
      <motion.div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"></div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Linear.app風：カテゴリ + パンチライン + 説明文 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.div>

        {/* ユースケースカードグリッド（2x2レイアウト） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {useCases.slice(0, 4).map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.title}
                className="relative group bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/60 dark:border-neutral-700/60 hover:border-neutral-300/70 dark:hover:border-neutral-600/70 transition-all duration-300 flex flex-col overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {/* ホバー時のグラデーション背景 */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.03), transparent 60%)",
                  }}
                />
                <div className="relative z-10">
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
                <motion.a
                  href="#prompts"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200 group/cta"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
