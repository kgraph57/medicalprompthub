import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { fullPrompts as prompts } from "@/lib/prompts-full";
import { ArrowLeft, Bookmark, Check, Copy, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavorites";
import { Link, useRoute } from "wouter";

export default function PromptDetail() {
  const [match, params] = useRoute("/prompt/:id");
  const promptId = match ? params.id : null;
  const prompt = prompts.find((p) => p.id === promptId);

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

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
      toast.success("クリップボードにコピーしました");
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
    <Layout>
      <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 flex-none">
          <Link href={`/category/${prompt.category}`}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{prompt.title}</h1>
            <p className="text-sm text-muted-foreground">{prompt.description}</p>
          </div>
          <div className="ml-auto">
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleFavorite(prompt.id)}
              className={isFavorite(prompt.id) ? "text-yellow-500 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20" : "text-muted-foreground"}
            >
              <Bookmark className={isFavorite(prompt.id) ? "fill-current w-5 h-5" : "w-5 h-5"} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Left: Inputs */}
          <Card className="flex flex-col h-full border-transparent shadow-sm bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3 flex-none border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">入力項目</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                  <RefreshCw className="w-4 h-4 mr-2" /> リセット
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-6">
                <div className="space-y-6 pr-4">
                  {prompt.inputs.map((input) => (
                    <div key={input.key} className="space-y-2">
                      <Label htmlFor={input.key} className="text-sm font-medium text-foreground/80">
                        {input.label}
                      </Label>
                      {input.type === "textarea" ? (
                        <Textarea
                          id={input.key}
                          placeholder={input.placeholder}
                          value={inputValues[input.key] || ""}
                          onChange={(e) => handleInputChange(input.key, e.target.value)}
                          className="min-h-[100px] resize-y bg-background/50 focus:bg-background transition-colors"
                        />
                      ) : input.type === "select" ? (
                        <Select
                          value={inputValues[input.key] || ""}
                          onValueChange={(value) => handleInputChange(input.key, value)}
                        >
                          <SelectTrigger id={input.key} className="bg-background/50 focus:bg-background transition-colors">
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
                          type="text"
                          placeholder={input.placeholder}
                          value={inputValues[input.key] || ""}
                          onChange={(e) => handleInputChange(input.key, e.target.value)}
                          className="bg-background/50 focus:bg-background transition-colors"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right: Preview */}
          <Card className="flex flex-col h-full border-primary/20 shadow-md bg-card">
            <CardHeader className="pb-3 flex-none border-b border-border/50 bg-muted/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  プレビュー
                </CardTitle>
                <Button onClick={handleCopy} size="sm" className={copied ? "bg-green-600 hover:bg-green-700" : ""}>
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" /> コピー完了
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> コピーする
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0 bg-muted/10">
              <ScrollArea className="h-full p-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-mono text-sm bg-transparent p-0 border-0 text-foreground/90">
                    {generatePrompt()}
                  </pre>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
