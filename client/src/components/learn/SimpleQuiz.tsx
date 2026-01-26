/**
 * Cursor Learn風のシンプルなクイズコンポーネント
 * 単一質問のクイズで、Check/Resetボタンを持つ
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface SimpleQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string; // 正解の選択肢（例: "a", "b", "c", "d"）
  explanation?: string;
}

interface SimpleQuizProps {
  question: SimpleQuizQuestion;
}

export function SimpleQuiz({ question }: SimpleQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleCheck = () => {
    if (selectedAnswer) {
      setIsChecked(true);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setIsChecked(false);
    setShowExplanation(false);
  };

  const optionLabels = ["a", "b", "c", "d", "e", "f"];

  return (
    <div 
      className="my-6 rounded-sm border p-4 border-border bg-card"
      role="group"
      aria-labelledby={`quiz-${question.question.slice(0, 10)}-label`}
    >
      <h3 
        id={`quiz-${question.question.slice(0, 10)}-label`}
        className="text-base font-medium mb-4 text-foreground"
      >
        {question.question}
      </h3>
      
      <RadioGroup
        value={selectedAnswer}
        onValueChange={setSelectedAnswer}
        disabled={isChecked}
        className="space-y-2 mb-4"
      >
        {question.options.map((option, index) => {
          const optionLabel = optionLabels[index];
          const isSelected = selectedAnswer === optionLabel;
          const isCorrectOption = optionLabel === question.correctAnswer;
          
          return (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 transition-colors",
                isChecked && isCorrectOption && "text-green-700 dark:text-green-400",
                isChecked && isSelected && !isCorrect && "text-red-700 dark:text-red-400"
              )}
            >
              <RadioGroupItem
                value={optionLabel}
                id={`option-${index}`}
                className="mt-0.5"
              />
              <Label
                htmlFor={`option-${index}`}
                className={cn(
                  "flex-1 cursor-pointer text-foreground",
                  isChecked && isCorrectOption && "text-green-700 dark:text-green-400",
                  isChecked && isSelected && !isCorrect && "text-red-700 dark:text-red-400"
                )}
              >
                {option}
              </Label>
              {isChecked && isSelected && (
                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
              )}
              {isChecked && isCorrectOption && !isSelected && (
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              )}
            </div>
          );
        })}
      </RadioGroup>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleCheck}
          disabled={!selectedAnswer || isChecked}
          variant="default"
          size="sm"
        >
          Check
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
        >
          Reset
        </Button>
      </div>

      <AnimatePresence>
        {showExplanation && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 rounded-sm bg-muted/50 border border-border"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">解説:</strong> {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
