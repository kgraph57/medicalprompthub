import { useRoute, Link } from "wouter";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, BookOpen, Clock, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { updateSEO } from "@/lib/seo";

// ガイドのメタデータ定義
const guideMetadata: Record<string, {
  title: string;
  description: string;
  readTime: string;
  category: string;
  basePath: string;
  steps: Array<{ id: string; title: string; file: string }>;
}> = {
  "conference-presentation": {
    title: "カンファレンス発表資料作成支援",
    description: "AIを活用した効果的なカンファレンス発表資料の作成",
    readTime: "40 min",
    category: "Presentation",
    basePath: "/assets/guides/conference-presentation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "differential-diagnosis": {
    title: "鑑別診断リスト生成",
    description: "AIによる包括的な鑑別診断リストの作成",
    readTime: "30 min",
    category: "Clinical",
    basePath: "/assets/guides/differential-diagnosis",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "patient-explanation": {
    title: "患者説明シナリオ作成",
    description: "わかりやすく、配慮の行き届いた患者説明の作成",
    readTime: "40 min",
    category: "Clinical",
    basePath: "/assets/guides/patient-explanation",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "02-practice-step-03", title: "実践編 - ステップ3", file: "02-practice/step-03.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "literature-search": {
    title: "論文検索・読解サポート",
    description: "AIを活用した効率的な文献検索と読解",
    readTime: "40 min",
    category: "Research",
    basePath: "/assets/guides/literature-search",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  },
  "medical-documents": {
    title: "診断書・紹介状作成支援",
    description: "AIで医療文書作成を効率化・標準化",
    readTime: "40 min",
    category: "Clinical",
    basePath: "/assets/guides/medical-documents",
    steps: [
      { id: "00-introduction", title: "イントロダクション", file: "00-introduction.md" },
      { id: "01-basics-step-01", title: "基本編 - ステップ1", file: "01-basics/step-01.md" },
      { id: "01-basics-step-02", title: "基本編 - ステップ2", file: "01-basics/step-02.md" },
      { id: "02-practice-step-01", title: "実践編 - ステップ1", file: "02-practice/step-01.md" },
      { id: "02-practice-step-02", title: "実践編 - ステップ2", file: "02-practice/step-02.md" },
      { id: "03-reference-step-01", title: "応用編 - ステップ1", file: "03-reference/step-01.md" },
      { id: "03-reference-step-02", title: "応用編 - ステップ2", file: "03-reference/step-02.md" }
    ]
  }
};

export default function MarkdownGuide() {
  const [, params] = useRoute("/guides/:guideId");
  const guideId = params?.guideId || "";
  
  const [currentStep, setCurrentStep] = useState(0);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const metadata = guideMetadata[guideId];

  useEffect(() => {
    if (metadata) {
      updateSEO({
        title: `${metadata.title} | Medical Prompt Hub`,
        description: metadata.description,
        path: `/guides/${guideId}`,
        keywords: `${metadata.title},医療AI,プロンプト,ワークフロー`
      });
    }
  }, [guideId, metadata]);

  useEffect(() => {
    const loadContent = async () => {
      if (!metadata) {
        setError("ガイドが見つかりません");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const step = metadata.steps[currentStep];
        // GitHub Pagesのベースパスを考慮
        const filePath = `/medicalprompthub${metadata.basePath}/${step.file}`;
        
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load: ${response.status}`);
        }
        
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error("Error loading markdown:", err);
        setError("コンテンツの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [guideId, currentStep, metadata]);

  if (!metadata) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto py-8 px-4">
          <p className="text-center text-muted-foreground">ガイドが見つかりません</p>
        </div>
      </Layout>
    );
  }

  const totalSteps = metadata.steps.length;
  const currentStepData = metadata.steps[currentStep];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link href="/guides">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ガイド一覧に戻る
            </Button>
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {metadata.category}
            </span>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              {metadata.readTime}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{metadata.title}</h1>
          <p className="text-lg text-muted-foreground">{metadata.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* サイドバー（ステップナビゲーション） */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  目次
                </h3>
                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-1">進捗状況</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">完了</div>
                    <div className="text-sm text-muted-foreground">{currentStep + 1}/{totalSteps}</div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
                <nav className="space-y-1">
                  {metadata.steps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        currentStep === index
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {step.title}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-3 min-w-0">
            <Card>
              <CardContent className="p-6 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-destructive mb-4">{error}</p>
                    <Button onClick={() => window.location.reload()}>
                      再読み込み
                    </Button>
                  </div>
) : (
                  <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2 prose-p:text-base prose-p:leading-relaxed prose-p:my-4 prose-li:my-2 prose-li:leading-relaxed prose-ul:my-4 prose-ol:my-4 prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-6 prose-blockquote:not-italic prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:p-3 prose-th:text-left prose-td:border prose-td:border-slate-300 prose-td:p-3 dark:prose-th:border-slate-700 dark:prose-th:bg-slate-800 dark:prose-td:border-slate-700 break-words overflow-wrap-anywhere">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code: ({node, inline, ...props}) => (
                          inline ? 
                            <code className="px-2 py-1 rounded-md bg-primary/10 text-primary font-mono text-sm" {...props} /> :
                            <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700">
                              <code className="block p-5 bg-slate-50 dark:bg-slate-900 text-sm font-mono leading-relaxed" {...props} />
                            </div>
                        ),
                        pre: ({node, ...props}) => (
                          <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700">
                            <pre className="p-5 bg-slate-50 dark:bg-slate-900 leading-relaxed" {...props} />
                          </div>
                        ),
                        ul: ({node, ...props}) => (
                          <ul className="space-y-2 my-6" {...props} />
                        ),
                        ol: ({node, ...props}) => (
                          <ol className="space-y-2 my-6" {...props} />
                        ),
                        li: ({node, ...props}) => (
                          <li className="leading-relaxed" {...props} />
                        ),
                        table: ({node, ...props}) => (
                          <div className="overflow-x-auto my-6">
                            <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-700 border border-slate-300 dark:border-slate-700" {...props} />
                          </div>
                        ),
                        thead: ({node, ...props}) => (
                          <thead className="bg-slate-50 dark:bg-slate-800" {...props} />
                        ),
                        th: ({node, ...props}) => (
                          <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-300 dark:border-slate-700" {...props} />
                        ),
                        td: ({node, ...props}) => (
                          <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700" {...props} />
                        ),
                        tr: ({node, ...props}) => (
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50" {...props} />
                        )
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </div>
                )}

                {/* ナビゲーションボタン */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    前のステップ
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
                    disabled={currentStep === totalSteps - 1}
                  >
                    次のステップ
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
