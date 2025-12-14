import { Link } from "wouter";
import { Star, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Prompt } from "@/lib/prompts";
import { categories } from "@/lib/prompts";

interface FeaturedPromptsSectionProps {
  prompts: Prompt[];
}

// フィーチャードプロンプトのIDリスト（注目のプロンプト）
const FEATURED_PROMPT_IDS = [
  "diagnosis-differential",
  "case-report-outline",
  "literature-summary",
  "patient-explanation-spikes",
  "treatment-evidence",
  "statistics-consultation",
];

// カテゴリのラベルを取得
const getCategoryLabel = (categoryId: string) => {
  return categories.find(c => c.id === categoryId)?.label || categoryId;
};

// カテゴリの色設定
const getCategoryStyle = (categoryId: string) => {
  const styles: Record<string, { bg: string; text: string; border: string }> = {
    'diagnosis': { bg: 'bg-blue-50 dark:bg-blue-950/20', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    'treatment': { bg: 'bg-emerald-50 dark:bg-emerald-950/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
    'documentation': { bg: 'bg-purple-50 dark:bg-purple-950/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
    'literature': { bg: 'bg-indigo-50 dark:bg-indigo-950/20', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-800' },
    'communication': { bg: 'bg-cyan-50 dark:bg-cyan-950/20', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-200 dark:border-cyan-800' },
    'research': { bg: 'bg-violet-50 dark:bg-violet-950/20', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-800' },
  };
  return styles[categoryId] || { bg: 'bg-gray-50 dark:bg-gray-950/20', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-800' };
};

export function FeaturedPromptsSection({ prompts }: FeaturedPromptsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // パララックス効果
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // フィーチャードプロンプトを取得
  const featuredPrompts = prompts
    .filter(prompt => FEATURED_PROMPT_IDS.includes(prompt.id))
    .slice(0, 6); // 最大6つまで表示

  if (featuredPrompts.length === 0) {
    return null;
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative py-8 md:py-12 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 overflow-hidden"
    >
      {/* 背景装飾 */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{ y, opacity }}
      >
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* セクションヘッダー */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Featured Prompts
              </h2>
            </div>
            <Link
              href="/category/all"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Carefully selected practical and effective prompts used by many healthcare professionals
          </p>
        </motion.div>

        {/* フィーチャードプロンプトグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredPrompts.map((prompt, index) => {
            const categoryStyle = getCategoryStyle(prompt.category);
            
            return (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <Link
                  href={`/prompts/${prompt.id}`}
                  className="group block p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50 hover:scale-[1.02] hover:-translate-y-1 active:translate-y-0 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-neutral-200/70 dark:border-neutral-700/70"
              >
                {/* カテゴリバッジ */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} border`}
                  >
                    {getCategoryLabel(prompt.category)}
                  </span>
                </div>

                {/* タイトル */}
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {prompt.title}
                </h3>

                {/* 説明 */}
                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                  {prompt.description}
                </p>

                {/* タグ */}
                {prompt.tags && prompt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* フッター */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    View Details
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
              </motion.div>
            );
          })}
        </div>

        {/* モバイル用の「すべて見る」ボタン */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/category/all"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 dark:text-neutral-900 rounded-lg transition-colors"
          >
            View All Prompts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
