# Medical Prompt Hub - 2025年デザインシステム

## デザイン原則

世界最高峰のプロダクトデザイン（Notion、Linear、Twitter/X、Instagram、Apple HIG 2025）を参考にした、情報密度の高いモダンなデザインシステム。

### 核心原則

1. **情報密度の最大化**：無駄な余白を徹底的に削除
2. **タイトなレイアウト**：1画面により多くの情報を表示
3. **適切なタイポグラフィ**：読みやすさを維持しながらコンパクトに
4. **レスポンシブ設計**：モバイルとデスクトップで最適な体験

## タイポグラフィ

### モバイル（< 1024px）

| 要素 | サイズ | 行間 | 太さ |
|------|--------|------|------|
| Display | 24px | 1.2 | Bold |
| H1 | 20px | 1.3 | Bold |
| H2 | 18px | 1.3 | SemiBold |
| H3 | 16px | 1.4 | SemiBold |
| Body | 14px | 1.5 | Regular |
| Small | 12px | 1.4 | Regular |
| Tiny | 10px | 1.3 | Medium |

### デスクトップ（≥ 1024px）

| 要素 | サイズ | 行間 | 太さ |
|------|--------|------|------|
| Display | 32px | 1.2 | Bold |
| H1 | 24px | 1.3 | Bold |
| H2 | 20px | 1.3 | SemiBold |
| H3 | 18px | 1.4 | SemiBold |
| Body | 16px | 1.5 | Regular |
| Small | 14px | 1.4 | Regular |
| Tiny | 12px | 1.3 | Medium |

## スペーシング

### モバイル（< 1024px）

| 用途 | サイズ |
|------|--------|
| セクション縦パディング | 16px～24px |
| セクション横パディング | 12px～16px |
| カード内パディング | 12px～16px |
| 要素間マージン（小） | 8px |
| 要素間マージン（中） | 12px |
| 要素間マージン（大） | 16px |
| セクション間マージン | 24px～32px |

### デスクトップ（≥ 1024px）

| 用途 | サイズ |
|------|--------|
| セクション縦パディング | 32px～48px |
| セクション横パディング | 24px～32px |
| カード内パディング | 20px～24px |
| 要素間マージン（小） | 12px |
| 要素間マージン（中） | 16px |
| 要素間マージン（大） | 24px |
| セクション間マージン | 48px～64px |

## ボタン

### モバイル（< 1024px）

| タイプ | 高さ | パディング | フォントサイズ | 角丸 |
|--------|------|------------|----------------|------|
| Primary | 40px | 16px | 14px | 8px |
| Secondary | 36px | 12px | 14px | 8px |
| Small | 32px | 12px | 12px | 6px |
| Icon | 32px | 8px | - | 6px |

### デスクトップ（≥ 1024px）

| タイプ | 高さ | パディング | フォントサイズ | 角丸 |
|--------|------|------------|----------------|------|
| Primary | 44px | 20px | 16px | 8px |
| Secondary | 40px | 16px | 16px | 8px |
| Small | 36px | 16px | 14px | 6px |
| Icon | 36px | 10px | - | 6px |

## カード

### モバイル（< 1024px）

- パディング：12px～16px
- 角丸：8px
- シャドウ：subtle（y=1px, blur=2px, opacity=10%）
- ボーダー：1px solid border/50

### デスクトップ（≥ 1024px）

- パディング：20px～24px
- 角丸：12px
- シャドウ：subtle（y=2px, blur=4px, opacity=10%）
- ボーダー：1px solid border/50

## ヘッダー・ナビゲーション

### モバイル（< 1024px）

- ヘッダー高さ：48px
- ボトムナビ高さ：48px
- アイコンサイズ：20px
- フォントサイズ：12px

### デスクトップ（≥ 1024px）

- サイドバー幅（展開）：208px
- サイドバー幅（折りたたみ）：48px
- ナビアイテム高さ：36px
- アイコンサイズ：16px
- フォントサイズ：14px

## カラーシステム

### プライマリ

- Primary: #2563eb（青）
- Primary Hover: #1d4ed8
- Primary Light: #dbeafe

### セマンティック

- Success: #10b981（緑）
- Warning: #f59e0b（オレンジ）
- Error: #ef4444（赤）
- Info: #3b82f6（青）

### ニュートラル

- Background: #ffffff
- Surface: #f9fafb
- Border: #e5e7eb
- Text Primary: #111827
- Text Secondary: #6b7280
- Text Muted: #9ca3af

## アニメーション

- Duration: 200ms～300ms
- Easing: ease-in-out
- Hover: transform scale(1.02)
- Active: transform scale(0.98)

## レスポンシブブレークポイント

- Mobile: < 640px
- Tablet: 640px～1023px
- Desktop: ≥ 1024px

## 参考プロダクト

1. **Notion Mobile**：情報密度、タイトなレイアウト
2. **Linear**：洗練されたタイポグラフィ、適切な余白
3. **Twitter (X)**：効率的なスペース使用、高い情報密度
4. **Instagram**：コンパクトなUI、スムーズなアニメーション
5. **Apple HIG 2025**：Clarity & Calm、One Hierarchy

## 実装ガイドライン

### Tailwind CSS クラス

#### モバイル優先

```html
<!-- 基本的にモバイルサイズを指定し、lg:でデスクトップを上書き -->
<div class="p-3 lg:p-6">
  <h1 class="text-xl lg:text-2xl">タイトル</h1>
  <p class="text-sm lg:text-base">本文</p>
</div>
```

#### ボタン

```html
<!-- Primary Button -->
<button class="h-10 px-4 text-sm lg:h-11 lg:px-5 lg:text-base rounded-lg bg-primary">
  ボタン
</button>
```

#### カード

```html
<!-- Card -->
<div class="p-3 lg:p-5 rounded-lg lg:rounded-xl border shadow-sm">
  コンテンツ
</div>
```

## 禁止事項

1. ❌ 過度な余白・パディング
2. ❌ 巨大なボタン（高さ60px以上）
3. ❌ 不必要なアニメーション
4. ❌ 低い情報密度
5. ❌ 時代遅れのデザインパターン

## チェックリスト

- [ ] モバイルで1画面に十分な情報が表示される
- [ ] デスクトップで快適に閲覧できる
- [ ] ボタンが適切なサイズ（高さ40px～44px）
- [ ] 余白が適切（過度でない）
- [ ] タイポグラフィが読みやすい
- [ ] レスポンシブが正しく動作する
- [ ] アニメーションがスムーズ
- [ ] 2025年の最新トレンドに準拠

## まとめ

このデザインシステムは、世界最高峰のプロダクトデザインを参考に、情報密度を最大化しながら、読みやすさとユーザビリティを維持することを目指しています。モバイルとデスクトップの両方で最適な体験を提供し、医療従事者が効率的にプロンプトライブラリを利用できるようにします。
