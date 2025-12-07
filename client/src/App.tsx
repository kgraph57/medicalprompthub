import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Category from "@/pages/Category";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import PromptDetail from "./pages/PromptDetail";
import Guides from "./pages/Guides";
import GuideDetail from "./pages/GuideDetail";
import Tips from "./pages/Tips";
import TipDetail from "./pages/TipDetail";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  const base = import.meta.env.PROD ? '/medicalprompthub' : '';
  return (
    <WouterRouter base={base}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:id" component={Category} />
     <Route path={"/prompts/:id"} component={PromptDetail} />
      <Route path={"/guides"} component={Guides} />
      <Route path={"/guides/:id"} component={GuideDetail} />
      <Route path={"/tips"} component={Tips} />
      <Route path={"/tips/:id"} component={TipDetail} />     <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
