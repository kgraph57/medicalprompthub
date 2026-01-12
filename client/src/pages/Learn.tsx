import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { updateSEO } from "@/lib/seo";
import { motion } from "framer-motion";
import { ChevronRight, Lock, BookOpen, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { organizeCoursesIntoSections, type LearnTopic, type LearnSection } from "@/lib/course-mapper";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Learn() {
  const [location, setLocation] = useLocation();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // コースデータをCursor Learn形式に変換
  const sections = organizeCoursesIntoSections();

  useEffect(() => {
    updateSEO({
      title: "学習 | Helix",
      description: "AIの基礎から実践的な使い方まで、体系的に学べる学習プラットフォーム",
      path: "/learn",
      keywords: "AI学習,AI基礎,プロンプトエンジニアリング,AIリテラシー"
    });

    // URLパラメータからコースIDとレッスンIDを取得
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("course");
    const lessonId = params.get("lesson");
    if (courseId) {
      setSelectedCourseId(courseId);
    }
    if (lessonId) {
      setSelectedLessonId(lessonId);
    }

    // モバイル判定
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 選択されたコース（トピック）を取得
  const selectedTopic = selectedCourseId
    ? sections
        .flatMap((section) => section.topics)
        .find((topic) => topic.id === selectedCourseId)
    : null;

  const handleCourseClick = (topic: LearnTopic) => {
    if (topic.comingSoon) return;
    setSelectedCourseId(topic.id);
    setSelectedLessonId(null);
    setLocation(`/learn?course=${topic.id}`);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleLessonClick = (lessonId: string) => {
    if (!selectedCourseId) return;
    setSelectedLessonId(lessonId);
    setLocation(`/learn?course=${selectedCourseId}&lesson=${lessonId}`);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleBackToCourse = () => {
    setSelectedLessonId(null);
    if (selectedCourseId) {
      setLocation(`/learn?course=${selectedCourseId}`);
    }
  };

  const handleBackToList = () => {
    setSelectedCourseId(null);
    setSelectedLessonId(null);
    setLocation("/learn");
  };

  const SidebarContent = () => {
    // セクション内のトピック番号を計算（各セクションごとに1から開始）
    let globalIndex = 0;
    
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            学習トピック
          </h2>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-accent"
              aria-label="サイドバーを閉じる"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {sections.map((section) => {
          const sectionStartIndex = globalIndex;
          return (
            <div key={section.id} className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.topics.map((topic, index) => {
                  const topicIndex = sectionStartIndex + index + 1;
                  globalIndex++;
                  return (
                    <li key={topic.id}>
                      <button
                        onClick={() => handleCourseClick(topic)}
                        disabled={topic.comingSoon}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 group",
                          selectedCourseId === topic.id
                            ? "bg-primary text-primary-foreground"
                            : topic.comingSoon
                            ? "text-muted-foreground/50 cursor-not-allowed"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <span className="text-xs text-muted-foreground group-hover:text-foreground">
                          {topicIndex}.
                        </span>
                        <span className="flex-1">{topic.title}</span>
                        {topic.comingSoon && (
                          <Lock className="w-3 h-3 text-muted-foreground" />
                        )}
                        {selectedCourseId === topic.id && (
                          <ChevronRight className="w-3 h-3" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-3.5rem)] relative">
        {/* モバイル用オーバーレイ */}
        {isMobile && isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </>
        )}

        {/* 左サイドバー */}
        <aside
          className={cn(
            "w-64 flex-shrink-0 border-r border-border bg-muted/30 overflow-y-auto transition-transform duration-300 z-50",
            isMobile
              ? cn(
                  "fixed left-0 top-0 bottom-0",
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )
              : "relative"
          )}
        >
          <SidebarContent />
        </aside>

        {/* メインコンテンツエリア */}
        <main className="flex-1 overflow-y-auto bg-background">
          {/* モバイル用サイドバートグルボタン */}
          {isMobile && (
            <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="サイドバーを開く"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          )}

          {selectedTopic ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <Button
                    variant="ghost"
                    onClick={handleBackToList}
                    className="mb-4"
                  >
                    ← 一覧に戻る
                  </Button>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4">{selectedTopic.title}</h1>
                  {selectedTopic.description && (
                    <p className="text-muted-foreground text-base sm:text-lg mb-6">
                      {selectedTopic.description}
                    </p>
                  )}
                </motion.div>

                {selectedTopic.content && (
                  <motion.div variants={itemVariants}>
                    <Card className="border-2">
                      <CardContent className="pt-6">
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-2xl prose-h1:mb-6 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:my-4 prose-li:my-2 prose-ul:my-4 prose-ol:my-4 prose-strong:font-semibold prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm break-words">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            components={{
                              h1: ({ node, ...props }: any) => (
                                <h1 className="text-2xl font-bold mb-6 tracking-tight" {...props} />
                              ),
                              h2: ({ node, ...props }: any) => (
                                <h2 className="text-xl font-bold mt-8 mb-4 tracking-tight" {...props} />
                              ),
                              h3: ({ node, ...props }: any) => (
                                <h3 className="text-lg font-bold mt-6 mb-3 tracking-tight" {...props} />
                              ),
                              p: ({ node, ...props }: any) => (
                                <p className="text-base leading-relaxed my-4" {...props} />
                              ),
                              ul: ({ node, ...props }: any) => (
                                <ul className="space-y-2 my-4 list-disc list-inside" {...props} />
                              ),
                              ol: ({ node, ...props }: any) => (
                                <ol className="space-y-2 my-4 list-decimal list-inside" {...props} />
                              ),
                              strong: ({ node, ...props }: any) => (
                                <strong className="font-semibold" {...props} />
                              ),
                              code: ({ node, inline, className, children, ...props }: any) => {
                                if (inline) {
                                  return (
                                    <code
                                      className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-sm"
                                      {...props}
                                    >
                                      {children}
                                    </code>
                                  );
                                }
                                return (
                                  <code
                                    className="block p-4 bg-muted rounded-lg text-sm font-mono overflow-x-auto"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {selectedTopic.content}
                          </ReactMarkdown>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4">Cursor Learn</h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-2">
                    Cursor Learnへようこそ!
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    このコースでは、プログラマーがAIを効果的に活用する方法を学びます。
                    AIモデルやツールを使ったソフトウェア開発に焦点を当て、
                    機械学習やカスタムモデルのトレーニングではありません。
                    モデルの仕組み、種類、制限事項を理解することで、
                    AIをより効果的に活用できるようになります。
                  </p>
                </motion.div>

                {/* 動画プレイヤー部分は除外（プレースホルダーとして表示） */}
                <motion.div variants={itemVariants} className="mb-8">
                  <Card className="border-2 bg-muted/30">
                    <CardContent className="pt-6">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">動画コンテンツは今後追加予定です</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* アナロジー */}
                <motion.div variants={itemVariants}>
                  <Card className="border-2">
                    <CardHeader>
                      <CardTitle>移動手段のアナロジー</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">
                        街を移動する方法には、いくつかの選択肢があります：
                      </p>
                      <ol className="space-y-3 list-decimal list-inside">
                        <li>
                          <strong>徒歩</strong>: 無料ですが、時間がかかります。
                        </li>
                        <li>
                          <strong>自転車</strong>: 少し費用がかかり、やや速いです。
                        </li>
                        <li>
                          <strong>自動車</strong>: 最も高額ですが、最も速いです。
                        </li>
                      </ol>
                      <p className="mt-4 text-muted-foreground">
                        AIモデルも同様に、コスト、速度、性能に応じていろいろな選択肢があります。
                        目的に応じて適切なモデルを選ぶことが重要です。
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
