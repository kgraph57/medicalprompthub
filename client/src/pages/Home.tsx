import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, prompts } from "@/lib/prompts";
import { Activity, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>v1.0.0 Released</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            AI Prompts for <br className="hidden md:block" />
            <span className="text-primary">Healthcare Professionals</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            診断支援、治療計画、患者説明など、医療現場で即戦力となる
            <br className="hidden md:block" />
            高品質なAIプロンプトテンプレート集。
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/category/diagnosis">
              <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                プロンプトを探す <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="https://github.com/kgraph57/medicalprompthub" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base">
                GitHubで見る
              </Button>
            </a>
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="h-full hover:shadow-md transition-all cursor-pointer border-transparent hover:border-primary/20 bg-card/50 backdrop-blur-sm group">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-xl group-hover:text-primary transition-colors">
                      {category.label}
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {prompts.filter(p => p.category === category.id).length} prompts available
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Features / Trust */}
        <section className="py-12 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">医学的正確性</h3>
              <p className="text-muted-foreground text-sm">
                現在の医学的知識とエビデンスに基づき、専門家が監修したプロンプト。
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">臨床での実用性</h3>
              <p className="text-muted-foreground text-sm">
                忙しい臨床現場でも即座に使えるよう、入力項目を最適化。
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">AIネイティブ</h3>
              <p className="text-muted-foreground text-sm">
                GPT-4, Claude, Geminiなどの最新LLMの能力を最大限に引き出す設計。
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
