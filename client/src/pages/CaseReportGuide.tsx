import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, CheckCircle2, Clock, Menu, X, ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { caseReportGuideData } from '@/lib/case-report-guide-data';
import { CodeBlock } from '@/components/CodeBlock';
import { updateSEO } from '@/lib/seo';
import { Layout, useSidebar, useToc } from '@/components/Layout';

// 絵文字を削除する関数
function removeEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

// Markdownファイルを直接インポート
import introMd from '@/assets/guides/case-report/00-introduction.md?raw';
import step01Md from '@/assets/guides/case-report/01-workflow/01-data-collection.md?raw';
import step02Md from '@/assets/guides/case-report/01-workflow/02-literature-review.md?raw';
import step03Md from '@/assets/guides/case-report/01-workflow/03-strategy-design.md?raw';
import step04Md from '@/assets/guides/case-report/01-workflow/04-ai-writing.md?raw';
import step05Md from '@/assets/guides/case-report/01-workflow/05-finalization.md?raw';

const markdownContent: Record<string, string> = {
  'intro': introMd,
  'step-01': step01Md,
  'step-02': step02Md,
  'step-03': step03Md,
  'step-04': step04Md,
  'step-05': step05Md,
};

export default function CaseReportGuide() {
  const { stepId } = useParams<{ stepId: string }>();
  const [, setLocation] = useLocation();
  const navigate = (path: string) => setLocation(path);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStepId, setCurrentStepId] = useState<string>(stepId || 'intro');
  const [markdown, setMarkdown] = useState<string>('');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar(); // Layoutコンポーネントから状態を取得
  const { setTocItems } = useToc(); // 目次データを設定

  // SEO設定
  useEffect(() => {
    updateSEO({
      title: "症例報告執筆ガイド | Helix",
      description: "症例報告の書き方を段階的にサポート。構想から投稿まで、AIを活用して効率的に症例報告を作成できます。",
      path: `/guides/case-report-complete${stepId ? `/${stepId}` : ''}`,
      keywords: "症例報告,Case Report,論文執筆,医療研究,AI活用"
    });
  }, [stepId]);

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
    } else {
      setCurrentStepId('intro');
    }
    // スクロール位置をトップにリセット
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stepId]);

  // Markdownコンテンツを読み込み
  useEffect(() => {
    const content = markdownContent[currentStepId] || '';
    setMarkdown(content);
  }, [currentStepId]);

  // currentStepIdが変更されたらスクロール位置をトップにリセット
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStepId]);

  // 目次データを設定
  useEffect(() => {
    const tocItems = [];
    
    // イントロダクション
    tocItems.push({
      id: 'intro',
      title: 'イントロダクション',
      level: 2,
      onClick: () => {
        setCurrentStepId('intro');
        navigate('/guides/case-report-complete');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentStepId === 'intro',
    });

    // 各フェーズとステップ
    caseReportGuideData.phases.forEach((phase) => {
      phase.steps.forEach((step) => {
        tocItems.push({
          id: step.id,
          title: step.title,
          level: 2,
          onClick: () => {
            setCurrentStepId(step.id);
            navigate(`/guides/case-report-complete/${step.id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          isActive: currentStepId === step.id,
        });
      });
    });

    setTocItems(tocItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepId, setTocItems]);

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

  // Get all steps in order
  const allSteps = ['intro', ...caseReportGuideData.phases.flatMap(phase => phase.steps.map(step => step.id))];
  const currentIndex = allSteps.indexOf(currentStepId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allSteps.length - 1;

  // Get current step duration
  const getCurrentStepDuration = () => {
    if (currentStepId === 'intro') return null;
    for (const phase of caseReportGuideData.phases) {
      const step = phase.steps.find(s => s.id === currentStepId);
      if (step) return step.duration;
    }
    return null;
  };
  const currentStepDuration = getCurrentStepDuration();

  const goToPrevious = () => {
    if (hasPrevious) {
      const prevStepId = allSteps[currentIndex - 1];
      setCurrentStepId(prevStepId);
      navigate(`/guides/case-report-complete/${prevStepId === 'intro' ? '' : prevStepId}`);
      // 同時にスクロール位置をトップにリセット
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    // 同時にスクロール位置をトップにリセット
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (hasNext) {
      const nextStepId = allSteps[currentIndex + 1];
      setCurrentStepId(nextStepId);
      navigate(`/guides/case-report-complete/${nextStepId}`);
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Table of Contents Dropdown */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* TOC Dropdown Container - positioned near the header button */}
          <div 
            className="fixed top-[112px] right-4 z-[100] lg:hidden w-[350px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-5rem)] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[calc(100vh-5rem)] p-4">
              {/* Page Top Button */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                  <span>ページトップへ</span>
                </button>
              </div>
              
              {/* Table of Contents */}
              <nav className="space-y-0">
                {caseReportGuideData.phases.flatMap((phase, phaseIndex) => {
                  const stepsWithIntro = phaseIndex === 0 
                    ? [{ id: 'intro', title: 'イントロダクション', duration: '' }, ...phase.steps]
                    : phase.steps;
                  
                  return stepsWithIntro.map((step) => {
                    const isCurrent = currentStepId === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          setCurrentStepId(step.id);
                          navigate(step.id === 'intro' 
                            ? '/guides/case-report-complete'
                            : `/guides/case-report-complete/${step.id}`
                          );
                          setIsSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left py-2 px-0 text-sm transition-colors break-words flex items-start gap-2 ${
                          isCurrent
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                        }`}
                      >
                        {isCurrent && (
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                        )}
                        {!isCurrent && (
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5"></span>
                        )}
                        <span className="leading-relaxed">{step.title}</span>
                      </button>
                    );
                  });
                })}
              </nav>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="w-full max-w-full lg:max-w-[1800px] xl:max-w-[1920px] mx-auto px-2 sm:px-3 lg:px-10 py-4 sm:py-6 lg:py-8 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-4 relative">
          {/* Right Content - Scrollable Article */}
          <main className="flex-1 min-w-0 order-2 lg:order-1">
            <article className="zenn-article">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  h1: ({ node, ...props }: any) => {
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <div className="mt-4 mb-8">
                        {currentStepDuration && (
                          <div className="flex items-center gap-1.5 mb-3 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="h-4 w-4" />
                            <span>{currentStepDuration}</span>
                          </div>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground scroll-mt-20 tracking-tight" {...props}>
                          {children}
                        </h1>
                      </div>
                    );
                  },
                  h2: ({ node, ...props }: any) => {
                    const title = typeof props.children === 'string' ? removeEmojis(props.children) : props.children?.toString() || '';
                    const id = typeof title === 'string' 
                      ? title.toLowerCase().replace(/\s+/g, '-')
                      : undefined;
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h2
                        id={id}
                        className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-foreground scroll-mt-20 tracking-tight"
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ node, ...props }: any) => {
                    const isReferences = typeof props.children === 'string' && removeEmojis(props.children) === '参考文献';
                    const isIntroStep = currentStepId === 'intro';
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h3 className={`text-xl md:text-2xl font-semibold mt-12 mb-6 text-foreground scroll-mt-20 tracking-tight ${isReferences && !isIntroStep ? 'text-primary' : ''}`} {...props}>
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ node, ...props }: any) => {
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h4 className="text-lg md:text-xl font-semibold mt-10 mb-4 text-foreground scroll-mt-20" {...props}>
                        {children}
                      </h4>
                    );
                  },
                  p: ({ node, ...props }) => (
                    <p className="mb-6 text-lg md:text-xl text-foreground leading-[1.85]" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-8 mb-6 space-y-3" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-8 mb-6 space-y-3" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-lg md:text-xl text-foreground leading-[1.85] pl-2" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-foreground" {...props} />
                  ),
                  code({ node, className, children, ...props }: any) {
                    const inline = (props as any).inline;
                    if (inline) {
                      return <code className="bg-muted/80 px-2 py-1 rounded-md text-base font-mono" {...props}>{children}</code>;
                    }
                    return (
                      <CodeBlock className={className}>
                        {String(children).replace(/\n$/, '')}
                      </CodeBlock>
                    );
                  },
                  pre: ({ node, ...props }) => (
                    <pre className="bg-muted/80 p-6 rounded-xl overflow-x-auto my-8 border border-border/50 shadow-sm" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="pl-6 italic my-8 text-lg md:text-xl text-muted-foreground leading-[1.85] bg-accent/30 py-4 pr-4 rounded-r-lg" {...props} />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {/* Previous Button */}
              <Button
                onClick={goToPrevious}
                disabled={!hasPrevious}
                variant="outline"
                className="h-9"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                前へ
              </Button>

              {/* Next Button */}
              <Button
                onClick={goToNext}
                disabled={!hasNext}
                variant="outline"
                className="h-9"
              >
                次へ
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </main>

          {/* Right Sidebar - Fixed Navigation */}
          <aside className={`
            fixed lg:static inset-y-0 right-0 z-50 lg:z-auto
            w-[70%] max-w-sm lg:w-64 flex-shrink-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            bg-blue-900/95 dark:bg-gray-900/95 backdrop-blur-sm lg:bg-transparent
            order-1 lg:order-2
            shadow-xl lg:shadow-none
          `}>
            <div className="h-full lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] overflow-y-auto p-4 lg:p-0">
              {/* Page Top Button - Zenn style */}
              <div className="mb-4 pb-4 border-b border-blue-700/30 dark:border-gray-700 lg:border-gray-200 lg:dark:border-gray-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-1.5
                    text-sm text-white/90 lg:text-gray-600 lg:dark:text-gray-400
                    hover:text-white lg:hover:text-gray-900 lg:dark:hover:text-gray-200
                    transition-colors
                  "
                >
                  <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                  <span>ページトップへ</span>
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-3">
                {caseReportGuideData.phases.map((phase, phaseIndex) => {
                  // 最初のフェーズの先頭にイントロダクションを追加
                  const stepsWithIntro = phaseIndex === 0 
                    ? [{ id: 'intro', title: 'イントロダクション', duration: '' }, ...phase.steps]
                    : phase.steps;
                  
                  return (
                  <div key={phase.id} className="bg-white/5 dark:bg-gray-800/5 lg:bg-white lg:dark:bg-gray-800 rounded-lg shadow-sm border border-blue-700/30 dark:border-gray-700 lg:border-gray-200 lg:dark:border-gray-700 p-2.5">
                    <div className="mb-2">
                      <h3 className="font-semibold text-xs text-white lg:text-gray-900 lg:dark:text-white">
                        {phase.title}
                      </h3>
                    </div>
                    <div className="space-y-0.5">
                      {stepsWithIntro.map((step) => {
                        const isCompleted = completedSteps.has(step.id);
                        const isCurrent = currentStepId === step.id;
                        return (
                          <div key={step.id} className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleComplete(step.id)}
                              className="flex-shrink-0"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-3 w-3 text-green-400 lg:text-green-600" />
                              ) : (
                                <Circle className="h-3 w-3 text-white/40 lg:text-gray-400" />
                              )}
                            </button>
                            <button
                              onClick={() => {
                                setCurrentStepId(step.id);
                                navigate(step.id === 'intro' 
                                  ? '/guides/case-report-complete'
                                  : `/guides/case-report-complete/${step.id}`
                                );
                                setIsSidebarOpen(false);
                                // スクロール位置をトップにリセット
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`w-full text-left px-2 py-1.5 rounded-md text-xs transition-colors break-words ${
                                isCurrent
                                  ? 'bg-blue-700/30 dark:bg-blue-900/30 lg:bg-blue-50 lg:dark:bg-blue-900/20 text-white lg:text-blue-700 lg:dark:text-blue-300 font-medium'
                                  : 'text-white/90 lg:text-gray-700 lg:dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-700/20 lg:hover:bg-gray-50 lg:dark:hover:bg-gray-700'
                              }`}
                            >
                              <div className="font-medium leading-tight">{step.title}</div>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  );
                })}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </Layout>
  );
}
