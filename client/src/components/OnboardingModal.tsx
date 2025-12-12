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

const ONBOARDING_KEY = "onboarding_completed";
const ONBOARDING_VERSION = "1.0";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Medical Prompt Hubへようこそ",
    description: "医療従事者のためのAIプロンプトライブラリです。100以上の専門プロンプトで、臨床業務、研究、教育を効率化できます。",
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
  },
  {
    id: "search",
    title: "プロンプトを検索",
    description: "検索バーから目的のプロンプトを素早く見つけられます。例：「診断」「紹介状」「研究」など。",
    icon: <Activity className="w-8 h-8 text-primary" />,
  },
  {
    id: "recommended",
    title: "おすすめプロンプトから始める",
    description: "ホームページには、よく使われる人気のプロンプトが表示されます。まずはここから試してみましょう。",
    icon: <ClipboardList className="w-8 h-8 text-primary" />,
  },
  {
    id: "guides",
    title: "ワークフローガイドを活用",
    description: "症例報告や統計解析など、複雑なタスクをステップバイステップで学べるガイドを提供しています。",
    icon: <GraduationCap className="w-8 h-8 text-primary" />,
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-2xl">{step.title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              aria-label="スキップ"
              className="h-7 w-7"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
          <DialogDescription className="text-base">
            {step.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* アイコン */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              {step.icon}
            </div>
          </div>

          {/* プログレスバー */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>ステップ {currentStep + 1} / {onboardingSteps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* ステップインジケーター */}
          <div className="flex justify-center gap-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            前へ
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleSkip}
            >
              スキップ
            </Button>
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              {currentStep === onboardingSteps.length - 1 ? "完了" : "次へ"}
              {currentStep < onboardingSteps.length - 1 && (
                <ArrowRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
