import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Circle, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { caseReportGuideData, type Step, type Phase } from "@/lib/case-report-guide-data";

export default function CaseReportGuide() {
  const [currentStepId, setCurrentStepId] = useState<string>("step-01");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // LocalStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem("case-report-progress");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedSteps(new Set(data.completedSteps || []));
        setCurrentStepId(data.currentStepId || "step-01");
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  // 進捗をLocalStorageに保存
  useEffect(() => {
    const data = {
      completedSteps: Array.from(completedSteps),
      currentStepId
    };
    localStorage.setItem("case-report-progress", JSON.stringify(data));
  }, [completedSteps, currentStepId]);

  // 現在のステップのMarkdownを読み込み
  useEffect(() => {
    const currentStep = findStepById(currentStepId);
    if (!currentStep) return;

    setLoading(true);
    fetch(currentStep.markdownPath)
      .then(res => res.text())
      .then(text => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load markdown", err);
        setMarkdownContent("# エラー\n\nMarkdownファイルの読み込みに失敗しました。");
        setLoading(false);
      });

    // コンテンツエリアを最上部にスクロール
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [currentStepId]);

  const findStepById = (stepId: string): Step | undefined => {
    for (const phase of caseReportGuideData.phases) {
      const step = phase.steps.find(s => s.id === stepId);
      if (step) return step;
    }
    return undefined;
  };

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const progress = (completedSteps.size / caseReportGuideData.totalSteps) * 100;

  const currentStep = findStepById(currentStepId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/guides">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              ガイド一覧に戻る
            </Button>
          </Link>
          <div className="ml-4 flex-1">
            <h1 className="text-lg font-semibold truncate">{caseReportGuideData.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="container mx-auto flex gap-6 py-6">
        {/* Fixed Navigation Sidebar */}
        <aside className="w-80 shrink-0">
          <div className="sticky top-20">
            {/* Progress */}
            <div className="mb-6 rounded-lg border bg-card p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">進捗状況</span>
                <span className="text-muted-foreground">
                  {completedSteps.size} / {caseReportGuideData.totalSteps}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {Math.round(progress)}% 完了
              </p>
            </div>

            {/* Navigation */}
            <ScrollArea className="h-[calc(100vh-16rem)] rounded-lg border bg-card">
              <nav className="p-4 space-y-4">
                {caseReportGuideData.phases.map((phase) => (
                  <div key={phase.id}>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {phase.number}
                      </div>
                      <h3 className="font-semibold text-sm">
                        Phase {phase.number}: {phase.title}
                      </h3>
                    </div>
                    <ul className="ml-4 space-y-1">
                      {phase.steps.map((step) => {
                        const isActive = step.id === currentStepId;
                        const isCompleted = completedSteps.has(step.id);
                        return (
                          <li key={step.id}>
                            <button
                              onClick={() => setCurrentStepId(step.id)}
                              className={cn(
                                "w-full flex items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                                isActive
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "hover:bg-muted text-muted-foreground"
                              )}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStepCompletion(step.id);
                                }}
                                className="mt-0.5 shrink-0"
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : (
                                  <Circle className="h-4 w-4" />
                                )}
                              </button>
                              <div className="flex-1 min-w-0">
                                <div className="truncate">
                                  Step {step.number}: {step.title}
                                </div>
                                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {step.estimatedTime}
                                </div>
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <div className="rounded-lg border bg-card">
            <ScrollArea className="h-[calc(100vh-8rem)]" ref={contentRef}>
              <article className="prose prose-slate dark:prose-invert max-w-none p-8">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">読み込み中...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {currentStep && (
                      <div className="not-prose mb-6 flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Step {currentStep.number}
                          </div>
                          <h1 className="text-2xl font-bold">{currentStep.title}</h1>
                        </div>
                        <Button
                          variant={completedSteps.has(currentStepId) ? "default" : "outline"}
                          onClick={() => toggleStepCompletion(currentStepId)}
                        >
                          {completedSteps.has(currentStepId) ? (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              完了済み
                            </>
                          ) : (
                            <>
                              <Circle className="mr-2 h-4 w-4" />
                              完了にする
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    >
                      {markdownContent}
                    </ReactMarkdown>
                  </>
                )}
              </article>
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  );
}
