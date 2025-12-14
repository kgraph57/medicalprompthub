import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  category?: string;
  title: string;
  description?: string;
}

// Linear.app風：ページヘッダーコンポーネント
export function PageHeader({ category, title, description }: PageHeaderProps) {
  return (
    <motion.div
      className="mb-12 md:mb-16 lg:mb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {category && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            {category}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/60" />
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
        {title}
      </h1>
      
      {description && (
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
