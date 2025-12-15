import { Link } from "wouter";
import { motion } from "framer-motion";

const footerSections = [
  {
    title: "Features",
    links: [
      { label: "Prompts", href: "/#prompts" },
      { label: "Categories", href: "/#prompts" },
      { label: "Guides", href: "/guides" },
      { label: "Courses", href: "/courses" },
      { label: "Tips", href: "/tips" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/about" },
      { label: "Changelog", href: "/changelog" },
      { label: "Documentation", href: "/guides" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Legal", href: "/legal" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AI Literacy", href: "/ai-literacy" },
      { label: "Journal Finder", href: "/journal-finder" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
          {/* パンチライン + カラムセクション */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 md:gap-16 lg:gap-20">
            {/* パンチライン（左側） */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: 0,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="flex items-center lg:items-start lg:pt-2"
            >
              <p 
                className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[56px] font-black text-neutral-50 leading-[1.1] tracking-[-0.03em]"
                style={{
                  fontFamily: 'Inter Display, Inter, system-ui, sans-serif',
                  fontWeight: 900,
                }}
              >
                Augmenting Medicine,
                <br />
                Empowering Care.
              </p>
            </motion.div>

            {/* カラムセクション（右側） */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: (index + 1) * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <h3 className="text-sm font-bold text-neutral-50 mb-3 tracking-[-0.01em]">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-neutral-50 transition-colors duration-200 tracking-[-0.01em]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            </div>
          </div>

          {/* ブランド情報セクション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <div>
              <h2 className="text-xl font-bold text-neutral-50 mb-2 tracking-[-0.01em]">
                Helix
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                AI-powered platform that augments healthcare professionals
              </p>
            </div>
          </motion.div>
        </div>

        {/* ボトムセクション */}
        <motion.div
          className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Helix. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
