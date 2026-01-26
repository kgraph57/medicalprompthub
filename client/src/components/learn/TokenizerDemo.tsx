/**
 * トークナイザーデモコンポーネント
 * Cursor Learn風のトークン可視化デモ
 */

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 簡易的なトークン分割（実際のトークナイザーではない）
function simpleTokenize(text: string): string[] {
  // スペースと句読点で分割
  return text.split(/(\s+|[.,!?;:])/).filter(token => token.trim().length > 0);
}

// トークンに色を割り当てる
function getTokenColor(index: number): string {
  const colors = [
    "bg-red-200 text-red-900",
    "bg-yellow-200 text-yellow-900",
    "bg-green-200 text-green-900",
    "bg-blue-200 text-blue-900",
    "bg-purple-200 text-purple-900",
    "bg-pink-200 text-pink-900",
    "bg-primary-200 text-primary-900",
    "bg-indigo-200 text-indigo-900",
  ];
  return colors[index % colors.length];
}

interface TokenizerDemoProps {
  exampleText?: string;
}

export function TokenizerDemo({ exampleText = "Hello, world! This is a tokenizer demo." }: TokenizerDemoProps) {
  const [inputText, setInputText] = useState("");
  const [showExample, setShowExample] = useState(false);

  const tokens = useMemo(() => {
    const text = showExample ? exampleText : inputText;
    return simpleTokenize(text);
  }, [inputText, showExample, exampleText]);

  const handleClear = () => {
    setInputText("");
    setShowExample(false);
  };

  const handleShowExample = () => {
    setInputText(exampleText);
    setShowExample(true);
  };

  const characterCount = (showExample ? exampleText : inputText).length;
  const tokenCount = tokens.length;

  return (
    <div className="my-8 p-6 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">トークナイザーデモ</h3>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleClear}
            variant="outline"
            size="sm"
            className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            Clear
          </Button>
          <Button
            onClick={handleShowExample}
            variant="outline"
            size="sm"
            className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
          >
            Show example
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <Textarea
          value={showExample ? exampleText : inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setShowExample(false);
          }}
          placeholder="テキストを入力してください..."
          className="min-h-[100px] font-mono text-sm bg-neutral-900 dark:bg-neutral-950 text-neutral-100 border-neutral-700 dark:border-neutral-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-200"
        />
      </div>

      <div className="mb-4 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-4">
          <span>
            <strong className="text-neutral-900 dark:text-neutral-100">Tokens:</strong> {tokenCount}
          </span>
          <span>
            <strong className="text-neutral-900 dark:text-neutral-100">Characters:</strong> {characterCount}
          </span>
        </div>
      </div>

      <div className="p-4 bg-neutral-900 dark:bg-neutral-950 rounded-lg min-h-[80px]">
        <div className="flex flex-wrap gap-1">
          {tokens.map((token, index) => (
            <motion.span
              key={`${token}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.2 }}
              className={cn(
                "inline-block px-2 py-1 rounded text-sm font-mono",
                getTokenColor(index)
              )}
            >
              {token}
            </motion.span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        各色のブロックが1つのトークンを表しています。実際のAIモデルでは、トークンは単語や文字の組み合わせで構成されます。
      </p>
    </div>
  );
}
