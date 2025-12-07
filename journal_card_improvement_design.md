# ジャーナルカード UI改善設計

## 問題点

現在のJournalFinderコンポーネントでは、各ジャーナルカードが大きすぎて、ページの多くを占めており、ユーザーが読む気を失う。

## 改善方針

1. **デフォルトで折りたたみ**: 最初はコンパクトな要約のみ表示
2. **展開ボタン**: クリックで詳細情報を表示
3. **コンパクト表示**: カードサイズを小さく、一覧性を向上

## UI設計

### 折りたたみ状態（デフォルト）

```
┌─────────────────────────────────────────────────────┐
│ 📘 BMJ Case Reports  🌐 Open Access  📊 IF: 1.2    │
│ BMJ                                                  │
│                                                      │
│ ⏱️ 1-2 weeks  📖 Acceptance: 50%                    │
│                                                      │
│ [詳細を表示 ▼]                                      │
└─────────────────────────────────────────────────────┘
```

### 展開状態

```
┌─────────────────────────────────────────────────────┐
│ 📘 BMJ Case Reports  🌐 Open Access  📊 IF: 1.2    │
│ BMJ                                                  │
│                                                      │
│ METRICS                        REQUIREMENTS          │
│ ⏱️ 1-2 weeks                   Word Count: No limit │
│ 📖 Acceptance: 50%             Abstract: Structured  │
│                                 Figures/Refs: Unl... │
│                                                      │
│ [Visit Journal] [Author Guidelines]                  │
│                                                      │
│ [詳細を隠す ▲]                                      │
└─────────────────────────────────────────────────────┘
```

## 実装方針

1. **Collapsible/Accordion コンポーネント使用**: shadcn/uiの`Collapsible`を使用
2. **デフォルト状態**: `defaultOpen={false}`
3. **アニメーション**: スムーズな展開/折りたたみ
4. **レイアウト調整**: 折りたたみ時の高さを最小化

## 変更箇所

- `client/src/components/JournalFinder.tsx`
