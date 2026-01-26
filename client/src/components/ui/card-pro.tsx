import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  // 基本スタイル - Jony Iveの指示: rounded-lg (12px)が黄金比
  "rounded-lg transition-all duration-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
  {
    variants: {
      variant: {
        // Default Card - Dieter Ramsの指示: ボーダー、影、角丸の3つで十分
        default:
          "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm",
        
        // Elevated Card - Jony Iveの指示: ホバー時に2px上に移動
        elevated:
          "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-[2px] hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer",
        
        // Bordered Card
        bordered:
          "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700",
        
        // Ghost Card
        ghost:
          "bg-transparent",
        
        // Info Card - Dieter Ramsの指示: border-l-[3px]が黄金比、bg-blue-100が最適
        info:
          "bg-blue-100 dark:bg-blue-900/40 border-l-[3px] border-blue-500 dark:border-blue-400 shadow-sm",
        
        // Success Card
        success:
          "bg-green-100 dark:bg-green-900/40 border-l-[3px] border-green-500 dark:border-green-400 shadow-sm",
        
        // Warning Card
        warning:
          "bg-yellow-100 dark:bg-yellow-900/40 border-l-[3px] border-yellow-500 dark:border-yellow-400 shadow-sm",
        
        // Error Card
        error:
          "bg-red-100 dark:bg-red-900/40 border-l-[3px] border-red-500 dark:border-red-400 shadow-sm",
      },
      padding: {
        // 佐藤カシワの指示: 8pxグリッドに完全に準拠
        none: "p-0",
        sm: "p-2",      // 16px
        default: "p-4",  // 32px - 標準
        lg: "p-6",      // 48px
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
);

export interface CardProProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const CardPro = React.forwardRef<HTMLDivElement, CardProProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
);
CardPro.displayName = "CardPro";

const CardProHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2", className)}
    {...props}
  />
));
CardProHeader.displayName = "CardProHeader";

const CardProTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    // Tobias Frere-Jonesの指示: text-xl (21px) - Perfect Fourth
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardProTitle.displayName = "CardProTitle";

const CardProDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    // Tobias Frere-Jonesの指示: text-sm (14px)
    className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}
    {...props}
  />
));
CardProDescription.displayName = "CardProDescription";

const CardProContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardProContent.displayName = "CardProContent";

const CardProFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // 佐藤カシワの指示: pt-4 (32px) - 8pxグリッド
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CardProFooter.displayName = "CardProFooter";

export { CardPro, CardProHeader, CardProTitle, CardProDescription, CardProContent, CardProFooter };
