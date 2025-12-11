import { categories } from "@/lib/prompts";
import { cn } from "@/lib/utils";
import { Activity, ArrowRight, BookOpen, Bookmark, Briefcase, ChevronLeft, ChevronRight, ClipboardList, FileText, GraduationCap, HandHeart, HelpCircle, Home, Lightbulb, Mail, Menu, MessageSquare, Microscope, Pill, Stethoscope, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { SafetyWarningModal } from "./SafetyWarningModal";
import { KeyboardShortcutsHelp } from "./KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useSidebarState } from "@/hooks/useSidebarState";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";


const categoryIcons: Record<string, React.ReactNode> = {
  "diagnosis": <Stethoscope className="w-3 h-3" />,
  "treatment": <Activity className="w-3 h-3" />,
  "documentation": <FileText className="w-3 h-3" />,
  "medication": <Pill className="w-3 h-3" />,
  "communication": <MessageSquare className="w-3 h-3" />,
  "shared-decision-making": <HandHeart className="w-3 h-3" />,
  "literature": <BookOpen className="w-3 h-3" />,
  "research": <Microscope className="w-3 h-3" />,
  "case-analysis": <ClipboardList className="w-3 h-3" />,
  "education": <GraduationCap className="w-3 h-3" />,
  "administrative": <Briefcase className="w-3 h-3" />,
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, toggle } = useSidebarState();
  const scrollDirection = useScrollDirection();
  useKeyboardShortcuts();

  // スワイプジェスチャーでサイドバーを開く（モバイルのみ）
  useSwipeGesture({
    onSwipeRight: () => {
      if (window.innerWidth < 1024) {
        setIsMobileOpen(true);
      }
    },
    onSwipeLeft: () => {
      if (window.innerWidth < 1024) {
        setIsMobileOpen(false);
      }
    },
  });

  const NavContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <nav className="flex flex-col h-full" aria-label="メインナビゲーション">
      {/* Header with toggle button */}
      <div className={cn(
        "flex-shrink-0 flex items-center border-b border-border/50 transition-all duration-300",
        collapsed ? "px-1 py-0.5 justify-center" : "px-1.5 py-0.5 justify-between"
      )}>
        {!collapsed && (
          <div>
            <Link href="/" aria-label="ホームページに戻る">
              <h1 className="text-[11px] font-bold tracking-tight text-primary flex items-center gap-0.5">
                <Activity className="w-2.5 h-2.5" aria-hidden="true" />
                Medical Prompt Hub
              </h1>
            </Link>
            <p className="text-[7px] text-muted-foreground mt-0 leading-none">For Healthcare Professionals</p>
          </div>
        )}
        {collapsed && (
          <Link href="/" aria-label="ホームページに戻る">
            <Activity className="w-2.5 h-2.5 text-primary" aria-hidden="true" />
          </Link>
        )}
        <button
          onClick={toggle}
          className={cn(
            "p-1 hover:bg-accent rounded-md transition-colors",
            collapsed && "mt-1"
          )}
          aria-label={collapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto px-1.5 py-1 lg:py-1.5">
        <div className="space-y-0.5" role="list">
          <NavItem
            icon={<Home className="w-3.5 h-3.5" />}
            label="Home"
            active={location === "/"}
            onClick={() => {
              setLocation("/");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<GraduationCap className="w-3.5 h-3.5" />}
            label="Courses"
            active={location.startsWith("/courses")}
            onClick={() => {
              setLocation("/courses");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Lightbulb className="w-3.5 h-3.5" />}
            label="Tips"
            active={location.startsWith("/tips")}
            onClick={() => {
              setLocation("/tips");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            label="Workflow"
            active={location.startsWith("/guides")}
            onClick={() => {
              setLocation("/guides");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Bookmark className="w-3.5 h-3.5" />}
            label="Favorites"
            active={location === "/favorites"}
            onClick={() => {
              setLocation("/favorites");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
        </div>

        {!collapsed && (
          <>
            <div className="mt-2 mb-1 px-1.5 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider" id="categories-heading">
              Categories
            </div>
            <div className="space-y-1" role="list" aria-labelledby="categories-heading">
              {categories.map((category) => (
                <NavItem
                  key={category.id}
                  icon={categoryIcons[category.id] || <Activity className="w-4 h-4" />}
                  label={category.label}
                  active={location === `/category/${category.id}`}
                  onClick={() => {
                    setLocation(`/category/${category.id}`);
                    setIsMobileOpen(false);
                  }}
                  collapsed={false}
                />
              ))}
            </div>
          </>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className={cn(
        "flex-shrink-0 border-t border-border/50 transition-all duration-300",
        collapsed ? "px-2 py-2 lg:py-2.5" : "px-4 py-2 lg:py-2.5"
      )}>
        {!collapsed && (
          <div className="text-[10px] text-muted-foreground space-y-1.5">
            <p>© 2024 Medical Prompt Hub</p>
            <div className="flex flex-col gap-1.5">
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
        )}
        {collapsed && (
          <div className="flex flex-col gap-1.5 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/ai-literacy">
                  <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
                    <Lightbulb className="w-3 h-3" />
                  </button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>AIリテラシー</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/faq">
                  <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
                    <HelpCircle className="w-3 h-3" />
                  </button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>FAQ</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/contact">
                  <button className="p-1.5 hover:bg-accent rounded-md transition-colors">
                    <Mail className="w-3 h-3" />
                  </button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Contact</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - Hidden on Mobile/Tablet */}
      <aside className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border/50 transition-all duration-300",
        isCollapsed ? "lg:w-12" : "lg:w-52"
      )}>
        <NavContent collapsed={isCollapsed} />
      </aside>

      {/* Mobile/Tablet Header */}
      <header className={cn(
        "lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border/50 h-10 lg:h-11 transition-transform duration-300",
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      )}>
        <div className="flex items-center justify-between h-full px-3">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="メニューを開く"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" aria-label="ホームページに戻る">
            <h1 className="text-sm font-bold tracking-tight text-primary flex items-center gap-1.5">
              <Activity className="w-5 h-5" aria-hidden="true" />
              Medical Prompt Hub
            </h1>
          </Link>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Mobile/Tablet Sidebar Overlay */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileOpen(false);
            }}
            aria-hidden="true"
          />
          {/* Sidebar */}
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 bg-card border-r border-border/50 z-50 transform transition-transform">
            <div className="flex flex-col h-full">
              <div className="px-2 py-1.5 flex-shrink-0 flex items-center justify-between border-b border-border/50">
                <div>
                  <Link href="/" aria-label="ホームページに戻る">
                    <h1 className="text-[11px] font-bold tracking-tight text-primary flex items-center gap-0.5">
                      <Activity className="w-2.5 h-2.5" aria-hidden="true" />
                      Medical Prompt Hub
                    </h1>
                  </Link>
                  <p className="text-[7px] text-muted-foreground mt-0 leading-none">For Healthcare Professionals</p>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 hover:bg-accent rounded-md transition-colors"
                  aria-label="メニューを閉じる"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Navigation Content without duplicate header */}
              <ScrollArea className="flex-1 overflow-y-auto px-1.5 py-1 lg:py-1.5">
                <div className="space-y-0.5" role="list">
                  <NavItem
                    icon={<Home className="w-3.5 h-3.5" />}
                    label="Home"
                    active={location === "/"}
                    onClick={() => {
                      setLocation("/");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<GraduationCap className="w-3.5 h-3.5" />}
                    label="Courses"
                    active={location.startsWith("/courses")}
                    onClick={() => {
                      setLocation("/courses");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<Lightbulb className="w-3.5 h-3.5" />}
                    label="Tips"
                    active={location.startsWith("/tips")}
                    onClick={() => {
                      setLocation("/tips");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    label="Workflow"
                    active={location.startsWith("/guides")}
                    onClick={() => {
                      setLocation("/guides");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<Bookmark className="w-3.5 h-3.5" />}
                    label="Favorites"
                    active={location === "/favorites"}
                    onClick={() => {
                      setLocation("/favorites");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                </div>

                <div className="mt-2 mb-1 px-1.5 text-[9px] font-semibold text-muted-foreground uppercase tracking-wider" id="categories-heading">
                  Categories
                </div>
                <div className="space-y-1" role="list" aria-labelledby="categories-heading">
                  {categories.map((category) => (
                    <NavItem
                      key={category.id}
                      icon={categoryIcons[category.id] || <Activity className="w-4 h-4" />}
                      label={category.label}
                      active={location === `/category/${category.id}`}
                      onClick={() => {
                        setLocation(`/category/${category.id}`);
                        setIsMobileOpen(false);
                      }}
                      collapsed={false}
                    />
                  ))}
                </div>
              </ScrollArea>

              <div className="flex-shrink-0 px-6 py-2 lg:py-2.5 border-t border-border/50">
                <div className="text-xs text-muted-foreground space-y-2">
                  <p>© 2024 Medical Prompt Hub</p>
                  <div className="flex flex-col gap-1.5">
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
      <main className={cn(
        "flex-1 overflow-y-auto transition-all duration-300",
        "pt-12 pb-12 lg:pt-0 lg:pb-0", // Add padding-top for mobile header and padding-bottom for bottom nav
        isCollapsed ? "lg:ml-12" : "lg:ml-52"
      )}>
        {children}
        <SafetyWarningModal />
        <KeyboardShortcutsHelp />
      </main>


    </div>
  );
}

// NavItem component for reusability
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

function NavItem({ icon, label, active, onClick, collapsed }: NavItemProps) {
  const button = (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "font-normal transition-all duration-200 text-[11px] min-h-[32px] py-1 hover:bg-accent/50",
        active && "bg-secondary/80 text-secondary-foreground font-medium",
        collapsed ? "w-9 h-9 p-0 justify-center" : "w-full justify-start px-2"
      )}
      onClick={onClick}
    >
      <span className={cn(collapsed ? "" : "mr-1.5", "flex-shrink-0")} aria-hidden="true">
        {icon}
      </span>
      {!collapsed && <span className="truncate">{label}</span>}
    </Button>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
