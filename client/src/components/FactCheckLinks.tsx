import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FactCheckLinksProps {
  promptCategory: string;
  promptId: string;
}

export function FactCheckLinks({ promptCategory, promptId }: FactCheckLinksProps) {
  // 高リスクカテゴリのみ表示
  const showFactCheck = ['diagnosis', 'treatment', 'medication'].includes(promptCategory);

  if (!showFactCheck) {
    return null;
  }

  const openPubMed = () => {
    window.open('https://pubmed.ncbi.nlm.nih.gov/', '_blank', 'noopener,noreferrer');
  };

  const openUpToDate = () => {
    window.open('https://www.uptodate.com/', '_blank', 'noopener,noreferrer');
  };

  const openIchushi = () => {
    window.open('https://www.jamas.or.jp/', '_blank', 'noopener,noreferrer');
  };

  const openGuidelines = () => {
    window.open('https://minds.jcqhc.or.jp/', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-green-900 dark:text-green-400 flex items-center gap-2">
          <Search className="w-4 h-4" />
          ファクトチェック支援ツール
        </CardTitle>
        <p className="text-xs text-green-800 dark:text-green-300 mt-1">
          AIの出力を検証するために、以下の信頼できる情報源を活用してください。
        </p>
      </CardHeader>

      <CardContent className="space-y-2 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={openPubMed}
            className="justify-start h-auto py-2 px-3 border-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <div className="flex items-start gap-2 w-full">
              <BookOpen className="w-4 h-4 text-green-700 dark:text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="text-xs font-semibold text-green-900 dark:text-green-400">PubMed</div>
                <div className="text-xs text-green-700 dark:text-green-500">原著論文検索</div>
              </div>
              <ExternalLink className="w-3 h-3 text-green-600 dark:text-green-500 flex-shrink-0" />
            </div>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={openUpToDate}
            className="justify-start h-auto py-2 px-3 border-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <div className="flex items-start gap-2 w-full">
              <FileText className="w-4 h-4 text-green-700 dark:text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="text-xs font-semibold text-green-900 dark:text-green-400">UpToDate</div>
                <div className="text-xs text-green-700 dark:text-green-500">臨床ガイドライン</div>
              </div>
              <ExternalLink className="w-3 h-3 text-green-600 dark:text-green-500 flex-shrink-0" />
            </div>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={openIchushi}
            className="justify-start h-auto py-2 px-3 border-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <div className="flex items-start gap-2 w-full">
              <BookOpen className="w-4 h-4 text-green-700 dark:text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="text-xs font-semibold text-green-900 dark:text-green-400">医中誌Web</div>
                <div className="text-xs text-green-700 dark:text-green-500">日本の医学文献</div>
              </div>
              <ExternalLink className="w-3 h-3 text-green-600 dark:text-green-500 flex-shrink-0" />
            </div>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={openGuidelines}
            className="justify-start h-auto py-2 px-3 border-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <div className="flex items-start gap-2 w-full">
              <FileText className="w-4 h-4 text-green-700 dark:text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-left flex-1">
                <div className="text-xs font-semibold text-green-900 dark:text-green-400">Minds</div>
                <div className="text-xs text-green-700 dark:text-green-500">診療ガイドライン</div>
              </div>
              <ExternalLink className="w-3 h-3 text-green-600 dark:text-green-500 flex-shrink-0" />
            </div>
          </Button>
        </div>

        <div className="text-xs text-green-700 dark:text-green-500 mt-3 p-2 bg-green-100 dark:bg-green-900/20 rounded">
          <strong>💡 Tip:</strong> AIが提示した情報（薬剤名、疾患名、治療法など）をこれらのサイトで検索し、最新のエビデンスと照合してください。
        </div>
      </CardContent>
    </Card>
  );
}
