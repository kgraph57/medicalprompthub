import { categories } from "@/lib/prompts";
import { cn } from "@/lib/utils";
import { Activity, ArrowRight, BookOpen, Bookmark, Briefcase, ClipboardList, FileText, GraduationCap, Home, Lightbulb, Menu, MessageSquare, Microscope, Moon, Pill, Stethoscope, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const categoryIcons: Record<string, React.ReactNode> = {
  "diagnosis": <Stethoscope className="w-4 h-4" />,
  "treatment": <Activity className="w-4 h-4" />,
  "documentation": <FileText className="w-4 h-4" />,
  "medication": <Pill className="w-4 h-4" />,
  "communication": <MessageSquare className="w-4 h-4" />,
  "literature": <BookOpen className="w-4 h-4" />,
  "research": <Microscope className="w-4 h-4" />,
  "case-analysis": <ClipboardList className="w-4 h-4" />,
  "education": <GraduationCap className="w-4 h-4" />,
  "administrative": <Briefcase className="w-4 h-4" />,
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const NavContent = () => (
    <nav className="flex flex-col h-full py-6" aria-label="メインナビゲーション">
      <div className="px-6 mb-8 flex items-center justify-between">
        <div>
          <Link href="/" aria-label="ホームページに戻る">
            <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
              <Activity className="w-6 h-6" aria-hidden="true" />
              Medical Prompt Hub
            </h1>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">For Healthcare Professionals</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          className="hidden md:flex"
          aria-label={theme === "light" ? "ダークモードに切り替え" : "ライトモードに切り替え"}
        >
          {theme === "light" ? <Moon className="w-5 h-5" aria-hidden="true" /> : <Sun className="w-5 h-5" aria-hidden="true" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1" role="list">
          <div role="listitem">
            <Button
              variant={location === "/" ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location === "/" && "bg-secondary text-secondary-foreground")}
              onClick={() => {
                setLocation("/");
                setIsMobileOpen(false);
              }}
            >
              <Home className="mr-2 w-4 h-4" aria-hidden="true" /> Home
            </Button>
          </div>
          <div role="listitem">
            <Button
              variant={location.startsWith("/courses") ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location.startsWith("/courses") && "bg-secondary text-secondary-foreground")}
              onClick={() => {
                setLocation("/courses");
                setIsMobileOpen(false);
              }}
            >
              <GraduationCap className="mr-2 w-4 h-4" aria-hidden="true" /> Courses
            </Button>
          </div>
          <div role="listitem">
            <Button
              variant={location.startsWith("/tips") ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location.startsWith("/tips") && "bg-secondary text-secondary-foreground")}
              onClick={() => {
                setLocation("/tips");
                setIsMobileOpen(false);
              }}
            >
              <Lightbulb className="mr-2 w-4 h-4" aria-hidden="true" /> Tips
            </Button>
          </div>
          <div role="listitem">
            <Button
              variant={location.startsWith("/guides") ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location.startsWith("/guides") && "bg-secondary text-secondary-foreground")}
              onClick={() => {
                setLocation("/guides");
                setIsMobileOpen(false);
              }}
            >
              <ArrowRight className="mr-2 w-4 h-4" aria-hidden="true" /> Workflow
            </Button>
          </div>
          <div role="listitem">
            <Button
              variant={location === "/favorites" ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location === "/favorites" && "bg-secondary text-secondary-foreground")}
              onClick={() => {
                setLocation("/favorites");
                setIsMobileOpen(false);
              }}
            >
              <Bookmark className="mr-2 w-4 h-4" aria-hidden="true" /> Fav
            </Button>
          </div>
        </div>

        <div className="mt-6 mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider" id="categories-heading">
          Categories
        </div>
        <div className="space-y-1" role="list" aria-labelledby="categories-heading">
          {categories.map((category) => (
            <div key={category.id} role="listitem">
              <Button
                variant={location === `/category/${category.id}` ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start font-medium",
                  location === `/category/${category.id}` && "bg-secondary text-secondary-foreground"
                )}
                onClick={() => {
                  setLocation(`/category/${category.id}`);
                  setIsMobileOpen(false);
                }}
              >
                <span className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors" aria-hidden="true">
                  {categoryIcons[category.id] || <Activity className="w-4 h-4" />}
                </span>
                {category.label}
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-auto px-6 pt-6 border-t border-border/50">
        <div className="text-xs text-muted-foreground space-y-2">
          <p>© 2024 Medical Prompt Hub</p>
          <div className="flex gap-3">
            <Link href="/legal">
              <span className="hover:text-foreground transition-colors cursor-pointer">法的表記・利用規約</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-primary/10 selection:text-primary">
      {/* Desktop Sidebar */}
      <aside 
        className="hidden md:block w-72 border-r border-border/50 bg-sidebar/80 backdrop-blur-xl fixed inset-y-0 z-30"
        aria-label="メインナビゲーション"
      >
        <NavContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col md:ml-72 min-w-0">
        <header 
          className="md:hidden h-16 border-b border-border/50 bg-background/70 backdrop-blur-xl sticky top-0 z-40 flex items-center px-5 justify-between glass"
          role="banner"
        >
          <div className="flex items-center gap-3">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="メニューを開く"
                  aria-expanded={isMobileOpen}
                >
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80" aria-label="ナビゲーションメニュー">
                <NavContent />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 font-bold text-primary">
              <Activity className="w-5 h-5" aria-hidden="true" />
              <h1 className="sr-only">Medical Prompt Hub</h1>
              <span aria-hidden="true">Medical Prompt Hub</span>
            </div>
          </div>
          <nav className="flex items-center gap-2" aria-label="ユーティリティメニュー">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              aria-label={theme === "light" ? "ダークモードに切り替え" : "ライトモードに切り替え"}
            >
              {theme === "light" ? <Moon className="w-5 h-5" aria-hidden="true" /> : <Sun className="w-5 h-5" aria-hidden="true" />}
            </Button>
          </nav>
        </header>

        <main 
          className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full animate-in fade-in duration-500"
          role="main"
          id="main-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
