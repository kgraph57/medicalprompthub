import { useMemo } from "react";
import { FileText, Layers, BookOpen, Users } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/prompts";
import type { Prompt } from "@/lib/prompts";

interface StatsBannerSectionProps {
  prompts: Prompt[];
}

// Vercel/Linear風アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Linear風イージング
    },
  },
};

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
      // 追加の統計情報（将来拡張用）
      avgPromptsPerCategory: totalCategories > 0 
        ? Math.round(totalPrompts / totalCategories) 
        : 0,
    };
  }, [prompts]);

  const statItems = [
    {
      icon: FileText,
      label: "Prompts",
      value: stats.totalPrompts,
      suffix: "",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      iconGradient: "from-blue-500 to-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Layers,
      label: "Categories",
      value: stats.totalCategories,
      suffix: "",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      iconGradient: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: BookOpen,
      label: "Tags",
      value: stats.totalTags,
      suffix: "",
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      iconGradient: "from-purple-500 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Users,
      label: "Healthcare Professionals",
      value: "1000+",
      suffix: "",
      gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      iconGradient: "from-amber-500 to-amber-600",
      textColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* モダンな背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 via-white to-white dark:from-neutral-950/50 dark:via-neutral-900 dark:to-neutral-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]" />
      
      {/* 装飾的なグリッドパターン */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 dark:opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
        >
          {statItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                className="group relative"
              >
                {/* カード本体 */}
                <div className="relative h-full flex flex-col items-center text-center p-5 md:p-6 lg:p-8 rounded-2xl bg-white/60 dark:bg-neutral-800/40 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-white/80 dark:hover:bg-neutral-800/60 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50">
                  {/* グラデーション背景 */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* アイコン */}
                  <div className="relative mb-4 md:mb-5">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
                      {/* グラデーション背景 */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.iconGradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />
                      {/* アイコンコンテナ */}
                      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50 group-hover:border-transparent transition-all duration-300 group-hover:scale-110">
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ${item.textColor} transition-transform duration-300 group-hover:scale-110`} />
                      </div>
                    </div>
                  </div>
                  
                  {/* 数値 */}
                  <div className="relative mb-1.5 md:mb-2">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-100 bg-clip-text text-transparent">
                      {item.value}
                    </span>
                    {item.suffix && (
                      <span className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 ml-1">
                        {item.suffix}
                      </span>
                    )}
                  </div>
                  
                  {/* ラベル */}
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                    {item.label}
                  </p>
                  
                  {/* ホバー時の光るエフェクト */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} blur-2xl`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
