import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // 本のサンプルコード（HTMLコードのみ）を検出
  const codeContent = typeof children === 'string' ? children : String(children);
  
  // HTMLコードの検出パターン
  const htmlPattern = /(&lt;|<)(!DOCTYPE|html|head|body|script.*type.*module|meta.*charset|Single Page Apps for GitHub Pages)/i;
  const hasViteClient = /vite\/client|@vite\/client|spa-github-pages|window\.history\.replaceState|rafgraph|MIT License|Start Single Page Apps|Cache-Control|Pragma|Expires|no-cache|no-store|must-revalidate/i.test(codeContent);
  
  // HTMLタグの数をカウント
  const htmlTagCount = (codeContent.match(/(&lt;|<)\/?[a-z]+/gi) || []).length;
  
  // 医療関連のキーワードをチェック
  const medicalKeywords = [
    'プロンプト', '指示', '例', '実践', 'AI', 'ChatGPT', 'Claude', '患者', '症例', 
    'メール', 'コンサルト', '専門医', '医療', '診断', '治療', '臨床', '医師', '病院', 
    '診療', '疾患', '症状', '検査', '薬剤', '手術', '入院', '退院', '診察', '診断書',
    '紹介状', 'カルテ', 'SOAP', 'バイタル', '所見', '経過', '既往歴', '現病歴'
  ];
  const hasMedicalContent = medicalKeywords.some(keyword => codeContent.includes(keyword));
  
  // 本のサンプルコードの特徴を検出
  const isBookSampleCode = (
    htmlPattern.test(codeContent) || 
    hasViteClient || 
    (htmlTagCount >= 3 && !hasMedicalContent && codeContent.length >= 200)
  ) && 
    codeContent.length < 100000 && 
    !hasMedicalContent;
  
  // 本のサンプルコードの場合は表示しない
  if (isBookSampleCode) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent);
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
        className="absolute top-2 right-2 h-6 px-2 text-xs opacity-70 hover:opacity-100 transition-opacity"
      >
        {copied ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
