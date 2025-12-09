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
      <div className="border-l-4 border-red-500 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg overflow-hidden">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-red-900 dark:text-red-400">
              重要な注意事項
            </span>
          </div>
          <ChevronDown 
            className={`w-5 h-5 text-red-600 dark:text-red-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
          <div className="px-4 pb-4 pt-2">
            <p className="text-sm text-red-900 dark:text-red-400 leading-relaxed">
              {message}
            </p>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
