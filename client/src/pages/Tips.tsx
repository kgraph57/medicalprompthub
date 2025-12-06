import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Lightbulb, TrendingUp, Zap, Stethoscope, MessageSquare, BookOpen, ArrowRight } from "lucide-react";
import { tips } from "@/lib/tips";

export default function Tips() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("level");

  // カテゴリアイコンのマッピング
  const categoryIcons = {
    basic: Lightbulb,
    quality: TrendingUp,
    advanced: Zap,
    medical: Stethoscope,
    interactive: MessageSquare,
  };

  // レベルの日本語変換
  const levelMap = {
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
  };

  // フィルタリング
  const filteredTips = tips
    .filter((tip) => {
      const matchesSearch =
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "level") {
        const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        return levelOrder[a.level] - levelOrder[b.level];
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-10 w-10 text-blue-600 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prompt Engineering
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            AIを最大限に活用するための実践的なテクニック集。医療・研究シーンに特化した、すぐに使えるプロンプト例と解説を提供します。
          </p>
        </div>

        {/* プロンプトエンジニアリング説明カード */}
        <Card className="mb-8 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">プロンプトエンジニアリングとは？</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              大規模言語モデル（LLM）から望ましい出力を引き出すための指示（プロンプト）を設計、最適化する技術です。医療・研究分野では、精度の向上、効率化、創造性の支援、倫理的配慮の観点から極めて重要です。
            </p>
            <Link to="/prompt-engineering-guide">
              <Button variant="outline" size="sm" className="gap-2">
                詳しく学ぶ
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 検索とフィルター */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Tipsを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="並び替え" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="level">レベル: 初級→上級</SelectItem>
              <SelectItem value="title">タイトル</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            すべて
          </Button>
          <Button
            variant={selectedCategory === "basic" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("basic")}
            className="gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            基本テクニック
          </Button>
          <Button
            variant={selectedCategory === "quality" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("quality")}
            className="gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            品質向上
          </Button>
          <Button
            variant={selectedCategory === "advanced" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("advanced")}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            高度なテクニック
          </Button>
          <Button
            variant={selectedCategory === "medical" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("medical")}
            className="gap-2"
          >
            <Stethoscope className="h-4 w-4" />
            医療特化
          </Button>
          <Button
            variant={selectedCategory === "interactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("interactive")}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            対話型
          </Button>
        </div>

        {/* Tipsグリッド */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const IconComponent = categoryIcons[tip.category];
            return (
              <Link key={tip.id} to={`/tips/${tip.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <Badge variant="secondary">{levelMap[tip.level]}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{tip.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tip.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* 結果が見つからない場合 */}
        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              該当するTipsが見つかりませんでした。検索条件を変更してみてください。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
