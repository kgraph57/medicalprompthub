import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // 基本スタイル - デザインチームの決定事項に基づく
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary Button - Jony Iveの指示: scale(1.02)が黄金比
        default:
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md hover:scale-[1.02] active:bg-blue-800 active:shadow-sm active:scale-[0.98]",
        
        // Secondary Button - Dieter Ramsの指示: 控えめだが存在感がある
        secondary:
          "bg-white text-neutral-700 border border-neutral-300 shadow-sm hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-md hover:scale-[1.02] active:bg-neutral-100 active:shadow-sm active:scale-[0.98] dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:border-neutral-600",

        // Outline Button
        outline:
          "border border-neutral-300 bg-transparent hover:bg-neutral-100 hover:border-neutral-400 hover:shadow-sm hover:scale-[1.02] active:bg-neutral-200 active:scale-[0.98] dark:border-neutral-700 dark:hover:bg-neutral-800 dark:hover:border-neutral-600",

        // Ghost Button
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 hover:scale-[1.02] active:bg-neutral-200 active:scale-[0.98] dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        
        // Link Button
        link:
          "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
        
        // Destructive Button
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md hover:scale-[1.02] active:bg-red-800 active:shadow-sm active:scale-[0.98]",
      },
      size: {
        // Tobias Frere-Jonesの指示: タップターゲットとして十分なサイズ
        sm: "h-8 px-3 text-xs",      // 32px height, 24px horizontal padding
        default: "h-10 px-4 py-2",   // 40px height, 32px horizontal padding
        lg: "h-10 lg:h-11 px-6 text-base",   // 48px height, 48px horizontal padding
        icon: "h-10 w-10",           // 40px × 40px
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const ButtonPro = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
ButtonPro.displayName = "ButtonPro";

export { ButtonPro, buttonVariants };
