// 統一されたMarkdownスタイル定義
// すべてのMarkdownコンテンツで使用する共通のproseクラス

export const UNIFIED_PROSE_CLASSES = `
prose 
prose-slate 
dark:prose-invert 
max-w-none 
prose-headings:font-bold 
prose-headings:tracking-tight 
prose-h1:text-3xl 
prose-h1:mb-6 
prose-h2:text-2xl 
prose-h2:mt-10 
prose-h2:mb-4 
prose-h3:text-xl 
prose-h3:mt-8 
prose-h3:mb-3 
prose-h4:text-lg 
prose-h4:mt-6 
prose-h4:mb-2 
prose-p:text-base 
prose-p:leading-relaxed 
prose-p:my-4 
prose-li:my-2 
prose-li:leading-relaxed 
prose-ul:my-6 
prose-ol:my-6 
prose-strong:font-semibold 
prose-strong:text-slate-900 
dark:prose-strong:text-slate-100 
prose-blockquote:border-l-4 
prose-blockquote:border-primary 
prose-blockquote:bg-slate-50 
dark:prose-blockquote:bg-slate-800/50 
prose-blockquote:py-2 
prose-blockquote:px-4 
prose-blockquote:my-6 
prose-blockquote:not-italic
prose-table:border-collapse 
prose-table:w-full 
prose-th:border 
prose-th:border-slate-300 
prose-th:bg-slate-50 
prose-th:p-3 
prose-th:text-left 
prose-td:border 
prose-td:border-slate-300 
prose-td:p-3 
dark:prose-th:border-slate-700 
dark:prose-th:bg-slate-800 
dark:prose-td:border-slate-700
prose-code:text-primary
prose-code:bg-primary/10
prose-code:px-2
prose-code:py-1
prose-code:rounded-md
prose-code:font-mono
prose-code:text-sm
prose-code:before:content-none
prose-code:after:content-none
prose-pre:bg-slate-50
dark:prose-pre:bg-slate-900
prose-pre:border
prose-pre:border-slate-200
dark:prose-pre:border-slate-700
prose-pre:rounded-lg
prose-pre:my-6
break-words 
overflow-wrap-anywhere
`.trim().replace(/\s+/g, ' ');

// ReactMarkdownのカスタムコンポーネント
export const UNIFIED_MARKDOWN_COMPONENTS = {
  code: ({node, inline, className, children, ...props}: any) => {
    if (inline) {
      return (
        <code 
          className="px-2 py-1 rounded-md bg-primary/10 text-primary font-mono text-sm before:content-none after:content-none" 
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <code className="block p-5 bg-slate-50 dark:bg-slate-900 text-sm font-mono leading-relaxed" {...props}>
          {children}
        </code>
      </div>
    );
  },
  pre: ({node, children, ...props}: any) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 dark:border-slate-700">
      <pre className="p-5 bg-slate-50 dark:bg-slate-900 leading-relaxed" {...props}>
        {children}
      </pre>
    </div>
  ),
  ul: ({node, children, ...props}: any) => (
    <ul className="space-y-2 my-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({node, children, ...props}: any) => (
    <ol className="space-y-2 my-6" {...props}>
      {children}
    </ol>
  ),
  li: ({node, children, ...props}: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  table: ({node, children, ...props}: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({node, children, ...props}: any) => (
    <th className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({node, children, ...props}: any) => (
    <td className="border border-slate-300 dark:border-slate-700 p-3" {...props}>
      {children}
    </td>
  ),
  blockquote: ({node, children, ...props}: any) => (
    <blockquote className="border-l-4 border-primary bg-slate-50 dark:bg-slate-800/50 py-2 px-4 my-6 not-italic" {...props}>
      {children}
    </blockquote>
  ),
  h1: ({node, children, ...props}: any) => (
    <h1 className="text-3xl font-bold mb-6 tracking-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({node, children, ...props}: any) => (
    <h2 className="text-2xl font-bold mt-10 mb-4 tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({node, children, ...props}: any) => (
    <h3 className="text-xl font-bold mt-8 mb-3 tracking-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({node, children, ...props}: any) => (
    <h4 className="text-lg font-bold mt-6 mb-2 tracking-tight" {...props}>
      {children}
    </h4>
  ),
  p: ({node, children, ...props}: any) => (
    <p className="text-base leading-relaxed my-4" {...props}>
      {children}
    </p>
  ),
  strong: ({node, children, ...props}: any) => (
    <strong className="font-semibold text-slate-900 dark:text-slate-100" {...props}>
      {children}
    </strong>
  )
};
