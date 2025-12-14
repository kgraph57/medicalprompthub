import { cn } from "@/lib/utils";
import { Activity, BookOpen, Bookmark, GraduationCap, HelpCircle, Home, Mail, MessageSquare, Settings, Lightbulb, Stethoscope, Heart, FileText, Pill, Users, Handshake, BookMarked, Microscope, ClipboardList, School, Briefcase, Menu, PanelLeftClose, PanelLeft, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { SafetyWarningModal } from "./SafetyWarningModal";
import { KeyboardShortcutsHelp } from "./KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Footer } from "./Footer";

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

  const NavIcon = ({ icon, label, active, onClick, onMouseEnter, isMobile }: NavIconProps & { isMobile?: boolean }) => {
    const showText = isMobile || isExpanded;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={cn(
              "flex items-center gap-2 w-full px-2 py-1.5 rounded-md transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            aria-label={label}
          >
            <div className="flex-shrink-0">{icon}</div>
            {showText && <span className="text-xs font-medium">{label}</span>}
          </button>
        </TooltipTrigger>
        {!showText && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    );
  };

  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <nav className="flex flex-col h-full bg-muted/30 border-r border-border/30" aria-label="メインナビゲーション">
      {/* トグルボタン */}
      <div className="flex-shrink-0 flex items-center justify-start px-2 py-1.5 border-b border-border/30">
        {isMobile ? (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-0.5 rounded-md hover:bg-accent transition-colors"
            aria-label="サイドバーを閉じる"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-0.5 rounded-md hover:bg-accent transition-colors"
            aria-label={isExpanded ? "サイドバーを折りたたむ" : "サイドバーを展開"}
          >
            {isExpanded ? (
              <PanelLeftClose className="w-3.5 h-3.5 text-muted-foreground" />
            ) : (
              <PanelLeft className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>
        )}
      </div>

      {/* 上部ナビゲーション */}
      <div className="flex-shrink-0 flex flex-col gap-0.5 p-1.5 border-b border-border/30">
        <NavIcon
          icon={<Home className="w-3.5 h-3.5" />}
          label="Home"
          active={location === "/" && !location.includes("?")}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<GraduationCap className="w-3.5 h-3.5" />}
          label="Courses"
          active={location.startsWith("/courses")}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/courses");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<BookOpen className="w-3.5 h-3.5" />}
          label="Guides"
          active={location.startsWith("/guides")}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/guides");
            setIsMobileOpen(false);
          }}
        />
        <div 
          className="relative"
        >
          <NavIcon
            icon={<MessageSquare className="w-3.5 h-3.5" />}
            label="Prompts"
            active={location === "/" && !location.startsWith("/courses")}
            isMobile={isMobile}
            onClick={() => {
              setShowPromptMenu(!showPromptMenu);
            }}
          />
          {showPromptMenu && (
            <div 
              className="absolute left-full top-0 ml-2 w-48 bg-background border border-border rounded-lg shadow-lg p-1.5 z-50"
              role="menu"
              aria-label="プロンプトカテゴリメニュー"
            >
              <div className="text-xs font-semibold text-muted-foreground mb-1.5 px-1.5">Categories</div>
              <div className="space-y-0.5">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setLocation(`/category/${category.id}`);
                        setShowPromptMenu(false);
                        setIsMobileOpen(false);
                      }}
                      className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-accent transition-colors text-left"
                      role="menuitem"
                      aria-label={`${category.label}カテゴリを開く`}
                    >
                      <IconComponent className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <NavIcon
          icon={<Lightbulb className="w-3.5 h-3.5" />}
          label="Tips"
          active={location.startsWith("/tips")}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/tips");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<Bookmark className="w-3.5 h-3.5" />}
          label="Favorites"
          active={location === "/favorites"}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/favorites");
            setIsMobileOpen(false);
          }}
        />
      </div>

      {/* 中央スペース（空白） */}
      <div className="flex-1"></div>

      {/* 下部ナビゲーション */}
      <div className="flex-shrink-0 flex flex-col gap-0.5 p-1.5 border-t border-border/30">
        <NavIcon
          icon={<HelpCircle className="w-3.5 h-3.5" />}
          label="FAQ"
          active={location === "/faq"}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/faq");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<Mail className="w-3.5 h-3.5" />}
          label="Contact"
          active={location === "/contact"}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/contact");
            setIsMobileOpen(false);
          }}
        />
        <NavIcon
          icon={<Settings className="w-3.5 h-3.5" />}
          label="Settings"
          active={location === "/settings"}
          isMobile={isMobile}
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
      {/* スキップリンク（アクセシビリティ） */}
      <a href="#main-content" className="skip-link">
        メインコンテンツにスキップ
      </a>
      <SafetyWarningModal />
      <KeyboardShortcutsHelp />

      {/* デスクトップサイドバー */}
      <aside 
        className={cn(
          "hidden lg:block flex-shrink-0 transition-all duration-300",
          isExpanded ? "w-56" : "w-14"
        )}
        aria-label="サイドバーナビゲーション"
      >
        <NavContent isMobile={false} />
      </aside>

      {/* モバイルサイドバー */}
      <aside 
        className={cn(
          "fixed left-0 top-0 bottom-0 w-56 bg-background z-50 lg:hidden transition-transform duration-300 ease-out border-r border-border/30",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="モバイルナビゲーションメニュー"
        aria-hidden={!isMobileOpen}
      >
        <NavContent isMobile={true} />
      </aside>

      {/* メインコンテンツ */}
      <main id="main-content" className="flex-1 overflow-y-auto px-2 sm:px-4 lg:px-6 xl:px-8" role="main" aria-label="メインコンテンツ">
        {/* モバイルヘッダー */}
        <header
          className={cn(
            "lg:hidden sticky top-0 z-30 bg-background/80 backdrop-blur-xl transition-transform duration-300",
            scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
          )}
        >
          <div className="flex items-center justify-between px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(true)}
              aria-label="メニューを開く"
              className="h-7 w-7"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Link href="/">
              <h1 className="text-lg font-bold text-primary">Helix</h1>
            </Link>
            <div className="w-10" />
          </div>
        </header>

        <div className="py-3 sm:py-4 lg:py-6">
          {children}
        </div>
        
        {/* フッター */}
        <Footer />
      </main>
    </div>
  );
}
