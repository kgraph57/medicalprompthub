import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type PageLoaderProps = {
  /** スピナーサイズ。デフォルト: "lg" */
  size?: "sm" | "md" | "lg";
  /** 追加のラッパークラス */
  className?: string;
  /** ローディングメッセージ */
  message?: string;
  /** フルスクリーン表示 */
  fullScreen?: boolean;
};

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
};

/**
 * HELIX らしい螺旋（ヘリックス）構造の SVG ローダー。
 * 3本の弧が半径を変えて 120° ずつずれ、回転で螺旋に見える。
 */
function HelixSpiral({ size = 64 }: { size?: number }) {
  const c = size / 2;
  const r1 = size * 0.16;
  const r2 = size * 0.28;
  const r3 = size * 0.4;

  // 0° → 120°（内側の弧）
  const a1x = c + r1;
  const a1y = c;
  const b1x = c + r1 * Math.cos((2 * Math.PI * 120) / 360);
  const b1y = c + r1 * Math.sin((2 * Math.PI * 120) / 360);

  // 120° → 240°（中間）
  const a2x = c + r2 * Math.cos((2 * Math.PI * 120) / 360);
  const a2y = c + r2 * Math.sin((2 * Math.PI * 120) / 360);
  const b2x = c + r2 * Math.cos((2 * Math.PI * 240) / 360);
  const b2y = c + r2 * Math.sin((2 * Math.PI * 240) / 360);

  // 240° → 360°（外側）
  const a3x = c + r3 * Math.cos((2 * Math.PI * 240) / 360);
  const a3y = c + r3 * Math.sin((2 * Math.PI * 240) / 360);
  const b3x = c + r3;
  const b3y = c;

  const arcs = [
    { Mx: a1x, My: a1y, Ax: b1x, Ay: b1y, r: r1 },
    { Mx: a2x, My: a2y, Ax: b2x, Ay: b2y, r: r2 },
    { Mx: a3x, My: a3y, Ax: b3x, Ay: b3y, r: r3 },
  ];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="size-full"
      aria-hidden
    >
      <g
        className="origin-center animate-[spin_2s_linear_infinite]"
        style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
      >
        {arcs.map(({ Mx, My, Ax, Ay, r }, i) => (
          <path
            key={i}
            d={`M ${Mx.toFixed(2)} ${My.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${Ax.toFixed(2)} ${Ay.toFixed(2)}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={Math.max(2, size / 24)}
            strokeLinecap="round"
            className="text-blue-600 dark:text-blue-400"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Cursor/Anthropic風のミニマルなドットローダー
 */
function DotLoader() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * ページ読み込み時に表示するローダー。
 * HELIX らしい螺旋デザイン + Cursor/Anthropic風のミニマルな表現。
 * Suspense の fallback などで使用。
 */
export function PageLoader({
  size = "lg",
  className,
  message,
  fullScreen = true
}: PageLoaderProps) {
  const px = sizeMap[size];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex flex-col items-center justify-center bg-background",
        fullScreen && "min-h-screen",
        !fullScreen && "py-16",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0"
        style={{ width: px, height: px }}
      >
        <HelixSpiral size={px} />
      </motion.div>

      {message ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-6 text-sm text-neutral-600 dark:text-neutral-400"
        >
          {message}
        </motion.p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <DotLoader />
        </motion.div>
      )}

      <span className="sr-only">Loading</span>
    </motion.div>
  );
}

/**
 * インラインローダー（ボタン内などで使用）
 */
export function InlineLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * コンテンツローダー（部分的なローディング用）
 */
export function ContentLoader({
  className,
  message = "読み込み中..."
}: {
  className?: string;
  message?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <DotLoader />
      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        {message}
      </p>
      <span className="sr-only">{message}</span>
    </div>
  );
}
