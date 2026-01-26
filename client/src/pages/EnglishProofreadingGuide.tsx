import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Circle, CheckCircle2, Clock, Menu, X, ChevronRight, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { englishProofreadingGuideData } from '@/lib/english-proofreading-guide-data';
import { CodeBlock } from '@/components/CodeBlock';
import { updateSEO } from '@/lib/seo';
import { Layout, useSidebar, useToc } from '@/components/Layout';

// 絵文字を削除する関数
function removeEmojis(text: string): string {
  return text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
}

// Markdownファイルを直接インポート
import introMd from '@/assets/guides/english-proofreading/00-introduction.md?raw';
import step01Md from '@/assets/guides/english-proofreading/01-basics/step-01.md?raw';
import step02Md from '@/assets/guides/english-proofreading/01-basics/step-02.md?raw';
import step03Md from '@/assets/guides/english-proofreading/02-practice/step-03.md?raw';
import step04Md from '@/assets/guides/english-proofreading/02-practice/step-04.md?raw';
import step05Md from '@/assets/guides/english-proofreading/02-practice/step-05.md?raw';
import step06Md from '@/assets/guides/english-proofreading/02-practice/step-06.md?raw';
import trendsMd from '@/assets/guides/english-proofreading/03-reference/trends.md?raw';

const markdownContent: Record<string, string> = {
  'intro': introMd,
  'step-01': step01Md,
  'step-02': step02Md,
  'step-03': step03Md,
  'step-04': step04Md,
  'step-05': step05Md,
  'step-06': step06Md,
  'trends': trendsMd,
};

export default function EnglishProofreadingGuide() {
  const { stepId } = useParams<{ stepId: string }>();
  const [, setLocation] = useLocation();
  const navigate = useCallback((path: string) => setLocation(path), [setLocation]);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentStepId, setCurrentStepId] = useState<string>(stepId || 'intro');
  const [markdown, setMarkdown] = useState<string>('');
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar(); // Layoutコンポーネントから状態を取得
  const { setTocItems } = useToc(); // 目次データを設定
  const isInReferencesSection = useRef(false); // 参考文献セクション内かどうかの状態

  // SEO設定
  useEffect(() => {
    updateSEO({
      title: "英文校正ガイド | HELIX",
      description: "医学論文の英文校正をAIで効率的に行う方法を段階的にサポート。AIを活用して高品質な英文を作成できます。",
      path: `/guides/english-proofreading-guide${stepId ? `/${stepId}` : ''}`,
      keywords: "英文校正,英語校正,医学論文,AI活用,英語ライティング"
    });
  }, [stepId]);

  // LocalStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('english-proofreading-progress');
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
    localStorage.setItem('english-proofreading-progress', JSON.stringify(Array.from(completedSteps)));
  }, [completedSteps]);

  // stepIdが変更されたら更新
  useEffect(() => {
    if (stepId) {
      setCurrentStepId(stepId);
    } else {
      setCurrentStepId('intro');
    }
  }, [stepId]);

  // Markdownコンテンツを読み込み
  useEffect(() => {
    const content = markdownContent[currentStepId] || '';
    setMarkdown(content);
    isInReferencesSection.current = false; // マークダウン変更時に状態をリセット
  }, [currentStepId]);

  // currentStepIdが変更されたらスクロール位置をリセット
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [currentStepId]);

  // 目次データを設定（サイドバーと同じ構造）- 初回マウント時とcurrentStepId変更時に実行
  useEffect(() => {
    // 初回マウント時とcurrentStepId変更時に目次データを設定
    console.log('TOC useEffect running, englishProofreadingGuideData:', englishProofreadingGuideData);
    console.log('setTocItems:', setTocItems);
    
    if (!englishProofreadingGuideData) {
      console.warn('englishProofreadingGuideData is not available');
      setTocItems([]);
      return;
    }

    if (!englishProofreadingGuideData.phases || englishProofreadingGuideData.phases.length === 0) {
      console.warn('englishProofreadingGuideData.phases is empty');
      setTocItems([]);
      return;
    }

    const tocItems = englishProofreadingGuideData.phases.flatMap((phase) => {
      if (!phase.steps || phase.steps.length === 0) {
        return [];
      }
      return phase.steps.map((step) => {
        // introの場合はURLを調整
        const url = step.id === 'intro' 
          ? '/guides/english-proofreading-guide'
          : `/guides/english-proofreading-guide/${step.id}`;
        
        return {
          id: step.id,
          title: step.title,
          level: 2,
          onClick: () => {
            setCurrentStepId(step.id);
            navigate(url);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          isActive: currentStepId === step.id,
        };
      });
    });

    console.log('Setting tocItems:', tocItems.length, tocItems);
    // 目次データを設定（必ず実行）
    setTocItems(tocItems);
  }, [currentStepId, setTocItems, navigate]);

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
  const totalSteps = englishProofreadingGuideData.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const progressPercentage = (completedCount / totalSteps) * 100;

  // Get all steps in order (introは既にphases[0].stepsに含まれているので、重複を避ける)
  const allStepsFromPhases = englishProofreadingGuideData.phases.flatMap(phase => phase.steps.map(step => step.id));
  // introが既に含まれているか確認し、含まれていない場合のみ追加
  const allSteps = allStepsFromPhases.includes('intro') 
    ? allStepsFromPhases 
    : ['intro', ...allStepsFromPhases];
  
  const currentIndex = allSteps.indexOf(currentStepId);
  const hasPrevious = currentIndex > 0;
  const isLastStep = currentIndex === allSteps.length - 1;

  // Get current step duration
  const getCurrentStepDuration = () => {
    if (currentStepId === 'intro') return null;
    for (const phase of englishProofreadingGuideData.phases) {
      const step = phase.steps.find(s => s.id === currentStepId);
      if (step) return step.duration;
    }
    return null;
  };
  const currentStepDuration = getCurrentStepDuration();

  // 次のガイドへの遷移パス（順序：case-report → english-proofreading → paper-reading → marw）
  const nextGuidePath = '/guides/paper-reading-efficiency';

  const goToPrevious = () => {
    if (hasPrevious) {
      const prevStepId = allSteps[currentIndex - 1];
      setCurrentStepId(prevStepId);
      navigate(`/guides/english-proofreading-guide/${prevStepId === 'intro' ? '' : prevStepId}`);
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNext = () => {
    if (isLastStep) {
      // 最後のステップに到達したら、次のガイドに遷移
      navigate(nextGuidePath);
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 次のステップに遷移
      const nextStepId = allSteps[currentIndex + 1];
      setCurrentStepId(nextStepId);
      navigate(`/guides/english-proofreading-guide/${nextStepId}`);
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
              {/* 目次ヘッダー */}
              <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="w-full flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  <span>目次</span>
                </div>
              </div>
              
              {/* Table of Contents */}
              <nav className="space-y-0">
                {englishProofreadingGuideData.phases.flatMap((phase) => {
                  return phase.steps.map((step) => {
                    const isCurrent = currentStepId === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          setCurrentStepId(step.id);
                          navigate(step.id === 'intro'
                            ? '/guides/english-proofreading-guide'
                            : `/guides/english-proofreading-guide/${step.id}`
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
                className="flex items-center gap-2"
              >
                {isLastStep ? (
                  <>
                    次のガイドへ
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    次のステップ
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </main>

          {/* Right Sidebar - Fixed Navigation */}
          <aside className={`
            fixed lg:static inset-y-0 right-0 z-50 lg:z-auto
            w-[70%] max-w-sm lg:w-64 flex-shrink-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            bg-neutral-50/95 dark:bg-neutral-900/95 backdrop-blur-sm lg:bg-transparent
            order-1 lg:order-2
            shadow-xl lg:shadow-none
          `}>
            <div className="h-full sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {/* 目次ヘッダー */}
              <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <div className="w-full flex items-center gap-1.5
                  text-sm text-neutral-600 dark:text-neutral-400
                  font-medium
                ">
                  <span>目次</span>
                </div>
              </div>
              
              {/* Table of Contents - Zenn style */}
              <nav className="space-y-0">
                {englishProofreadingGuideData.phases.flatMap((phase) => {
                  return phase.steps.map((step) => {
                    const isCurrent = currentStepId === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => {
                          setCurrentStepId(step.id);
                          navigate(step.id === 'intro'
                            ? '/guides/english-proofreading-guide'
                            : `/guides/english-proofreading-guide/${step.id}`
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
