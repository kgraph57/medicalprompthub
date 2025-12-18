# 03-reference/step-01.md: ClinicalTrials.govの高度な検索フィールドとAIによる検索戦略の最適化

![臨床試験データベース比較](/assets/guides/clinical-trial-search/databases.png)

## ClinicalTrials.govの高度な検索フィールドの活用

ClinicalTrials.govの基本的な検索はキーワードで行いますが、より特異的で質の高い結果を得るためには、高度な検索フィールドを理解し、活用することが不可欠です。AIは、これらのフィールドを考慮に入れた複雑な検索戦略の策定を支援します。

### 主要な高度検索フィールド

| フィールド名 | 検索できる情報 | AI活用の視点 |
| :--- | :--- | :--- |
| Status | 募集状況（Recruiting, Completed, Terminatedなど） | 患者の参加可能性に基づき、検索対象を絞り込む。 |
| Phase | 試験のフェーズ（Phase 1, 2, 3, 4など） | 介入の成熟度に基づき、検索対象を絞り込む。 |
| Study Type | 研究の種類（Interventional, Observationalなど） | 臨床疑問の性質（PICOかPECOか）に基づき、検索対象を絞り込む。 |
| Sponsor/Collaborator | 資金提供者（製薬会社、大学、NIHなど） | 資金源の信頼性や、特定の研究機関との連携を考慮する。 |
| Location | 実施国、実施施設 | 患者の地理的なアクセス可能性を考慮する。 |
| Study Design | ランダム化、盲検化、介入モデルなど | バイアスリスク評価（ステップ03）の初期スクリーニングに活用する。 |

## AIによる高度な検索戦略の提案

PICO要素だけでなく、これらの高度なフィールドを組み合わせた検索戦略をAIに提案させることで、手動での検索設定の手間を大幅に削減できます。

### 実用的なプロンプト例：高度な検索戦略の提案

目的: 複雑な臨床疑問と制約条件に基づき、ClinicalTrials.govの高度な検索フィールドを考慮した最適な検索戦略を提案させる。

```
あなたは臨床試験検索の専門家です。以下の臨床疑問と制約条件に基づき、ClinicalTrials.govの高度な検索フィールドを最大限に活用した検索戦略を提案してください。

【臨床疑問】
「〇〇疾患の治療において、既存薬Aと新規開発中の薬剤Bを比較した、現在進行中の第III相ランダム化比較試験（RCT）を特定したい。」

【制約条件】
1.  募集状況（Status）: Recruiting または Not yet recruiting
2.  フェーズ（Phase）: Phase 3
3.  研究デザイン（Study Design）: Randomized, Interventional
4.  スポンサー: 製薬会社（Industry）が主導しているもの

【提案形式】
1.  キーワード検索（PICO要素）:
2.  高度な検索フィールドの設定:
    - Status:
    - Phase:
    - Study Type:
    - Study Design:
    - Sponsor:
3.  検索戦略の論理的な説明:
```

AIの期待される応答（例）:
1.  キーワード検索（PICO要素）: "〇〇 disease" AND "Drug A" AND "Drug B"
2.  高度な検索フィールドの設定:
    - Status: Recruiting OR Not yet recruiting
    - Phase: Phase 3
    - Study Type: Interventional
    - Study Design: Randomized Controlled Trial
    - Sponsor: Industry
3.  検索戦略の論理的な説明:
    この戦略は、まずPICO要素で基本的な関連性を確保し、次に高度なフィールドで「現在進行中」「最も信頼性の高いPhase 3」「ランダム化比較試験」「製薬会社主導」という厳しい制約をかけることで、臨床的意義が高く、かつ患者が参加可能な最新の試験に絞り込むことを目的としています。

---
注意点とTips:
*   検索構文の確認: ClinicalTrials.govの検索構文（例：フィールドタグ `[ST]` やブール演算子 `AND/OR`）はAIが生成できないため、AIの提案を基に、手動で検索インターフェースに入力するか、APIを使用する必要があります。
*   過度な絞り込みの回避: 制約条件を増やしすぎると、関連性の高い試験を見逃す可能性があります。最初は緩やかに設定し、結果が多すぎる場合にのみ絞り込みを強化しましょう。

---
次のステップへ:
ステップ02では、AIによる臨床試験データのトレンド分析と、今後のAI活用に関する展望を学びます。
