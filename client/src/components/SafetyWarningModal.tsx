import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

const STORAGE_KEY = "medical-prompt-hub-safety-acknowledged";

export function SafetyWarningModal() {
  const [open, setOpen] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    // 初回訪問かどうかをチェック
    const hasAcknowledged = localStorage.getItem(STORAGE_KEY);
    if (!hasAcknowledged) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (acknowledged) {
      localStorage.setItem(STORAGE_KEY, "true");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            医療安全に関する重要なお知らせ
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Helixをご利用いただく前に、以下の重要事項を必ずお読みください。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 lg:py-2.5">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 dark:text-red-400 mb-2">
              ⚠️ このサービスは医療アドバイスを提供するものではありません
            </h3>
            <p className="text-sm text-red-800 dark:text-red-300">
              本サービスで生成されたコンテンツや情報は、参考情報としてのみ利用してください。実際の診療、診断、治療方針の決定においては、必ず医師や専門家の判断を優先し、各医療機関のガイドラインに従ってください。
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">AIのハルシネーション（誤情報生成）について</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI（ChatGPT、Claude、Gemini等）は、学習データに基づいて「それらしい」回答を生成しますが、実際には誤った情報や存在しない引用文献を「自信満々に」提示することがあります。
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>薬剤投与量や治療プロトコルが古いまたは誤っている</li>
              <li>引用文献が実在しない、または内容が歪められている</li>
              <li>最新のガイドラインや研究結果が反映されていない</li>
              <li>稀な疾患や非典型的な症例に関する情報が不正確</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">ファクトチェックの義務</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ユーザーは、AIの出力内容を以下の信頼できる情報源で必ず確認する責任があります：
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>最新の臨床ガイドライン（各学会公式、UpToDate等）</li>
              <li>薬剤添付文書および医薬品インタビューフォーム</li>
              <li>原著論文（PubMed、医中誌等で検索）</li>
              <li>信頼できる医療データベース</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-400 mb-2">
              高リスクプロンプトについて
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              診断支援、治療計画、薬剤関連のプロンプトには「高リスク」バッジが表示されます。これらのプロンプトを使用する際は、特に慎重にファクトチェックを行い、必ず臨床判断と組み合わせて使用してください。
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-2 mr-auto">
            <Checkbox
              id="acknowledge"
              checked={acknowledged}
              onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
            />
            <label
              htmlFor="acknowledge"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              上記の内容を理解し、同意します
            </label>
          </div>
          <Button
            onClick={handleAccept}
            disabled={!acknowledged}
            className="w-full sm:w-auto"
          >
            同意して利用を開始する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
