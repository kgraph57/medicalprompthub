import { Stethoscope, GraduationCap, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Stethoscope,
    title: "Purpose-built for medical AI",
    description: "Designed specifically for healthcare professionals. Streamline diagnosis, research, and patient care workflows.",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    leftContent: {
      title: "Expert Prompt Library",
      items: [
        "100+ curated medical prompts",
        "Tested in real clinical settings",
        "Regularly updated by professionals"
      ]
    },
    rightContent: {
      title: "Smart Categorization",
      items: [
        "Organized by medical specialty",
        "Easy search and filtering",
        "Tag-based navigation"
      ]
    }
  },
  {
    icon: GraduationCap,
    title: "Designed to move fast",
    description: "Optimized for speed and efficiency. Create medical documents, analyze data, and learn AI skills in seconds.",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    leftContent: {
      title: "Instant Access",
      items: [
        "Copy-paste ready templates",
        "No setup required",
        "Works with any AI model"
      ]
    },
    rightContent: {
      title: "Learning Paths",
      items: [
        "Structured courses",
        "Step-by-step guides",
        "Practical tips"
      ]
    }
  },
  {
    icon: Zap,
    title: "Crafted to perfection",
    description: "100+ expert prompts curated by medical professionals. Every template is tested and refined for real-world use.",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    leftContent: {
      title: "Quality Assurance",
      items: [
        "Reviewed by medical experts",
        "Real-world tested",
        "Continuously improved"
      ]
    },
    rightContent: {
      title: "Community Driven",
      items: [
        "Feedback from professionals",
        "Regular updates",
        "Best practices shared"
      ]
    }
  },
];

export function FeatureOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-8 md:py-12 lg:py-16 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Linear風：カルーセルコンテナ */}
        <div 
          ref={containerRef}
          className="relative"
        >
          {/* スクロール可能なコンテナ */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
            <div className="flex gap-6 md:gap-8 lg:gap-12 min-w-max">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[500px] xl:w-[600px]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-200/50 dark:border-neutral-700/50 hover:border-neutral-300/70 dark:hover:border-neutral-600/70 transition-all duration-300 h-full">
                      {/* カテゴリ/ラベル（Linear.app風） */}
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`w-4 h-4 ${feature.iconColor}`} strokeWidth={2} />
                        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 tracking-[-0.01em]">
                          Features
                        </span>
                      </div>
                      
                      {/* パンチライン（大きなタイトル） */}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 text-neutral-900 dark:text-neutral-50 tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: 'Inter Display, Inter, system-ui, sans-serif' }}>
                        {feature.title}
                      </h3>
                      
                      {/* 説明文 */}
                      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed tracking-[-0.01em] mb-4">
                        {feature.description}
                      </p>
                      
                      {/* CTAボタン（Linear.app風） */}
                      <a
                        href="#prompts"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200 group"
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
