import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import type { Prompt } from "@/lib/prompts";

interface InteractivePromptPreviewProps {
  prompts: Prompt[];
  className?: string;
}

export function InteractivePromptPreview({ prompts, className = "" }: InteractivePromptPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // マウス追従エフェクト
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // スクロール連動のパララックス（より控えめに）
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // 自動ローテーション（4秒ごと）- パフォーマンス最適化
  useEffect(() => {
    if (prompts.length === 0) return;
    // ページが非表示の時はローテーションを停止
    let interval: NodeJS.Timeout;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (interval) clearInterval(interval);
      } else {
        interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % prompts.length);
        }, 4000);
      }
    };
    
    interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prompts.length);
    }, 4000);
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prompts.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 10);
    mouseY.set((e.clientY - centerY) / 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCopy = async () => {
    if (prompts.length === 0) return;
    const currentPrompt = prompts[currentIndex];
    try {
      await navigator.clipboard.writeText(currentPrompt.template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (prompts.length === 0) return null;

  const currentPrompt = prompts[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        willChange: "transform",
        contain: "layout style paint"
      }}
    >
      {/* 背景グラデーション（強化版） - デスクトップのみ */}
      <motion.div
        className="hidden lg:block absolute inset-0 rounded-3xl opacity-40 blur-3xl -z-10"
        style={{
          background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.2), transparent 70%)",
          x: useTransform(x, (v) => v * 0.5),
          y: useTransform(y, (v) => v * 0.5),
        }}
      />
      {/* 追加の光の効果 - デスクトップのみ */}
      <motion.div
        className="hidden lg:block absolute inset-0 rounded-3xl opacity-20 blur-2xl -z-10"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.3), transparent 60%)",
          x: useTransform(x, (v) => v * -0.3),
          y: useTransform(y, (v) => v * -0.3),
        }}
      />

      {/* メインカード */}
      <motion.div
        className="relative"
        style={{
          y: yParallax,
          opacity,
        }}
      >
        <motion.div
          className="relative group"
          style={{
            rotateX: useTransform(y, [-20, 20], [2, -2]),
            rotateY: useTransform(x, [-20, 20], [-2, 2]),
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* グラスモーフィズムカード */}
          <motion.div
            className="relative rounded-2xl border border-neutral-800/50 bg-neutral-900/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, box-shadow",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* 光の反射効果（強化版） */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 60%)",
              }}
            />
            {/* 追加のグロー効果 */}
            <motion.div
              className="absolute -inset-1 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle at center, rgba(59, 130, 246, 0.4), transparent 70%)",
              }}
            />

            {/* カードコンテンツ */}
            <div className="relative p-7 space-y-5">
              {/* ヘッダー */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-medium text-neutral-400 bg-neutral-800/50 rounded-lg border border-neutral-700/50">
                    {currentPrompt.category}
                  </span>
                  {currentPrompt.riskLevel && (
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                        currentPrompt.riskLevel === "high"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : currentPrompt.riskLevel === "medium"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {currentPrompt.riskLevel === "high" ? "高リスク" : currentPrompt.riskLevel === "medium" ? "中リスク" : "低リスク"}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
                  aria-label={copied ? "コピー完了" : "プロンプトをコピー"}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
              </div>

              {/* タイトル */}
              <motion.h3 
                key={`title-${currentIndex}`}
                className="text-xl font-semibold text-neutral-100 leading-tight tracking-[-0.01em]"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentPrompt.title}
              </motion.h3>

              {/* 説明 */}
              <motion.p 
                key={`description-${currentIndex}`}
                className="text-sm text-neutral-400 leading-relaxed line-clamp-2 tracking-[-0.005em]"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentPrompt.description}
              </motion.p>

              {/* プロンプトプレビュー */}
              <div className="relative mt-4 p-4 rounded-lg bg-neutral-950/50 border border-neutral-800/50 backdrop-blur-sm" role="region" aria-label="プロンプトプレビュー">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-neutral-500">プロンプトプレビュー</span>
                  <span className="text-xs text-neutral-600" aria-live="polite" aria-atomic="true">
                    {currentIndex + 1} / {prompts.length}
                  </span>
                </div>
                <pre className="text-xs text-neutral-300 font-mono whitespace-pre-wrap line-clamp-4 overflow-hidden" aria-label={`プロンプト: ${currentPrompt.title}`}>
                  {currentPrompt.template.substring(0, 200)}
                  {currentPrompt.template.length > 200 && "..."}
                </pre>
              </div>

              {/* フッター */}
              <motion.div 
                className="flex items-center justify-between pt-3 border-t border-neutral-800/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex gap-1.5">
                  {prompts.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentIndex ? "bg-blue-500" : "bg-neutral-700/50"
                      }`}
                      initial={{ width: index === currentIndex ? 28 : 8 }}
                      animate={{ width: index === currentIndex ? 28 : 8 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </div>
                <motion.div 
                  className="flex items-center gap-2 text-xs text-neutral-500 font-medium tracking-[-0.01em] group-hover:text-neutral-400 transition-colors"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>詳細を見る</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* 背景カード（奥行き感 - 3Dスタック効果） */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-neutral-800/30 bg-neutral-900/40 backdrop-blur-xl -z-10"
            style={{
              y: 8,
              scale: 0.96,
              opacity: 0.6,
              filter: "blur(2px)",
            }}
            animate={{
              y: [8, 6, 8],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl border border-neutral-800/20 bg-neutral-900/20 backdrop-blur-xl -z-20"
            style={{
              y: 16,
              scale: 0.92,
              opacity: 0.4,
              filter: "blur(4px)",
            }}
            animate={{
              y: [16, 14, 16],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
