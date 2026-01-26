import { Layout, useToc } from "@/components/Layout";
import { useFavorites } from "@/hooks/useFavorites";
import { fullPrompts } from "@/lib/prompts-full";
import { Bookmark, ChevronRight, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { ExportFavorites } from "@/components/ExportFavorites";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { updateSEO } from "@/lib/seo";
import { cn } from "@/lib/utils";

// お気に入りアイテムコンポーネント
function FavoriteItem({
  prompt,
  index,
  onRemove
}: {
  prompt: { id: string; title: string; description: string };
  index: number;
  onRemove: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group flex items-center justify-between gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800"
    >
      <Link href={`/prompts/${prompt.id}`} style={{ textDecoration: 'none', display: 'block', flex: 1 }}>
        <div className="flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 cursor-pointer -mx-4 px-4 py-2 -my-2 rounded-lg">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {prompt.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
              {prompt.description}
            </p>
          </div>
          <ChevronRight className="flex-shrink-0 w-5 h-5 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(prompt.id);
        }}
        className="flex-shrink-0 p-2 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        aria-label="Remove from favorites"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const favoritePrompts = fullPrompts.filter((p) => favorites.includes(p.id));
  const { setTocItems } = useToc();

  useEffect(() => {
    setTocItems([]);
  }, [setTocItems]);

  useEffect(() => {
    updateSEO({
      title: "Favorites | HELIX",
      description: "Your saved prompts for quick access.",
      path: "/favorites",
      keywords: "favorites,bookmarks,saved,prompts"
    });
  }, []);

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
              Favorites
            </motion.h1>

            {/* サブタイトル */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neutral-500 dark:text-neutral-400 mb-8"
            >
              Your saved prompts for quick access.
            </motion.p>

            {/* エクスポートボタン */}
            {favoritePrompts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ExportFavorites favoriteIds={favorites} />
              </motion.div>
            )}
          </div>
        </section>

        {/* お気に入り一覧 */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          {favoritePrompts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <Bookmark className="w-8 h-8 text-neutral-400" />
              </div>
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                No favorites yet
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
                Click the bookmark icon on any prompt to save it here for quick access.
              </p>
              <Link href="/">
                <button className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
                  Browse prompts
                </button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* セクションヘッダー */}
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Saved Prompts
                </h2>
                <span className="text-xs text-neutral-300 dark:text-neutral-600">
                  {favoritePrompts.length}
                </span>
              </div>

              {/* お気に入りリスト */}
              <div>
                {favoritePrompts.map((prompt, index) => (
                  <FavoriteItem
                    key={prompt.id}
                    prompt={prompt}
                    index={index}
                    onRemove={toggleFavorite}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </Layout>
  );
}
