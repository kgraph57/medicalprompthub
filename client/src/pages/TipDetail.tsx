import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { tips, PromptTip } from "@/lib/tips";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";

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

export default function TipDetail() {
  const [match, params] = useRoute("/tips/:id");
  const tipId = match && params ? params.id : null;
  const tip = tips.find((t) => t.id === tipId);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tip.content);
      setCopied(true);
      toast.success("クリップボードにコピーしました");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("コピーに失敗しました");
    }
  };

  return (
    <Layout>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 flex-none"
        >
          <Link href="/tips">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="capitalize">
                {categoryLabels[tip.category]}
              </Badge>
              <Badge variant="outline">
                {levelLabels[tip.level]}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{tip.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">{tip.description}</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </Button>
        </motion.div>

        <Separator />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="border-transparent shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>詳細説明</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {tip.content}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scenario */}
        {tip.scenario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-blue-500/20 bg-blue-50 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-blue-600 dark:text-blue-400">📍</span>
                  こんな場面で使えます
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{tip.scenario}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Use Case */}
        {tip.useCase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">適用場面</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{tip.useCase}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Prompt Template */}
        {tip.promptTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-green-500/20 bg-green-50 dark:bg-green-950/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✨</span>
                    プロンプトテンプレート
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(tip.promptTemplate!);
                        toast.success("プロンプトをコピーしました");
                      } catch (err) {
                        toast.error("コピーに失敗しました");
                      }
                    }}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    コピー
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">{tip.promptTemplate}</pre>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  💡 ヒント：[　]の部分に実際の情報を入力してください
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Example */}
        {tip.example && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Card className="border-transparent shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">使用例</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{tip.example}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center pt-8"
        >
          <Link href="/tips">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Tips一覧に戻る
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
