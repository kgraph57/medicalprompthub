import { cn } from "@/lib/utils";

/**
 * Cursor/Anthropic風のスケルトンローダー
 * シマー効果付きで洗練されたローディング体験を提供
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-800",
        // シマー効果
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "dark:before:via-white/10",
        className
      )}
      {...props}
    />
  );
}

/**
 * テキスト用スケルトン
 */
function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            // 最後の行は短く
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/**
 * カード用スケルトン
 */
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

/**
 * リスト用スケルトン
 */
function SkeletonList({ items = 5, className }: { items?: number; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ページヘッダー用スケルトン
 */
function SkeletonPageHeader({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-5 w-full max-w-lg" />
    </div>
  );
}

/**
 * グリッド用スケルトン
 */
function SkeletonGrid({
  items = 6,
  cols = 3,
  className
}: {
  items?: number;
  cols?: 2 | 3 | 4;
  className?: string
}) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[cols], className)}>
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonList,
  SkeletonPageHeader,
  SkeletonGrid
};
