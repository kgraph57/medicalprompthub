import { Layout, useToc } from "@/components/Layout";
import { tips, PromptTip } from "@/lib/tips";
import { ArrowLeft, Copy, Check, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";

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

// contentからメリット・デメリットを抽出
function extractKeyPoints(content: string) {
  const meritsMatch = content.match(/## メリット\n([\s\S]*?)(?=\n##|$)/);
  const demeritsMatch = content.match(/## デメリット\n([\s\S]*?)(?=\n##|$)/);

  const merits = meritsMatch
    ? meritsMatch[1].trim().split('\n').filter(line => line.startsWith('-')).map(line => line.replace(/^- /, ''))
    : [];

  const demerits = demeritsMatch
    ? demeritsMatch[1].trim().split('\n').filter(line => line.startsWith('-')).map(line => line.replace(/^- /, ''))
    : [];

  return { merits, demerits };
}

// contentから基本的な使い方を抽出
function extractBasicUsage(content: string) {
  const usageMatch = content.match(/## 基本的な使い方\n([\s\S]*?)(?=\n##|$)/);
  if (!usageMatch) return null;

  return usageMatch[1].trim();
}

export default function TipDetail() {
  const [match, params] = useRoute("/tips/:id");
  const tipId = match && params ? params.id : null;
  const tip = tips.find((t) => t.id === tipId);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const { setTocItems } = useToc();

  useEffect(() => {
    setTocItems([]);
  }, [setTocItems]);

  if (!tip) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Tip not found</h2>
            <p className="text-neutral-500 mb-4">The requested tip could not be found.</p>
            <Link href="/tips">
              <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                ← Back to Tips
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(tip.promptTemplate!);
      setCopiedTemplate(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedTemplate(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const { merits, demerits } = extractKeyPoints(tip.content);
  const basicUsage = extractBasicUsage(tip.content);

  // SEO設定
  useEffect(() => {
    if (tip) {
      updateSEO({
        title: `${tip.title} | Tips | HELIX`,
        description: tip.content.substring(0, 150) || `${tip.title}のAI活用Tips。プロンプトエンジニアリングのテクニックを学べます。`,
        path: `/tips/${tipId}`,
        keywords: `${tip.title},AI活用Tips,プロンプトエンジニアリング,${tip.category},${tip.level}`
      });

      // 構造化データ（Article）を追加
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": tip.title,
        "description": tip.content.substring(0, 200) || `${tip.title}のAI活用Tips`,
        "author": {
          "@type": "Organization",
          "name": "HELIX"
        },
        "publisher": {
          "@type": "Organization",
          "name": "HELIX",
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/og-image-new.png`
          }
        },
        "url": `${BASE_URL}/tips/${tipId}`
      });
    }
  }, [tip, tipId]);

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* ヘッダー */}
        <section className="pt-12 sm:pt-16 lg:pt-20 pb-8">
          <div className="max-w-3xl mx-auto px-6">
            {/* 戻るリンク */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/tips">
                <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Tips
                </button>
              </Link>
            </motion.div>

            {/* バッジ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-xs font-medium px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {categoryLabels[tip.category]}
              </span>
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded",
                tip.level === 'beginner'
                  ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
                  : tip.level === 'intermediate'
                  ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                  : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
              )}>
                {levelLabels[tip.level]}
              </span>
            </motion.div>

            {/* タイトル */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4"
            >
              {tip.title}
            </motion.h1>

            {/* 説明 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-lg text-neutral-500 dark:text-neutral-400"
            >
              {tip.description}
            </motion.p>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          {/* 使用シーン */}
          {tip.scenario && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                When to Use
              </h2>
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border-l-2 border-blue-500">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {tip.scenario}
                </p>
              </div>
            </motion.div>
          )}

          {/* 基本的な使い方 */}
          {basicUsage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mb-12"
            >
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                How It Works
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                  {basicUsage}
                </p>
              </div>
            </motion.div>
          )}

          {/* プロンプトテンプレート */}
          {tip.promptTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Prompt Template
                </h2>
                <button
                  onClick={handleCopyTemplate}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                    copiedTemplate
                      ? "bg-green-600 text-white"
                      : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
                  )}
                >
                  {copiedTemplate ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="bg-neutral-900 dark:bg-neutral-950 rounded-lg p-5 border border-neutral-800">
                <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-neutral-100 overflow-x-auto">
                  {tip.promptTemplate}
                </pre>
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                Copy this template and paste it into ChatGPT, Claude, or your preferred AI assistant.
              </p>
            </motion.div>
          )}

          {/* 実践例 */}
          {tip.example && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mb-12"
            >
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                Example
              </h2>
              <div className="p-5 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <pre className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
                  {tip.example}
                </pre>
              </div>
            </motion.div>
          )}

          {/* ポイント */}
          {(merits.length > 0 || demerits.length > 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                Key Points
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* メリット */}
                {merits.length > 0 && (
                  <div className="p-5 bg-green-50/50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900/30">
                    <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {merits.map((merit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                          <span>{merit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* デメリット */}
                {demerits.length > 0 && (
                  <div className="p-5 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg border border-orange-100 dark:border-orange-900/30">
                    <h3 className="text-sm font-semibold text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Considerations
                    </h3>
                    <ul className="space-y-2">
                      {demerits.map((demerit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                          <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                          <span>{demerit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </Layout>
  );
}
