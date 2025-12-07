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

// Markdownファイルを直接インポート
import step01 from "@/../../guides/case-report/01-preparation/step-01.md?raw";
import step02 from "@/../../guides/case-report/01-preparation/step-02.md?raw";
import step03 from "@/../../guides/case-report/01-preparation/step-03.md?raw";
import step04 from "@/../../guides/case-report/01-preparation/step-04.md?raw";
import step05 from "@/../../guides/case-report/01-preparation/step-05.md?raw";
import step06 from "@/../../guides/case-report/02-writing/step-06.md?raw";
import step07 from "@/../../guides/case-report/02-writing/step-07.md?raw";
import step08 from "@/../../guides/case-report/02-writing/step-08.md?raw";
import step09 from "@/../../guides/case-report/02-writing/step-09.md?raw";
import step10 from "@/../../guides/case-report/02-writing/step-10.md?raw";
import step11 from "@/../../guides/case-report/02-writing/step-11.md?raw";
import step12 from "@/../../guides/case-report/02-writing/step-12.md?raw";
import step13 from "@/../../guides/case-report/03-finishing/step-13.md?raw";
import step14 from "@/../../guides/case-report/03-finishing/step-14.md?raw";
import step15 from "@/../../guides/case-report/03-finishing/step-15.md?raw";
import step16 from "@/../../guides/case-report/03-finishing/step-16.md?raw";
import step17 from "@/../../guides/case-report/03-finishing/step-17.md?raw";
import step18 from "@/../../guides/case-report/04-submission/step-18.md?raw";

const markdownMap: Record<string, string> = {
  "step-01": step01,
  "step-02": step02,
  "step-03": step03,
  "step-04": step04,
  "step-05": step05,
  "step-06": step06,
  "step-07": step07,
  "step-08": step08,
  "step-09": step09,
  "step-10": step10,
  "step-11": step11,
  "step-12": step12,
  "step-13": step13,
  "step-14": step14,
  "step-15": step15,
  "step-16": step16,
  "step-17": step17,
  "step-18": step18,
};

export default function CaseReportGuide() {
  const [currentStepId, setCurrentStepId] = useState<string>("step-01");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
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

  // コンテンツエリアを最上部にスクロール
  useEffect(() => {
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
  const markdownContent = markdownMap[currentStepId] || "# コンテンツが見つかりません";

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
          <div className="flex-1 text-center font-bold truncate">
            {caseReportGuideData.title}
          </div>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 py-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 self-start">
          <div className="p-4 border rounded-lg bg-card">
            <h3 className="font-bold mb-2">進捗状況</h3>
            <Progress value={progress} className="mb-2" />
            <p className="text-sm text-muted-foreground">{completedSteps.size} / {caseReportGuideData.totalSteps} 完了</p>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            <nav className="space-y-4">
              {caseReportGuideData.phases.map((phase: Phase) => (
                <div key={phase.id}>
                  <h4 className="flex items-center font-bold text-lg mb-2">
                    <span className="flex items-center justify-center w-6 h-6 mr-2 text-sm font-bold text-white bg-primary rounded-full">{phase.number}</span>
                    Phase {phase.number}: {phase.title}
                  </h4>
                  <ul className="space-y-1">
                    {phase.steps.map((step: Step) => (
                      <li key={step.id}>
                        <Button
                          variant={currentStepId === step.id ? "secondary" : "ghost"}
                          className="w-full justify-start items-center text-left h-auto py-2"
                          onClick={() => setCurrentStepId(step.id)}
                        >
                          <div onClick={(e) => { e.stopPropagation(); toggleStepCompletion(step.id); }}>
                            {completedSteps.has(step.id) ? (
                              <CheckCircle2 className="h-5 w-5 mr-3 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 mr-3 text-muted-foreground" />
                            )}
                          </div>
                          <div>
                            <p className={cn("font-semibold", currentStepId === step.id && "text-primary")}>
                              Step {step.number}: {step.title}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.estimatedTime}
                            </p>
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          <ScrollArea className="h-[calc(100vh-120px)]" ref={contentRef}>
            <div className="prose prose-lg max-w-none p-6 border rounded-lg bg-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold m-0">Step {currentStep?.number}: {currentStep?.title}</h2>
                <Button variant="outline" size="sm" onClick={() => toggleStepCompletion(currentStepId)}>
                  {completedSteps.has(currentStepId) ? (
                    <><CheckCircle2 className="h-4 w-4 mr-2" />完了！</>
                  ) : (
                    <><Circle className="h-4 w-4 mr-2" />完了にする</>
                  )}
                </Button>
              </div>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
