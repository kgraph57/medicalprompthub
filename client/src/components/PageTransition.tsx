/**
 * Cursor/Anthropic風のページ遷移アニメーション
 * Framer Motionを使用したスムーズなページトランジション
 */

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "wouter";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// ページ遷移のアニメーション設定
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

const pageTransition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1], // Cursor/Anthropicが使うイージング
  duration: 0.3,
};

/**
 * ページ遷移アニメーションラッパー
 * 各ページをこのコンポーネントでラップして使用
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * セクション用フェードインアニメーション
 * スクロールで表示される際に使用
 */
export function FadeInSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * スタッガードリスト用アニメーション
 * リストアイテムが順番にフェードインする
 */
export function StaggeredList({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggeredList内のアイテム用
 */
export function StaggeredItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ホバーで浮き上がるカード用アニメーション
 */
export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * スケールイン アニメーション（モーダルやポップオーバー用）
 */
export function ScaleIn({
  children,
  className,
  isVisible = true,
}: {
  children: ReactNode;
  className?: string;
  isVisible?: boolean;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * スライドイン アニメーション（サイドバーやドロワー用）
 */
export function SlideIn({
  children,
  className,
  direction = "right",
  isVisible = true,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  isVisible?: boolean;
}) {
  const directionMap = {
    left: { x: "-100%", y: 0 },
    right: { x: "100%", y: 0 },
    top: { x: 0, y: "-100%" },
    bottom: { x: 0, y: "100%" },
  };

  const initial = directionMap[direction];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ ...initial, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ ...initial, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
