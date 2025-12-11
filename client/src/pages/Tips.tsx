import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loadTips } from "@/lib/tips-loader";
import type { PromptTip } from "@/lib/tips";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Tips() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<PromptTip['category'] | null>(null);
  const [tips, setTips] = useState<PromptTip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // requestIdleCallbackを使用して、ブラウザがアイドル状態の時にデータを読み込む
    const loadData = () => {
      loadTips().then((loadedTips) => {
        setTips(loadedTips);
        setIsLoading(false);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: 2000 });
    } else {
      setTimeout(loadData, 100);
    }
  }, []);

  const filteredTips = useMemo(() => {
    if (isLoading) return [];
    const filtered = tips.filter((tip) => {
      const matchesSearch = 
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? tip.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [searchQuery, selectedCategory]);

  const categories: PromptTip['category'][] = ['basic', 'quality', 'advanced', 'medical', 'interactive'];

  const categoryCounts = useMemo(() => {
    const counts: Record<PromptTip['category'], number> = {
      basic: 0,
      quality: 0,
      advanced: 0,
      medical: 0,
      interactive: 0
    };
    tips.forEach(tip => {
      counts[tip.category]++;
    });
    return counts;
  }, []);

  return (
    <Layout>
      <div className="space-y-6 pb-8">
        {/* Hero Section - コンパクト */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-1 py-1.5 lg:py-2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg md:text-xl font-bold tracking-tight"
          >
            Tips & Techniques
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto"
          >
            AIプロンプトの効果を最大化するための実践的なテクニック集
          </motion.p>
        </motion.section>

        {/* 基礎コンテンツカード（固定配置） */}
        <div className="max-w-5xl mx-auto">
          <Card className="border border-border">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4" />
                プロンプトエンジニアリングとは？
              </CardTitle>
              <CardDescription className="text-xs">
                AIを最大限に活用するための基礎知識
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs leading-snug p-4">
              <p>
                <strong>プロンプトエンジニアリング</strong>とは、AI（ChatGPT、Claudeなど）に対して、期待する出力を得るための「問いかけ方」を設計・最適化する技術です。医療現場では、曖昧な指示ではAIが不正確な情報を生成するリスクがあります。
              </p>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold">良いプロンプトの5つの原則</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>明確性：</strong>指示は具体的かつ明確に</li>
                  <li><strong>文脈：</strong>必要な背景情報を提供する</li>
                  <li><strong>形式：</strong>出力形式を指定する（例：箇条書き、表形式）</li>
                  <li><strong>制約：</strong>制約条件を明示する（例：文字数、トーン）</li>
                  <li><strong>検証：</strong>AIの出力を必ず検証する</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter Section - コンパクト */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="mb-3 space-y-2">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
              <Input
                placeholder="Tipsを検索 (例: 'Chain-of-Thought', '品質向上')..."
                className="pl-10 pr-4 h-10 text-sm bg-background/60 backdrop-blur-xl border focus:border-primary/50 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center" role="tablist" aria-label="カテゴリフィルタ">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer px-5 py-2 text-sm font-medium rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => {
                    setSelectedCategory(null);
                  }}
                  role="tab"
                  aria-pressed={selectedCategory === null}
                  aria-selected={selectedCategory === null}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCategory(null);
                    }
                  }}
                >
                  すべて ({tips.length})
                </Badge>
              </motion.div>
              {categories.map((cat, index) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedCategory === cat ? "default" : "outline"}
                    className="cursor-pointer capitalize px-5 py-2 text-sm font-medium rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => {
                      setSelectedCategory(cat);
                    }}
                    role="tab"
                    aria-pressed={selectedCategory === cat}
                    aria-selected={selectedCategory === cat}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCategory(cat);
                      }
                    }}
                  >
                    {categoryLabels[cat]} ({categoryCounts[cat]})
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{gridAutoRows: '1fr'}}
          >
            <AnimatePresence mode="popLayout">
              {filteredTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setLocation(`/tips/${tip.id}`);
                    }}
                    className="relative z-10 h-full"
                  >
                    <Card className="h-full flex flex-col cursor-pointer border hover:border-primary/30 bg-card group overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 rounded-lg">
                      <CardHeader className="p-4 space-y-2 flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex gap-1.5 flex-wrap">
                            <Badge variant="secondary" className="capitalize text-[10px] font-medium px-2 py-0.5 rounded-md">
                              {categoryLabels[tip.category]}
                            </Badge>
                            <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 rounded-md">
                              {levelLabels[tip.level]}
                            </Badge>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100" />
                        </div>
                        <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors duration-200 leading-tight line-clamp-2">
                          {tip.title}
                        </CardTitle>
                        <CardDescription className="text-xs leading-relaxed line-clamp-2">
                          {tip.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <AnimatePresence>
            {filteredTips.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 text-muted-foreground"
              >
                <Search className="h-10 lg:h-11 w-16 mx-auto mb-6 opacity-40" />
                <p className="text-xl font-semibold mb-2 text-foreground">Tipsが見つかりませんでした</p>
                <p className="text-base">検索条件を変更してお試しください</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* カウント表示 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12 text-muted-foreground"
          >
            <p className="text-lg font-medium">
              全 {filteredTips.length} 個のTips
              {selectedCategory && ` (${categoryLabels[selectedCategory]})`}
            </p>
          </motion.div>
        </motion.section>
      </div>
    </Layout>
  );
}
