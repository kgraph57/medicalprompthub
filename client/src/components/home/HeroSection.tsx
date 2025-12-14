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
      staggerChildren: 0.1,
      delayChildren: 0.05,
      duration: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const searchVariants = {
  hidden: { 
    opacity: 0, 
    y: 28,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// マウス追従エフェクト（Linear風）
function MouseFollowEffect({ x, y }: { x: any; y: any }) {
  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => 
      `radial-gradient(1000px circle at ${latestX}px ${latestY}px, rgba(120, 119, 198, 0.04), transparent 50%)`
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
      className="relative py-16 md:py-24 lg:py-32 xl:py-40 overflow-hidden min-h-[88vh] flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Linear風: 完璧に洗練された背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafafa] to-white"></div>
      
      {/* 微細な装飾（Linear風の控えめなアクセント） */}
      <div className="absolute inset-0 opacity-[0.012]">
        <div className="absolute top-[20%] left-[10%] w-[800px] h-[800px] bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[800px] h-[800px] bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* マウス追従エフェクト */}
      <MouseFollowEffect x={x} y={y} />
      
      <motion.div 
        className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* バッジ（Vercel風の洗練されたデザイン） */}
        <motion.div
          className="flex justify-center mb-6 md:mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="group relative inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* グラデーションボーダー背景（Vercel風） */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            
            {/* グラスモーフィズム効果 */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.8)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300">
              <div className="flex items-center gap-2.5 px-4 py-1.5">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary-600" strokeWidth={2.5} />
                </motion.div>
                <span className="text-[11px] font-semibold text-neutral-800 tracking-[-0.01em] bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  The New Era of Medical AI in 2025
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Linear風: 完璧なタイトル（中央配置） */}
        <motion.div 
          className="text-center mb-8 md:mb-10"
          variants={titleVariants}
        >
          <h1 
            className="text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-black mb-5 md:mb-6 leading-[0.94] tracking-[-0.048em] text-neutral-900"
            style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}
          >
            <span className="block">Medical AI,</span>
            <motion.span 
              className="block mt-2 md:mt-3 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.85, 
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              Redefined
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-[19px] md:text-[24px] lg:text-[28px] text-neutral-600 mb-3 max-w-2xl mx-auto font-normal leading-[1.4] tracking-[-0.02em]"
            variants={itemVariants}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Extend your medical expertise. Transform patient care.
          </motion.p>
        </motion.div>
        
        {/* Algolia風: プロフェッショナルな検索バー（中央、非常に目立つ） */}
        {onSearchChange && (
          <motion.div 
            className="max-w-4xl mx-auto mb-8 md:mb-10"
            variants={searchVariants}
          >
            <div className="relative group">
              {/* Algolia風: 洗練された3Dシャドウ効果 */}
              <motion.div 
                className="absolute -inset-4 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), transparent 70%)",
                }}
              />
              
              <motion.div 
                className="relative bg-white rounded-3xl shadow-[0_10px_32px_rgba(0,0,0,0.12),0_20px_64px_rgba(0,0,0,0.1)] border-2 border-neutral-200/70 overflow-hidden backdrop-blur-sm"
                whileHover={{ 
                  boxShadow: "0_16px_40px_rgba(0,0,0,0.18),0_24px_80px_rgba(0,0,0,0.15)",
                  borderColor: "rgba(120, 119, 198, 0.5)",
                  scale: 1.002,
                }}
                animate={{
                  borderColor: isSearchFocused 
                    ? "rgba(120, 119, 198, 0.8)" 
                    : "rgba(0, 0, 0, 0.14)",
                  boxShadow: isSearchFocused
                    ? "0_16px_40px_rgba(120,119,198,0.25),0_24px_80px_rgba(120,119,198,0.3)"
                    : "0_10px_32px_rgba(0,0,0,0.12),0_20px_64px_rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center h-[88px] md:h-[104px] lg:h-[120px]">
                  <div className="pl-9 md:pl-11 pr-5 md:pr-7 flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Search className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 text-primary-500" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for prompts (e.g., differential diagnosis, case report, statistical analysis)"
                    className="flex-1 h-full pr-9 md:pr-11 text-[21px] md:text-[24px] lg:text-[26px] bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-neutral-400 text-neutral-900 font-semibold tracking-[-0.022em]"
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
        
        {/* Linear風: 統計情報（検索バーの下、横並び） */}
        <motion.div 
          className="grid grid-cols-3 gap-8 md:gap-10 max-w-3xl mx-auto mb-8 md:mb-10"
          variants={itemVariants}
        >
          {[
            { value: "100+", label: "Prompts", color: "text-primary-600" },
            { value: "24/7", label: "Support", color: "text-purple-600" },
            { value: "AI", label: "Powered", color: "text-pink-600" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.7 + index * 0.12,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className={`text-[52px] md:text-[64px] lg:text-[72px] font-black mb-2.5 tracking-[-0.045em] leading-[0.94] ${stat.color}`} style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-[13px] md:text-[14px] text-neutral-600 font-medium tracking-[-0.006em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Linear風: 完璧に洗練されたCTA（中央配置） */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => setLocation('/guides')}
            className="group relative inline-flex items-center gap-3 px-14 py-7 text-[16px] font-medium text-white bg-neutral-900 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.2),0_16px_48px_rgba(0,0,0,0.14)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25),0_20px_64px_rgba(0,0,0,0.18)] transition-all duration-200"
            whileHover={{ 
              scale: 1.02,
              y: -1.5,
            }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Get Started
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
          
          <motion.button
            onClick={() => {
              const element = document.getElementById('prompts');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-14 py-7 text-[16px] font-medium text-neutral-700 bg-white border border-neutral-300/70 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200"
            whileHover={{ 
              scale: 1.02,
              y: -1.5,
            }}
            whileTap={{ scale: 0.98 }}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
          >
            Explore Prompts
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
