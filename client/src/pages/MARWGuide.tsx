import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, CheckCircle2, Clock, Menu, X, ChevronLeft, ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { marwGuideData } from '@/lib/marw-guide-data';
import { CodeBlock } from '@/components/CodeBlock';
import { updateSEO } from '@/lib/seo';
import { Layout, useSidebar, useToc } from '@/components/Layout';

// 絵文字を削除する関数
function removeEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

// Markdownファイルを直接インポート
import introMd from '@/assets/guides/ai-paper-writing/00-introduction.md?raw';
import stage1Md from '@/assets/guides/ai-paper-writing/marw_stage1.md?raw';
import stage2Md from '@/assets/guides/ai-paper-writing/marw_stage2.md?raw';
import stage3Md from '@/assets/guides/ai-paper-writing/marw_stage3.md?raw';
import stage4Md from '@/assets/guides/ai-paper-writing/marw_stage4.md?raw';
import stage5Md from '@/assets/guides/ai-paper-writing/marw_stage5.md?raw';
import stage6Md from '@/assets/guides/ai-paper-writing/marw_stage6.md?raw';
import stage7Md from '@/assets/guides/ai-paper-writing/marw_stage7.md?raw';

const markdownContent: Record<string, string> = {
  'intro': introMd,
  'stage1': stage1Md,
  'stage2': stage2Md,
  'stage3': stage3Md,
  'stage4': stage4Md,
  'stage5': stage5Md,
  'stage6': stage6Md,
  'stage7': stage7Md,
};

export default function MARWGuide() {
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
      title: "AI論文執筆ワークフロー | Helix",
      description: "世界標準に準拠したAI駆動型論文執筆の7段階ワークフロー。ハーバード大学、JAMA、ICMJEのガイドラインに基づき、24個の実践的プロンプト例を提供。",
      path: `/guides/marw-complete${stepId ? `/${stepId}` : ''}`,
      keywords: "AI論文執筆,MARW,医学論文,研究ワークフロー,AI活用,プロンプト"
    });
  }, [stepId]);

  // LocalStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('marw-progress');
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
    localStorage.setItem('marw-progress', JSON.stringify(Array.from(completedSteps)));
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
        navigate('/guides/marw-complete');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: currentStepId === 'intro',
    });

    // 各フェーズとステップ
    marwGuideData.phases.forEach((phase) => {
      phase.steps.forEach((step) => {
        tocItems.push({
          id: step.id,
          title: step.title,
          level: 2,
          onClick: () => {
            setCurrentStepId(step.id);
            navigate(`/guides/marw-complete/${step.id}`);
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

  // Get all steps (excluding intro from phases since it's separate)
  const allSteps = marwGuideData.phases.flatMap(phase => phase.steps.map(step => step.id));
  // Filter out 'intro' from phases steps since we handle it separately
  const stepsWithoutIntro = allSteps.filter(id => id !== 'intro');
  const allStepsInOrder = ['intro', ...stepsWithoutIntro];
  const currentIndex = allStepsInOrder.indexOf(currentStepId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allStepsInOrder.length - 1;

  // Get current step duration
  const getCurrentStepDuration = () => {
    if (currentStepId === 'intro') return null;
    for (const phase of marwGuideData.phases) {
      const step = phase.steps.find(s => s.id === currentStepId);
      if (step) return step.duration;
    }
    return null;
  };
  const currentStepDuration = getCurrentStepDuration();

  const completedCount = completedSteps.size;
  const totalSteps = stepsWithoutIntro.length;
  const progressPercentage = (completedCount / totalSteps) * 100;

  const goToPrevious = () => {
    if (hasPrevious) {
      const prevStepId = allStepsInOrder[currentIndex - 1];
      setCurrentStepId(prevStepId);
      navigate(`/guides/marw-complete/${prevStepId === 'intro' ? '' : prevStepId}`);
      // 同時にスクロール位置をトップにリセット
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    // 同時にスクロール位置をトップにリセット
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (hasNext) {
      const nextStepId = allStepsInOrder[currentIndex + 1];
      setCurrentStepId(nextStepId);
      navigate(`/guides/marw-complete/${nextStepId}`);
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
                {marwGuideData.phases.flatMap((phase, phaseIndex) => {
                  return phase.steps.map((step) => {
                    const isCurrent = currentStepId === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          setCurrentStepId(step.id);
                          navigate(step.id === 'intro'
                            ? '/guides/marw-complete'
                            : `/guides/marw-complete/${step.id}`
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

          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden lg:block lg:static w-64 flex-shrink-0 order-2">
            <div className="h-full sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {/* Page Top Button - Zenn style */}
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-1.5
                    text-sm text-gray-600 dark:text-gray-400
                    hover:text-gray-900 dark:hover:text-gray-200
                    transition-colors
                  "
                >
                  <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                  <span>ページトップへ</span>
                </button>
              </div>
              
              {/* Table of Contents - Zenn style */}
              <nav className="space-y-0">
                {marwGuideData.phases.flatMap((phase, phaseIndex) => {
                  return phase.steps.map((step) => {
                    const isCurrent = currentStepId === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          setCurrentStepId(step.id);
                          navigate(step.id === 'intro'
                            ? '/guides/marw-complete'
                            : `/guides/marw-complete/${step.id}`
                          );
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
          </aside>
        </div>
      </div>
    </div>
    </Layout>
  );
}
