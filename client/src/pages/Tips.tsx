import { Layout, useToc } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { updateSEO } from "@/lib/seo";
import { loadTips } from "@/lib/tips-loader";
import type { PromptTip } from "@/lib/tips";

const categoryLabels: Record<PromptTip['category'], string> = {
  basic: 'Basic',
  quality: 'Quality',
  advanced: 'Advanced',
  medical: 'Medical',
  interactive: 'Interactive'
};

const levelLabels: Record<PromptTip['level'], string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級'
};

// Tipアイテムコンポーネント
function TipItem({ tip, index }: { tip: PromptTip; index: number }) {
  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group flex items-center justify-between gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer -mx-4 px-4"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {tip.title}
          </h3>
          <span className={cn(
            "text-[10px] font-medium px-1.5 py-0.5 rounded",
            tip.level === 'beginner'
              ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
              : tip.level === 'intermediate'
              ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
              : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
          )}>
            {levelLabels[tip.level]}
          </span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
          {tip.description}
        </p>
      </div>

      <ChevronRight className="flex-shrink-0 w-5 h-5 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </motion.div>
  );

  return (
    <Link href={`/tips/${tip.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      {content}
    </Link>
  );
}

// カテゴリセクションコンポーネント
const INITIAL_DISPLAY_COUNT = 5;

function CategorySection({
  category,
  tips,
  searchQuery
}: {
  category: PromptTip['category'];
  tips: PromptTip[];
  searchQuery: string
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredTips = tips.filter(t => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.content.toLowerCase().includes(query)
    );
  });

  if (filteredTips.length === 0) return null;

  const hasMore = !searchQuery && filteredTips.length > INITIAL_DISPLAY_COUNT;
  const displayedTips = (searchQuery || isExpanded)
    ? filteredTips
    : filteredTips.slice(0, INITIAL_DISPLAY_COUNT);
  const remainingCount = filteredTips.length - INITIAL_DISPLAY_COUNT;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-16"
    >
      {/* カテゴリヘッダー */}
      <div className="flex items-baseline gap-3 mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          {categoryLabels[category]}
        </h2>
        <span className="text-xs text-neutral-300 dark:text-neutral-600">
          {filteredTips.length}
        </span>
      </div>

      {/* Tipsリスト */}
      <div>
        {displayedTips.map((tip, index) => (
          <TipItem key={tip.id} tip={tip} index={index} />
        ))}
      </div>

      {/* すべて見る / 閉じる ボタン */}
      {hasMore && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          {isExpanded ? (
            <>閉じる</>
          ) : (
            <>他 {remainingCount} 件を見る</>
          )}
          <ChevronRight className={cn(
            "w-4 h-4 transition-transform",
            isExpanded && "rotate-90"
          )} />
        </motion.button>
      )}
    </motion.section>
  );
}

export default function Tips() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tips, setTips] = useState<PromptTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setTocItems } = useToc();

  useEffect(() => {
    updateSEO({
      title: "Tips & Techniques | HELIX",
      description: "Practical techniques to maximize AI prompt effectiveness for medical professionals.",
      path: "/tips",
      keywords: "AI tips, prompt engineering, medical AI, techniques, best practices"
    });
  }, []);

  useEffect(() => {
    setTocItems([]);
  }, [setTocItems]);

  useEffect(() => {
    const loadData = () => {
      loadTips()
        .then((loadedTips) => {
          setTips(loadedTips);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load tips:', error);
          setIsLoading(false);
        });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: 2000 });
    } else {
      setTimeout(loadData, 100);
    }
  }, []);

  const categories: PromptTip['category'][] = ['basic', 'quality', 'advanced', 'medical', 'interactive'];

  const tipsByCategory = useMemo(() => {
    const grouped: Record<PromptTip['category'], PromptTip[]> = {
      basic: [],
      quality: [],
      advanced: [],
      medical: [],
      interactive: []
    };
    tips.forEach(tip => {
      grouped[tip.category].push(tip);
    });
    return grouped;
  }, [tips]);

  const hasNoResults = useMemo(() => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return !tips.some(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.content.toLowerCase().includes(query)
    );
  }, [searchQuery, tips]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* ヒーローセクション */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            {/* タイトル */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
            >
              Tips & Techniques
            </motion.h1>

            {/* サブタイトル */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-500 dark:text-neutral-400 mb-8"
            >
              Practical techniques to maximize AI prompt effectiveness.
            </motion.p>

            {/* 検索 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 pl-10 pr-10 text-sm rounded-lg bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tips一覧 */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          {!isLoading && categories.map(category => (
            <CategorySection
              key={category}
              category={category}
              tips={tipsByCategory[category]}
              searchQuery={searchQuery}
            />
          ))}

          {/* 検索結果なし */}
          {!isLoading && hasNoResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Search className="w-12 h-12 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                No tips found
              </p>
              <p className="text-neutral-500 dark:text-neutral-500">
                Try a different search term
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </Layout>
  );
}
