import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.05 && latest < 0.95);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-neutral-200/20 dark:bg-neutral-800/20 z-50 origin-left"
      style={{ scaleX }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"
        style={{ scaleX }}
      />
      {/* グロー効果 */}
      <motion.div
        className="absolute inset-0 h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 blur-sm opacity-50"
        style={{ scaleX }}
      />
    </motion.div>
  );
}
