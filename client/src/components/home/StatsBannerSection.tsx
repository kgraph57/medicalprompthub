import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";
import { categories } from "@/lib/prompts";
import type { Prompt } from "@/lib/prompts";

// Linear風：アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// 数値のカウントアップアニメーション
function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (hasAnimated) return;
    
    const timer = setTimeout(() => {
      setHasAnimated(true);
      const duration = 1500;
      const startTime = Date.now();
      const startValue = 0;
      const endValue = value;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数（ease-out）
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(startValue + (endValue - startValue) * eased);
        
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, delay, hasAnimated]);

  return <>{displayValue}</>;
}

interface StatsBannerSectionProps {
  prompts: Prompt[];
}

export function StatsBannerSection({ prompts }: StatsBannerSectionProps) {
  const stats = useMemo(() => {
    const totalPrompts = prompts.length;
    const totalCategories = categories.filter(cat => 
      prompts.some(p => p.category === cat.id)
    ).length;
    const totalTags = new Set(
      prompts.flatMap(p => p.tags || [])
    ).size;

    return {
      totalPrompts,
      totalCategories,
      totalTags,
    };
  }, [prompts]);

  // Linear風：シンプルで意味のある統計情報
  const statItems = [
    {
      value: stats.totalPrompts,
      label: "Prompts",
    },
    {
      value: stats.totalCategories,
      label: "Categories",
    },
    {
      value: stats.totalTags,
      label: "Tags",
    },
    {
      value: "1K+",
      label: "Healthcare Professionals",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // パララックス効果
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-8 md:py-12 lg:py-16 bg-white dark:bg-neutral-950 overflow-hidden"
    >
      {/* Linear風：微細な背景装飾（パララックス効果付き） */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 right-1/4 w-[800px] h-[800px] bg-cyan-500 rounded-full blur-3xl"></div>
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {statItems.map((item, index) => {
            const isLongLabel = item.label === "Healthcare Professionals";
            return (
              <motion.div
                key={item.label}
                className="text-center flex flex-col items-center justify-center min-w-0"
                variants={itemVariants}
                custom={index}
              >
                {/* 数値（Linear風：カウントアップアニメーション） */}
                <div className="mb-3">
                  <span 
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-neutral-50 tracking-[-0.04em] leading-[1] block"
                    style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}
                  >
                    {typeof item.value === 'number' ? (
                      <AnimatedNumber value={item.value} delay={index * 0.1} />
                    ) : (
                      item.value
                    )}
                  </span>
                </div>
                
                {/* ラベル（Linear風：フェードイン） */}
                <p className={`text-sm md:text-base text-neutral-600 dark:text-neutral-400 font-normal tracking-[-0.01em] ${isLongLabel ? 'break-words max-w-[120px] mx-auto' : ''}`}>
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Linear風：装飾的なビジュアル要素（オプション） */}
        <motion.div
          className="mt-16 md:mt-20 lg:mt-24 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative group">
            {/* 画像コンテナ */}
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="/images/stats-visual.png"
                alt="Medical AI Statistics"
                className="w-full h-auto opacity-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              
              {/* フォールバック：装飾的なSVG */}
              <div className="w-full aspect-video flex items-center justify-center p-12">
                <svg
                  viewBox="0 0 400 200"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="visualGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* 装飾的な線 */}
                  <motion.path
                    d="M 50 100 Q 150 50, 250 100 T 450 100"
                    fill="none"
                    stroke="url(#visualGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  
                  {/* 装飾的な円 */}
                  <motion.circle
                    cx="200"
                    cy="100"
                    r="30"
                    fill="url(#visualGradient)"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
