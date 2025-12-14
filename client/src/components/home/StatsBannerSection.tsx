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
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
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

        {/* Vercel/Linear風：シンプルで洗練されたビジュアル */}
        <motion.div
          className="mt-16 md:mt-20 lg:mt-24 flex justify-center"
          variants={itemVariants}
        >
          <div className="relative group w-full max-w-5xl">
            <motion.div
              className="relative rounded-xl overflow-hidden bg-gradient-to-br from-neutral-50/50 to-white dark:from-neutral-900/50 dark:to-neutral-800/50 border border-neutral-200/30 dark:border-neutral-700/30 backdrop-blur-sm"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.3 }}
            >
              {/* Vercel/Linear風：幾何学的なパターン */}
              <div className="w-full aspect-video flex items-center justify-center p-8 md:p-16 relative overflow-hidden">
                {/* 背景の微細なパターン */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* 中央の装飾的な要素 */}
                <svg
                  viewBox="0 0 800 400"
                  className="w-full h-full max-w-3xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="vercelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.05" />
                      <stop offset="50%" stopColor="#000000" stopOpacity="0.02" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#9B87F5" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* 微細な幾何学的パターン */}
                  <g opacity="0.4" className="dark:opacity-20">
                    {/* 円形の装飾 */}
                    {[0, 1, 2].map((i) => (
                      <motion.circle
                        key={`circle-${i}`}
                        cx={200 + i * 200}
                        cy={200}
                        r={60 + i * 20}
                        fill="none"
                        stroke="url(#vercelGradient)"
                        strokeWidth="1"
                        className="dark:stroke-[url(#linearGradient)]"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: i * 0.2,
                          ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
                        }}
                      />
                    ))}
                    
                    {/* 線の装飾 */}
                    <motion.path
                      d="M 100 200 Q 200 100, 300 200 T 500 200 T 700 200"
                      fill="none"
                      stroke="url(#vercelGradient)"
                      strokeWidth="1.5"
                      className="dark:stroke-[url(#linearGradient)]"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    />
                    
                    {/* 点の装飾 */}
                    {statItems.map((_, index) => {
                      const x = 150 + index * 150;
                      const y = 200;
                      return (
                        <motion.circle
                          key={`dot-${index}`}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="url(#vercelGradient)"
                          className="dark:fill-[url(#linearGradient)]"
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.8 + index * 0.1,
                            ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
                          }}
                        />
                      );
                    })}
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
