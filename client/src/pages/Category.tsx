import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories } from "@/lib/prompts";
import { loadPrompts } from "@/lib/prompts-loader";
import { ArrowLeft, ArrowRight, Copy } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState, useEffect } from "react";
import type { Prompt } from "@/lib/prompts";
import { updateSEO } from "@/lib/seo";

export default function Category() {
  const [match, params] = useRoute("/category/:id");
  const categoryId = match ? params.id : null;
  const category = categories.find((c) => c.id === categoryId);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
        title: `${category.name} | Medical Prompt Hub`,
        description: `${category.name}カテゴリのプロンプト一覧。医療従事者がAIを効果的に活用するための実践的なプロンプトを提供しています。`,
        path: `/category/${categoryId}`,
        keywords: `${category.name},医療,AI,プロンプト,${category.description || ''}`
      });
    }
  }, [category, categoryId]);
  
  const categoryPrompts = prompts.filter((p) => p.category === categoryId);

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

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">カテゴリが見つかりません</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 w-4 h-4" /> ホームに戻る
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{category.label}</h1>
            <p className="text-muted-foreground mt-1">{category.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPrompts.map((prompt) => (
            <Link key={prompt.id} href={`/prompts/${prompt.id}`}>
              <Card className="group hover:shadow-md transition-all cursor-pointer border hover:border-primary/20 bg-card h-full min-h-[140px] flex flex-col">
                <CardHeader className="p-4 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {prompt.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                        {prompt.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0 text-[10px] px-2 py-0.5">
                      {prompt.inputs.length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 mt-auto">
                  <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary font-medium transition-colors">
                    View Template <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
