import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Circle, CheckCircle2, Clock, Menu, X, ChevronRight } from 'lucide-react';
import { paperReadingGuideData } from '@/lib/paper-reading-guide-data';
import { CodeBlock } from '@/components/CodeBlock';
import { updateSEO } from '@/lib/seo';
import { Layout, useSidebar, useToc } from '@/components/Layout';

// 絵文字を削除する関数
function removeEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

// Markdownファイルを直接インポート
import introMd from '@/assets/guides/paper-reading/00-introduction.md?raw';
import step01Md from '@/assets/guides/paper-reading/01-preparation/step-01.md?raw';
import step02Md from '@/assets/guides/paper-reading/02-reading/step-02.md?raw';
import step03Md from '@/assets/guides/paper-reading/03-analysis/step-03.md?raw';
import step04Md from '@/assets/guides/paper-reading/04-critical-appraisal/step-04.md?raw';
import step05Md from '@/assets/guides/paper-reading/05-summary/step-05.md?raw';

const markdownContent: Record<string, string> = {
  'intro': introMd,
  'step-01': step01Md,
  'step-02': step02Md,
  'step-03': step03Md,
  'step-04': step04Md,
  'step-05': step05Md,
};

export default function PaperReadingGuide() {
  const { stepId } = useParams<{ stepId: string }>();
  const [, setLocation] = useLocation();
  const navigate = (path: string) => setLocation(path);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStepId, setCurrentStepId] = useState<string>(stepId || 'intro');
  const [markdown, setMarkdown] = useState<string>('');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar(); // Layoutコンポーネントから状態を取得
  const { setTocItems } = useToc(); // 目次データを設定
  const isInReferencesSection = useRef(false); // 参考文献セクション内かどうかの状態

  // SEO設定
  useEffect(() => {
    updateSEO({
      title: "論文読解ガイド | HELIX",
      description: "医学論文を効率的に読む方法を段階的にサポート。AIを活用して論文を理解し、批判的に評価するスキルを学べます。",
      path: `/guides/paper-reading-efficiency${stepId ? `/${stepId}` : ''}`,
      keywords: "論文読解,医学論文,批判的読解,文献レビュー,AI活用"
    });
  }, [stepId]);

  // LocalStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('paper-reading-progress');
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
    localStorage.setItem('paper-reading-progress', JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps]);

  // stepIdが変更されたら更新
  useEffect(() => {
    if (stepId) {
      setCurrentStepId(stepId);
    } else {
      setCurrentStepId('intro');
    }
  }, [stepId]);

  // currentStepIdが変更されたらスクロール位置をリセット
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [currentStepId]);

  // Markdownコンテンツを読み込み
  useEffect(() => {
    const content = markdownContent[currentStepId] || '';
    setMarkdown(content);
    isInReferencesSection.current = false; // マークダウン変更時に状態をリセット
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
        navigate('/guides/paper-reading-efficiency');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentStepId === 'intro',
    });

    // 各フェーズとステップ
    paperReadingGuideData.phases.forEach((phase) => {
      phase.steps.forEach((step) => {
        tocItems.push({
          id: step.id,
          title: step.title,
          level: 2,
          onClick: () => {
            setCurrentStepId(step.id);
            navigate(`/guides/paper-reading-efficiency/${step.id}`);
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
  const totalSteps = paperReadingGuideData.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const progressPercentage = (completedCount / totalSteps) * 100;

  // Get all steps in order
  const allSteps = ['intro', ...paperReadingGuideData.phases.flatMap(phase => phase.steps.map(step => step.id))];
  const currentIndex = allSteps.indexOf(currentStepId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allSteps.length - 1;

  // Get current step duration
  const getCurrentStepDuration = () => {
    if (currentStepId === 'intro') return null;
    for (const phase of paperReadingGuideData.phases) {
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
      navigate(`/guides/paper-reading-efficiency/${prevStepId === 'intro' ? '' : prevStepId}`);
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (hasNext) {
      const nextStepId = allSteps[currentIndex + 1];
      setCurrentStepId(nextStepId);
      navigate(`/guides/paper-reading-efficiency/${nextStepId}`);
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Mobile Table of Contents Dropdown */}
      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          {/* TOC Dropdown Container - positioned near the header button */}
          <div 
            className="fixed top-[112px] right-4 z-[100] lg:hidden w-[350px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-5rem)] bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto max-h-[calc(100vh-5rem)] p-4">
              {/* Page Top Button */}
              <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                  <span>ページトップへ</span>
                </button>
              </div>
              
              {/* Table of Contents */}
              <nav className="space-y-0">
                {paperReadingGuideData.phases.flatMap((phase, phaseIndex) => {
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
                            ? '/guides/paper-reading-efficiency'
                            : `/guides/paper-reading-efficiency/${step.id}`
                          );
                          setIsSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left py-2 px-0 text-sm transition-colors break-words flex items-start gap-2 ${
                          isCurrent
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
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
            <article key={currentStepId} className="zenn-article">
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
                          <div className="flex items-center gap-1.5 mb-3 text-sm text-neutral-600 dark:text-neutral-400">
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
                    const isReferences = title === '参考文献';
                    // 参考文献セクションの開始/終了を管理
                    if (isReferences) {
                      isInReferencesSection.current = true;
                    } else {
                      isInReferencesSection.current = false;
                    }
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
                        className={`text-2xl md:text-3xl font-bold mt-16 mb-8 text-foreground scroll-mt-20 tracking-tight ${isReferences ? 'text-sm md:text-base' : ''}`}
                        {...props}
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ node, ...props }: any) => {
                    const children = React.Children.map(props.children, (child) => {
                      if (typeof child === 'string') {
                        return removeEmojis(child);
                      }
                      return child;
                    });
                    return (
                      <h3 className="text-xl md:text-2xl font-semibold mt-12 mb-6 text-foreground scroll-mt-20 tracking-tight" {...props}>
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
                    <p className={`mb-6 text-foreground leading-[1.85] ${isInReferencesSection.current ? 'text-xs md:text-sm' : 'text-lg md:text-xl'}`} {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className={`list-disc pl-8 mb-6 space-y-3 ${isInReferencesSection.current ? 'text-xs md:text-sm' : ''}`} {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className={`list-decimal pl-8 mb-6 space-y-3 ${isInReferencesSection.current ? 'text-xs md:text-sm' : ''}`} {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className={`text-foreground leading-[1.85] pl-2 ${isInReferencesSection.current ? 'text-xs md:text-sm' : 'text-lg md:text-xl'}`} {...props} />
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
                    <pre className="bg-muted/80 p-6 rounded-xl overflow-x-auto my-8 shadow-sm" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="pl-6 italic my-8 text-lg md:text-xl text-muted-foreground leading-[1.85] bg-accent/30 py-4 pr-4 rounded-r-lg" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-8">
                      <table className="min-w-full border-collapse border border-border rounded-lg" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-muted/50" {...props} />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody className="divide-y divide-border" {...props} />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr className="hover:bg-muted/30 transition-colors" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-4 py-3 text-sm text-foreground border-b border-border" {...props} />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              <Button
                onClick={goToPrevious}
                disabled={!hasPrevious}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                前のステップ
              </Button>

              <Button
                onClick={goToNext}
                disabled={!hasNext}
                className="flex items-center gap-2"
              >
                {hasNext ? (
                  <>
                    次のステップ
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    完了
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </main>
          
          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:static w-64 flex-shrink-0 order-2">
            <div className="h-full sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {/* Page Top Button - Zenn style */}
              <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-1.5
                    text-sm text-neutral-600 dark:text-neutral-400
                    hover:text-neutral-900 dark:hover:text-neutral-200
                    transition-colors
                  "
                >
                  <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                  <span>ページトップへ</span>
                </button>
              </div>
              
              {/* Table of Contents - Zenn style */}
              <nav className="space-y-0">
                {paperReadingGuideData.phases.flatMap((phase, phaseIndex) => {
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
                            ? '/guides/paper-reading-efficiency'
                            : `/guides/paper-reading-efficiency/${step.id}`
                          );
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left py-2 px-0 text-sm transition-colors break-words flex items-start gap-2 ${
                          isCurrent
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
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
          </aside>
        </div>
      </div>
    </div>
    </Layout>
  );
}

