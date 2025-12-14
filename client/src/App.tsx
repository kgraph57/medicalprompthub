import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PageViewTracker } from "./components/PageViewTracker";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { OnboardingModal } from "./components/OnboardingModal";
import { hasAnalyticsConsent } from "./lib/cookieConsent";
import { initGA4 } from "./lib/analytics";

// 動的インポート用のヘルパー関数（エラーハンドリング付き）
function createLazyImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retryCount = 3
): React.LazyExoticComponent<T> {
  return lazy(() => {
    const attemptImport = (attempt: number = 1): Promise<{ default: T }> => {
      return importFn().catch((error) => {
        const errorMessage = error?.message || String(error);
        const errorName = error?.name || "";
        
        console.error(`Dynamic import failed (attempt ${attempt}/${retryCount}):`, {
          error: errorMessage,
          name: errorName,
          stack: error?.stack
        });
        
        // リトライ可能なエラーの場合
        const isRetryableError = 
          errorMessage.includes("Failed to fetch dynamically imported module") ||
          errorMessage.includes("Loading chunk") ||
          errorMessage.includes("Loading CSS chunk") ||
          errorName === "ChunkLoadError" ||
          errorName === "TypeError" ||
          (errorMessage.includes("network") && attempt < retryCount);
        
        if (attempt < retryCount && isRetryableError) {
          // 指数バックオフで再試行（1秒、2秒、3秒...）
          const delay = 1000 * attempt;
          console.log(`Retrying dynamic import in ${delay}ms...`);
          
          return new Promise<{ default: T }>((resolve, reject) => {
            setTimeout(() => {
              attemptImport(attempt + 1)
                .then(resolve)
                .catch(reject);
            }, delay);
          });
        }
        
        // リトライ不可能な場合はエラーを再スロー
        console.error("Dynamic import failed after all retries:", error);
        throw error;
      });
    };
    
    return attemptImport();
  });
}

// Lazy load pages for better performance
const Home = createLazyImport(() => import("@/pages/Home"));
const Category = createLazyImport(() => import("@/pages/Category"));
const NotFound = createLazyImport(() => import("@/pages/NotFound"));
const PromptDetail = createLazyImport(() => import("@/pages/PromptDetail"));
const Guides = createLazyImport(() => import("@/pages/Guides"));
const GuideDetail = createLazyImport(() => import("@/pages/GuideDetail"));
const Tips = createLazyImport(() => import("@/pages/Tips"));
const TipDetail = createLazyImport(() => import("@/pages/TipDetail"));
const Legal = createLazyImport(() => import("@/pages/Legal"));
const FAQ = createLazyImport(() => import("@/pages/FAQ"));
const Contact = createLazyImport(() => import("@/pages/Contact"));
const About = createLazyImport(() => import("@/pages/About"));
const Changelog = createLazyImport(() => import("@/pages/Changelog"));
const Favorites = createLazyImport(() => import("@/pages/Favorites"));
const Courses = createLazyImport(() => import("@/pages/Courses"));
const CategoryCourses = createLazyImport(() => import("@/pages/CategoryCourses"));
const CourseDetail = createLazyImport(() => import("@/pages/CourseDetail"));
const LessonDetail = createLazyImport(() => import("@/pages/LessonDetail"));
const JournalFinderPage = createLazyImport(() => import("@/pages/JournalFinderPage"));
const JournalDetail = createLazyImport(() => import("@/pages/JournalDetail"));
const JournalCompare = createLazyImport(() => import("@/pages/JournalCompare"));
const CaseReportGuide = createLazyImport(() => import("@/pages/CaseReportGuide"));
const PaperReadingGuide = createLazyImport(() => import("@/pages/PaperReadingGuide"));
const EnglishProofreadingGuide = createLazyImport(() => import("@/pages/EnglishProofreadingGuide"));
const MARWGuide = createLazyImport(() => import("@/pages/MARWGuide"));
const MarkdownGuide = createLazyImport(() => import("@/pages/MarkdownGuide"));
const AILiteracy = createLazyImport(() => import("@/pages/AILiteracy"));

// Loading component（アクセシビリティ改善）
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen" role="status" aria-live="polite">
    <div className="text-center">
      <div 
        className="animate-spin rounded-full h-10 lg:h-11 w-12 border-b-2 border-primary mx-auto mb-4"
        aria-hidden="true"
      />
      <p className="text-muted-foreground">
        <span className="sr-only">読み込み中</span>
        <span aria-hidden="true">読み込み中...</span>
      </p>
    </div>
  </div>
);

// エラーフォールバックコンポーネント（Suspense用）
const ErrorFallbackLoader = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="flex items-center justify-center min-h-screen p-8">
    <div className="text-center max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-destructive">ページの読み込みに失敗しました</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        {error.message || "不明なエラーが発生しました"}
      </p>
      <button
        onClick={retry}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        再試行
      </button>
    </div>
  </div>
);

function Router() {
  // 開発環境では base を空に、本番環境では /medicalprompthub を使用
  const basePath = import.meta.env.PROD ? "/medicalprompthub" : "";
  
  return (
    <WouterRouter base={basePath}>
      <PageViewTracker />
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:id" component={Category} />
          <Route path="/prompts/:id" component={PromptDetail} />
          <Route path="/courses" component={Courses} />
          <Route path="/courses/category/:category" component={CategoryCourses} />
          <Route path="/courses/:courseId" component={CourseDetail} />
          <Route path="/courses/:courseId/lessons/:lessonId" component={LessonDetail} />
          <Route path="/guides" component={Guides} />
          <Route path="/guides/case-report-complete/:stepId?" component={CaseReportGuide} />
          <Route path="/guides/paper-reading-efficiency/:stepId?" component={PaperReadingGuide} />
          <Route path="/guides/english-proofreading-guide/:stepId?" component={EnglishProofreadingGuide} />
          <Route path="/guides/marw-complete/:stepId?" component={MARWGuide} />
          <Route path="/guides/conference-presentation" component={MarkdownGuide} />
          <Route path="/guides/differential-diagnosis" component={MarkdownGuide} />
          <Route path="/guides/patient-explanation" component={MarkdownGuide} />
          <Route path="/guides/literature-search" component={MarkdownGuide} />
          <Route path="/guides/medical-documents" component={MarkdownGuide} />
          <Route path="/guides/research-protocol" component={MarkdownGuide} />
          <Route path="/guides/conference-presentation-slides" component={MarkdownGuide} />
          <Route path="/guides/ethics-review-application" component={MarkdownGuide} />
          <Route path="/guides/new-drug-information" component={MarkdownGuide} />
          <Route path="/guides/rare-disease-information" component={MarkdownGuide} />
          <Route path="/guides/guideline-comparison" component={MarkdownGuide} />
          <Route path="/guides/multilingual-medical-consultation" component={MarkdownGuide} />
          <Route path="/guides/medical-news-commentary" component={MarkdownGuide} />
          <Route path="/guides/patient-education-materials" component={MarkdownGuide} />
          <Route path="/guides/incident-report-creation" component={MarkdownGuide} />
          <Route path="/guides/consultation-email" component={MarkdownGuide} />
          <Route path="/guides/clinical-trial-search" component={MarkdownGuide} />
          <Route path="/guides/medical-statistics-consultation" component={MarkdownGuide} />
          <Route path="/guides/image-diagnosis-report-reading" component={MarkdownGuide} />
          <Route path="/guides/post-discharge-follow-up" component={MarkdownGuide} />
          <Route path="/guides/medical-safety-manual" component={MarkdownGuide} />
          <Route path="/guides/infection-control-manual" component={MarkdownGuide} />
          <Route path="/guides/polypharmacy-support" component={MarkdownGuide} />
          <Route path="/guides/palliative-care-planning" component={MarkdownGuide} />
          <Route path="/guides/:id" component={GuideDetail} />
          <Route path="/tips" component={Tips} />
          <Route path="/tips/:id" component={TipDetail} />
          <Route path="/legal" component={Legal} />
          <Route path="/ai-literacy" component={AILiteracy} />
          <Route path="/faq" component={FAQ} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/changelog" component={Changelog} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/journal-finder" component={JournalFinderPage} />
          <Route path="/journal/:id" component={JournalDetail} />
          <Route path="/journal-compare" component={JournalCompare} />
          <Route path="/404" component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </WouterRouter>
  );
}

function App() {
  // 既に同意されている場合はGoogle Analyticsを初期化
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initGA4();
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
          <CookieConsentBanner />
          <OnboardingModal />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
