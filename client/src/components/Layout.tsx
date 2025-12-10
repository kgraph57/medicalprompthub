import { categories } from "@/lib/prompts";
import { cn } from "@/lib/utils";
import { Activity, ArrowRight, BookOpen, Bookmark, Briefcase, ClipboardList, FileText, GraduationCap, HandHeart, HelpCircle, Home, Lightbulb, Mail, Menu, MessageSquare, Microscope, Pill, Stethoscope, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { SafetyWarningModal } from "./SafetyWarningModal";
import { KeyboardShortcutsHelp } from "./KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const categoryIcons: Record<string, React.ReactNode> = {
  "diagnosis": <Stethoscope className="w-4 h-4" />,
  "treatment": <Activity className="w-4 h-4" />,
  "documentation": <FileText className="w-4 h-4" />,
  "medication": <Pill className="w-4 h-4" />,
  "communication": <MessageSquare className="w-4 h-4" />,
  "shared-decision-making": <HandHeart className="w-4 h-4" />,
  "literature": <BookOpen className="w-4 h-4" />,
  "research": <Microscope className="w-4 h-4" />,
  "case-analysis": <ClipboardList className="w-4 h-4" />,
  "education": <GraduationCap className="w-4 h-4" />,
  "administrative": <Briefcase className="w-4 h-4" />,
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  useKeyboardShortcuts();

  const NavContent = () => (
    <nav className="flex flex-col h-full" aria-label="メインナビゲーション">
      <div className="px-6 py-6 flex-shrink-0 flex items-center justify-between border-b border-border/50">
        <div>
          <Link href="/" aria-label="ホームページに戻る">
            <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
              <Activity className="w-6 h-6" aria-hidden="true" />
              Medical Prompt Hub
            </h1>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">For Healthcare Professionals</p>
        </div>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto px-4 py-4">
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

      <div className="flex-shrink-0 px-6 py-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground space-y-2">
          <p>© 2024 Medical Prompt Hub</p>
          <div className="flex flex-col gap-2">
            <Link href="/ai-literacy">
              <span className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                AIリテラシー
              </span>
            </Link>
            <Link href="/faq">
              <span className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                FAQ
              </span>
            </Link>
            <Link href="/contact">
              <span className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
                <Mail className="w-3 h-3" />
                Contact
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Hidden on Mobile/Tablet */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border/50">
        <NavContent />
      </aside>

      {/* Mobile/Tablet Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border/50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="メニューを開く"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" aria-label="ホームページに戻る">
            <h1 className="text-lg font-bold tracking-tight text-primary flex items-center gap-2">
              <Activity className="w-5 h-5" aria-hidden="true" />
              Medical Prompt Hub
            </h1>
          </Link>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Mobile/Tablet Sidebar Overlay */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Sidebar */}
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-card border-r border-border/50 z-50 transform transition-transform">
            <div className="flex flex-col h-full">
              <div className="px-6 py-6 flex-shrink-0 flex items-center justify-between border-b border-border/50">
                <div>
                  <Link href="/" aria-label="ホームページに戻る">
                    <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
                      <Activity className="w-6 h-6" aria-hidden="true" />
                      Medical Prompt Hub
                    </h1>
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">For Healthcare Professionals</p>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label="メニューを閉じる"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Navigation Content without duplicate header */}
              <ScrollArea className="flex-1 overflow-y-auto px-4 py-4">
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

              <div className="flex-shrink-0 px-6 py-4 border-t border-border/50">
                <div className="text-xs text-muted-foreground space-y-2">
                  <p>© 2024 Medical Prompt Hub</p>
                  <div className="flex flex-col gap-2">
                    <Link href="/ai-literacy">
                      <span className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        AIリテラシー
                      </span>
                    </Link>
                    <Link href="/faq">
                      <span className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        FAQ
                      </span>
                    </Link>
                    <Link href="/contact">
                      <span className="hover:text-foreground transition-colors cursor-pointer flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Contact
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 lg:pl-8 overflow-y-auto pt-16 lg:pt-0">
        {children}
      </main>
      
      {/* Safety Warning Modal */}
      <SafetyWarningModal />
      
      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp />
    </div>
  );
}
