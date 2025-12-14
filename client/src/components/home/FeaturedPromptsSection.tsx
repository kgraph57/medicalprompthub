import { Link } from "wouter";
import { Star, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  // フィーチャードプロンプトを取得
  const featuredPrompts = prompts
    .filter(prompt => FEATURED_PROMPT_IDS.includes(prompt.id))
    .slice(0, 6); // 最大6つまで表示

  if (featuredPrompts.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-8 md:py-12 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* セクションヘッダー */}
        <div
          className={`mb-10 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                注目のプロンプト
              </h2>
            </div>
            <Link
              href="/category/all"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl">
            多くの医療従事者に使われている、実践的で効果的なプロンプトを厳選しました
          </p>
        </div>

        {/* フィーチャードプロンプトグリッド */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "100ms" : "0ms" }}
        >
          {featuredPrompts.map((prompt, index) => {
            const categoryStyle = getCategoryStyle(prompt.category);
            
            return (
              <Link
                key={prompt.id}
                href={`/prompts/${prompt.id}`}
                className={`group block p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50 hover:scale-[1.02] hover:-translate-y-1 active:translate-y-0 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${(index + 1) * 100}ms` : "0ms",
                }}
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
                    詳細を見る
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* モバイル用の「すべて見る」ボタン */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/category/all"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 dark:text-neutral-900 rounded-lg transition-colors"
          >
            すべてのプロンプトを見る
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
