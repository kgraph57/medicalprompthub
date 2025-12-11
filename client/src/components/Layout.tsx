import { cn } from "@/lib/utils";
import { Activity, BookOpen, Bookmark, GraduationCap, HelpCircle, Home, Mail, MessageSquare, Settings, Lightbulb, Stethoscope, Heart, FileText, Pill, Users, Handshake, BookMarked, Microscope, ClipboardList, School, Briefcase, Menu, PanelLeftClose, PanelLeft } from "lucide-react";
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
  const [isExpanded, setIsExpanded] = useState(false); // 展開状態
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
      if (window.innerWidth < 1024 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    },
  });

  interface NavIconProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
  }

  const NavIcon = ({ icon, label, active, onClick, onMouseEnter }: NavIconProps) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors",
            active
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
          aria-label={label}
        >
          <div className="flex-shrink-0">{icon}</div>
          {isExpanded && <span className="text-sm font-medium">{label}</span>}
        </button>
      </TooltipTrigger>
      {!isExpanded && (
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );

  const NavContent = () => (
    <nav className="flex flex-col h-full bg-muted/30 border-r border-border/30" aria-label="メインナビゲーション">
      {/* ヘッダー: ロゴ + トグルボタン */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-3 border-b border-border/30">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
          {isExpanded && <span className="text-sm font-bold">Medical Prompt Hub</span>}
        </Link>
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="p-1 rounded-md hover:bg-accent transition-colors"
            aria-label="サイドバーを折りたたむ"
          >
            <PanelLeftClose className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="p-1 rounded-md hover:bg-accent transition-colors"
            aria-label="サイドバーを展開"
          >
            <PanelLeft className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* 上部ナビゲーション */}
      <div className="flex-shrink-0 flex flex-col gap-1 p-2 border-b border-border/30">
        <NavIcon
          icon={<Home className="w-4 h-4" />}
          label="Home"
          active={location === "/" && !location.includes("?")}
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
      <div className="flex-shrink-0 flex flex-col gap-1 p-2 border-t border-border/30">
        <NavIcon
          icon={<BookOpen className="w-4 h-4" />}
          label="Guides"
          active={location.startsWith("/guides")}
          onClick={() => {
            setLocation("/guides");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<HelpCircle className="w-4 h-4" />}
          label="FAQ"
          active={location === "/faq"}
          onClick={() => {
            setLocation("/faq");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<Mail className="w-4 h-4" />}
          label="Contact"
          active={location === "/contact"}
          onClick={() => {
            setLocation("/contact");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<Settings className="w-4 h-4" />}
          label="Settings"
          active={location === "/settings"}
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
        "hidden lg:block flex-shrink-0 transition-all duration-300",
        isExpanded ? "w-64" : "w-16"
      )}>
        <NavContent />
      </aside>

      {/* モバイルサイドバー */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 w-64 bg-background z-50 lg:hidden transition-transform duration-300 ease-out border-r border-border/30",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <NavContent />
      </aside>

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
              <Menu className="h-5 w-5" />
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
