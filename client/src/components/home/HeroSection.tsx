import { ArrowRight, Search, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
      ease: [0.16, 1, 0.3, 1],
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
      ease: [0.16, 1, 0.3, 1],
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
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// マウス追従エフェクト（Linear風：より控えめに）
function MouseFollowEffect({ x, y }: { x: any; y: any }) {
  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => 
      `radial-gradient(800px circle at ${latestX}px ${latestY}px, rgba(59, 130, 246, 0.02), transparent 50%)`
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
  
  // マウス追従エフェクト
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180 };
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      className="relative py-8 md:py-12 lg:py-16 overflow-hidden min-h-[60vh] flex items-center bg-white dark:bg-neutral-950"
      onMouseMove={handleMouseMove}
    >
      {/* Linear風: 非常に控えめな背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-blue-500/3 via-blue-600/3 to-cyan-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* マウス追従エフェクト（Linear風：より控えめに） */}
      <MouseFollowEffect x={x} y={y} />
      
      <motion.div 
        className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {/* Linear.app風：左寄せレイアウト */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div>
            {/* テキストコンテンツ */}
            <div className="lg:pt-8">
              {/* パンチライン + 説明文（Linear.app風：左寄せ） */}
              <motion.div 
                className="mb-8 md:mb-10"
                variants={titleVariants}
              >
                {/* パンチライン（Linear.app風：大きなタイトル - 左寄せ、適度に改行） */}
                <motion.h1 
                  className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[68px] 2xl:text-[76px] font-black mb-6 md:mb-8 leading-none tracking-[-0.02em] relative"
                  style={{ 
                    fontFamily: 'Inter Display, Inter, system-ui, sans-serif',
                    wordBreak: 'normal',
                    overflowWrap: 'normal',
                    hyphens: 'none',
                    whiteSpace: 'normal'
                  }}
                  variants={titleVariants}
                >
                  {(() => {
                    // Linear.app風：適切な改行位置で分割（2行、"for"の前で改行）
                    const line1 = "AMPL is a purpose-built tool";
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
                                  duration: 0.5,
                                  delay: baseDelay + currentCharIndex * 0.02,
                                  ease: [0.16, 1, 0.3, 1]
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
                                        ease: [0.25, 0.46, 0.45, 0.94]
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
                      ease: [0.16, 1, 0.3, 1] 
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
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    Streamline diagnosis, research, and patient care with expert AI prompts.
                  </motion.p>
                </motion.div>

                {/* CTAボタン（Linear.app風） */}
                <motion.div 
                  className="flex flex-col sm:flex-row items-start gap-4 mt-6"
                  variants={itemVariants}
                >
                  <motion.button
                    onClick={() => setLocation('/guides')}
                    className="inline-flex items-center justify-center px-6 py-3 text-[15px] font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    Get Started
                  </motion.button>
                  
                  <motion.a
                    href="/changelog"
                    className="group inline-flex items-center gap-1.5 px-0 py-3 text-[15px] font-medium text-neutral-900 dark:text-neutral-50 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-blue-300 dark:to-cyan-400 bg-clip-text text-transparent">
                      New: Medical AI 2025
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-900 dark:text-neutral-50 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Algolia風: プロフェッショナルな検索バー（中央、非常に目立つ） */}
        {onSearchChange && (
          <motion.div 
            className="max-w-5xl mx-auto mb-8 md:mb-10 px-2"
            variants={searchVariants}
          >
            <div className="relative group">
              {/* Algolia風: 洗練された3Dシャドウ効果 */}
              <motion.div 
                className="absolute -inset-4 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(6, 182, 212, 0.3), rgba(96, 165, 250, 0.3), transparent 70%)",
                }}
              />
              
              <motion.div 
                className="relative bg-white rounded-3xl shadow-[0_10px_32px_rgba(0,0,0,0.12),0_20px_64px_rgba(0,0,0,0.1)] border-2 border-neutral-200/70 overflow-hidden backdrop-blur-sm"
                whileHover={{ 
                  boxShadow: "0_16px_40px_rgba(0,0,0,0.18),0_24px_80px_rgba(0,0,0,0.15)",
                  borderColor: "rgba(59, 130, 246, 0.5)",
                  scale: 1.002,
                }}
                animate={{
                  borderColor: isSearchFocused 
                    ? "rgba(59, 130, 246, 0.8)" 
                    : "rgba(0, 0, 0, 0.14)",
                  boxShadow: isSearchFocused
                    ? "0_16px_40px_rgba(59,130,246,0.25),0_24px_80px_rgba(59,130,246,0.3)"
                    : "0_10px_32px_rgba(0,0,0,0.12),0_20px_64px_rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center h-[72px] sm:h-[88px] md:h-[104px] lg:h-[120px]">
                  <div className="pl-6 sm:pl-9 md:pl-11 pr-4 sm:pr-5 md:pr-7 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Search className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-primary-500" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for prompts (e.g., differential diagnosis, case report, statistical analysis)"
                    className="flex-1 h-full pr-6 sm:pr-9 md:pr-11 text-[16px] sm:text-[21px] md:text-[24px] lg:text-[26px] bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-neutral-400 text-neutral-900 font-semibold tracking-[-0.022em]"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                  {/* キーボードショートカット表示（Linear風） */}
                  <div className="pr-9 md:pr-11 hidden sm:flex items-center gap-2">
                    <kbd className="px-3.5 py-2 text-[11px] font-bold text-neutral-600 bg-neutral-100/95 border border-neutral-300/90 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)]">⌘</kbd>
                    <kbd className="px-3.5 py-2 text-[11px] font-bold text-neutral-600 bg-neutral-100/95 border border-neutral-300/90 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)]">K</kbd>
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
