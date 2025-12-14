import { ArrowRight, BookOpen, Lightbulb, GitBranch, FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const contentTypes = [
  {
    icon: BookOpen,
    title: "体系的に学ぶAI活用コース",
    description: "AIの基礎から実践まで、ステップバイステップで学べる構造化されたコース。医療現場での具体的な活用方法を習得できます。",
    cta: "コースを見る",
    link: "/courses",
    bgColor: "bg-blue-50/50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
    examples: [
      "AI基礎コース",
      "プロンプトエンジニアリング",
      "医療AI実践"
    ]
  },
  {
    icon: Lightbulb,
    title: "すぐに使えるAI活用Tips",
    description: "プロンプトの書き方から高度なテクニックまで、実践的なTipsを提供。明日から使える具体的なノウハウが満載です。",
    cta: "Tipsを見る",
    link: "/tips",
    bgColor: "bg-amber-50/50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-100",
    examples: [
      "Few-Shotプロンプティング",
      "Chain-of-Thought",
      "構造化出力"
    ]
  },
  {
    icon: GitBranch,
    title: "実務に使えるワークフローガイド",
    description: "症例報告、論文執筆、英文校正など、実務に直結するステップバイステップガイド。複雑な業務を効率化します。",
    cta: "ガイドを見る",
    link: "/guides",
    bgColor: "bg-green-50/50",
    iconColor: "text-green-600",
    borderColor: "border-green-100",
    examples: [
      "症例報告作成",
      "論文執筆支援",
      "英文校正"
    ]
  },
  {
    icon: FileText,
    title: "100以上の実践的プロンプト",
    description: "診断、研究、文書作成など、あらゆる場面で使えるプロンプトライブラリ。コピー&ペーストですぐに使えます。",
    cta: "プロンプトを探す",
    link: "#prompts",
    bgColor: "bg-blue-50/50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
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
              Resources
            </span>
            <ArrowRight className="w-4 h-4 text-neutral-400" />
          </div>
          
          {/* パンチライン */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
            Comprehensive learning resources
          </h2>
          
          {/* 説明文 */}
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed tracking-[-0.01em]">
            Choose from courses, guides, tips, and prompts to accelerate your medical AI journey.
          </p>
        </div>

        {/* コンテンツカードグリッド */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {contentTypes.map((content, index) => {
            const Icon = content.icon;
            return (
              <motion.div
                key={content.title}
                className="group rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 bg-white dark:bg-neutral-900 hover:border-neutral-300/70 dark:hover:border-neutral-600/70 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                onClick={() => handleNavigation(content.link)}
              >
                {/* カテゴリ/ラベル */}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${content.iconColor}`} strokeWidth={2} />
                  <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
                    {content.title.split(' ')[0]}
                  </span>
                </div>
                
                {/* パンチライン */}
                <h3 className="text-xl md:text-2xl font-black mb-3 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                  {content.title}
                </h3>
                
                {/* 説明文 */}
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-[-0.01em] mb-4">
                  {content.description}
                </p>

                {/* CTA */}
                <a
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
