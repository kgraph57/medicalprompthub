import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Brain, Shield, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import { updateSEO } from "@/lib/seo";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// アニメーション設定（ヒーローセクションと統一）
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
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const titleVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// マウス追従エフェクト（ヒーローセクションと統一）
function MouseFollowEffect({ x, y }: { x: any; y: any }) {
  const background = useTransform(
    [x, y],
    ([latestX, latestY]) => 
      `radial-gradient(800px circle at ${latestX}px ${latestY}px, rgba(59, 130, 246, 0.02), transparent 50%)`
  );
  
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background }}
    />
  );
}

export default function AILiteracy() {
  // マウス追従エフェクト
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 180 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    updateSEO({
      title: "AIリテラシーガイド | Medical Prompt Hub",
      description: "医療現場でAIを安全に活用するために知っておくべきこと。AIの限界、ハルシネーション、ファクトチェックの重要性を解説します。",
      path: "/ai-literacy",
      keywords: "AIリテラシー,ハルシネーション,ファクトチェック,医療AI,安全なAI活用"
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <Layout>
      {/* ヒーローセクション風のヘッダー */}
      <section 
        className="relative py-8 md:py-12 lg:py-16 overflow-hidden bg-white dark:bg-neutral-950"
        onMouseMove={handleMouseMove}
      >
        {/* 背景グラデーション（ヒーローセクションと統一） */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-blue-500/3 via-blue-600/3 to-cyan-500/3 rounded-full blur-3xl"
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
        </div>
        
        {/* マウス追従エフェクト */}
        <MouseFollowEffect x={x} y={y} />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={titleVariants}
          >
            {/* タイトル（ヒーローセクション風の大きなタイトル） */}
            <motion.h1 
              className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[68px] font-black mb-6 md:mb-8 leading-none tracking-[-0.02em] relative"
              style={{ 
                fontFamily: 'Inter Display, Inter, system-ui, sans-serif',
              }}
              variants={titleVariants}
            >
              <span className="relative inline-block">
                <span className="relative z-10 text-neutral-900 dark:text-neutral-50">
                  AIリテラシーガイド
                </span>
                {/* グラデーションオーバーレイ */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  AIリテラシーガイド
                </motion.span>
              </span>
            </motion.h1>
            
            {/* サブタイトル */}
            <motion.p 
              className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-neutral-600 dark:text-neutral-400 mb-8 font-normal leading-[1.5] tracking-[-0.01em]"
              variants={itemVariants}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              医療現場でAIを安全に活用するために知っておくべきこと
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      {/* コンテンツセクション */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div 
          className="space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >

          {/* AIは「理解」していない */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-border/50 hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Brain className="w-5 h-5 text-blue-600" />
                  AIは「理解」しているわけではない
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                  ChatGPT、Claude、Geminiなどの大規模言語モデル（LLM）は、膨大なテキストデータから統計的パターンを学習し、「次に来る単語」を予測することで文章を生成しています。これは、医学的知識を「理解」しているわけではなく、学習データに基づいて「それらしい」回答を生成しているに過ぎません。
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4 md:p-5">
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
          </motion.div>

          {/* ハルシネーション */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-red-200 hover:border-red-300 dark:hover:border-red-700 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-400 text-lg md:text-xl">
                  <AlertTriangle className="w-5 h-5" />
                  ハルシネーション（誤情報生成）の危険性
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm md:text-base leading-relaxed">
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
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 md:p-5">
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
          </motion.div>

          {/* バイアス */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-yellow-200 hover:border-yellow-300 dark:hover:border-yellow-700 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-400 text-lg md:text-xl">
                  <Shield className="w-5 h-5" />
                  AIの学習データに含まれるバイアス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm md:text-base leading-relaxed">
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
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 md:p-5">
                  <h4 className="font-semibold text-yellow-900 dark:text-yellow-400 mb-2">対策</h4>
                  <ul className="list-disc pl-5 space-y-1 text-yellow-800 dark:text-yellow-300">
                    <li>患者の人種、性別、地域背景を考慮し、AIの出力を慎重に評価する</li>
                    <li>特に非典型的な症例では、AIの出力に頼らず、専門家にコンサルトする</li>
                    <li>地域特有の疾患や、患者集団に特有の症状については、地域のガイドラインや専門家の意見を優先する</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 確率的性質 */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-border/50 hover:border-purple-200 dark:hover:border-purple-800 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  AIの確率的性質：同じ入力でも異なる出力
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                AIは確率的なモデルであるため、同じプロンプトを入力しても、毎回異なる出力を生成することがあります。これは「温度（temperature）」というパラメータによって制御されており、温度が高いほど出力のバリエーションが大きくなります。
              </p>
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 rounded-lg p-4 md:p-5">
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
          </motion.div>

          {/* 具体的な失敗例と対策 */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-orange-200 hover:border-orange-300 dark:hover:border-orange-700 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-400 text-lg md:text-xl">
                  <AlertTriangle className="w-5 h-5" />
                  よくある失敗例とその対策
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm md:text-base leading-relaxed">
              <div className="space-y-4">
                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg p-4 md:p-5">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-400 mb-2">失敗例 1: 存在しない論文を引用してしまった</h4>
                  <p className="text-orange-800 dark:text-orange-300 mb-2">
                    <strong>状況：</strong>AIに「新型コロナウイルス感染症の治療について、最新のエビデンスを教えてください」と問い合わせたところ、「Smith et al. (2023) Lancet」という論文が提示されたが、PubMedで検索しても見つからなかった。
                  </p>
                  <p className="text-orange-800 dark:text-orange-300">
                    <strong>対策：</strong>AIが提示した引用文献は、必ずPubMed、医中誌、Google Scholarで実在を確認する。見つからない場合は、AIに「DOIを教えてください」と再度問い合わせるか、別の情報源を使用する。
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg p-4 md:p-5">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-400 mb-2">失敗例 2: 古いガイドラインを提示された</h4>
                  <p className="text-orange-800 dark:text-orange-300 mb-2">
                    <strong>状況：</strong>AIに「高血圧の治療ガイドラインを教えてください」と問い合わせたところ、JSH2014（日本高血圧学会2014年版）の内容が提示されたが、現在はJSH2019が最新版である。
                  </p>
                  <p className="text-orange-800 dark:text-orange-300">
                    <strong>対策：</strong>プロンプトに「最新のガイドライン」と明記しても、AIの学習データのカットオフ日以降の情報は含まれていない。必ず各学会の公式サイトやUpToDateで最新版を確認する。
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg p-4 md:p-5">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-400 mb-2">失敗例 3: 薬剤投与量が誤っていた</h4>
                  <p className="text-orange-800 dark:text-orange-300 mb-2">
                    <strong>状況：</strong>AIに「腐機能低下患者への抗菌薬投与量を教えてください」と問い合わせたところ、一般的な投与量が提示されたが、患者のCCr（クレアチニン・クリアランス）に応じた減量が考慮されていなかった。
                  </p>
                  <p className="text-orange-800 dark:text-orange-300">
                    <strong>対策：</strong>薬剤投与量はAIの出力を参考にするだけで、必ず添付文書、医薬品インタビューフォーム、または薬剤師に確認する。特に腐機能低下、肝機能障害、小児、高齢者など、特殊な患者集団では注意が必要。
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg p-4 md:p-5">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-400 mb-2">失敗例 4: 患者情報を入力してしまった</h4>
                  <p className="text-orange-800 dark:text-orange-300 mb-2">
                    <strong>状況：</strong>AIに診断支援を依頼する際、患者の氏名、生年月日、カルテ番号などをそのまま入力してしまった。
                  </p>
                  <p className="text-orange-800 dark:text-orange-300">
                    <strong>対策：</strong>AIに入力する情報は必ず匿名化する。「60歳男性」「患者A」など、個人を特定できない表現を使用する。特にクラウド型AIサービスを使用する際は、患者のプライバシー保護に細心の注意を払う。
                  </p>
                </div>
              </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* まとめ */}
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-primary/50 hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">安全なAI活用のための5つの原則</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-5 space-y-2 text-sm md:text-base leading-relaxed">
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
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
