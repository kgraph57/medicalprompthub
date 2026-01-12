/**
 * 生成AI基礎コースのクイズデータ
 * 深い理解と実践的判断力を問う問題
 */

import { QuizQuestion } from "@/components/Quiz";

export const lesson1Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-1-q1",
    question: "生成AIと識別AIの主な違いは何ですか？",
    type: "multiple_choice",
    options: [
      "生成AIは既存データを分析し、識別AIは新しいコンテンツを生成する",
      "生成AIは新しいコンテンツを生成し、識別AIは既存データを分析・分類する",
      "両者に違いはない",
      "生成AIの方が常に優れている"
    ],
    correctAnswer: "生成AIは新しいコンテンツを生成し、識別AIは既存データを分析・分類する",
    explanation: "生成AIは学習したデータから新しいコンテンツ（テキスト、画像、音声など）を生成します。一方、識別AIは既存のデータを分析し、分類や予測を行います。両者は異なる目的を持ち、異なる方法で活用されます。",
    points: 2,
  },
  {
    id: "generative-ai-1-q2",
    question: "生成AIの三つの特徴として、最も適切なのはどれですか？",
    type: "multiple_choice",
    options: [
      "速度、精度、コスト",
      "創造性、多様性、適応性",
      "記憶力、計算力、判断力",
      "学習速度、推論速度、応答速度"
    ],
    correctAnswer: "創造性、多様性、適応性",
    explanation: "生成AIの三つの特徴は、創造性（パターンに基づいた新しいコンテンツの生成）、多様性（同じ入力に対して異なる出力を生成）、適応性（コンテキストに応じた適切なコンテンツの生成）です。",
    points: 2,
  },
  {
    id: "generative-ai-1-q3",
    question: "テキスト生成AIの医療現場での活用例として、最も適切でないのはどれですか？",
    type: "multiple_choice",
    options: [
      "診断書のドラフト作成支援",
      "症例報告書の執筆支援",
      "医学文献の要約",
      "最終的な診断の自動決定"
    ],
    correctAnswer: "最終的な診断の自動決定",
    explanation: "テキスト生成AIは、診断書のドラフト作成、症例報告書の執筆支援、医学文献の要約など、文書作成の支援に活用できます。しかし、最終的な診断の決定は医師の判断が必要であり、AIに完全に任せるべきではありません。",
    points: 2,
  },
];

export const lesson2Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-2-q1",
    question: "大規模言語モデル（LLM）のパラメータとは何ですか？",
    type: "multiple_choice",
    options: [
      "AIモデルが学習する「重み」で、パラメータ数が多いほど複雑なパターンを学習できる",
      "AIモデルの入力データの数",
      "AIモデルの出力データの数",
      "AIモデルの学習時間"
    ],
    correctAnswer: "AIモデルが学習する「重み」で、パラメータ数が多いほど複雑なパターンを学習できる",
    explanation: "パラメータは、AIモデルが学習する「重み」です。パラメータ数が多いほど、モデルはより複雑なパターンを学習できます。ただし、パラメータ数が多いほど性能が高いとは限らず、パラメータの質と学習データの質も重要です。",
    points: 2,
  },
  {
    id: "generative-ai-2-q2",
    question: "事前学習とファインチューニングの違いは何ですか？",
    type: "multiple_choice",
    options: [
      "事前学習は特定のタスクに特化し、ファインチューニングは一般的な知識を学習する",
      "事前学習は大量の一般的なテキストデータから学習し、ファインチューニングは特定のタスクに特化したデータでさらに学習する",
      "両者に違いはない",
      "事前学習の方が常に優れている"
    ],
    correctAnswer: "事前学習は大量の一般的なテキストデータから学習し、ファインチューニングは特定のタスクに特化したデータでさらに学習する",
    explanation: "事前学習は、大量の一般的なテキストデータから言語の基本的なパターンを学習します。一方、ファインチューニングは、特定のタスクに特化したデータで、事前学習済みモデルをさらに学習します。これにより、特定の用途にAIを特化させることができます。",
    points: 2,
  },
  {
    id: "generative-ai-2-q3",
    question: "パラメータ数が多いほど性能が高いという考え方について、最も適切なのはどれですか？",
    type: "multiple_choice",
    options: [
      "常に正しい",
      "パラメータ数が多いほど性能が高いとは限らず、パラメータの質と学習データの質も重要",
      "パラメータ数は関係ない",
      "パラメータ数が少ないほど性能が高い"
    ],
    correctAnswer: "パラメータ数が多いほど性能が高いとは限らず、パラメータの質と学習データの質も重要",
    explanation: "パラメータ数が多いほど性能が高いとは限りません。重要なのは、パラメータの質と、学習データの質です。適切に設計されたモデルと高品質な学習データがあれば、少ないパラメータでも高い性能を発揮できます。",
    points: 2,
  },
];

export const lesson3Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-3-q1",
    question: "Transformerアーキテクチャの主な特徴は何ですか？",
    type: "multiple_choice",
    options: [
      "再帰的な構造",
      "Self-Attention機構による並列処理",
      "畳み込み層の使用",
      "全結合層のみの使用"
    ],
    correctAnswer: "Self-Attention機構による並列処理",
    explanation: "Transformerアーキテクチャの主な特徴は、Self-Attention機構による並列処理です。これにより、従来の再帰的な構造よりも効率的に長いシーケンスを処理できるようになりました。",
    points: 2,
  },
  {
    id: "generative-ai-3-q2",
    question: "エンコーダーとデコーダーの役割について、最も適切なのはどれですか？",
    type: "multiple_choice",
    options: [
      "エンコーダーは出力を生成し、デコーダーは入力を理解する",
      "エンコーダーは入力を理解し、デコーダーは出力を生成する",
      "両者に違いはない",
      "エンコーダーの方が常に優れている"
    ],
    correctAnswer: "エンコーダーは入力を理解し、デコーダーは出力を生成する",
    explanation: "エンコーダーは入力を理解し、その意味を内部表現に変換します。デコーダーは、その内部表現から出力を生成します。この役割分担により、Transformerは効率的に処理できます。",
    points: 2,
  },
];

export const lesson4Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-4-q1",
    question: "Attention機構の主な目的は何ですか？",
    type: "multiple_choice",
    options: [
      "計算速度を向上させる",
      "入力のどの部分に注目すべきかを決定する",
      "メモリ使用量を削減する",
      "パラメータ数を減らす"
    ],
    correctAnswer: "入力のどの部分に注目すべきかを決定する",
    explanation: "Attention機構の主な目的は、入力のどの部分に注目すべきかを決定することです。これにより、AIは文脈を理解し、関連する情報に焦点を当てることができます。",
    points: 2,
  },
  {
    id: "generative-ai-4-q2",
    question: "Query、Key、Valueの役割について、最も適切なのはどれですか？",
    type: "multiple_choice",
    options: [
      "Queryは検索クエリ、Keyは検索キー、Valueは検索結果",
      "Queryは「何を探すか」、Keyは「どこを探すか」、Valueは「見つかった情報」",
      "両者に違いはない",
      "Queryの方が常に重要"
    ],
    correctAnswer: "Queryは「何を探すか」、Keyは「どこを探すか」、Valueは「見つかった情報」",
    explanation: "Queryは「何を探すか」を表し、Keyは「どこを探すか」を表し、Valueは「見つかった情報」を表します。この三つの組み合わせにより、Attention機構は効率的に情報を取得できます。",
    points: 2,
  },
];

export const lesson5Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-5-q1",
    question: "トークン化とは何ですか？",
    type: "multiple_choice",
    options: [
      "テキストを単語や文字の単位に分割すること",
      "テキストを画像に変換すること",
      "テキストを音声に変換すること",
      "テキストを削除すること"
    ],
    correctAnswer: "テキストを単語や文字の単位に分割すること",
    explanation: "トークン化は、テキストを単語や文字の単位（トークン）に分割することです。これにより、AIはテキストを処理しやすくなります。",
    points: 2,
  },
  {
    id: "generative-ai-5-q2",
    question: "コンテキストウィンドウとは何ですか？",
    type: "multiple_choice",
    options: [
      "AIが一度に処理できるテキストの長さの上限",
      "AIの学習時間",
      "AIの応答時間",
      "AIのメモリ容量"
    ],
    correctAnswer: "AIが一度に処理できるテキストの長さの上限",
    explanation: "コンテキストウィンドウは、AIが一度に処理できるテキストの長さの上限です。この制約により、長い文書を処理する際には、適切に分割する必要があります。",
    points: 2,
  },
];

export const lesson6Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-6-q1",
    question: "生成プロセスにおけるサンプリングとは何ですか？",
    type: "multiple_choice",
    options: [
      "学習データからサンプルを抽出すること",
      "次のトークンを確率的に選択すること",
      "モデルのパラメータを調整すること",
      "モデルの性能を評価すること"
    ],
    correctAnswer: "次のトークンを確率的に選択すること",
    explanation: "サンプリングは、生成プロセスにおいて次のトークンを確率的に選択することです。これにより、同じ入力に対して異なる出力を生成できるようになります。",
    points: 2,
  },
  {
    id: "generative-ai-6-q2",
    question: "温度パラメータ（Temperature）の役割は何ですか？",
    type: "multiple_choice",
    options: [
      "モデルの学習速度を制御する",
      "生成の多様性を制御する（高いほど多様、低いほど確定的）",
      "モデルのメモリ使用量を制御する",
      "モデルの応答速度を制御する"
    ],
    correctAnswer: "生成の多様性を制御する（高いほど多様、低いほど確定的）",
    explanation: "温度パラメータは、生成の多様性を制御します。温度が高いほど多様な出力が生成され、温度が低いほど確定的な出力が生成されます。",
    points: 2,
  },
];

export const lesson7Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-7-q1",
    question: "主要な生成AIツールを選択する際、最も重要な考慮事項は何ですか？",
    type: "multiple_choice",
    options: [
      "価格のみ",
      "性能、コスト、用途に応じた適切な選択",
      "知名度のみ",
      "最新のツールのみ"
    ],
    correctAnswer: "性能、コスト、用途に応じた適切な選択",
    explanation: "主要な生成AIツールを選択する際は、性能、コスト、用途に応じた適切な選択が重要です。それぞれのツールには特徴があり、用途に応じて最適なツールを選ぶ必要があります。",
    points: 2,
  },
];

export const lesson8Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-8-q1",
    question: "ファインチューニングの主な目的は何ですか？",
    type: "multiple_choice",
    options: [
      "モデルのパラメータ数を増やす",
      "事前学習済みモデルを特定のタスクに特化させる",
      "モデルの学習速度を向上させる",
      "モデルのメモリ使用量を削減する"
    ],
    correctAnswer: "事前学習済みモデルを特定のタスクに特化させる",
    explanation: "ファインチューニングの主な目的は、事前学習済みモデルを特定のタスクに特化させることです。これにより、一般的な能力を持つモデルを、特定の用途に最適化できます。",
    points: 2,
  },
];

export const lesson9Quizzes: QuizQuestion[] = [
  {
    id: "generative-ai-9-q1",
    question: "生成AIの限界として、最も重要なのはどれですか？",
    type: "multiple_choice",
    options: [
      "ハルシネーション（誤情報の生成）",
      "処理速度が遅い",
      "メモリ使用量が多い",
      "価格が高い"
    ],
    correctAnswer: "ハルシネーション（誤情報の生成）",
    explanation: "生成AIの限界として最も重要なのは、ハルシネーション（誤情報の生成）です。AIは学習データに基づいて情報を生成しますが、誤情報を生成する可能性があります。特に医療現場では、この限界を理解し、適切に対応する必要があります。",
    points: 2,
  },
  {
    id: "generative-ai-9-q2",
    question: "生成AIを活用する際の注意点として、最も適切なのはどれですか？",
    type: "multiple_choice",
    options: [
      "AIの出力をそのまま信頼する",
      "AIの出力を必ず確認し、複数の情報源と照合する",
      "AIの出力を無視する",
      "AIの出力を変更しない"
    ],
    correctAnswer: "AIの出力を必ず確認し、複数の情報源と照合する",
    explanation: "生成AIを活用する際は、AIの出力を必ず確認し、複数の情報源と照合することが重要です。特に医療現場では、誤情報が患者の安全に直接影響を与える可能性があるため、慎重な確認が必要です。",
    points: 2,
  },
];
