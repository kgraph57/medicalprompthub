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
    <div className="my-8 p-6 border border-gray-200 rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        {question.question}
      </h3>
      
      <RadioGroup
        value={selectedAnswer}
        onValueChange={setSelectedAnswer}
        disabled={isChecked}
        className="space-y-3 mb-6"
      >
        {question.options.map((option, index) => {
          const optionLabel = optionLabels[index];
          const isSelected = selectedAnswer === optionLabel;
          const isCorrectOption = optionLabel === question.correctAnswer;
          
          return (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-3 rounded-md border transition-colors",
                isChecked && isCorrectOption && "bg-green-50 border-green-200",
                isChecked && isSelected && !isCorrect && "bg-red-50 border-red-200",
                !isChecked && isSelected && "bg-gray-50 border-gray-300",
                !isChecked && "border-gray-200 hover:bg-gray-50"
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
                  "flex-1 cursor-pointer",
                  isChecked && isCorrectOption && "text-green-700",
                  isChecked && isSelected && !isCorrect && "text-red-700"
                )}
              >
                <span className="font-medium mr-2">{optionLabel})</span>
                {option}
              </Label>
              {isChecked && isSelected && (
                <div className="flex-shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              )}
              {isChecked && isCorrectOption && !isSelected && (
                <div className="flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
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
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Check
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-gray-300"
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
            className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200"
          >
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong className="text-gray-900">解説:</strong> {question.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
