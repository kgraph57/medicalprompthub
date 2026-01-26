import { useLocation } from "wouter";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface HeroSectionProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

// アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// アニメーションするオーブコンポーネント
function AnimatedOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* メインのグラデーションオーブ */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* セカンダリオーブ - 紫 */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* アクセントオーブ - シアン */}
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle at center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}

// グリッド背景
function GridBackground() {
  return (
    <div className="absolute inset-0">
      {/* 微細なドットパターン */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.3]"
        style={{
          backgroundImage: `radial-gradient(circle at center, currentColor 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* フェードアウトマスク */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-60" />
    </div>
  );
}

// マウス追従スポットライト
function MouseSpotlight({ mouseX, mouseY }: { mouseX: any; mouseY: any }) {
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.06), transparent 40%)`
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
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // マウス追従
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      onMouseMove={!isMobile && !prefersReducedMotion ? handleMouseMove : undefined}
    >
      {/* 背景レイヤー */}
      {!prefersReducedMotion && (
        <>
          <GridBackground />
          <AnimatedOrbs />
          {!isMobile && <MouseSpotlight mouseX={springX} mouseY={springY} />}
        </>
      )}

      {/* コンテンツ */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* メインタイトル */}
        <motion.h1
          className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[112px] font-bold leading-[0.95] tracking-[-0.04em] mb-8"
          variants={itemVariants}
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-100 dark:to-neutral-400">
            Learn AI.
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-300">
            Elevate Care.
          </span>
        </motion.h1>

        {/* サブタイトル */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
          variants={itemVariants}
        >
          From clinical workflows to research breakthroughs.
          <br className="hidden sm:block" />
          Master medical AI with interactive courses and real-world prompts.
        </motion.p>

        {/* CTAボタン */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          variants={itemVariants}
        >
          {/* プライマリCTA */}
          <motion.button
            onClick={() => setLocation('/learn/start')}
            className="group relative inline-flex items-center justify-center h-14 px-10 text-base font-semibold text-white rounded-2xl overflow-hidden transition-all duration-500"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* グラデーション背景 */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
            {/* ホバー時のシマー効果 */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-shimmer"
                style={{ backgroundSize: '200% 100%' }} />
            </span>
            {/* グロー */}
            <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2">
              Start Learning
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>

          {/* セカンダリCTA */}
          <motion.button
            onClick={() => setLocation('/courses')}
            className="group inline-flex items-center justify-center h-14 px-10 text-base font-semibold text-neutral-700 dark:text-neutral-100 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 rounded-2xl border border-neutral-200/80 dark:border-white/10 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-neutral-900/5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-2">
              Explore Courses
              <svg className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

      </motion.div>


      {/* 下部のグラデーションフェード */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* シマーアニメーション用のスタイル */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
