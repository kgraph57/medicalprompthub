import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  id: string;
  label: string;
}

interface PromptChecklistProps {
  promptCategory: string;
  promptId: string;
}

// カテゴリ別のチェックリスト定義
const checklistsByCategory: Record<string, { before: ChecklistItem[]; after: ChecklistItem[] }> = {
  diagnosis: {
    before: [
      { id: "vitals", label: "バイタルサインを再確認したか？" },
      { id: "physical", label: "身体所見を再評価したか？" },
      { id: "medications", label: "薬剤歴（アレルギー含む）を確認したか？" },
      { id: "history", label: "既往歴・家族歴を確認したか？" },
    ],
    after: [
      { id: "critical", label: "AIが提示したCritical疾患は除外できたか？" },
      { id: "consistency", label: "AIの出力と患者の臨床像に矛盾はないか？" },
      { id: "consult", label: "必要に応じて上級医/同僚にコンサルトしたか？" },
      { id: "documentation", label: "鑑別診断の根拠をカルテに記載したか？" },
    ],
  },
  treatment: {
    before: [
      { id: "diagnosis", label: "診断は確定しているか？" },
      { id: "allergies", label: "薬剤アレルギー歴を確認したか？" },
      { id: "renal", label: "腎機能・肝機能を確認したか？" },
      { id: "interactions", label: "併用薬との相互作用を確認したか？" },
    ],
    after: [
      { id: "guidelines", label: "最新のガイドラインと照合したか？" },
      { id: "dosage", label: "投与量・投与経路は適切か？" },
      { id: "monitoring", label: "モニタリング計画を立てたか？" },
      { id: "patient_education", label: "患者への説明を行ったか？" },
    ],
  },
  medication: {
    before: [
      { id: "indication", label: "適応を再確認したか？" },
      { id: "contraindications", label: "禁忌事項を確認したか？" },
      { id: "renal_function", label: "腎機能データは最新か？" },
      { id: "current_meds", label: "現在の処方薬リストは正確か？" },
    ],
    after: [
      { id: "package_insert", label: "添付文書で投与量を確認したか？" },
      { id: "interaction_check", label: "相互作用データベースで確認したか？" },
      { id: "monitoring_plan", label: "副作用モニタリング計画を立てたか？" },
      { id: "documentation", label: "処方理由をカルテに記載したか？" },
    ],
  },
};

export function PromptChecklist({ promptCategory, promptId }: PromptChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [beforeChecks, setBeforeChecks] = useState<Record<string, boolean>>({});
  const [afterChecks, setAfterChecks] = useState<Record<string, boolean>>({});

  const checklist = checklistsByCategory[promptCategory];

  if (!checklist) {
    return null; // チェックリストが定義されていないカテゴリは表示しない
  }

  const toggleBeforeCheck = (id: string) => {
    setBeforeChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAfterCheck = (id: string) => {
    setAfterChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const beforeProgress = Object.values(beforeChecks).filter(Boolean).length;
  const beforeTotal = checklist.before.length;
  const afterProgress = Object.values(afterChecks).filter(Boolean).length;
  const afterTotal = checklist.after.length;

  const allBeforeCompleted = beforeProgress === beforeTotal;
  const allAfterCompleted = afterProgress === afterTotal;

  return (
    <Card className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-blue-900 dark:text-blue-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            安全使用チェックリスト
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 text-xs hover:bg-blue-100 dark:hover:bg-blue-900/30"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" /> 閉じる
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" /> 開く
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 pt-0">
          {/* 使用前チェックリスト */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-400">
                使用前チェック
              </h4>
              <span className="text-xs text-blue-700 dark:text-blue-500">
                {beforeProgress}/{beforeTotal}
              </span>
            </div>
            <div className="space-y-2">
              {checklist.before.map((item) => (
                <div key={item.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={`before-${item.id}`}
                    checked={beforeChecks[item.id] || false}
                    onCheckedChange={() => toggleBeforeCheck(item.id)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={`before-${item.id}`}
                    className="text-sm leading-tight cursor-pointer text-blue-900 dark:text-blue-300"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
            {allBeforeCompleted && (
              <div className="text-xs text-green-700 dark:text-green-500 flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-3 h-3" />
                使用前チェック完了
              </div>
            )}
          </div>

          {/* 使用後チェックリスト */}
          <div className="space-y-2 pt-2 border-t border-blue-200 dark:border-blue-900">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-400">
                使用後チェック
              </h4>
              <span className="text-xs text-blue-700 dark:text-blue-500">
                {afterProgress}/{afterTotal}
              </span>
            </div>
            <div className="space-y-2">
              {checklist.after.map((item) => (
                <div key={item.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={`after-${item.id}`}
                    checked={afterChecks[item.id] || false}
                    onCheckedChange={() => toggleAfterCheck(item.id)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={`after-${item.id}`}
                    className="text-sm leading-tight cursor-pointer text-blue-900 dark:text-blue-300"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
            {allAfterCompleted && (
              <div className="text-xs text-green-700 dark:text-green-500 flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-3 h-3" />
                使用後チェック完了
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
