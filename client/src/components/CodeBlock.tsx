import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const code = typeof children === 'string' ? children : String(children);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className={className}>
        <code>{children}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            コピー完了
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-1" />
            コピー
          </>
        )}
      </Button>
    </div>
  );
}
