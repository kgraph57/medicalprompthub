import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tips, PromptTip } from "@/lib/tips";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";

const categoryLabels: Record<PromptTip['category'], string> = {
  basic: '基本テクニック',
  quality: '品質向上',
  advanced: '高度なテクニック',
  medical: '医療特化',
  interactive: '対話型'
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

  if (!tip) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Tip not found</h2>
          <Link href="/tips">
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Tips
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(tip.promptTemplate!);
      setCopiedTemplate(true);
      toast.success("プロンプトをコピーしました");
      setTimeout(() => setCopiedTemplate(false), 2000);
    } catch (err) {
      toast.error("コピーに失敗しました");
    }
  };

  const { merits, demerits } = extractKeyPoints(tip.content);
  const basicUsage = extractBasicUsage(tip.content);

  // SEO設定
  useEffect(() => {
    if (tip) {
      updateSEO({
        title: `${tip.title} | AI活用Tips | Medical Prompt Hub`,
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
          "name": "Medical Prompt Hub"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Medical Prompt Hub",
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
      <div className="max-w-4xl mx-auto pb-12 px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Link href="/tips">
            <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground hover:text-foreground h-7 text-xs">
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Tipsに戻る
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-[10px]">
              {categoryLabels[tip.category]}
            </Badge>
            <Badge variant="outline" className="text-[10px]">
              {levelLabels[tip.level]}
            </Badge>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight mb-3 leading-tight">
            {tip.title}
          </h1>
          
          <p className="text-base text-muted-foreground leading-relaxed">
            {tip.description}
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-6"
        >
          {/* When to Use - 使用シーン */}
          {tip.scenario && (
            <section>
              <h2 className="text-xl font-bold mb-3">いつ使うのか</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <p className="text-sm leading-relaxed text-foreground">
                  {tip.scenario}
                </p>
              </div>
            </section>
          )}

          {/* How to Use - 使い方 */}
          <section>
            <h2 className="text-xl font-bold mb-3">どう使うのか</h2>
            
            {/* 基本的な使い方 */}
            {basicUsage && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">このテクニックとは</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="text-xs leading-relaxed whitespace-pre-line">
                    {basicUsage}
                  </p>
                </div>
              </div>
            )}

            {/* プロンプトテンプレート */}
            {tip.promptTemplate && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">プロンプトテンプレート</h3>
                  <Button
                    onClick={handleCopyTemplate}
                    size="sm"
                    variant="outline"
                    className="gap-1.5 h-7 text-xs"
                  >
                    {copiedTemplate ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        コピー済み
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        コピー
                      </>
                    )}
                  </Button>
                </div>
                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 border border-gray-800">
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono text-gray-100 overflow-x-auto">
                    {tip.promptTemplate}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  このテンプレートをコピーして、ChatGPTやClaude AIなどに貼り付けて使用できます
                </p>
              </div>
            )}

            {/* 実践例 */}
            {tip.example && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">実践例</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                  <pre className="text-xs leading-relaxed whitespace-pre-wrap text-foreground">
                    {tip.example}
                  </pre>
                </div>
              </div>
            )}
          </section>

          {/* Key Points - ポイント */}
          {(merits.length > 0 || demerits.length > 0) && (
            <section>
              <h2 className="text-xl font-bold mb-3">押さえておくポイント</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* メリット */}
                {merits.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">
                      メリット
                    </h3>
                    <ul className="space-y-1.5">
                      {merits.map((merit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-green-500 mt-0.5 flex-shrink-0 text-xs">✓</span>
                          <span className="text-xs leading-relaxed">{merit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* デメリット */}
                {demerits.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-orange-600 dark:text-orange-400">
                      デメリット・注意点
                    </h3>
                    <ul className="space-y-1.5">
                      {demerits.map((demerit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5 flex-shrink-0 text-xs">!</span>
                          <span className="text-xs leading-relaxed">{demerit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
