import { categories } from "@/lib/prompts";
import { cn } from "@/lib/utils";
import { Activity, BookOpen, Bookmark, FileText, Menu, MessageSquare, Microscope, Moon, Pill, Stethoscope, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const categoryIcons: Record<string, React.ReactNode> = {
  "clinical-diagnosis": <Stethoscope className="w-4 h-4" />,
  "patient-communication": <MessageSquare className="w-4 h-4" />,
  "medical-education": <BookOpen className="w-4 h-4" />,
  "research-academic": <Microscope className="w-4 h-4" />,
  "administrative": <FileText className="w-4 h-4" />,
  "pharmacology": <Pill className="w-4 h-4" />,
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const NavContent = () => (
    <div className="flex flex-col h-full py-6">
      <div className="px-6 mb-8 flex items-center justify-between">
        <div>
          <Link href="/">
            <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Medical Prompt Hub
            </h1>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">For Healthcare Professionals</p>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1">
          <Link href="/">
            <Button
              variant={location === "/" ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location === "/" && "bg-secondary text-secondary-foreground")}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="mr-2">🏠</span> ホーム
            </Button>
          </Link>
          <Link href="/guides">
            <Button
              variant={location.startsWith("/guides") ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location.startsWith("/guides") && "bg-secondary text-secondary-foreground")}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="mr-2">📚</span> ガイド・記事
            </Button>
          </Link>
          <Link href="/favorites">
            <Button
              variant={location === "/favorites" ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location === "/favorites" && "bg-secondary text-secondary-foreground")}
              onClick={() => setIsMobileOpen(false)}
            >
              <Bookmark className="mr-2 w-4 h-4" /> お気に入り
            </Button>
          </Link>
        </div>

        <div className="mt-6 mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Categories
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Button
                variant={location === `/category/${category.id}` ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start font-medium",
                  location === `/category/${category.id}` && "bg-secondary text-secondary-foreground"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="mr-2 text-muted-foreground group-hover:text-foreground transition-colors">
                  {categoryIcons[category.id] || <Activity className="w-4 h-4" />}
                </span>
                {category.title}
              </Button>
            </Link>
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
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-primary/10 selection:text-primary">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 border-r border-border/50 bg-sidebar/80 backdrop-blur-xl fixed inset-y-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col md:ml-72 min-w-0">
        <header className="md:hidden h-16 border-b border-border/50 bg-background/70 backdrop-blur-xl sticky top-0 z-40 flex items-center px-5 justify-between glass">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Activity className="w-5 h-5" />
            Medical Prompt Hub
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
