import { categories } from "@/lib/prompts";
import { cn } from "@/lib/utils";
import { Activity, BookOpen, FileText, Menu, MessageSquare, Microscope, Pill, Stethoscope, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const categoryIcons: Record<string, React.ReactNode> = {
  diagnosis: <Stethoscope className="w-4 h-4" />,
  treatment: <Activity className="w-4 h-4" />,
  documentation: <FileText className="w-4 h-4" />,
  medication: <Pill className="w-4 h-4" />,
  communication: <MessageSquare className="w-4 h-4" />,
  literature: <BookOpen className="w-4 h-4" />,
  research: <Microscope className="w-4 h-4" />,
  "case-analysis": <FileText className="w-4 h-4" />,
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavContent = () => (
    <div className="flex flex-col h-full py-4">
      <div className="px-6 mb-8">
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Medical Prompt Hub
          </h1>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">For Healthcare Professionals</p>
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
          <Link href="/tips">
            <Button
              variant={location.startsWith("/tips") ? "secondary" : "ghost"}
              className={cn("w-full justify-start font-medium", location.startsWith("/tips") && "bg-secondary text-secondary-foreground")}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="mr-2">💡</span> Tips
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
                variant={location.startsWith(`/category/${category.id}`) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start font-medium",
                  location.startsWith(`/category/${category.id}`) && "bg-secondary text-secondary-foreground"
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                <span className="mr-2 text-primary">{categoryIcons[category.id]}</span>
                {category.label}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>

      <div className="px-6 mt-auto pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 Medical Prompt Hub</p>
          <p className="mt-1">v1.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border bg-sidebar fixed inset-y-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">
        <header className="md:hidden h-14 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2 font-bold text-primary">
            <Activity className="w-5 h-5" />
            Medical Prompt Hub
          </div>
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <NavContent />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
