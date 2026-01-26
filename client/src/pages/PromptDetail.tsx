import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { loadPrompts } from "@/lib/prompts-loader";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowLeft, Bookmark, Check, Copy, RefreshCw } from "lucide-react";
import { CollapsibleWarning } from "@/components/CollapsibleWarning";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
import { usePromptStats } from "@/hooks/usePromptStats";
import { Link, useRoute, useLocation } from "wouter";
import { trackPromptCopy, trackPromptView } from "@/lib/analytics";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";
import { motion } from "framer-motion";
import type { Prompt } from "@/lib/prompts";

export default function PromptDetail() {
  const [match, params] = useRoute("/prompts/:id");
  const [, setLocation] = useLocation();
  const promptId = match ? params.id : null;
  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // プロンプトデータの遅延ロード
  useEffect(() => {
    if (!promptId) return;

    loadPrompts().then((loadedPrompts) => {
      setPrompts(loadedPrompts);
      const foundPrompt = loadedPrompts.find((p) => p.id === promptId);
      setPrompt(foundPrompt);
      setIsLoading(false);
    });
  }, [promptId]);

  // 前後のプロンプトを取得
  const currentIndex = promptId ? prompts.findIndex((p) => p.id === promptId) : -1;
  const prevPrompt = currentIndex > 0 ? prompts[currentIndex - 1] : null;
  const nextPrompt = currentIndex < prompts.length - 1 ? prompts[currentIndex + 1] : null;

  // スワイプジェスチャーで前後のプロンプトに移動
  useSwipeGesture({
    onSwipeLeft: () => {
      if (nextPrompt) {
        setLocation(`/prompts/${nextPrompt.id}`);
        toast.success(`次のプロンプト: ${nextPrompt.title}`);
      }
    },
    onSwipeRight: () => {
      if (prevPrompt) {
        setLocation(`/prompts/${prevPrompt.id}`);
        toast.success(`前のプロンプト: ${prevPrompt.title}`);
      }
    },
    threshold: 100
  });

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { trackPromptUsage } = usePromptStats();

  const isFavorite = (id: string) => favorites.includes(id);

  // SEO設定とプロンプト閲覧を追跡
  useEffect(() => {
    if (prompt) {
      // SEO最適化
      updateSEO({
        title: `${prompt.title} | HELIX`,
        description: prompt.description || `${prompt.title}のプロンプト。医療従事者がAIを効果的に活用するための実践的なプロンプトです。`,
        path: `/prompts/${prompt.id}`,
        keywords: `${prompt.title},${prompt.category},医療,AI,プロンプト,${prompt.tags?.join(',') || ''}`,
        ogImage: undefined
      });

      // 構造化データ（Article）を追加
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": prompt.title,
        "description": prompt.description || `${prompt.title}のプロンプト`,
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
        "datePublished": new Date().toISOString(),
        "dateModified": new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BASE_URL}/prompts/${prompt.id}`
        }
      });

      trackPromptView(prompt.id, prompt.title);
    }
  }, [prompt]);

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

  if (!prompt) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Prompt not found</h2>
            <p className="text-neutral-500 mb-4">The requested prompt could not be found.</p>
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

  const handleInputChange = (key: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [key]: value }));
  };

  const generatePrompt = () => {
    let content = prompt.template;
    prompt.inputs.forEach((input) => {
      const value = inputValues[input.key] || `[${input.label}]`;
      content = content.replace(new RegExp(`{{${input.key}}}`, "g"), value);
    });
    return content;
  };

  const handleCopy = async () => {
    const content = generatePrompt();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);

      // 高リスクプロンプトの場合は追加の警告を表示
      if (prompt.riskLevel === 'high') {
        toast.warning("⚠️ 重要：AIの出力は参考情報です。必ず臨床判断とファクトチェックを行ってください。", {
          duration: 5000,
        });
      } else {
        toast.success("Copied to clipboard");
      }

      // GA4にコピーイベントを送信
      trackPromptCopy(prompt.id, prompt.title);
      // 使用統計を記録
      trackPromptUsage(prompt.id);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleReset = () => {
    setInputValues({});
    toast.info("Inputs reset");
  };

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
              <Link href={`/category/${prompt.category}`}>
                <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to category
                </button>
              </Link>
            </motion.div>

            {/* タイトル */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {prompt.title}
                  </h1>
                  {prompt.riskLevel === 'high' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      High Risk
                    </span>
                  )}
                  {prompt.riskLevel === 'medium' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                      Medium Risk
                    </span>
                  )}
                </div>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {prompt.description}
                </p>
              </div>
              <button
                onClick={() => toggleFavorite(prompt.id)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isFavorite(prompt.id)
                    ? "text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-950/30"
                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
              >
                <Bookmark className={cn("w-5 h-5", isFavorite(prompt.id) && "fill-current")} />
              </button>
            </motion.div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          {/* 警告メッセージ */}
          {prompt.warningMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <CollapsibleWarning message={prompt.warningMessage} defaultOpen={false} />
            </motion.div>
          )}

          {/* 入力フォーム */}
          {prompt.inputs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Inputs
                </h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
              <div className="space-y-4 p-5 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
                {prompt.inputs.map((input) => (
                  <div key={input.key} className="space-y-1.5">
                    <Label htmlFor={input.key} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {input.label}
                    </Label>
                    {input.type === "textarea" ? (
                      <Textarea
                        id={input.key}
                        placeholder={input.placeholder}
                        value={inputValues[input.key] || ""}
                        onChange={(e) => handleInputChange(input.key, e.target.value)}
                        className="min-h-[100px] resize-y bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
                      />
                    ) : input.type === "select" ? (
                      <Select
                        value={inputValues[input.key] || ""}
                        onValueChange={(value) => handleInputChange(input.key, value)}
                      >
                        <SelectTrigger id={input.key} className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
                          <SelectValue placeholder={input.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {input.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={input.key}
                        type={input.type}
                        placeholder={input.placeholder}
                        value={inputValues[input.key] || ""}
                        onChange={(e) => handleInputChange(input.key, e.target.value)}
                        className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700"
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* プロンプトプレビュー */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Generated Prompt
              </h2>
              <button
                onClick={handleCopy}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  copied
                    ? "bg-green-600 text-white"
                    : "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100"
                )}
              >
                {copied ? (
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
            <div className="p-5 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed text-neutral-700 dark:text-neutral-300 overflow-x-auto">
                {generatePrompt()}
              </pre>
            </div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
}
