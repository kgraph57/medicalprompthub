import { useState, useEffect } from "react";

const SIDEBAR_STATE_KEY = "sidebar-collapsed";

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // 初期状態をlocalStorageから取得
    const stored = localStorage.getItem(SIDEBAR_STATE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    // 状態が変更されたらlocalStorageに保存
    localStorage.setItem(SIDEBAR_STATE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  const toggle = () => setIsCollapsed((prev) => !prev);

  return { isCollapsed, setIsCollapsed, toggle };
}
