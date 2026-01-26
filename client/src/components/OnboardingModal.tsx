/**
 * オンボーディングモーダル
 * 新規ユーザー向けのチュートリアル
 */

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, X, Search, ClipboardList, GraduationCap, Stethoscope, Activity } from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const ONBOARDING_KEY = "onboarding_completed";
const ONBOARDING_VERSION = "1.0";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

// Linear風: アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "HELIXへようこそ",
    description: "医療従事者のためのAIプロンプトライブラリです。100以上の専門プロンプトで、臨床業務、研究、教育を効率化できます。",
    icon: <Stethoscope className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: "search",
    title: "プロンプトを検索",
    description: "検索バーから目的のプロンプトを素早く見つけられます。例：「診断」「紹介状」「研究」など。",
    icon: <Activity className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: "recommended",
    title: "おすすめプロンプトから始める",
    description: "ホームページには、よく使われる人気のプロンプトが表示されます。まずはここから試してみましょう。",
    icon: <ClipboardList className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
  },
  {
    id: "guides",
    title: "ワークフローガイドを活用",
    description: "症例報告や統計解析など、複雑なタスクをステップバイステップで学べるガイドを提供しています。",
    icon: <GraduationCap className="w-10 h-10 md:w-12 md:h-12 text-blue-600 dark:text-blue-400" />,
  },
];

export function OnboardingModal() {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // オンボーディングが完了しているか確認
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed || completed !== ONBOARDING_VERSION) {
      // 初回訪問から少し遅延して表示（UX向上）
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, ONBOARDING_VERSION);
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-neutral-950 border-0 shadow-[0_20px_64px_rgba(0,0,0,0.15)]"
        showCloseButton={false}
      >
        {/* Linear風: 控えめな背景装飾 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/3 via-blue-600/3 to-cyan-500/3 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div 
          className="relative z-10 p-8 md:p-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={currentStep}
        >
          <DialogHeader className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`title-${currentStep}`}
                  variants={titleVariants} 
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  <DialogTitle 
                    className="text-3xl md:text-4xl font-black mb-4 leading-none tracking-[-0.02em] text-neutral-900 dark:text-neutral-50"
                    style={{ 
                      fontFamily: 'Inter Display, Inter, system-ui, sans-serif',
                    }}
                  >
                    {step.title}
                  </DialogTitle>
                  <DialogDescription 
                    className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    {step.description}
                  </DialogDescription>
                </motion.div>
              </AnimatePresence>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                aria-label="スキップ"
                className="h-8 w-8 ml-4 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <motion.div 
            className="space-y-8 py-4"
            variants={itemVariants}
          >
            {/* アイコン */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`icon-${currentStep}`}
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <motion.div 
                  className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-blue-500/10 via-blue-600/10 to-cyan-500/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/20"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  {step.icon}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* プログレスバー */}
            <motion.div 
              className="space-y-3"
              variants={itemVariants}
            >
              <div className="flex justify-between text-sm font-medium text-neutral-600 dark:text-neutral-400">
                <span>ステップ {currentStep + 1} / {onboardingSteps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="relative h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                />
              </div>
            </motion.div>

            {/* ステップインジケーター */}
            <motion.div 
              className="flex justify-center gap-2"
              variants={itemVariants}
            >
              {onboardingSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    index === currentStep
                      ? "bg-blue-600 dark:bg-blue-400"
                      : index < currentStep
                      ? "bg-blue-400/50 dark:bg-blue-500/50"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ 
                    scale: index === currentStep ? 1.2 : 1,
                    opacity: index === currentStep ? 1 : index < currentStep ? 0.7 : 0.4
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex justify-between items-center pt-6 mt-6 border-t border-neutral-200 dark:border-neutral-800"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-2.5 text-[15px] font-medium border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                前へ
              </Button>
            </motion.div>
            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="px-6 py-2.5 text-[15px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  スキップ
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleNext}
                  className="px-6 py-2.5 text-[15px] font-medium text-white bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                >
                  {currentStep === onboardingSteps.length - 1 ? "完了" : "次へ"}
                  {currentStep < onboardingSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
