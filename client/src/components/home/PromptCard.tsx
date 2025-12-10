import { AlertTriangle, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { memo } from "react";

interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  riskLevel?: 'high' | 'medium' | 'low';
}

interface PromptCardProps {
  prompt: Prompt;
}

export const PromptCard = memo(function PromptCard({ prompt }: PromptCardProps) {
  const [, setLocation] = useLocation();

  // リスクレベルに応じた左ボーダーの色
  const getBorderColor = () => {
    if (prompt.riskLevel === 'high') return 'border-l-red-500';
    if (prompt.riskLevel === 'medium') return 'border-l-yellow-500';
    return 'border-l-blue-500';
  };

  return (
    <button
      onClick={() => setLocation(`/prompts/${prompt.id}`)}
      className={`
        group relative p-1 bg-white dark:bg-gray-900 rounded 
        border-l-[1.5px] ${getBorderColor()}
        border border-gray-200 dark:border-gray-800
        shadow-sm hover:shadow-md
        transition-all duration-150 ease-out
        text-left
        hover:scale-[1.005]
        hover:border-gray-300 dark:hover:border-gray-700
      `}
    >
      {/* カテゴリとリスクレベル */}
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex items-center gap-2">
          <span className="px-1 py-0 text-[7px] font-medium rounded bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400">
            {prompt.category}
          </span>
          {prompt.riskLevel === 'high' && (
            <span className="inline-flex items-center px-1 py-0 rounded text-[7px] font-medium bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400">
              <AlertTriangle className="w-2 h-2 mr-0.5" />
              高リスク
            </span>
          )}
          {prompt.riskLevel === 'medium' && (
            <span className="inline-flex items-center px-1 py-0 rounded text-[7px] font-medium bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400">
              中リスク
            </span>
          )}
        </div>
        <ArrowRight className="w-3 h-3 transition-transform duration-150 text-gray-400 group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
      </div>
      
      {/* タイトル */}
      <h3 className="text-[11px] font-semibold mb-0 transition-colors duration-150 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
        {prompt.title}
      </h3>
      
      {/* 説明 - 2行表示 */}
      <p className="text-[10px] leading-tight line-clamp-1 text-gray-600 dark:text-gray-400">
        {prompt.description}
      </p>
    </button>
  );
});
