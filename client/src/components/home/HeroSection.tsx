import { ArrowRight, Search, Sparkles, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

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
      `radial-gradient(800px circle at ${latestX}px ${latestY}px, rgba(0, 0, 0, 0.01), transparent 50%)`
  );
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background }}
    />
  );
}

export function HeroSection({ searchQuery = "", onSearchChange }: HeroSectionProps) {
  const [, setLocation] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // マウス追従エフェクト（軽量化、モバイルでは無効化）
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 40, stiffness: 200 }; // より軽量な設定
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);


  
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

  // マウス追従エフェクト（throttleで最適化）
  const handleMouseMove = useMemo(() => {
    let rafId: number | null = null;
    return (e: React.MouseEvent<HTMLElement>) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
        rafId = null;
      });
  };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-20 xl:py-24 overflow-hidden min-h-[85vh] flex items-center bg-background"
      onMouseMove={!isMobile ? handleMouseMove : undefined}
    >
      {/* Linear風: 控えめな背景装飾（グリッドパターンのみ） */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 微細なグリッドパターン */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-neutral-900 dark:text-neutral-100" />
          </svg>
        </div>
      </div>
      
      {/* マウス追従エフェクト（Linear風：より控えめに、モバイルでは無効化） */}
      {!isMobile && !prefersReducedMotion && <MouseFollowEffect x={x} y={y} />}
      
      <motion.div 
        className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {/* Linear.app風：左寄せレイアウト */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* テキストコンテンツ */}
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
                  {/* Linear.app風：シンプルなタイトルアニメーション（パフォーマンス最適化、モバイルでは簡略化） */}
                        <span className="block">
                              <motion.span
                      className="block leading-none whitespace-nowrap sm:whitespace-normal"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? {} : { duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                              >
                      Helix is a purpose-built tool
                    </motion.span>
                                    <motion.span
                      className="block leading-none whitespace-nowrap sm:whitespace-normal"
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? {} : { duration: isMobile ? 0.3 : 0.8, delay: isMobile ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      for medical AI excellence
                              </motion.span>
                      </span>
                </motion.h1>
                
                {/* 説明文（Linear.app風：2つの文章を別々の行に） */}
                <motion.div 
                  className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-neutral-600 dark:text-neutral-400 mb-8 font-normal leading-[1.5] tracking-[-0.01em]"
                  variants={itemVariants}
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  <motion.p
                    className="mb-0"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: isMobile ? 0 : 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? {} : { 
                      duration: isMobile ? 0.3 : 0.7, 
                      delay: isMobile ? 0 : 0.5,
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
                      delay: 0.6,
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
                    className="group relative inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                  >
                    {/* ホバー時のグロー効果 */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: "radial-gradient(circle at center, rgba(0, 0, 0, 0.02), transparent 70%)",
                      }}
                    />
                    <span className="relative z-10">Get Started</span>
                  </motion.button>
                  
                  <motion.a
                    href="/changelog"
                    className="group inline-flex items-center gap-2 px-0 py-3.5 text-[15px] font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                  >
                    <span>
                      <span className="text-blue-500">New: Medical </span>
                      <span className="text-cyan-500">AI 2025</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-900 dark:text-neutral-50 transition-transform group-hover:translate-x-1.5" />
                  </motion.a>
                </motion.div>
              </motion.div>
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
                  background: "linear-gradient(135deg, rgba(0, 0, 0, 0.05), transparent 70%)",
                }}
              />
              
              <motion.div 
                className="relative bg-background rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden"
                style={{
                  outline: `1px solid ${isSearchFocused ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.06)'}`,
                  outlineOffset: '-1px',
                }}
                whileHover={{ 
                  boxShadow: "0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.12)",
                  scale: 1.005,
                }}
                animate={{
                  boxShadow: isSearchFocused
                    ? "0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.12)"
                    : "0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.08)",
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

      {/* スクロールインジケーター（Linear風） */}
      <motion.div
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          onClick={() => {
            const nextSection = document.getElementById('prompts') || document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors group"
          aria-label="下にスクロール"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <ChevronDown className="w-5 h-5" strokeWidth={2} />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}
