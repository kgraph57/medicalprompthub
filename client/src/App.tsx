import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

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
const Favorites = lazy(() => import("./pages/Favorites"));
const JournalFinderPage = lazy(() => import("@/pages/JournalFinderPage"));
const JournalDetail = lazy(() => import("@/pages/JournalDetail"));
const JournalCompare = lazy(() => import("@/pages/JournalCompare"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">読み込み中...</p>
    </div>
  </div>
);

function Router() {
  return (
    <WouterRouter base="/medicalprompthub">
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="" component={Home} />
          <Route path="/category/:id" component={Category} />
          <Route path={"/prompts/:id"} component={PromptDetail} />
          <Route path={"/guides"} component={Guides} />
          <Route path={"/guides/:id"} component={GuideDetail} />
          <Route path={"/tips"} component={Tips} />
          <Route path={"/tips/:id"} component={TipDetail} />
          <Route path="/legal" component={Legal} />
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
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
