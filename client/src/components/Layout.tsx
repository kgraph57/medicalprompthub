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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
  const { isCollapsed, toggle } = useSidebarState();
  useKeyboardShortcuts();

  const NavContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <nav className="flex flex-col h-full" aria-label="メインナビゲーション">
      {/* Header with toggle button */}
      <div className={cn(
        "flex-shrink-0 flex items-center border-b border-border/50 transition-all duration-300",
        collapsed ? "px-3 py-4 justify-center" : "px-6 py-6 justify-between"
      )}>
        {!collapsed && (
          <div>
            <Link href="/" aria-label="ホームページに戻る">
              <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
                <Activity className="w-6 h-6" aria-hidden="true" />
                Medical Prompt Hub
              </h1>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">For Healthcare Professionals</p>
          </div>
        )}
        {collapsed && (
          <Link href="/" aria-label="ホームページに戻る">
            <Activity className="w-6 h-6 text-primary" aria-hidden="true" />
          </Link>
        )}
        <button
          onClick={toggle}
          className={cn(
            "p-2 hover:bg-accent rounded-md transition-colors",
            collapsed && "mt-2"
          )}
          aria-label={collapsed ? "サイドバーを展開" : "サイドバーを折りたたむ"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-1" role="list">
          <NavItem
            icon={<Home className="w-4 h-4" />}
            label="Home"
            active={location === "/"}
            onClick={() => {
              setLocation("/");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<GraduationCap className="w-4 h-4" />}
            label="Courses"
            active={location.startsWith("/courses")}
            onClick={() => {
              setLocation("/courses");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Lightbulb className="w-4 h-4" />}
            label="Tips"
            active={location.startsWith("/tips")}
            onClick={() => {
              setLocation("/tips");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<ArrowRight className="w-4 h-4" />}
            label="Workflow"
            active={location.startsWith("/guides")}
            onClick={() => {
              setLocation("/guides");
              setIsMobileOpen(false);
            }}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Bookmark className="w-4 h-4" />}
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
            <div className="mt-6 mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider" id="categories-heading">
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
        collapsed ? "px-3 py-4" : "px-6 py-4"
      )}>
        {!collapsed && (
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
        )}
        {collapsed && (
          <div className="flex flex-col gap-2 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/ai-literacy">
                  <button className="p-2 hover:bg-accent rounded-md transition-colors">
                    <Lightbulb className="w-4 h-4" />
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
                  <button className="p-2 hover:bg-accent rounded-md transition-colors">
                    <HelpCircle className="w-4 h-4" />
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
                  <button className="p-2 hover:bg-accent rounded-md transition-colors">
                    <Mail className="w-4 h-4" />
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
        isCollapsed ? "lg:w-16" : "lg:w-64"
      )}>
        <NavContent collapsed={isCollapsed} />
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
                  <NavItem
                    icon={<Home className="w-4 h-4" />}
                    label="Home"
                    active={location === "/"}
                    onClick={() => {
                      setLocation("/");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<GraduationCap className="w-4 h-4" />}
                    label="Courses"
                    active={location.startsWith("/courses")}
                    onClick={() => {
                      setLocation("/courses");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<Lightbulb className="w-4 h-4" />}
                    label="Tips"
                    active={location.startsWith("/tips")}
                    onClick={() => {
                      setLocation("/tips");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<ArrowRight className="w-4 h-4" />}
                    label="Workflow"
                    active={location.startsWith("/guides")}
                    onClick={() => {
                      setLocation("/guides");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                  <NavItem
                    icon={<Bookmark className="w-4 h-4" />}
                    label="Favorites"
                    active={location === "/favorites"}
                    onClick={() => {
                      setLocation("/favorites");
                      setIsMobileOpen(false);
                    }}
                    collapsed={false}
                  />
                </div>

                <div className="mt-6 mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider" id="categories-heading">
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
      <main className={cn(
        "flex-1 overflow-y-auto transition-all duration-300",
        "pt-16 lg:pt-0", // Add padding-top for mobile header
        isCollapsed ? "lg:ml-16" : "lg:ml-64"
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
        "font-medium transition-all duration-200",
        active && "bg-secondary text-secondary-foreground",
        collapsed ? "w-10 h-10 p-0 justify-center" : "w-full justify-start"
      )}
      onClick={onClick}
    >
      <span className={cn(collapsed ? "" : "mr-2")} aria-hidden="true">
        {icon}
      </span>
      {!collapsed && label}
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
