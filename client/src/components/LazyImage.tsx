/**
 * 遅延読み込み対応の画像コンポーネント
 * パフォーマンス最適化とアクセシビリティを考慮
 */

import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  src: string;
  alt: string;
  placeholder?: string;
  fallback?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "auto";
  priority?: boolean; // 優先的に読み込む画像（above-the-fold）
}

export function LazyImage({
  src,
  alt,
  placeholder,
  fallback = "/placeholder.png",
  className,
  aspectRatio = "auto",
  priority = false,
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(placeholder || "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Intersection Observerで画像がビューポートに入ったら読み込む
    if (!priority && typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "50px", // 50px手前から読み込み開始
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        observer.disconnect();
      };
    } else {
      // priorityがtrueの場合は即座に読み込む
      setImageSrc(src);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    if (fallback && imageSrc !== fallback) {
      setImageSrc(fallback);
    }
  };

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    auto: "",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* プレースホルダー（読み込み中） */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* エラー状態 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* 実際の画像 */}
      <img
        ref={imgRef}
        src={imageSrc || placeholder}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}
