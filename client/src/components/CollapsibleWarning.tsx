import { AlertTriangle, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface CollapsibleWarningProps {
  message: string;
  defaultOpen?: boolean;
}

export function CollapsibleWarning({ message, defaultOpen = false }: CollapsibleWarningProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-l-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 rounded-md overflow-hidden opacity-70 hover:opacity-100 transition-opacity duration-200">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors duration-200">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
              重要な注意事項
            </span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="px-3 pb-3 pt-1.5">
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {message}
            </p>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
