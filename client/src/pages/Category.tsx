import { Layout, useToc } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/prompts";
import { loadPrompts } from "@/lib/prompts-loader";
import { Search, X, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Prompt } from "@/lib/prompts";
import { updateSEO } from "@/lib/seo";

// プロンプトアイテムコンポーネント
function PromptItem({ prompt, index }: { prompt: Prompt; index: number }) {
  return (
    <Link href={`/prompts/${prompt.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.02 }}
        className="group flex items-center justify-between gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer -mx-4 px-4"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {prompt.title}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
            {prompt.description}
          </p>
        </div>
        <ChevronRight className="flex-shrink-0 w-5 h-5 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </motion.div>
    </Link>
  );
}

export default function Category() {
  const [match, params] = useRoute("/category/:id");
  const categoryId = match ? params.id : null;
  const category = categories.find((c) => c.id === categoryId);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { setTocItems } = useToc();

  useEffect(() => {
    setTocItems([]);
  }, [setTocItems]);

  useEffect(() => {
    loadPrompts().then((loadedPrompts) => {
      setPrompts(loadedPrompts);
      setIsLoading(false);
    });
  }, []);

  // SEO設定
  useEffect(() => {
    if (category) {
      updateSEO({
        title: `${category.label} | HELIX`,
        description: `${category.label}カテゴリのプロンプト一覧。医療従事者がAIを効果的に活用するための実践的なプロンプトを提供しています。`,
        path: `/category/${categoryId}`,
        keywords: `${category.label},医療,AI,プロンプト,${category.description || ''}`
      });
    }
  }, [category, categoryId]);

  const categoryPrompts = useMemo(() => {
    return prompts.filter((p) => p.category === categoryId);
  }, [prompts, categoryId]);

  const filteredPrompts = useMemo(() => {
    if (!searchQuery) return categoryPrompts;
    const query = searchQuery.toLowerCase();
    return categoryPrompts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [categoryPrompts, searchQuery]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-neutral-300 border-t-neutral-600 mx-auto mb-4"></div>
            <p className="text-sm text-neutral-500">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Category not found</h2>
            <p className="text-neutral-500 mb-4">The requested category could not be found.</p>
            <Link href="/">
              <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                ← Back to home
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* ヒーローセクション */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            {/* 戻るリンク */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/">
                <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to home
                </button>
              </Link>
            </motion.div>

            {/* タイトル */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
            >
              {category.label}
            </motion.h1>

            {/* サブタイトル */}
            {category.description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-neutral-500 dark:text-neutral-400 mb-8"
              >
                {category.description}
              </motion.p>
            )}

            {/* 検索 */}
            {categoryPrompts.length > 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <Input
                    placeholder="Search prompts..."
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
            )}
          </div>
        </section>

        {/* プロンプト一覧 */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* セクションヘッダー */}
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Prompts
              </h2>
              <span className="text-xs text-neutral-300 dark:text-neutral-600">
                {filteredPrompts.length}
              </span>
            </div>

            {/* プロンプトリスト */}
            <div>
              {filteredPrompts.map((prompt, index) => (
                <PromptItem key={prompt.id} prompt={prompt} index={index} />
              ))}
            </div>

            {/* 検索結果なし */}
            {filteredPrompts.length === 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search className="w-12 h-12 mx-auto mb-4 text-neutral-300 dark:text-neutral-600" />
                <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                  No prompts found
                </p>
                <p className="text-neutral-500 dark:text-neutral-500">
                  Try a different search term
                </p>
              </motion.div>
            )}

            {/* カテゴリにプロンプトがない */}
            {categoryPrompts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-neutral-500 dark:text-neutral-400">
                  No prompts in this category yet
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
