import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fullPrompts } from "@/lib/prompts-full";
import { Search, Activity, ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return fullPrompts.filter((prompt) => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? prompt.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const categories = Array.from(new Set(fullPrompts.map((p) => p.category)));

  return (
    <Layout>
      <div className="space-y-20 pb-24">
        {/* Hero Section - Latest Apple Style */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-8 py-16 relative overflow-hidden"
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
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] max-w-5xl mx-auto"
          >
            Clinical Clarity{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI Prompt Hub
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            A curated collection of high-quality AI prompts designed for healthcare professionals.
            Enhance your clinical workflow, documentation, and research with precision.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <Link href="/guides">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/guides">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-2 hover:bg-accent/50 transition-all duration-300">
                  View Guides
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.section>

        {/* Search & Filter Section - Latest Apple Style */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-12 space-y-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Input
                placeholder="Search prompts (e.g., 'diagnosis', 'referral', 'research')..."
                className="pl-14 pr-12 h-14 text-lg bg-background/60 backdrop-blur-xl border-2 focus:border-primary/50 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge 
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer px-5 py-2 text-sm font-medium rounded-full hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
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
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/prompt/${prompt.id}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Card className="h-full cursor-pointer border-2 border-border/50 hover:border-primary/30 bg-gradient-apple-card group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl">
                        <CardHeader className="p-6 space-y-4">
                          <div className="flex justify-between items-start">
                            <Badge variant="secondary" className="capitalize text-xs font-medium px-3 py-1 rounded-full">
                              {prompt.category}
                            </Badge>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0" />
                          </div>
                          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                            {prompt.title}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed line-clamp-2">
                            {prompt.description}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <AnimatePresence>
            {filteredPrompts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 text-muted-foreground"
              >
                <Search className="h-16 w-16 mx-auto mb-6 opacity-40" />
                <p className="text-xl font-semibold mb-2 text-foreground">No prompts found</p>
                <p className="text-base">Try adjusting your search criteria</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Guides Section - Latest Apple Style */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-16 border-t border-border/40"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Guides & Workflows</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              実際の臨床・研究プロセスでAIプロンプトをどう組み合わせるか、実践的なワークフローを解説します。
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <Link href="/guides">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50 bg-gradient-apple-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <CardHeader className="text-center py-12 px-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6"
                    >
                      <BookOpen className="w-10 h-10 text-primary" />
                    </motion.div>
                    <CardTitle className="text-3xl font-bold mb-4">5つの実践ガイド</CardTitle>
                    <CardDescription className="text-lg leading-relaxed max-w-2xl mx-auto">
                      症例報告、統計解析、学会発表、抄読会、患者説明まで。ステップバイステップで学べる完全ガイド。
                    </CardDescription>
                    <div className="mt-8">
                      <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all">
                        すべてのガイドを見る <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </Link>
          </div>
        </motion.section>

        {/* Features Section - Latest Apple Style */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 py-16 border-t border-border/40"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            whileHover={{ y: -8 }}
            className="text-center space-y-6 p-8 rounded-2xl bg-gradient-apple-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-500"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto"
            >
              <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </motion.div>
            <h3 className="font-bold text-2xl text-foreground">Clinically Verified</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Prompts structured to follow standard medical guidelines and documentation formats.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -8 }}
            className="text-center space-y-6 p-8 rounded-2xl bg-gradient-apple-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-500"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto"
            >
              <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </motion.div>
            <h3 className="font-bold text-2xl text-foreground">Efficiency Boost</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Reduce documentation time by up to 50% with ready-to-use templates.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
            className="text-center space-y-6 p-8 rounded-2xl bg-gradient-apple-card border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-500"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto"
            >
              <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <h3 className="font-bold text-2xl text-foreground">Research Ready</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Advanced prompts for literature review, statistical analysis, and academic writing.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </Layout>
  );
}
