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

  return (
    <section 
      className="relative py-8 md:py-12 lg:py-16 bg-white dark:bg-neutral-950"
    >

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

      </motion.div>
    </section>
  );
}
