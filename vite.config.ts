import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig, Plugin } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';


// Escape HTML attribute values to prevent XSS
function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Plugin to conditionally include analytics script
const analyticsPlugin = (): Plugin => {
  return {
    name: "analytics-plugin",
    transformIndexHtml(html) {
      const analyticsEndpoint = process.env.VITE_ANALYTICS_ENDPOINT;
      const analyticsWebsiteId = process.env.VITE_ANALYTICS_WEBSITE_ID;
      
      // Replace the placeholder with analytics script or empty string
      const analyticsScript = (analyticsEndpoint && analyticsWebsiteId)
        ? `<script defer src="${escapeHtmlAttribute(analyticsEndpoint)}/umami" data-website-id="${escapeHtmlAttribute(analyticsWebsiteId)}"></script>`
        : "";
      
      return html.replace("%VITE_ANALYTICS_SCRIPT%", analyticsScript);
    },
  };
};

const plugins = [
  react(),
  tailwindcss(),
  jsxLocPlugin(),
  // Only enable Manus runtime in development
  ...(process.env.NODE_ENV !== 'production' ? [vitePluginManusRuntime()] : []),
  analyticsPlugin(),

  // Gzip compression (production only)
  ...(process.env.NODE_ENV === 'production' ? [
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    // Brotli compression (production only)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ] : []),

  // Bundle visualizer (development only)
  ...(process.env.NODE_ENV !== 'production' ? [
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'stats.html',
    }),
  ] : []),

  // PWA設定（本番環境でも有効化、ただし慎重に）
  ...(process.env.NODE_ENV === 'production' ? [VitePWA({
    registerType: "autoUpdate",
    base: process.env.VITE_BASE_PATH || "/medicalprompthub/",
    scope: process.env.VITE_BASE_PATH || "/medicalprompthub/",
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30日
            },
          },
        },
      ],
    },
    manifest: {
      name: "Medical Prompt Hub",
      short_name: "MedPrompt",
      description: "AI Prompt Library for Healthcare Professionals",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      start_url: (process.env.VITE_BASE_PATH || "/medicalprompthub/") + "index.html",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
  })] : []),
];

export default defineConfig({
  // GitHub Pages用のベースパス（環境変数から取得、デフォルトは/medicalprompthub/）
  // 開発環境では base を / に設定して動的インポートの問題を回避
  base: process.env.NODE_ENV === 'production' 
    ? (process.env.VITE_BASE_PATH || '/medicalprompthub/')
    : '/',
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./client/src/test/setup.ts"],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
    exclude: ["@sentry/react"],
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Copy 404.html for GitHub Pages SPA routing
    copyPublicDir: true,
    publicDir: path.resolve(import.meta.dirname, "client", "public"),
    // Source maps disabled in production for performance
    sourcemap: false,
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-v15.js`,
        chunkFileNames: `assets/[name]-[hash]-v15.js`,
        assetFileNames: (assetInfo) => {
          // 画像の最適化（WebP形式への変換はビルド時に実施）
          if (assetInfo.name && /\.(png|jpg|jpeg)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash]-v15.[ext]`;
          }
          return `assets/[name]-[hash]-v15.[ext]`;
        },
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Router
          if (id.includes('node_modules/wouter')) {
            return 'router-vendor';
          }
          // UI libraries
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lucide-react')) {
            return 'ui-vendor';
          }
          // Charts
          if (id.includes('node_modules/recharts')) {
            return 'charts-vendor';
          }
          // Markdown
          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark') || id.includes('node_modules/rehype')) {
            return 'markdown-vendor';
          }
          // Radix UI components (large library, split separately)
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix-vendor';
          }
          // Large data files (prompts-full, tips) - split into separate chunks
          if (id.includes('prompts-full')) {
            return 'prompts-data';
          }
          if (id.includes('tips.ts') && !id.includes('tips-loader')) {
            return 'tips-data';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    // エラーオーバーレイを無効化
    overlay: false,
  },
});
