import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, BookOpen, Zap, Target, Shield, TrendingUp } from "lucide-react";

export default function Tips() {
  const tips = [
    {
      id: 1,
      title: "プロンプトの構造化：CARE原則",
      category: "基本テクニック",

      description: "効果的なプロンプトは、Context（文脈）、Action（行動）、Result（結果）、Example（例）の4要素で構成されます。",
      content: `
**Context（文脈）**: あなたの役割や状況を明確にする
- 「あなたは経験豊富な循環器内科医です」
- 「患者は65歳男性、高血圧と糖尿病の既往があります」

**Action（行動）**: 具体的に何をしてほしいか指示する
- 「この心電図所見から考えられる鑑別診断を3つ挙げてください」
- 「各診断について、確定に必要な追加検査を提案してください」

**Result（結果）**: 期待する出力形式を指定する
- 「箇条書きで、各項目は50文字以内で」
- 「表形式で、列は「診断名」「根拠」「追加検査」としてください」

**Example（例）**: 具体例を示す
- 「例：急性心筋梗塞 - ST上昇、トロポニン上昇 - 緊急冠動脈造影」
      `,
      tags: ["プロンプト設計", "初級"],
      readTime: "3分"
    },
    {
      id: 2,
      title: "Chain-of-Thought（思考の連鎖）を活用する",
      category: "高度なテクニック",

      description: "「ステップバイステップで考えてください」と指示することで、AIの推論精度が向上します。",
      content: `
**基本的な使い方**:
プロンプトの最後に「ステップバイステップで考えてください」を追加するだけで、AIがより論理的に思考します。

**医療での応用例**:
\`\`\`
患者：45歳女性、突然の胸痛と呼吸困難を訴えて来院。
バイタル：BP 90/60, HR 120, SpO2 88%（室内気）

この患者の鑑別診断と初期対応を、ステップバイステップで考えてください。
\`\`\`

**AIの出力例**:
1. **バイタルサインの評価**: ショック状態（低血圧、頻脈、低酸素）
2. **緊急性の判断**: 生命を脅かす状態 → 即座の介入が必要
3. **鑑別診断**: 肺塞栓症、急性心筋梗塞、緊張性気胸、大動脈解離
4. **初期対応**: 酸素投与、静脈路確保、心電図・胸部X線・D-dimer測定
5. **次のステップ**: 造影CTまたは心エコーで確定診断

**なぜ効果的か**:
- 複雑な問題を小さなステップに分解
- 論理的な飛躍を防ぐ
- 推論過程が可視化されるため、誤りを発見しやすい
      `,
      tags: ["推論", "中級"],
      readTime: "5分"
    },
    {
      id: 3,
      title: "Few-Shot Learning：例示による学習",
      category: "高度なテクニック",

      description: "望ましい出力の例を2-3個示すことで、AIが期待する形式やトーンを理解します。",
      content: `
**基本パターン**:
\`\`\`
以下の例に従って、新しい症例の診断を行ってください。

【例1】
入力: 38歳男性、発熱38.5℃、咽頭痛、頸部リンパ節腫脹
出力: 急性咽頭炎の疑い。溶連菌感染症を除外するため、迅速抗原検査を推奨。

【例2】
入力: 52歳女性、突然の激しい頭痛、嘔吐、項部硬直
出力: くも膜下出血の疑い。緊急で頭部CTを実施し、神経内科/脳外科にコンサルト。

【新しい症例】
入力: 70歳男性、労作時胸痛、冷汗、左肩への放散痛
出力: ？
\`\`\`

**医療文書作成での応用**:
紹介状や診断書の作成時に、過去の良い例を2-3個示すことで、一貫した品質の文書を生成できます。

**ポイント**:
- 例は2-3個が最適（多すぎると逆効果）
- 例の品質が出力の品質を決定する
- 入力と出力のペアを明確に示す
      `,
      tags: ["プロンプト設計", "中級"],
      readTime: "4分"
    },
    {
      id: 4,
      title: "ネガティブプロンプト：やってはいけないことを指定",
      category: "基本テクニック",

      description: "「〜しないでください」という指示で、不要な情報や誤った推論を防ぎます。",
      content: `
**基本的な使い方**:
\`\`\`
患者への説明文を作成してください。

【条件】
- 専門用語を使わないでください
- 不安を煽る表現は避けてください
- 断定的な予後の記載はしないでください
- 200文字以内で簡潔に
\`\`\`

**医療での重要な制約**:
\`\`\`
【絶対に避けるべきこと】
- 診断の確定（「〜です」ではなく「〜の可能性があります」）
- 治療の指示（「〜してください」ではなく「〜が推奨されます」）
- 予後の断定（「治ります」ではなく「改善が期待されます」）
- 個人情報の記載
\`\`\`

**効果的な使用例**:
\`\`\`
この検査結果について患者に説明する文章を作成してください。

【やってはいけないこと】
- 医学用語をそのまま使う（例：「浸潤影」→「肺に影がある」）
- 最悪のシナリオを強調する
- 他の医療機関や医師を批判する内容を含める
\`\`\`
      `,
      tags: ["安全性", "初級"],
      readTime: "3分"
    },
    {
      id: 5,
      title: "ロールプレイング：AIに役割を与える",
      category: "基本テクニック",

      description: "「あなたは〜です」と役割を明確にすることで、専門性の高い回答を引き出します。",
      content: `
**効果的なロール設定**:
\`\`\`
あなたは20年の経験を持つ消化器内科専門医です。
内視鏡検査の所見から、適切な生検部位と追加検査を提案してください。
\`\`\`

**複数の視点を活用**:
\`\`\`
以下の症例について、3つの異なる専門家の視点から意見を述べてください：
1. 救急医の視点：緊急性の評価と初期対応
2. 総合内科医の視点：鑑別診断と検査計画
3. 専門医の視点：確定診断と治療方針
\`\`\`

**患者教育での活用**:
\`\`\`
あなたは患者教育に熱心な家庭医です。
高血圧の新規診断を受けた50歳男性に、生活習慣改善の重要性を
わかりやすく、かつ実行可能な形で説明してください。
\`\`\`

**ポイント**:
- 具体的な経験年数や専門性を指定
- 複数の役割を組み合わせることも可能
- 役割に応じた口調や表現が自動的に調整される
      `,
      tags: ["プロンプト設計", "初級"],
      readTime: "4分"
    },
    {
      id: 6,
      title: "反復的改善：プロンプトのイテレーション",
      category: "ベストプラクティス",

      description: "最初のプロンプトは完璧である必要はありません。出力を見ながら段階的に改善します。",
      content: `
**改善のサイクル**:
1. **初期プロンプト**: シンプルに始める
2. **出力の評価**: 何が足りないか、何が余分かを確認
3. **プロンプトの調整**: 制約や例を追加
4. **再実行**: 改善を確認
5. **繰り返し**: 満足いく結果が得られるまで

**実例：紹介状作成の改善プロセス**:

**バージョン1（シンプル）**:
\`\`\`
糖尿病患者の紹介状を作成してください。
\`\`\`
→ 出力が一般的すぎる

**バージョン2（詳細を追加）**:
\`\`\`
65歳男性、2型糖尿病（HbA1c 8.5%）、網膜症精査のため眼科紹介。
紹介状を作成してください。
\`\`\`
→ 情報は含まれているが、形式が不統一

**バージョン3（形式を指定）**:
\`\`\`
以下の情報を元に、眼科宛の紹介状を作成してください。

【患者情報】
- 65歳男性
- 2型糖尿病（罹病期間10年）
- HbA1c 8.5%、空腹時血糖 180mg/dL
- 現在の治療：メトホルミン、DPP-4阻害薬

【紹介理由】
- 糖尿病網膜症の精査と治療方針の相談

【形式】
- 標準的な紹介状の形式
- 敬語を使用
- 300文字程度
\`\`\`
→ 満足いく結果！

**改善のヒント**:
- 一度に全てを完璧にしようとしない
- 出力の問題点を具体的に特定する
- 制約を一つずつ追加していく
- 良い結果が得られたプロンプトは保存して再利用
      `,
      tags: ["ワークフロー", "中級"],
      readTime: "6分"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Tips & Best Practices
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            AIプロンプトを効果的に活用するためのテクニックとベストプラクティス集
          </p>
        </div>

        <div className="grid gap-6">
          {tips.map((tip) => (
            <Card key={tip.id} className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                      {tip.category}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {tip.readTime}
                  </span>
                </div>
                <CardTitle className="text-xl mb-2">
                  {tip.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {tip.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {tip.content}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tip.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
