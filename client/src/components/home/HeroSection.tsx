import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { InteractivePromptPreview } from "./InteractivePromptPreview";
import { loadPrompts } from "@/lib/prompts-loader";
import { getRecommendedPrompts } from "@/lib/recommendedPrompts";
import type { Prompt } from "@/lib/prompts";

interface HeroSectionProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

// Linear風: 完璧なアニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

const searchVariants = {
  hidden: { 
    opacity: 0, 
    y: 25,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

// マウス追従エフェクト（Linear風：より控えめに）
function MouseFollowEffect({ x, y }: { x: any; y: any }) {
  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => 
      `radial-gradient(800px circle at ${latestX}px ${latestY}px, rgba(59, 130, 246, 0.015), transparent 50%)`
  );
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ 
        background,
        willChange: "background"
      }}
    />
  );
}

export function HeroSection({ searchQuery = "", onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recommendedPrompts, setRecommendedPrompts] = useState<Prompt[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
  // スクロール連動アニメーション
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // パララックス効果（より控えめに）
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  
  // マウス追従エフェクト（パフォーマンス最適化）
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // マウス移動のスロットリング（パフォーマンス最適化）
  const handleMouseMoveThrottled = useRef<NodeJS.Timeout | null>(null);

  // プロンプトデータの読み込み（パフォーマンス最適化：遅延ロード）
  useEffect(() => {
    // requestIdleCallbackでアイドル時に読み込む
    const loadData = () => {
      loadPrompts().then((prompts) => {
        const recommended = getRecommendedPrompts(prompts);
        setRecommendedPrompts(recommended.slice(0, 6)); // 最大6個
      });
    };
    
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadData, { timeout: 2000 });
    } else {
      setTimeout(loadData, 100);
    }
  }, []);

  
  // キーボードショートカット（⌘K）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInputRef.current && onSearchChange) {
          searchInputRef.current.focus();
          searchInputRef.current.select();
        }
      }
      if (e.key === 'Escape' && searchInputRef.current) {
        searchInputRef.current.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchChange]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // スロットリングでパフォーマンス最適化
    if (handleMouseMoveThrottled.current) return;
    handleMouseMoveThrottled.current = setTimeout(() => {
      handleMouseMoveThrottled.current = null;
    }, 16); // ~60fps
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden min-h-[85vh] flex items-center bg-white dark:bg-neutral-950"
      onMouseMove={handleMouseMove}
    >
      {/* Linear風: 控えめな背景装飾（グラデーション + アニメーション） */}
      <div className="absolute inset-0 overflow-hidden">
        {/* メイングラデーション */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-gradient-to-br from-blue-500/4 via-cyan-500/3 to-blue-500/2 rounded-full blur-3xl"
          style={{ y: backgroundY }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* 微細なグリッドパターン（より控えめに） */}
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.015]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGrid)" className="text-neutral-900 dark:text-neutral-100" />
          </svg>
        </div>
      </div>
      
      {/* マウス追従エフェクト（Linear風：より控えめに）- デスクトップのみ */}
      <div className="hidden lg:block">
        <MouseFollowEffect x={x} y={y} />
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        style={{
          y: contentY,
          opacity,
        }}
      >
        {/* Linear.app風：2カラムレイアウト（テキスト + インタラクティブプレビュー） */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 左カラム：テキストコンテンツ */}
            <div className="lg:pt-8">
              {/* パンチライン + 説明文（Linear.app風：左寄せ） */}
              <motion.div 
                className="mb-8 md:mb-10"
                variants={titleVariants}
              >
                {/* パンチライン（Linear.app風：大きなタイトル - 左寄せ、適度に改行） */}
                <motion.h1 
                  className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px] font-black mb-8 md:mb-10 leading-[0.95] tracking-[-0.03em] relative"
                  style={{ 
                    fontFamily: 'Inter Display, Inter, system-ui, sans-serif',
                    wordBreak: 'normal',
                    overflowWrap: 'normal',
                    hyphens: 'none',
                    whiteSpace: 'normal',
                    fontWeight: 900
                  }}
                  variants={titleVariants}
                >
                  {(() => {
                    // Linear.app風：適切な改行位置で分割（2行、"for"の前で改行）
                    const line1 = "Helix is a purpose-built tool";
                    const line2 = "for medical AI excellence";
                    
                    const renderText = (text: string, baseDelay: number) => {
                      const chars = text.split("");
                      let charIndex = 0;
                      return (
                        <span className="block">
                          {chars.map((char, index) => {
                            const isSpace = char === " ";
                            const currentCharIndex = charIndex;
                            if (!isSpace) charIndex++;
                            
                            return (
                              <motion.span
                                key={index}
                                className={isSpace ? "inline" : "inline-block relative whitespace-nowrap"}
                                initial={{ 
                                  opacity: isSpace ? 1 : 0,
                                  filter: isSpace ? "blur(0px)" : "blur(8px)",
                                  y: isSpace ? 0 : 10
                                }}
                                animate={{ 
                                  opacity: 1,
                                  filter: "blur(0px)",
                                  y: 0
                                }}
                                transition={{
                                  duration: 0.6,
                                  delay: baseDelay + currentCharIndex * 0.015,
                                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number]
                                }}
                              >
                                {isSpace ? (
                                  <span className="text-neutral-900 dark:text-neutral-50">&nbsp;</span>
                                ) : (
                                  <>
                                    {/* 通常のテキスト */}
                                    <span className="relative z-10 text-neutral-900 dark:text-neutral-50">
                                      {char}
                                    </span>
                                    
                                    {/* グラデーションアニメーション（各文字に適用） */}
                                    <motion.span
                                      className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
                                      style={{
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundSize: "200% 100%",
                                      }}
                                      initial={{ 
                                        backgroundPosition: "-100% 0%",
                                        opacity: 0,
                                      }}
                                      animate={{ 
                                        backgroundPosition: "100% 0%",
                                        opacity: 1,
                                      }}
                                      transition={{ 
                                        duration: 0.6,
                                        delay: baseDelay + currentCharIndex * 0.02,
                                        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] as [number, number, number, number]
                                      }}
                                    >
                                      {char}
                                    </motion.span>
                                  </>
                                )}
                              </motion.span>
                            );
                          })}
                        </span>
                      );
                    };
                    
                    return (
                      <span className="block">
                        <span className="block leading-none">{renderText(line1, 0.2)}</span>
                        <span className="block leading-none">{renderText(line2, 0.2 + line1.split(" ").length * 0.08 + 0.15)}</span>
                      </span>
                    );
                  })()}
                </motion.h1>
                
                {/* 説明文（Linear.app風：2つの文章を別々の行に） */}
                <motion.div 
                  className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-neutral-600 dark:text-neutral-400 mb-8 font-normal leading-[1.5] tracking-[-0.01em]"
                  variants={itemVariants}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  <motion.p
                    className="mb-0"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.5,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
                    }}
                  >
                    Meet the system for modern medical practice.
                  </motion.p>
                  <motion.p
                    className="mt-0"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.65,
                      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
                    }}
                  >
                    Streamline diagnosis, research, and patient care with expert AI prompts.
                  </motion.p>
                </motion.div>

                {/* CTAボタン（Linear.app風） */}
                <motion.div 
                  className="flex flex-col sm:flex-row items-start gap-5 mt-8"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={() => setLocation('/guides')}
                    className="group relative inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 focus:ring-offset-2"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                    aria-label="Get Started - ガイドページへ移動"
                  >
                    {/* ホバー時のグロー効果 */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%)",
                      }}
                    />
                    <span className="relative z-10">Get Started</span>
                  </motion.button>
                  
                  <motion.a
                    href="/changelog"
                    className="group inline-flex items-center gap-2 px-0 py-3.5 text-[15px] font-medium text-neutral-900 dark:text-neutral-50 hover:text-neutral-700 dark:hover:text-neutral-300 transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                  >
                    <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-blue-300 dark:to-cyan-400 bg-clip-text text-transparent">
                      New: Medical AI 2025
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-900 dark:text-neutral-50 transition-transform group-hover:translate-x-1.5" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            {/* 右カラム：インタラクティブなプロンプトプレビュー */}
            <div className="hidden lg:block relative h-full min-h-[500px]">
              {recommendedPrompts.length > 0 ? (
                <InteractivePromptPreview 
                  prompts={recommendedPrompts}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-2xl border border-neutral-800/50 bg-neutral-900/70 backdrop-blur-xl">
                  <div className="text-center text-neutral-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-sm">読み込み中...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Linear/Vercel風: 洗練された検索バー */}
        {onSearchChange && (
          <motion.div 
            className="max-w-4xl mx-auto mt-12 lg:mt-16 mb-8 md:mb-10 px-2"
            variants={searchVariants}
          >
            <div className="relative group">
              {/* ホバー時のグロー効果 */}
              <motion.div 
                className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2), transparent 70%)",
                }}
              />
              
              <motion.div 
                className="relative bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)] border border-neutral-200/60 dark:border-neutral-800/60 overflow-hidden"
                whileHover={{ 
                  boxShadow: "0_8px_24px_rgba(0,0,0,0.12),0_12px_48px_rgba(0,0,0,0.08)",
                  borderColor: "rgba(59, 130, 246, 0.4)",
                  scale: 1.005,
                }}
                animate={{
                  borderColor: isSearchFocused 
                    ? "rgba(59, 130, 246, 0.6)" 
                    : "rgba(0, 0, 0, 0.1)",
                  boxShadow: isSearchFocused
                    ? "0_8px_24px_rgba(59,130,246,0.15),0_12px_48px_rgba(59,130,246,0.2)"
                    : "0_4px_16px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.06)",
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <div className="flex items-center h-[56px] sm:h-[64px] md:h-[72px]">
                  <div className="pl-5 sm:pl-6 md:pl-7 pr-3 sm:pr-4 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    >
                      <Search className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400 dark:text-neutral-500" strokeWidth={2} />
                    </motion.div>
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for prompts..."
                    className="flex-1 h-full pr-5 sm:pr-6 md:pr-7 text-[15px] sm:text-[16px] md:text-[17px] bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100 font-normal tracking-[-0.01em]"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}
                  />
                  {/* キーボードショートカット表示（Linear風） */}
                  <div className="pr-5 sm:pr-6 md:pr-7 hidden sm:flex items-center gap-1.5">
                    <kbd className="px-2.5 py-1.5 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 rounded-md shadow-sm">⌘</kbd>
                    <kbd className="px-2.5 py-1.5 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 rounded-md shadow-sm">K</kbd>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
