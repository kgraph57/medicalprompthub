/**
 * Cursor/Anthropic風のモバイルナビゲーション
 * Framer Motionを使用したスムーズなドロワーアニメーション
 */

import { motion, AnimatePresence } from "framer-motion";
import { X, Home, GraduationCap, School, BookOpen, MessageSquare, Lightbulb, Bookmark, HelpCircle, Mail, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/courses", icon: GraduationCap, label: "Courses" },
  { href: "/learn/start", icon: School, label: "学習" },
  { href: "/guides", icon: BookOpen, label: "Guides" },
  { href: "/category/all", icon: MessageSquare, label: "Prompts" },
  { href: "/tips", icon: Lightbulb, label: "Tips" },
  { href: "/favorites", icon: Bookmark, label: "Favorites" },
];

const bottomNavItems = [
  { href: "/faq", icon: HelpCircle, label: "FAQ" },
  { href: "/contact", icon: Mail, label: "Contact" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

function NavItem({ href, icon, label, active, onClick }: NavItemProps) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
          active
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        )}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </motion.div>
    </Link>
  );
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300
            }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-neutral-900 z-50 lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-neutral-200 dark:border-neutral-800">
              <Link href="/" onClick={onClose}>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">HELIX</span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="メニューを閉じる"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col h-[calc(100%-3.5rem)] overflow-y-auto">
              {/* Main Navigation */}
              <div className="flex-1 p-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavItem
                      href={item.href}
                      icon={<item.icon className="w-5 h-5" />}
                      label={item.label}
                      active={isActive(item.href)}
                      onClick={onClose}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-4 border-t border-neutral-200 dark:border-neutral-800" />

              {/* Bottom Navigation */}
              <div className="p-3 space-y-1">
                {bottomNavItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + index) * 0.05 }}
                  >
                    <NavItem
                      href={item.href}
                      icon={<item.icon className="w-5 h-5" />}
                      label={item.label}
                      active={isActive(item.href)}
                      onClick={onClose}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 text-center border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  © 2025 HELIX
                </p>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
