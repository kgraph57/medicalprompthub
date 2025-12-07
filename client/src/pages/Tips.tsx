import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Lightbulb, TrendingUp, Zap, Stethoscope, MessageSquare } from "lucide-react";
import { tips } from "@/lib/tips";

export default function Tips() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"level" | "title">("level");

  // カテゴリアイコンのマッピング
  const categoryIcons: Record<string, any> = {
    basic: Lightbulb,
    quality: TrendingUp,
    advanced: Zap,
    medical: Stethoscope,
    interactive: MessageSquare,
  };

  // カテゴリの日本語名
  const categoryNames: Record<string, string> = {
    basic: "基本テクニック",
    quality: "品質向上",
    advanced: "高度なテクニック",
    medical: "医療特化",
    interactive: "対話型",
  };

  // レベルの日本語変換
  const levelMap: Record<string, string> = {
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
  };

  // レベルの色
  const levelColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  // フィルタリングとソート
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
        const levelOrder: Record<string, number> = { beginner: 1, intermediate: 2, advanced: 3 };
        return levelOrder[a.level] - levelOrder[b.level];
      } else {
        return a.title.localeCompare(b.title, 'ja');
      }
    });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              プロンプトエンジニアリング Tips
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            AIを最大限に活用するための実践的なテクニック集。医療・研究シーンに特化した、すぐに使えるプロンプト例と解説を提供します。
          </p>
        </div>

        {/* 検索バー */}
        <div className="mb-8">
          <Input
            type="text"
            placeholder="Tipsを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-2xl mx-auto"
          />
        </div>

        {/* 並び替えとカテゴリフィルター */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">並び替え:</span>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "level" ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy("level")}
              >
                レベル: 初級→上級
              </Button>
            </div>
          </div>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            すべて
          </Button>
          {Object.entries(categoryNames).map(([key, name]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
            >
              {name}
            </Button>
          ))}
        </div>

        {/* Tips一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => {
            const IconComponent = categoryIcons[tip.category] || Lightbulb;
            
            return (
              <Link key={tip.id} to={`/tips/${tip.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge className={levelColors[tip.level]}>
                        {levelMap[tip.level]}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight mb-2">
                      {tip.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {tip.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* 検索結果が0件の場合 */}
        {filteredTips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              該当するTipsが見つかりませんでした。
            </p>
          </div>
        )}

        {/* Tips総数表示 */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          {filteredTips.length === tips.length 
            ? `全 ${tips.length} 個のTips` 
            : `${filteredTips.length} / ${tips.length} 個のTips`}
        </div>
      </div>
    </Layout>
  );
}
