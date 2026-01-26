/**
 * Cursor Learn風のクリーンなナビゲーションバー
 */

import { Link } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LearnNavBarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

export function LearnNavBar({ onMenuClick, showMenuButton = false }: LearnNavBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
      <div className="flex items-center px-4 sm:px-6 h-12">
        {/* モバイル用メニューボタン */}
        {showMenuButton && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 -ml-2 transition-colors duration-200"
            onClick={onMenuClick}
            aria-label="メニューを開く"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        {/* ロゴ */}
        <Link href="/">
          <h1 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">HELIX</h1>
        </Link>
      </div>
    </header>
  );
}
