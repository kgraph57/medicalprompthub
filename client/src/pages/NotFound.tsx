import { Home, ChevronRight, Search } from "lucide-react";
import { useLocation, Link } from "wouter";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";

const popularPages = [
  { label: "ホーム", href: "/", description: "トップページへ" },
  { label: "コース", href: "/courses", description: "学習コース一覧" },
  { label: "ガイド", href: "/guides", description: "実践ガイド集" },
  { label: "プロンプト", href: "/category/all", description: "AIプロンプト一覧" },
  { label: "FAQ", href: "/faq", description: "よくある質問" },
];

export default function NotFound() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    updateSEO({
      title: "404 - ページが見つかりません | HELIX",
      description: "お探しのページは見つかりませんでした。ホームページに戻るか、人気のページをご覧ください。",
      path: "/404",
      noindex: true,
    });
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full text-center"
      >
        {/* 404 Number - HELIX Blue Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <span className="text-[100px] sm:text-[140px] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 dark:from-blue-300 dark:via-blue-400 dark:to-blue-500">
            404
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3"
        >
          ページが見つかりません
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm leading-relaxed"
        >
          お探しのページは存在しないか、移動された可能性があります。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
        >
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-200"
          >
            <Home className="w-4 h-4" />
            ホームに戻る
          </button>
          <button
            onClick={() => setLocation("/category/all")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-sm font-medium transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
            プロンプトを探す
          </button>
        </motion.div>

        {/* Popular Pages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
            人気のページ
          </p>
          <div className="space-y-1">
            {popularPages.map((page, index) => (
              <Link key={page.href} href={page.href}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between py-3 px-4 -mx-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200 cursor-pointer"
                >
                  <div className="text-left">
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                      {page.label}
                    </span>
                    <span className="ml-2 text-xs text-neutral-400 dark:text-neutral-500">
                      {page.description}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
