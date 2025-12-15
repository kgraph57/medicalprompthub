import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupGlobalErrorHandlers } from "./lib/errorTracking";
import { initSentry } from "./lib/sentry";
import { enhanceFocusStyles } from "./lib/accessibility";

// Sentryを初期化（非同期、エラーが発生しても続行）
initSentry().catch((error) => {
  console.warn("Sentry initialization failed:", error);
});

// グローバルエラーハンドラーを設定
setupGlobalErrorHandlers();

// アクセシビリティの改善
enhanceFocusStyles();
// スキップリンクはLayout.tsxで定義されているため、ここでは追加しない

// Google Analytics 4はCookie同意後に初期化される（CookieConsentBannerで処理）

// Error handling for root element
console.log("[Helix] Initializing application...");
const rootElement = document.getElementById("root");
console.log("[Helix] Root element found:", rootElement);
if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a <div id='root'></div> in your HTML.");
}

try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Application Error</h1>
      <p>Failed to initialize the application.</p>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow: auto;">${error instanceof Error ? error.stack : String(error)}</pre>
      <button onclick="window.location.reload()" style="margin-top: 10px; padding: 8px 16px; cursor: pointer;">Reload Page</button>
    </div>
  `;
}
