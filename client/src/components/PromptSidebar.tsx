import { ReactNode } from "react";

interface PromptSidebarProps {
  children: ReactNode;
}

export function PromptSidebar({ children }: PromptSidebarProps) {
  return (
    <aside className="hidden xl:block w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6 space-y-6 overflow-y-auto h-screen sticky top-0">
      {children}
    </aside>
  );
}
