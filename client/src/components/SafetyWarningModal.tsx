import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { AlertTriangle, Shield, FileCheck, AlertCircle } from "lucide-react";

const STORAGE_KEY = "medical-prompt-hub-safety-acknowledged";

// Vercel/Linear風：アニメーション設定
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

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
      <DialogContent 
        className="max-w-lg max-h-[75vh] overflow-hidden p-0 bg-white dark:bg-neutral-950 border-0 shadow-[0_20px_64px_rgba(0,0,0,0.15)]"
        showCloseButton={false}
      >
        {/* Vercel/Linear風：アニメーションする背景グラデーション */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-red-500/5 via-orange-500/5 to-yellow-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-indigo-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <motion.div 
          className="relative z-10 p-5 md:p-6 overflow-y-auto max-h-[75vh]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <DialogHeader className="mb-4">
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-900/30">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <DialogTitle 
                className="text-xl md:text-2xl font-black leading-tight tracking-[-0.02em] text-neutral-900 dark:text-neutral-50"
                style={{ 
                  fontFamily: 'Inter Display, Inter, system-ui, sans-serif',
                }}
              >
                医療安全に関する重要なお知らせ
              </DialogTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <DialogDescription className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                HELIXをご利用いただく前に、以下の重要事項を必ずお読みください。
              </DialogDescription>
            </motion.div>
          </DialogHeader>

        <motion.div className="space-y-4" variants={containerVariants}>
          {/* 警告カード */}
          <motion.div 
            variants={itemVariants}
            className="relative rounded-xl bg-gradient-to-br from-red-50/80 to-orange-50/50 dark:from-red-950/30 dark:to-orange-950/20 border border-red-200/50 dark:border-red-900/30 p-4 md:p-5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm md:text-base text-red-900 dark:text-red-300 mb-1.5 tracking-[-0.01em]">
                  このサービスは医療アドバイスを提供するものではありません
                </h3>
                <p className="text-xs md:text-sm text-red-800/90 dark:text-red-300/90 leading-snug">
                  本サービスで生成されたコンテンツや情報は、参考情報としてのみ利用してください。実際の診療、診断、治療方針の決定においては、必ず医師や専門家の判断を優先し、各医療機関のガイドラインに従ってください。
                </p>
              </div>
            </div>
          </motion.div>

          {/* AIのハルシネーション */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <h3 className="font-bold text-sm md:text-base text-neutral-900 dark:text-neutral-50 tracking-[-0.01em]">
                AIのハルシネーション（誤情報生成）について
              </h3>
            </div>
            <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-snug pl-6">
              AI（ChatGPT、Claude、Gemini等）は、学習データに基づいて「それらしい」回答を生成しますが、実際には誤った情報や存在しない引用文献を「自信満々に」提示することがあります。
            </p>
            <ul className="list-none pl-6 space-y-1.5">
              {[
                "薬剤投与量や治療プロトコルが古いまたは誤っている",
                "引用文献が実在しない、または内容が歪められている",
                "最新のガイドラインや研究結果が反映されていない",
                "稀な疾患や非典型的な症例に関する情報が不正確",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 mt-1.5 flex-shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ファクトチェック */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
              <h3 className="font-bold text-sm md:text-base text-neutral-900 dark:text-neutral-50 tracking-[-0.01em]">
                ファクトチェックの義務
              </h3>
            </div>
            <p className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 leading-snug pl-6">
              ユーザーは、AIの出力内容を以下の信頼できる情報源で必ず確認する責任があります：
            </p>
            <ul className="list-none pl-6 space-y-1.5">
              {[
                "最新の臨床ガイドライン（各学会公式、UpToDate等）",
                "薬剤添付文書および医薬品インタビューフォーム",
                "原著論文（PubMed、医中誌等で検索）",
                "信頼できる医療データベース",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 mt-1.5 flex-shrink-0" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 高リスクプロンプト */}
          <motion.div 
            variants={itemVariants}
            className="relative rounded-xl bg-gradient-to-br from-yellow-50/80 to-amber-50/50 dark:from-yellow-950/30 dark:to-amber-950/20 border border-yellow-200/50 dark:border-yellow-900/30 p-4 md:p-5 backdrop-blur-sm"
          >
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 mt-0.5">
                <Shield className="w-4 h-4 text-yellow-700 dark:text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm md:text-base text-yellow-900 dark:text-yellow-300 mb-1.5 tracking-[-0.01em]">
                  高リスクプロンプトについて
                </h3>
                <p className="text-xs md:text-sm text-yellow-800/90 dark:text-yellow-300/90 leading-snug">
                  診断支援、治療計画、薬剤関連のプロンプトには「高リスク」バッジが表示されます。これらのプロンプトを使用する際は、特に慎重にファクトチェックを行い、必ず臨床判断と組み合わせて使用してください。
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DialogFooter className="flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
            <div className="flex items-center space-x-3 mr-auto">
              <Checkbox
                id="acknowledge"
                checked={acknowledged}
                onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
                className="border-neutral-300 dark:border-neutral-700"
              />
              <label
                htmlFor="acknowledge"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed cursor-pointer select-none"
              >
                上記の内容を理解し、同意します
              </label>
            </div>
            <Button
              onClick={handleAccept}
              disabled={!acknowledged}
              className="w-full sm:w-auto bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium tracking-[-0.01em] px-6 py-2.5 rounded-lg"
            >
              同意して利用を開始する
            </Button>
          </DialogFooter>
        </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
