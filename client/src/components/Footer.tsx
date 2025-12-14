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
    <footer className="relative border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-50 mb-3 tracking-[-0.01em]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200 tracking-[-0.01em]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ボトムセクション */}
        <motion.div
          className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              <p className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                Medical Prompt Hub
              </p>
              <p>Extend your medical expertise. Transform patient care.</p>
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-500">
              © {new Date().getFullYear()} Medical Prompt Hub. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
