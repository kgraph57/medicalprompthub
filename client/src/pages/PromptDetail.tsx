import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fullPrompts as prompts } from "@/lib/prompts-full";
import { AlertTriangle, ArrowLeft, Bookmark, Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { CollapsibleWarning } from "@/components/CollapsibleWarning";
import { PromptSidebar } from "@/components/PromptSidebar";
import { PromptChecklist } from "@/components/PromptChecklist";
import { FactCheckLinks } from "@/components/FactCheckLinks";
import { PromptFeedback } from "@/components/PromptFeedback";
import { ShareButtons } from "@/components/ShareButtons";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
import { usePromptStats } from "@/hooks/usePromptStats";
import { Link, useRoute } from "wouter";
import { trackPromptCopy, trackPromptView } from "@/lib/analytics";

export default function PromptDetail() {
  const [match, params] = useRoute("/prompts/:id");
  const promptId = match ? params.id : null;
  const prompt = prompts.find((p) => p.id === promptId);

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { trackPromptUsage, getPromptUsageCount } = usePromptStats();
  const usageCount = prompt ? getPromptUsageCount(prompt.id) : 0;

  const isFavorite = (id: string) => favorites.includes(id);

  // プロンプト閲覧を追跡
  useEffect(() => {
    if (prompt) {
      trackPromptView(prompt.id, prompt.title);
    }
  }, [prompt]);

  if (!prompt) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Prompt not found</h2>
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
      <main className="flex-1 max-w-5xl mx-auto p-8">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href={`/category/${prompt.category}`}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{prompt.title}</h1>
                {prompt.riskLevel === 'high' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground">
                    <AlertTriangle className="w-4 h-4 mr-1.5" />
                    高リスク
                  </span>
                )}
                {prompt.riskLevel === 'medium' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground">
                    中リスク
                  </span>
                )}
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">{prompt.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <ShareButtons 
                title={prompt.title}
                url={window.location.href}
                description={prompt.description}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleFavorite(prompt.id)}
                className={isFavorite(prompt.id) ? "text-primary border-primary" : ""}
              >
                <Bookmark className={isFavorite(prompt.id) ? "fill-current w-5 h-5" : "w-5 h-5"} />
              </Button>
            </div>
          </div>

          {/* 警告メッセージ（折りたたみ式） */}
          {prompt.warningMessage && (
            <div className="mb-4">
              <CollapsibleWarning message={prompt.warningMessage} defaultOpen={false} />
            </div>
          )}
        </div>

        {/* プロンプト出力エリア（Above the Fold） */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                プロンプトプレビュー
              </CardTitle>
              <Button onClick={handleCopy} size="lg">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" /> コピー完了
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" /> コピー
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border">
                {generatePrompt()}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 入力フォームエリア */}
        <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">入力項目</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RefreshCw className="w-4 h-4 mr-2" /> リセット
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {prompt.inputs.map((input) => (
                    <div key={input.key} className="space-y-2">
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

        {/* フィードバック */}
        <div className="mt-6">
          <PromptFeedback promptId={prompt.id} />
        </div>
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
              <p className="text-xs text-muted-foreground mt-1">このプロンプトを使用した回数</p>
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
