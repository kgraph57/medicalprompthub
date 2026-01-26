import { ArrowRight, Workflow, Sparkles, LayoutGrid } from "lucide-react";
import { useLocation } from "wouter";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const contentTypes = [
  {
    icon: Sparkles,
    title: "Learning",
    description: "AIの基礎から実践まで、ステップバイステップで学べる構造化されたコース。医療現場での具体的な活用方法を体系的に習得できます。",
    cta: "コースを見る",
    link: "/courses",
    bgColor: "bg-blue-50/50 dark:bg-blue-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-100 dark:border-blue-800",
    highlight: "100+ lessons"
  },
  {
    icon: Workflow,
    title: "Workflow",
    description: "症例報告、論文執筆、英文校正など、実務に直結するステップバイステップワークフロー。複雑な業務を効率化し、時間を大幅に短縮します。",
    cta: "ワークフローを見る",
    link: "/guides",
    bgColor: "bg-green-50/50 dark:bg-green-950/20",
    iconColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-100 dark:border-green-800",
    highlight: "実務直結"
  },
  {
    icon: LayoutGrid,
    title: "Library",
    description: "診断、研究、文書作成など、あらゆる場面で使えるプロンプトライブラリ。コピー&ペーストですぐに使える実践的なプロンプト集です。",
    cta: "ライブラリを見る",
    link: "#prompts",
    bgColor: "bg-purple-50/50 dark:bg-purple-950/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-100 dark:border-purple-800",
    highlight: "100+ prompts"
  }
];

export function ContentShowcaseSection() {
  const [, setLocation] = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // パララックス効果（モバイルでは無効化）
  const y = isMobile || prefersReducedMotion ? useTransform(scrollYProgress, [0, 1], [0, 0]) : useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

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
    <section 
      ref={sectionRef} 
      className="relative py-8 md:py-12 lg:py-16 bg-background overflow-hidden"
    >
      {/* 背景装飾（モバイルではblur削減） */}
      <motion.div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{ y, opacity }}
      >
        <div className={`absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-500/30 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`}></div>
        <div className={`absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-blue-500/15 rounded-full ${isMobile ? 'blur-xl' : 'blur-3xl'}`}></div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Linear.app風：カテゴリ + パンチライン + 説明文 */}
        <motion.div
          className="mb-8"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={prefersReducedMotion ? {} : { duration: isMobile ? 0.3 : 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            Everything you need to master medical AI
          </h2>
          
          {/* 説明文 */}
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed tracking-[-0.01em]">
            Learn systematically, work efficiently, and access ready-to-use prompts—all in one place.
          </p>
        </motion.div>

        {/* リソースカード（1列） */}
        <div className="space-y-6 md:space-y-8 max-w-3xl">
          {contentTypes.map((content, index) => {
            const Icon = content.icon;
            return (
              <motion.div
                key={content.title}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={prefersReducedMotion ? {} : { 
                  duration: isMobile ? 0.2 : 0.6, 
                  delay: isMobile ? 0 : index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  {/* アイコン */}
                  <Icon className={`w-7 h-7 md:w-8 md:h-8 mt-1 ${content.iconColor}`} strokeWidth={2} />
                  
                  {/* コンテンツ */}
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900 dark:text-neutral-50 tracking-[-0.01em]">
                        {content.title}
                      </h3>
                      {content.highlight && (
                        <span className="text-sm md:text-base text-neutral-500 dark:text-neutral-400">
                          {content.highlight}
                        </span>
                      )}
                    </div>
                    
                    {/* 説明文 */}
                    <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                      {content.description}
                    </p>

                    {/* CTA */}
                    <a
                      className="inline-flex items-center gap-1.5 text-base md:text-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors font-medium"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(content.link);
                      }}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
