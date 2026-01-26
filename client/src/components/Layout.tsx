import { cn } from "@/lib/utils";
import { Activity, BookOpen, Bookmark, GraduationCap, HelpCircle, Home, Mail, MessageSquare, Settings, Lightbulb, Stethoscope, Heart, FileText, Pill, Users, Handshake, BookMarked, Microscope, ClipboardList, School, Briefcase, Menu, PanelLeftClose, PanelLeft, X, ArrowLeft, ChevronDown, List, ChevronRight, ChevronUp } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "./ui/button";
import { SafetyWarningModal } from "./SafetyWarningModal";
import { KeyboardShortcutsHelp } from "./KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Footer } from "./Footer";
import { ScrollProgressBar } from "./ScrollProgressBar";

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

// Context for sidebar state
const SidebarContext = React.createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
});

export const useSidebar = () => React.useContext(SidebarContext);

// Context for table of contents
interface TocItem {
  id: string;
  title: string;
  level?: number;
  onClick?: () => void;
  isActive?: boolean;
}

const TocContext = React.createContext<{
  tocItems: TocItem[];
  setTocItems: (items: TocItem[]) => void;
}>({
  tocItems: [],
  setTocItems: () => {},
});

export const useToc = () => React.useContext(TocContext);

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // 展開状態
  const [showPromptMenu, setShowPromptMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Guide page sidebar state
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const scrollDirection = useScrollDirection();
  useKeyboardShortcuts();

  // Escapeキーでメニューを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showPromptMenu) setShowPromptMenu(false);
        if (isMobileOpen) setIsMobileOpen(false);
        if (isSidebarOpen) setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showPromptMenu, isMobileOpen, isSidebarOpen]);

  // 画面サイズを監視して4行表示を判定
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 360);
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // ページが切り替わったときに目次サイドバーを閉じる
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

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
              "flex items-center gap-2 w-full px-2 py-1.5 rounded-md transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
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
    <nav className="flex flex-col h-full bg-muted/30" aria-label="メインナビゲーション">
      {/* トグルボタン */}
      <div className="flex-shrink-0 flex items-center justify-start px-1.5 pt-1.5 pb-0">
        {isMobile ? (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="px-2 py-1.5 rounded-md hover:bg-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
            aria-label="サイドバーを閉じる"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1.5 rounded-md hover:bg-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
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
      <div className="flex-shrink-0 flex flex-col gap-0.5 px-1.5 pt-2 pb-1.5">
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
          icon={<School className="w-3.5 h-3.5" />}
          label="学習"
          active={location.startsWith("/learn")}
          isMobile={isMobile}
          onClick={() => {
            setLocation("/learn/start");
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
              className="absolute left-full top-0 ml-2 w-48 bg-background rounded-lg shadow-lg p-1.5 z-50"
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
                      className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-accent transition-colors duration-200 text-left focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-1"
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
      <div className="flex-shrink-0 flex flex-col gap-0.5 p-1.5">
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
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* スクロール進捗バー */}
      <ScrollProgressBar />
      {/* スキップリンク（アクセシビリティ） */}
      <a href="#main-content" className={`skip-link ${isSmallScreen ? 'skip-link-4lines' : 'skip-link-2lines'}`}>
        {isSmallScreen ? (
          <span className="skip-link-text">
            <span className="skip-link-line">メイン</span>
            <span className="skip-link-line">コンテ</span>
            <span className="skip-link-line">ンツに</span>
            <span className="skip-link-line">スキップ</span>
          </span>
        ) : (
          <span className="skip-link-text">
            メインコンテンツに<br className="skip-link-br" />スキップ
          </span>
        )}
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
          "fixed left-0 top-0 bottom-0 w-56 bg-background z-50 lg:hidden transition-transform duration-300 ease-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="モバイルナビゲーションメニュー"
        aria-hidden={!isMobileOpen}
      >
        <NavContent isMobile={true} />
      </aside>

      {/* メインコンテンツ */}
      <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <TocContext.Provider value={{ tocItems, setTocItems }}>
          <main id="main-content" className="flex-1 overflow-y-auto" role="main" aria-label="メインコンテンツ">
            {/* ヘッダー - 全ページで表示 */}
            <header
              className="sticky top-0 z-30 bg-background border-b border-border w-full"
            >
              <div className="flex h-12 w-full items-center px-6 lg:pr-0">
                {/* モバイル: メニューボタン */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileOpen(true)}
                  aria-label="メニューを開く"
                  className="lg:hidden h-7 w-7 -ml-2"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                {/* ロゴ - 中央配置（モバイル）または左配置（デスクトップ） */}
                <Link href="/" className={cn(
                  "lg:static lg:translate-x-0",
                  isMobile ? "mx-auto" : ""
                )}>
                  <h1 className="text-lg font-bold text-primary">HELIX</h1>
                </Link>
              </div>
            </header>

            {/* ナビゲーションバー - レッスン、コース詳細、ワークフロー、ガイドページで表示 */}
            {(() => {
              // ページタイプを判定
              const isLessonPage = /^\/courses\/[^/]+\/lessons\/[^/]+/.test(location);
              const isCourseDetailPage = /^\/courses\/[^/]+$/.test(location);
              const isCategoryPage = /^\/courses\/category\/[^/]+$/.test(location);
              const isGuidePage = location.startsWith("/guides/");
              const shouldShowHeader = isLessonPage || isCourseDetailPage || isCategoryPage || isGuidePage;
              
              if (!shouldShowHeader) return null;

              // 一覧に戻るリンクを決定
              let backLink = "/";
              let backLabel = "一覧へ戻る";
              
              if (isLessonPage) {
                // レッスンページの場合、コース詳細ページに戻る
                const match = location.match(/^\/courses\/([^/]+)\/lessons\/[^/]+/);
                if (match) {
                  backLink = `/courses/${match[1]}`;
                  backLabel = "コースに戻る";
                }
              } else if (isCourseDetailPage) {
                // コース詳細ページの場合、コース一覧に戻る
                backLink = "/courses";
                backLabel = "コース一覧に戻る";
              } else if (isCategoryPage) {
                // カテゴリページの場合、コース一覧に戻る
                backLink = "/courses";
                backLabel = "コース一覧に戻る";
              } else if (isGuidePage) {
                // ガイドページの場合、ガイド一覧に戻る
                backLink = "/guides";
                backLabel = "一覧へ戻る";
              }

              return (
                <>
                  {/* 統合ヘッダー: 一覧に戻るボタンと目次ボタン */}
                  <div id="page-header" className="sticky top-14 z-20 bg-background/80 backdrop-blur-xl relative border-b border-border/40">
                    <div className="flex items-center justify-between px-4 h-[58px]">
                      {/* 左側: 一覧に戻るボタン */}
                      <Link href={backLink}>
                        <button
                          className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
                          aria-label={backLabel}
                          type="button"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>{backLabel}</span>
                        </button>
                      </Link>
                      
                      {/* 右側: 目次ボタン（目次がある場合のみ表示） */}
                      {tocItems.length > 0 && (
                        <button
                          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                          className={cn(
                            "inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer px-0 py-0",
                            isSidebarOpen && "text-neutral-900 dark:text-neutral-100"
                          )}
                          aria-label="目次"
                          type="button"
                        >
                          <span>目次</span>
                          <ChevronDown className={`h-[13px] w-[13px] flex-shrink-0 transition-transform duration-200 ${isSidebarOpen ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* モバイル用目次コンテナ - Zennスタイル */}
                  {isSidebarOpen && isMobile && (
                    <>
                      <div 
                        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                      />
                      <div 
                        className="fixed top-[calc(3.5rem+58px)] right-4 z-[100] lg:hidden w-[350px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)] bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="overflow-y-auto max-h-[calc(100vh-5rem)] p-4">
                          {/* ページトップボタン */}
                          <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                            <button
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setIsSidebarOpen(false);
                              }}
                              className="w-full flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                            >
                              <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                              <span>ページトップへ</span>
                            </button>
                          </div>
                          {/* 目次リスト */}
                          {(() => {
                            console.log('Layout: tocItems.length:', tocItems.length, 'tocItems:', tocItems);
                            return tocItems.length > 0 ? (
                            <nav className="space-y-0">
                              {tocItems.map((item, index) => {
                                const level = item.level || 2;
                                // 階層的なインデント: h2=0, h3=16px, h4=32px, h5=48px
                                const indentMap: Record<number, string> = {
                                  2: 'pl-0',
                                  3: 'pl-4',
                                  4: 'pl-8',
                                  5: 'pl-12',
                                };
                                const indent = indentMap[level] || 'pl-0';
                                // フォントサイズも階層に応じて調整
                                const fontSizeMap: Record<number, string> = {
                                  2: '14px',
                                  3: '13px',
                                  4: '12px',
                                  5: '12px',
                                };
                                const fontSize = fontSizeMap[level] || '14px';
                                return (
                                  <button
                                    key={item.id || index}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      if (item.onClick) {
                                        item.onClick();
                                      }
                                      // 少し遅延してから閉じる（ページ切り替えを確実に実行）
                                      setTimeout(() => {
                                        setIsSidebarOpen(false);
                                      }, 100);
                                    }}
                                    className={cn(
                                      "w-full text-left py-2 px-0 transition-colors break-words flex items-start gap-2 group",
                                      indent,
                                      item.isActive
                                        ? "text-blue-600 dark:text-blue-400 font-medium"
                                        : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                                    )}
                                    style={{
                                      lineHeight: '1.6',
                                      fontSize: fontSize,
                                    }}
                                  >
                                    {item.isActive && (
                                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                    )}
                                    <span className="leading-relaxed flex-1" style={{ lineHeight: '1.6' }}>
                                      {item.title}
                                    </span>
                                  </button>
                                );
                              })}
                            </nav>
                          ) : (
                            <div className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-8">
                              目次データを読み込み中...
                            </div>
                          )
                          })()}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )
            })()}

          <div className="relative">
            <div className="py-3 sm:py-4 lg:py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
            
            {/* デスクトップ用目次サイドバー - Zennスタイル */}
            {isSidebarOpen && !isMobile && location.startsWith("/guides/") && (
              <>
                <div 
                  className="fixed inset-0 bg-black/30 z-40 lg:block hidden"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <aside 
                  className="fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-[320px] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-700 z-50 lg:block hidden shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden"
                  style={{
                    animation: 'slideInRight 0.3s ease-out',
                  }}
                >
                  <div className="h-full overflow-y-auto">
                    <div className="p-4">
                      {/* ページトップボタン */}
                      <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
                        <button
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                        >
                          <ChevronRight className="h-4 w-4 rotate-[-90deg] flex-shrink-0" />
                          <span>ページトップへ</span>
                        </button>
                      </div>
                      {/* 目次リスト */}
                      {(() => {
                        return tocItems.length > 0 ? (
                        <nav className="space-y-0">
                          {tocItems.map((item, index) => {
                            const level = item.level || 2;
                            // 階層的なインデント: h2=0, h3=16px, h4=32px, h5=48px
                            const indentMap: Record<number, string> = {
                              2: 'pl-0',
                              3: 'pl-4',
                              4: 'pl-8',
                              5: 'pl-12',
                            };
                            const indent = indentMap[level] || 'pl-0';
                            // フォントサイズも階層に応じて調整
                            const fontSizeMap: Record<number, string> = {
                              2: '14px',
                              3: '13px',
                              4: '12px',
                              5: '12px',
                            };
                            const fontSize = fontSizeMap[level] || '14px';
                            return (
                              <button
                                key={item.id || index}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  if (item.onClick) {
                                    item.onClick();
                                  }
                                }}
                                className={cn(
                                  "w-full text-left py-2 px-0 transition-colors break-words flex items-start gap-2 group",
                                  indent,
                                  item.isActive
                                    ? "text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                                )}
                                style={{
                                  lineHeight: '1.6',
                                  fontSize: fontSize,
                                }}
                              >
                                {item.isActive && (
                                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                                )}
                                {!item.isActive && (
                                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5"></span>
                                )}
                                <span className="leading-relaxed flex-1" style={{ lineHeight: '1.6' }}>
                                  {item.title}
                                </span>
                              </button>
                            );
                          })}
                        </nav>
                      ) : (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-8">
                          目次データを読み込み中...
                        </div>
                      );
                      })()}
                    </div>
                  </div>
                </aside>
              </>
            )}
          </div>
          
          {/* フッター */}
          <Footer />
        </main>
        </TocContext.Provider>
      </SidebarContext.Provider>
    </div>
  );
}
