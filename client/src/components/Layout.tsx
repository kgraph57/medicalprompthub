import { cn } from "@/lib/utils";
import { Activity, BookOpen, Bookmark, GraduationCap, HelpCircle, Home, Mail, MessageSquare, Settings, Lightbulb, Stethoscope, Heart, FileText, Pill, Users, Handshake, BookMarked, Microscope, ClipboardList, School, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { SafetyWarningModal } from "./SafetyWarningModal";
import { KeyboardShortcutsHelp } from "./KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// プロンプトカテゴリ定義
const categories = [
  { id: "diagnosis", label: "診断支援", icon: Stethoscope },
  { id: "treatment", label: "治療計画", icon: Heart },
  { id: "documentation", label: "書類作成", icon: FileText },
  { id: "medication", label: "薬剤・処方", icon: Pill },
  { id: "communication", label: "患者対話", icon: Users },
  { id: "shared-decision-making", label: "共同意思決定", icon: Handshake },
  { id: "literature", label: "医学文献", icon: BookMarked },
  { id: "research", label: "研究・学会", icon: Microscope },
  { id: "case-analysis", label: "症例分析", icon: ClipboardList },
  { id: "education", label: "教育・学習", icon: School },
  { id: "administrative", label: "管理・運営", icon: Briefcase },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [showPromptMenu, setShowPromptMenu] = useState(false);
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

  const NavIcon = ({ 
    icon, 
    label, 
    active, 
    onClick,
    onMouseEnter,
    onMouseLeave 
  }: { 
    icon: React.ReactNode; 
    label: string; 
    active?: boolean; 
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200",
            active 
              ? "bg-primary/10 text-primary" 
              : "hover:bg-accent text-muted-foreground hover:text-foreground"
          )}
          aria-label={label}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );

  const NavContent = () => (
    <nav className="flex flex-col h-full bg-muted/30 border-r border-border/30" aria-label="メインナビゲーション">
      {/* ヘッダー: ロゴ */}
      <div className="flex-shrink-0 flex items-center justify-center py-2 border-b border-border/30">
        <button 
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsMobileOpen(!isMobileOpen);
            } else {
              setIsDesktopOpen(!isDesktopOpen);
            }
          }}
          aria-label="サイドバーを開閉"
          className="focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
        >
          <Activity className="w-5 h-5 text-primary" aria-hidden="true" />
        </button>
      </div>

      {/* 上部ナビゲーション */}
      <div className="flex-shrink-0 flex flex-col items-center gap-0.5 py-2 border-b border-border/30">
        <NavIcon
          icon={<Home className="w-4 h-4" />}
          label="Home"
          active={location === "/"}
          onClick={() => {
            setLocation("/");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<GraduationCap className="w-4 h-4" />}
          label="Courses"
          active={location.startsWith("/courses")}
          onClick={() => {
            setLocation("/courses");
            setIsMobileOpen(false);
          }}
        />
        <div className="relative">
          <NavIcon
            icon={<MessageSquare className="w-4 h-4" />}
            label="Prompts"
            active={location === "/" && !location.startsWith("/courses")}
            onClick={() => {
              setLocation("/");
              setIsMobileOpen(false);
            }}
            onMouseEnter={() => setShowPromptMenu(true)}
          />
          {showPromptMenu && (
            <div 
              className="absolute left-full top-0 ml-2 w-56 bg-background border border-border rounded-lg shadow-lg p-2 z-50"
              onMouseEnter={() => setShowPromptMenu(true)}
              onMouseLeave={() => setShowPromptMenu(false)}
            >
              <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">Categories</div>
              <div className="space-y-0.5">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setLocation(`/?category=${category.id}`);
                        setShowPromptMenu(false);
                        setIsMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors text-left"
                    >
                      <IconComponent className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <NavIcon
          icon={<Lightbulb className="w-4 h-4" />}
          label="Tips"
          active={location.startsWith("/tips")}
          onClick={() => {
            setLocation("/tips");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<Bookmark className="w-4 h-4" />}
          label="Favorites"
          active={location === "/favorites"}
          onClick={() => {
            setLocation("/favorites");
            setIsMobileOpen(false);
          }}
        />
      </div>

      {/* 中央スペース（空白） */}
      <div className="flex-1"></div>

      {/* 下部ナビゲーション */}
      <div className="flex-shrink-0 flex flex-col items-center gap-0.5 py-2 border-t border-border/30">
        <NavIcon
          icon={<BookOpen className="w-4 h-4" />}
          label="Documentation"
          onClick={() => {
            window.open("https://docs.example.com", "_blank");
          }}
        />
        <NavIcon
          icon={<HelpCircle className="w-4 h-4" />}
          label="Help"
          onClick={() => {
            // ヘルプモーダルを開く
          }}
        />
        <NavIcon
          icon={<Mail className="w-4 h-4" />}
          label="Contact"
          onClick={() => {
            window.location.href = "mailto:support@example.com";
          }}
        />
        <NavIcon
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          onClick={() => {
            setLocation("/settings");
            setIsMobileOpen(false);
          }}
        />
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SafetyWarningModal />
      <KeyboardShortcutsHelp />

      {/* デスクトップサイドバー */}
      <aside className={cn(
        "hidden lg:block w-14 flex-shrink-0 transition-transform duration-300",
        !isDesktopOpen && "-translate-x-full"
      )}>
        <NavContent />
      </aside>

      {/* モバイルサイドバー */}
      {isMobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed left-0 top-0 bottom-0 w-14 bg-background z-50 lg:hidden">
            <NavContent />
          </aside>
        </>
      )}

      {/* メインコンテンツ */}
      <main className="flex-1 overflow-y-auto">
        {/* モバイルヘッダー */}
        <header
          className={cn(
            "lg:hidden sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 transition-transform duration-300",
            scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
          )}
        >
          <div className="flex items-center justify-between px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(true)}
              aria-label="メニューを開く"
            >
              <Activity className="h-5 w-5" />
            </Button>
            <Link href="/">
              <h1 className="text-sm font-bold text-primary">Medical Prompt Hub</h1>
            </Link>
            <div className="w-10" />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
