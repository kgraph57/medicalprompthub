import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getPromptById, loadPrompts } from "@/lib/prompts-loader";
import { cn } from "@/lib/utils";
import { AlertTriangle, ArrowLeft, Bookmark, Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { CollapsibleWarning } from "@/components/CollapsibleWarning";
import { PromptSidebar } from "@/components/PromptSidebar";
import { PromptChecklist } from "@/components/PromptChecklist";
import { FactCheckLinks } from "@/components/FactCheckLinks";
import { ShareButtons } from "@/components/ShareButtons";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
import { usePromptStats } from "@/hooks/usePromptStats";
import { Link, useRoute, useLocation } from "wouter";
import { trackPromptCopy, trackPromptView } from "@/lib/analytics";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { updateSEO, addStructuredData, BASE_URL } from "@/lib/seo";
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
  const { trackPromptUsage, getPromptUsageCount } = usePromptStats();
  const usageCount = prompt ? getPromptUsageCount(prompt.id) : 0;

  const isFavorite = (id: string) => favorites.includes(id);

  // SEO設定とプロンプト閲覧を追跡
  useEffect(() => {
    if (prompt) {
      // SEO最適化
      updateSEO({
        title: `${prompt.title} | Medical Prompt Hub`,
        description: prompt.description || `${prompt.title}のプロンプト。医療従事者がAIを効果的に活用するための実践的なプロンプトです。`,
        path: `/prompts/${prompt.id}`,
        keywords: `${prompt.title},${prompt.category},医療,AI,プロンプト,${prompt.tags?.join(',') || ''}`,
        ogImage: prompt.image ? `${BASE_URL}${prompt.image}` : undefined
      });

      // 構造化データ（Article）を追加
      addStructuredData({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": prompt.title,
        "description": prompt.description || `${prompt.title}のプロンプト`,
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
        "datePublished": prompt.createdAt || new Date().toISOString(),
        "dateModified": prompt.updatedAt || new Date().toISOString(),
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
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </Layout>
    );
  }

  if (!prompt) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">プロンプトが見つかりません</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
            </Button>
          </Link>
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
        toast.success("クリップボードにコピーしました");
      }
      
      // GA4にコピーイベントを送信
      trackPromptCopy(prompt.id, prompt.title);
      // 使用統計を記録
      trackPromptUsage(prompt.id);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("コピーに失敗しました");
    }
  };

  const handleReset = () => {
    setInputValues({});
    toast.info("入力をリセットしました");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* 左サイドバーはLayoutコンポーネントで管理 */}
      
      {/* メインコンテンツ */}
      <main className="flex-1 max-w-5xl mx-auto p-2 md:p-3">
        {/* ヘッダー */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/category/${prompt.category}`}>
              <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <h1 className="text-lg md:text-xl font-bold tracking-tight">{prompt.title}</h1>
                {prompt.riskLevel === 'high' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    高リスク
                  </span>
                )}
                {prompt.riskLevel === 'medium' && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    中リスク
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-snug">{prompt.description}</p>
            </div>
            <div className="flex items-center gap-1">
              <ShareButtons 
                title={prompt.title}
                url={window.location.href}
                description={prompt.description}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleFavorite(prompt.id)}
                className={cn(
                  "h-7 w-7",
                  isFavorite(prompt.id) ? "text-primary border-primary" : ""
                )}
              >
                <Bookmark className={isFavorite(prompt.id) ? "fill-current w-4 h-4" : "w-4 h-4"} />
              </Button>
            </div>
          </div>
        </div>

        {/* プロンプト出力エリア（Above the Fold） */}
        <Card className="mb-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm md:text-base font-semibold flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                プロンプトプレビュー
              </CardTitle>
              <Button onClick={handleCopy} variant="ghost" size="sm">
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-1" /> コピー完了
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" /> コピー
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <pre className="whitespace-pre-wrap text-xs md:text-sm font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded-lg border">
                {generatePrompt()}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 入力フォームエリア */}
        <Card className="mb-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm md:text-base font-semibold">入力項目</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RefreshCw className="w-4 h-4 mr-2" /> リセット
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {prompt.inputs.map((input) => (
                    <div key={input.key} className="space-y-1">
                      <Label htmlFor={input.key} className="text-sm font-medium">
                        {input.label}
                      </Label>
                      {input.type === "textarea" ? (
                        <Textarea
                          id={input.key}
                          placeholder={input.placeholder}
                          value={inputValues[input.key] || ""}
                          onChange={(e) => handleInputChange(input.key, e.target.value)}
                          className="min-h-[120px] resize-y"
                        />
                      ) : input.type === "select" ? (
                        <Select
                          value={inputValues[input.key] || ""}
                          onValueChange={(value) => handleInputChange(input.key, value)}
                        >
                          <SelectTrigger id={input.key}>
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
                        />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* 警告メッセージ（折りたたみ式）- ページ下部に目立たない配置 */}
          {prompt.warningMessage && (
            <div className="mt-4 mb-2">
              <CollapsibleWarning message={prompt.warningMessage} defaultOpen={false} />
            </div>
          )}
      </main>

      {/* 右サイドバー（補助ツール） */}
      <PromptSidebar>
        {/* 使用統計 */}
        {usageCount > 0 && (
          <Card className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">使用統計</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{usageCount}回</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">このプロンプトを使用した回数</p>
            </CardContent>
          </Card>
        )}

        {/* チェックリスト */}
        {prompt.riskLevel === 'high' && (
          <div>
            <PromptChecklist promptCategory={prompt.category} promptId={prompt.id} />
          </div>
        )}

        {/* ファクトチェックツール */}
        <div>
          <FactCheckLinks promptCategory={prompt.category} promptId={prompt.id} />
        </div>
      </PromptSidebar>
    </div>
  );
}
