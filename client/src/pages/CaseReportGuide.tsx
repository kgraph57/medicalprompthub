import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, CheckCircle2, Clock } from 'lucide-react';
import { caseReportGuideData } from '@/lib/case-report-guide-data';

// Markdownファイルを直接インポート
import introMd from '@/assets/guides/case-report/00-introduction.md?raw';
import step01Md from '@/assets/guides/case-report/01-preparation/step-01.md?raw';
import step02Md from '@/assets/guides/case-report/01-preparation/step-02.md?raw';
import step03Md from '@/assets/guides/case-report/01-preparation/step-03.md?raw';
import step04Md from '@/assets/guides/case-report/01-preparation/step-04.md?raw';
import step05Md from '@/assets/guides/case-report/01-preparation/step-05.md?raw';
import step06Md from '@/assets/guides/case-report/02-writing/step-06.md?raw';
import step07Md from '@/assets/guides/case-report/02-writing/step-07.md?raw';
import step08Md from '@/assets/guides/case-report/02-writing/step-08.md?raw';
import step09Md from '@/assets/guides/case-report/02-writing/step-09.md?raw';
import step10Md from '@/assets/guides/case-report/02-writing/step-10.md?raw';
import step11Md from '@/assets/guides/case-report/02-writing/step-11.md?raw';
import step12Md from '@/assets/guides/case-report/02-writing/step-12.md?raw';
import step13Md from '@/assets/guides/case-report/03-finishing/step-13.md?raw';
import step14Md from '@/assets/guides/case-report/03-finishing/step-14.md?raw';
import step15Md from '@/assets/guides/case-report/03-finishing/step-15.md?raw';
import step16Md from '@/assets/guides/case-report/03-finishing/step-16.md?raw';
import step17Md from '@/assets/guides/case-report/03-finishing/step-17.md?raw';
import step18Md from '@/assets/guides/case-report/04-submission/step-18.md?raw';

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
  const [, setLocation] = useLocation();
  const navigate = (path: string) => setLocation(path);
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
    const content = markdownContent[currentStepId] || '';
    setMarkdown(content);
  }, [currentStepId]);

  const toggleComplete = (stepId: string) => {
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

  const completedCount = completedSteps.size;
  const totalSteps = caseReportGuideData.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/medicalprompthub/guides')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              ガイド一覧に戻る
            </Button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {caseReportGuideData.title}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Fixed Navigation */}
          <aside className="w-80 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {/* Progress Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  進捗状況
                </h3>
                <div className="mb-2">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {completedCount} / {totalSteps} 完了
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-6">
                {caseReportGuideData.phases.map((phase, phaseIndex) => (
                  <div key={phase.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold">
                        {phaseIndex + 1}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {phase.title}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {phase.steps.map((step) => {
                        const isCompleted = completedSteps.has(step.id);
                        const isCurrent = currentStepId === step.id;
                        return (
                          <div key={step.id} className="flex items-center gap-2">
                            <button
                              onClick={() => toggleComplete(step.id)}
                              className="flex-shrink-0"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : (
                                <Circle className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setCurrentStepId(step.id);
                                navigate(`/medicalprompthub/guides/case-report-complete/${step.id}`);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors break-words ${
                                isCurrent
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }`}
                            >
                              <div className="font-medium">{step.title}</div>
                              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                <Clock className="h-3 w-3" />
                                {step.duration}
                              </div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right Content - Scrollable Article */}
          <main className="flex-1 min-w-0">
            <article className="zenn-article bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {markdown}
              </ReactMarkdown>
            </article>

            {/* Completion Button */}
            {currentStepId !== 'intro' && (
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={() => toggleComplete(currentStepId)}
                  variant={completedSteps.has(currentStepId) ? 'outline' : 'default'}
                  size="lg"
                >
                  {completedSteps.has(currentStepId) ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      完了！
                    </>
                  ) : (
                    <>
                      <Circle className="h-5 w-5 mr-2" />
                      完了にする
                    </>
                  )}
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
