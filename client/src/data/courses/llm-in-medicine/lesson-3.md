# レッスン3: RAGによる最新医療情報の活用

## 1. はじめに

大規模言語モデル（LLM）は膨大な知識を持っていますが、その知識は学習データがカットオフされた時点のものであり、最新の情報や、特定の専門分野の非公開情報にはアクセスできません。また、時として事実に基づかない情報を生成する「ハルシネーション（幻覚）」という問題も抱えています。これらの課題を克服し、LLMの回答の信頼性と鮮度を劇的に向上させる技術が**RAG（Retrieval-Augmented Generation）**です。

## 2. RAGとは何か？

RAGは、「検索（Retrieval）」と「生成（Generation）」を組み合わせた造語で、2020年にMeta（旧Facebook）の研究者によって提案されました [1]。その仕組みは、ユーザーからの質問（プロンプト）に対して、まず外部の信頼できる情報源（ナレッジベース）から関連情報を検索し、その検索結果をプロンプトに付加してLLMに渡すというものです。

これにより、LLMは**検索してきた最新かつ正確な情報に基づいて**回答を生成するため、ハルシネーションを大幅に抑制し、根拠（エビデンス）に基づいた回答を生成することが可能になります。

### RAGのプロセス

RAGのプロセスは、大きく分けて以下のステップで構成されます。

1.  **ナレッジベースの準備**: 信頼できる情報源（例: 最新の診療ガイドライン、医学論文、院内マニュアルなど）を準備します。
2.  **インデックス作成**: ナレッジベースの情報を、検索しやすいように小さなチャンク（断片）に分割し、それぞれのチャンクを**ベクトル（Vector）**と呼ばれる数値の配列に変換します。このベクトルを**ベクトルデータベース（Vector Database）**に保存し、検索可能な状態にします（このプロセスをインデックス作成と呼びます）。
3.  **検索（Retrieval）**: ユーザーから質問が入力されると、その質問も同様にベクトルに変換し、ベクトルデータベース内で意味的に類似したチャンクを検索します。
4.  **生成（Generation）**: 検索されたチャンクを、元の質問と一緒にLLMに渡します。LLMは、提供されたコンテキスト（検索結果）に基づいて回答を生成します。

## 3. 医療におけるRAGの重要性

医療は、日々新しい研究成果が発表され、診療ガイドラインが更新される、知識の鮮度が極めて重要な分野です。このようなドメインにおいて、RAGは不可欠な技術と言えます。

-   **エビデンスに基づく医療（EBM）の実践**: 最新の診療ガイドラインや臨床試験の論文をナレッジベースとすることで、LLMは常に最新のエビデンスに基づいた回答を生成できます。
-   **院内情報の活用**: 各医療機関独自のプロトコル、院内マニュアル、薬剤採用リストなどをナレッジベースに含めることで、その病院の状況に即した回答を生成する「院内特化AIアシスタント」を構築できます。
-   **ハルシネーションの抑制**: LLMが知らない情報については、「提供された情報の中には回答が見つかりません」と応答させることができるため、誤った情報を提供するリスクを低減できます。
-   **情報源の明示**: 回答の生成に使用した情報源（チャンク）を提示することで、ユーザーは情報の真偽を検証し、より深く理解することができます。

## 4. RAGの実装例

RAGを実装するための代表的なオープンソースフレームワークとして、**LangChain**と**LlamaIndex**があります。これらのフレームワークを利用することで、比較的容易にRAGシステムを構築することが可能です。

### LangChainを用いた実装の概念

```python
# 1. ドキュメントローダーで文書を読み込む
from langchain_community.document_loaders import PyPDFLoader
loader = PyPDFLoader("latest_guideline.pdf")

# 2. テキストをチャンクに分割
from langchain.text_splitter import RecursiveCharacterTextSplitter
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
docs = text_splitter.split_documents(loader.load())

# 3. ベクトルストア（データベース）を作成
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(docs, embeddings)

# 4. 検索と生成を行うチェーンを作成
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

prompt = ChatPromptTemplate.from_template("""Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}""")

llm = ChatOpenAI()
document_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(vectorstore.as_retriever(), document_chain)

# 5. 質問を投げ、回答を得る
response = retrieval_chain.invoke({"input": "高血圧の初期治療薬は何ですか？"})
print(response["answer"])
```

この例では、PDF形式のガイドラインを読み込み、FAISSというベクトルストアに保存し、ユーザーの質問に関連する部分を検索して回答を生成しています。

## 5. まとめ

RAGは、LLMの知識を外部の信頼できる情報源で補強し、その回答の信頼性、正確性、鮮度を飛躍的に向上させるための鍵となる技術です。医療というエビデンスが重視される分野において、RAGを使いこなすことは、LLMを安全かつ効果的に活用するための必須スキルと言えるでしょう。

次のレッスンでは、これまでに学んだプロンプトエンジニアリングやRAGの技術を応用し、診療録やサマリーといった**医療文書作成を自動化・効率化する**具体的な方法について探求します。

---

### 参考文献

[1] Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., ... & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. In *Advances in Neural Information Processing Systems*, *33*, 9459-9474.
