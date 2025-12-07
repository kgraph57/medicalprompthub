import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, CheckCircle2, Clock } from 'lucide-react';
import { caseReportGuideData } from '@/lib/case-report-guide-data';

// Markdownファイルを直接インポート
import introMd from '../../guides/case-report/00-introduction.md?raw';
import step01Md from '../../guides/case-report/01-preparation/step-01.md?raw';
import step02Md from '../../guides/case-report/01-preparation/step-02.md?raw';
import step03Md from '../../guides/case-report/01-preparation/step-03.md?raw';
import step04Md from '../../guides/case-report/01-preparation/step-04.md?raw';
import step05Md from '../../guides/case-report/01-preparation/step-05.md?raw';
import step06Md from '../../guides/case-report/02-writing/step-06.md?raw';
import step07Md from '../../guides/case-report/02-writing/step-07.md?raw';
import step08Md from '../../guides/case-report/02-writing/step-08.md?raw';
import step09Md from '../../guides/case-report/02-writing/step-09.md?raw';
import step10Md from '../../guides/case-report/02-writing/step-10.md?raw';
import step11Md from '../../guides/case-report/02-writing/step-11.md?raw';
import step12Md from '../../guides/case-report/02-writing/step-12.md?raw';
import step13Md from '../../guides/case-report/03-finishing/step-13.md?raw';
import step14Md from '../../guides/case-report/03-finishing/step-14.md?raw';
import step15Md from '../../guides/case-report/03-finishing/step-15.md?raw';
import step16Md from '../../guides/case-report/03-finishing/step-16.md?raw';
import step17Md from '../../guides/case-report/03-finishing/step-17.md?raw';
import step18Md from '../../guides/case-report/04-submission/step-18.md?raw';

const markdownContent: Record<string, string> = {
  'intro': introMd,
  'step-01': step01Md,
  'step-02': step02Md,
  'step-03': step03Md,
  'step-04': step04Md,
  'step-05': step05Md,
  'step-06': step06Md,
  'step-07': step07Md,
  'step-08': step08Md,
  'step-09': step09Md,
  'step-10': step10Md,
  'step-11': step11Md,
  'step-12': step12Md,
  'step-13': step13Md,
  'step-14': step14Md,
  'step-15': step15Md,
  'step-16': step16Md,
  'step-17': step17Md,
  'step-18': step18Md,
};

export default function CaseReportGuide() {
  const { stepId } = useParams<{ stepId: string }>();
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStepId, setCurrentStepId] = useState<string>(stepId || 'intro');
  const [markdown, setMarkdown] = useState<string>('');

  // LocalStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('case-report-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(new Set(parsed));
      } catch (e) {
        console.error('Failed to parse progress:', e);
      }
    }
  }, []);

  // 進捗をLocalStorageに保存
  useEffect(() => {
    localStorage.setItem('case-report-progress', JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps]);

  // stepIdが変更されたら更新
  useEffect(() => {
    if (stepId) {
      setCurrentStepId(stepId);
    }
  }, [stepId]);

  // Markdownコンテンツを読み込み
  useEffect(() => {
    const content = markdownContent[currentStepId];
    if (content) {
      setMarkdown(content);
    } else {
      setMarkdown('# コンテンツが見つかりません\n\nこのステップのコンテンツはまだ作成されていません。');
    }
  }, [currentStepId]);

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

  const currentStep = caseReportGuideData.steps.find(s => s.id === currentStepId);
  const completedCount = Array.from(completedSteps).filter(id => id !== 'intro').length;
  const totalSteps = caseReportGuideData.steps.filter(s => s.id !== 'intro').length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/medicalprompthub/guides')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ガイド一覧に戻る
          </Button>
          <h1 className="text-lg font-semibold">【完全版】症例報告執筆ガイド：構想から投稿まで</h1>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="container max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左サイドバー（固定、スクロール可能） */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {/* 進捗状況 */}
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2">進捗状況</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{completedCount} / {totalSteps} 完了</p>
                <p className="text-xs text-muted-foreground mt-1">{progressPercentage}% 完了</p>
              </div>

              {/* 目次 */}
              <nav className="space-y-1">
                {caseReportGuideData.phases.map((phase) => (
                  <div key={phase.id} className="mb-4">
                    <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                        {phase.id}
                      </div>
                      <span>{phase.title}</span>
                    </div>
                    <div className="ml-2 space-y-1">
                      {caseReportGuideData.steps
                        .filter(step => step.phase === phase.id)
                        .map((step) => (
                          <button
                            key={step.id}
                            onClick={() => {
                              setCurrentStepId(step.id);
                              navigate(`/medicalprompthub/guides/case-report-complete/${step.id}`);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors break-words ${
                              currentStepId === step.id
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'hover:bg-muted'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {completedSteps.has(step.id) ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              )}
                              <span className="flex-1">{step.title}</span>
                            </div>
                            {step.duration && (
                              <div className="flex items-center gap-1 ml-6 mt-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{step.duration}</span>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* メインコンテンツエリア（Zennスタイル） */}
          <main className="lg:col-span-3">
            <article className="zenn-article">
              {/* ステップヘッダー */}
              {currentStep && currentStep.id !== 'intro' && (
                <div className="flex items-center justify-between mb-8 pb-4 border-b">
                  <div>
                    <h2 className="text-3xl font-bold m-0">Step {currentStep.number}: {currentStep.title}</h2>
                    {currentStep.duration && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>所要時間: {currentStep.duration}</span>
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleStepCompletion(currentStepId)}
                  >
                    {completedSteps.has(currentStepId) ? (
                      <><CheckCircle2 className="h-4 w-4 mr-2" />完了！</>
                    ) : (
                      <><Circle className="h-4 w-4 mr-2" />完了にする</>
                    )}
                  </Button>
                </div>
              )}

              {/* Markdownコンテンツ */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
