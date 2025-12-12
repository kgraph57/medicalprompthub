import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PageViewTracker } from "./components/PageViewTracker";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { OnboardingModal } from "./components/OnboardingModal";
import { hasAnalyticsConsent } from "./lib/cookieConsent";
import { initGA4 } from "./lib/analytics";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/Home"));
const Category = lazy(() => import("@/pages/Category"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PromptDetail = lazy(() => import("./pages/PromptDetail"));
const Guides = lazy(() => import("./pages/Guides"));
const GuideDetail = lazy(() => import("./pages/GuideDetail"));
const Tips = lazy(() => import("./pages/Tips"));
const TipDetail = lazy(() => import("./pages/TipDetail"));
const Legal = lazy(() => import("./pages/Legal"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Changelog = lazy(() => import("./pages/Changelog"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Courses = lazy(() => import("./pages/Courses"));
const CategoryCourses = lazy(() => import("./pages/CategoryCourses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const LessonDetail = lazy(() => import("./pages/LessonDetail"));
const JournalFinderPage = lazy(() => import("@/pages/JournalFinderPage"));
const JournalDetail = lazy(() => import("@/pages/JournalDetail"));
const JournalCompare = lazy(() => import("@/pages/JournalCompare"));
const CaseReportGuide = lazy(() => import("@/pages/CaseReportGuide"));
const PaperReadingGuide = lazy(() => import("@/pages/PaperReadingGuide"));
const EnglishProofreadingGuide = lazy(() => import("@/pages/EnglishProofreadingGuide"));
const AILiteracy = lazy(() => import("@/pages/AILiteracy"));

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

function Router() {
  return (
    <WouterRouter base="/medicalprompthub">
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
