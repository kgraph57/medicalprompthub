import { Link } from "wouter";
import { motion } from "framer-motion";

const footerSections = [
  {
    title: "プロダクト",
    links: [
      { label: "プロンプト", href: "/category/all" },
      { label: "コース", href: "/courses" },
      { label: "ガイド", href: "/guides" },
      { label: "Tips", href: "/tips" },
    ],
  },
  {
    title: "リソース",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "AIリテラシー", href: "/ai-literacy" },
      { label: "変更履歴", href: "/changelog" },
    ],
  },
  {
    title: "会社情報",
    links: [
      { label: "About", href: "/about" },
      { label: "お問い合わせ", href: "/contact" },
      { label: "利用規約", href: "/legal" },
    ],
  },
];

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/helix_health", icon: "𝕏" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-neutral-950 dark:bg-neutral-950 border-t border-neutral-800"
      role="contentinfo"
      aria-label="サイトフッター"
    >
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-12 lg:gap-16">
          {/* ブランドセクション */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            {/* ロゴ */}
            <Link href="/" className="inline-block focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-4 rounded">
              <span className="text-2xl font-bold text-white tracking-tight">
                HELIX
              </span>
            </Link>

            {/* タグライン */}
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              医療従事者のためのAIプラットフォーム。
              <br />
              診療を支援し、ケアを強化します。
            </p>

            {/* ソーシャルリンク */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800/60 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2"
                  aria-label={social.label}
                >
                  <span className="text-base">{social.icon}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ナビゲーションセクション */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {footerSections.map((section, index) => (
              <motion.nav
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                aria-labelledby={`footer-nav-${section.title}`}
              >
                <h3
                  id={`footer-nav-${section.title}`}
                  className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4"
                >
                  {section.title}
                </h3>
                <ul className="space-y-3" role="list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        {/* 区切り線 */}
        <motion.div
          className="mt-12 pt-8 border-t border-neutral-800/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* コピーライト */}
            <p className="text-xs text-neutral-500">
              © {currentYear} HELIX. All rights reserved.
            </p>

            {/* 追加リンク */}
            <div className="flex items-center gap-6">
              <Link
                href="/legal#privacy"
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/legal#terms"
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-blue-400 focus-visible:outline-offset-2 rounded"
              >
                利用規約
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
