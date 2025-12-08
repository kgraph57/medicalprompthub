import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fullPrompts } from "@/lib/prompts-full";
import { Search, ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { updateSEO, addHomeStructuredData } from "@/lib/seo";
import { trackSearch, trackCategorySelect } from "@/lib/analytics";
import { GamificationStats } from "@/components/GamificationStats";
import { useGamification } from "@/hooks/useGamification";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "医療従事者のためのAIプロンプトライブラリ",
      description: "医師や研究者がAI（ChatGPT, Claudeなど）を臨床、研究、教育に効果的に活用するためのプロンプト集。症例報告の作成、統計解析のコード生成、学会発表の準備など、具体的なタスクに特化した「使える」プロンプトを提供します。",
      path: "/",
      keywords: "医療,AI,プロンプト,症例報告,統計解析,学会発表,医学研究,医療従事者,医師,看護師,薬剤師"
    });
    addHomeStructuredData();
  }, []);
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { stats } = useGamification();

  // 検索イベントを追跡
  useEffect(() => {
    if (searchQuery.trim()) {
      trackSearch(searchQuery, filteredPrompts.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // カテゴリ選択イベントを追跡
  useEffect(() => {
    if (selectedCategory) {
      trackCategorySelect(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // 検索・フィルタリングされたプロンプト
  const filteredPrompts = useMemo(() => {
    const filtered = fullPrompts.filter((prompt) => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? prompt.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [searchQuery, selectedCategory]);

  const categories = Array.from(new Set(fullPrompts.map((p) => p.category)));

  return (
    <Layout>
      <div className="space-y-6 pb-12">
        {/* Hero Section - 最適化版 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 py-6 relative overflow-hidden"
        >
          {/* Subtle gradient background */}
          <div className="absolute inset-0 -z-10 gradient-apple-light opacity-50" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold backdrop-blur-sm border border-primary/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>New: 100+ Professional Medical Prompts Added</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] max-w-4xl mx-auto"
          >
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Medical Prompt Hub
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            医療従事者のために厳選された、高品質なAIプロンプトのコレクションです。
            臨床業務、文書作成、研究活動を精度高く支援します。
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-3 pt-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative z-10"
                onClick={() => {
                  setLocation("/guides");
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 h-14 text-base font-semibold border-2 hover:bg-accent/50 transition-all duration-300 relative z-10"
                onClick={() => {
                  setLocation("/guides");
                }}
              >
                View Guides
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Gamification Stats Section - コンパクト */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-3">
            <h2 className="text-xl font-bold text-center mb-0.5">学習進捗</h2>
            <p className="text-muted-foreground text-center text-xs">
              あなたの学習状況を確認しましょう
            </p>
          </div>
          <GamificationStats
            totalXP={stats.totalXP}
            currentLevel={stats.currentLevel}
            totalLessonsCompleted={stats.totalLessonsCompleted}
            totalBadges={0}
          />
          <div className="mt-3 text-center">
            <Button
              size="default"
              onClick={() => setLocation("/courses")}
              className="rounded-full px-6"
            >
              <GraduationCap className="mr-2 h-4 w-4" />
              学習コースを始める
            </Button>
          </div>
        </motion.section>

        {/* Search Section - コンパクト */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
            <Input
              placeholder="プロンプトを検索 (例: '診断', '紹介状', '研究')..."
              className="pl-12 pr-10 h-12 text-base bg-background/60 backdrop-blur-xl border focus:border-primary/50 transition-all duration-200 rounded-xl shadow-sm hover:shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.section>

        {/* Search Results Section - 最適化 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {searchQuery.trim() || selectedCategory ? `検索結果 ${filteredPrompts.length > 0 ? `(${filteredPrompts.length}件)` : ""}` : "すべてのプロンプト"}
              </h2>
            </div>
            {selectedCategory && (
              <Badge
                variant="default"
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                {selectedCategory} ×
              </Badge>
            )}
          </div>
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setLocation(`/prompts/${prompt.id}`);
                    }}
                    className="relative z-10"
                  >
                    <Card className="h-full min-h-[140px] flex flex-col cursor-pointer border hover:border-primary/30 bg-card group overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 rounded-lg">
                      <CardHeader className="p-4 space-y-2 flex-1">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className="capitalize text-[10px] font-medium px-2 py-0.5 rounded-md">
                            {prompt.category}
                          </Badge>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100" />
                        </div>
                        <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors duration-200 leading-tight line-clamp-2">
                          {prompt.title}
                        </CardTitle>
                        <CardDescription className="text-xs leading-relaxed line-clamp-2">
                          {prompt.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <Search className="h-16 w-16 mx-auto mb-6 opacity-40" />
              <p className="text-xl font-semibold mb-2 text-foreground">プロンプトが見つかりませんでした</p>
              <p className="text-base">検索条件を変更してお試しください</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
              >
                検索をクリア
              </Button>
            </div>
          )}
        </motion.section>
      </div>
    </Layout>
  );
}
