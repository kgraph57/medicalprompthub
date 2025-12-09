import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Brain, Shield, TrendingUp } from "lucide-react";

export default function AILiteracy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* ヘッダー */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              AIリテラシーガイド
            </h1>
            <p className="text-muted-foreground text-lg">
              医療現場でAIを安全に活用するために知っておくべきこと
            </p>
          </div>

          {/* AIは「理解」していない */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                AIは「理解」しているわけではない
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                ChatGPT、Claude、Geminiなどの大規模言語モデル（LLM）は、膨大なテキストデータから統計的パターンを学習し、「次に来る単語」を予測することで文章を生成しています。これは、医学的知識を「理解」しているわけではなく、学習データに基づいて「それらしい」回答を生成しているに過ぎません。
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">具体例</h4>
                <p className="text-blue-800 dark:text-blue-300">
                  AIは「心筋梗塞の治療」について流暢に説明できますが、それは「心筋梗塞とは何か」を本当に理解しているからではなく、学習データの中で「心筋梗塞」という単語の周辺に頻繁に出現する単語のパターンを学習しているからです。
                </p>
              </div>
              <p>
                <strong>医療現場での意味：</strong>AIの出力を「専門家の意見」として鵜呑みにせず、必ず批判的に評価し、信頼できる情報源で検証する必要があります。
              </p>
            </CardContent>
          </Card>

          {/* ハルシネーション */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
                ハルシネーション（誤情報生成）の危険性
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                ハルシネーションとは、AIが事実に基づかない情報を「自信満々に」生成する現象です。特に医療分野では、以下のようなケースで頻繁に発生します。
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-900 dark:text-red-400">1. 存在しない引用文献</h4>
                  <p className="mt-1 text-muted-foreground">
                    AIは「Smith et al. (2023) によると...」のように、実在しない論文を引用することがあります。論文のタイトル、著者名、雑誌名、巻号まで詳細に生成しますが、PubMedで検索しても見つかりません。
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-900 dark:text-red-400">2. 古いまたは誤った治療プロトコル</h4>
                  <p className="mt-1 text-muted-foreground">
                    AIの学習データは特定の時点で固定されているため、最新のガイドラインや研究結果が反映されていないことがあります。また、学習データに誤った情報が含まれていた場合、それをそのまま出力する可能性があります。
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-900 dark:text-red-400">3. 薬剤投与量の誤り</h4>
                  <p className="mt-1 text-muted-foreground">
                    AIは薬剤の投与量を生成する際、学習データの中で「よく見られる」投与量を提示しますが、それが患者の腎機能や体重に応じて適切かどうかは判断できません。
                  </p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 dark:text-red-400 mb-2">防止策</h4>
                <ul className="list-disc pl-5 space-y-1 text-red-800 dark:text-red-300">
                  <li>引用文献は必ずPubMed、医中誌、各学会公式サイトで実在を確認する</li>
                  <li>治療計画は最新のガイドライン（UpToDate、各学会公式）と照合する</li>
                  <li>薬剤投与量は添付文書、医薬品インタビューフォームで確認する</li>
                  <li>AIの出力を「仮説」として扱い、必ず検証する</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* バイアス */}
          <Card className="border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-400">
                <Shield className="w-5 h-5" />
                AIの学習データに含まれるバイアス
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                AIは学習データに含まれるバイアスを反映します。医療分野では、以下のようなバイアスが問題となります。
              </p>
              <div className="space-y-3">
                <div className="border-l-4 border-yellow-500 pl-3">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-400">1. 人種・民族バイアス</h4>
                  <p className="mt-1 text-muted-foreground">
                    AIの学習データは主に欧米の医学文献に基づいているため、アジア人、アフリカ系、ヒスパニック系の患者に対する診断や治療の精度が低下する可能性があります。例えば、皮膚疾患の診断では、白人の皮膚画像が大部分を占めるため、有色人種の症例では誤診のリスクが高まります。
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-3">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-400">2. 性別バイアス</h4>
                  <p className="mt-1 text-muted-foreground">
                    歴史的に、臨床試験では男性の参加者が多く、女性特有の症状や薬剤反応に関するデータが不足しています。AIがこのようなデータで学習すると、女性患者に対する診断や治療の精度が低下する可能性があります。
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-3">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-400">3. 地域バイアス</h4>
                  <p className="mt-1 text-muted-foreground">
                    AIは主に先進国の医療環境を前提とした情報を学習しているため、リソースが限られた地域や、特定の地域に固有の疾患（例：熱帯病）に関する情報が不足している可能性があります。
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-400 mb-2">対策</h4>
                <ul className="list-disc pl-5 space-y-1 text-yellow-800 dark:text-yellow-300">
                  <li>患者の人種、性別、地域背景を考慮し、AIの出力を慎重に評価する</li>
                  <li>特に非典型的な症例では、AIの出力に頼らず、専門家にコンサルトする</li>
                  <li>地域特有の疾患や、患者集団に特有の症状については、地域のガイドラインや専門家の意見を優先する</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 確率的性質 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                AIの確率的性質：同じ入力でも異なる出力
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                AIは確率的なモデルであるため、同じプロンプトを入力しても、毎回異なる出力を生成することがあります。これは「温度（temperature）」というパラメータによって制御されており、温度が高いほど出力のバリエーションが大きくなります。
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 dark:text-purple-400 mb-2">医療現場での意味</h4>
                <p className="text-purple-800 dark:text-purple-300">
                  同じ症例について複数回AIに問い合わせると、異なる鑑別診断や治療計画が提示される可能性があります。これは、AIが「不確実性」を持っていることを示しており、出力を鵜呑みにせず、複数の情報源と照合する必要があることを意味します。
                </p>
              </div>
              <p>
                <strong>推奨事項：</strong>重要な臨床判断を行う際は、同じプロンプトを複数回実行し、出力のバリエーションを確認することで、AIの「確信度」を評価することができます。
              </p>
            </CardContent>
          </Card>

          {/* まとめ */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>安全なAI活用のための5つの原則</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
                <li>
                  <strong>AIは補助ツールであり、最終判断は医師が行う：</strong>AIの出力は参考情報として扱い、必ず臨床判断と組み合わせて使用する。
                </li>
                <li>
                  <strong>ファクトチェックは必須：</strong>引用文献、ガイドライン、薬剤情報は必ず信頼できる情報源で確認する。
                </li>
                <li>
                  <strong>バイアスを認識する：</strong>患者の人種、性別、地域背景を考慮し、AIの出力を慎重に評価する。
                </li>
                <li>
                  <strong>ハルシネーションに警戒する：</strong>AIが「自信満々に」提示する情報でも、誤りである可能性を常に念頭に置く。
                </li>
                <li>
                  <strong>チェックリストを活用する：</strong>高リスクプロンプト（診断支援、治療計画、薬剤）を使用する際は、使用前後のチェックリストを必ず確認する。
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
