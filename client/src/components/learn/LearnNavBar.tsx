/**
 * Cursor Learn風のトップナビゲーションバー
 */

import { Link, useLocation } from "wouter";
import { Search, MessageSquare, Command, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LearnNavBar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLearnPage = location.startsWith("/learn");

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 h-14">
        {/* 左側: ロゴ + ナビゲーションリンク */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/">
            <h1 className="text-base sm:text-lg font-bold text-gray-900">HELIX</h1>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/docs"
              className={cn(
                "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative",
                location.startsWith("/docs") && "text-gray-900"
              )}
            >
              ドキュメント
              {location.startsWith("/docs") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </Link>
            <Link
              href="/api"
              className={cn(
                "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative",
                location.startsWith("/api") && "text-gray-900"
              )}
            >
              API
              {location.startsWith("/api") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </Link>
            <Link
              href="/learn"
              className={cn(
                "text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative",
                isLearnPage && "text-gray-900"
              )}
            >
              学習
              {isLearnPage && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
              )}
            </Link>
          </nav>
        </div>

        {/* 中央: 検索バーとAIに質問ボタン */}
        <div className="hidden xl:flex items-center gap-3 flex-1 max-w-2xl mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Q ドキュメントを検索..."
              className="w-full h-9 pl-9 pr-20 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-3 text-sm border-gray-200 hover:bg-gray-50"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            AIに質問
            <div className="ml-2 flex items-center gap-1 text-xs text-gray-400">
              <Command className="w-3 h-3" />
              <span>I</span>
            </div>
          </Button>
        </div>

        {/* 右側: ダッシュボード + モバイルメニュー */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            ダッシュボード
          </Link>
          {/* モバイルメニューボタン */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* モバイルメニュー */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-2">
            <Link
              href="/docs"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ドキュメント
            </Link>
            <Link
              href="/api"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              API
            </Link>
            <Link
              href="/learn"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded",
                isLearnPage
                  ? "text-gray-900 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              学習
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ダッシュボード
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
