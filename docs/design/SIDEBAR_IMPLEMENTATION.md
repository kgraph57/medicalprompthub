# サイドバー実装ドキュメント

## 実装日時
2025年12月10日

## 概要

医療従事者向けAIプロンプトライブラリのウェブサイトに、Manusのような展開・折りたたみ可能なサイドバーを実装しました。ユーザーは画面スペースを有効活用しながら、必要に応じてナビゲーションを展開できます。

## デザインコンセプト

### 参考デザイン

Manusのサイドバーを参考に、以下の特徴を実装しました：

1. **展開状態（幅240px）**：アイコン + テキストラベルを表示
2. **折りたたみ状態（幅60px）**：アイコンのみ表示、ホバー時にツールチップ
3. **スムーズなアニメーション**：CSS transitionで300msのアニメーション
4. **状態の永続化**：localStorageで保存し、次回訪問時も状態を維持

### UI/UXの特徴

- **ワンクリックトグル**：サイドバー上部のボタンで簡単に切り替え
- **視覚的フィードバック**：トグルボタンのアイコンが状態を示す（`ChevronLeft` / `ChevronRight`）
- **アクセシビリティ**：aria-labelで適切な説明を提供
- **レスポンシブ対応**：デスクトップとモバイルで異なる動作

## 実装内容

### 1. useSidebarState Hook

サイドバーの展開・折りたたみ状態を管理するカスタムフックを作成しました。

**ファイル**: `client/src/hooks/useSidebarState.ts`

```typescript
import { useState, useEffect } from "react";

const SIDEBAR_STATE_KEY = "sidebar-collapsed";

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_STATE_KEY);
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, String(isCollapsed));
  }, [isCollapsed]);

  const toggle = () => setIsCollapsed((prev) => !prev);

  return { isCollapsed, setIsCollapsed, toggle };
}
```

**機能**：
- 初期状態をlocalStorageから取得
- 状態変更時にlocalStorageに保存
- `toggle`関数で状態を切り替え

### 2. Layout.tsx の改修

既存の`Layout.tsx`を大幅に改修し、展開・折りたたみ機能を実装しました。

**ファイル**: `client/src/components/Layout.tsx`

#### 主要な変更点

**1. サイドバーの幅を動的に変更**

```tsx
<aside className={cn(
  "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border/50 transition-all duration-300",
  isCollapsed ? "lg:w-16" : "lg:w-64"
)}>
```

- 折りたたみ時：`w-16`（64px）
- 展開時：`w-64`（256px）
- `transition-all duration-300`でスムーズなアニメーション

**2. ヘッダー部分の動的表示**

```tsx
<div className={cn(
  "flex-shrink-0 flex items-center border-b border-border/50 transition-all duration-300",
  collapsed ? "px-3 py-4 justify-center" : "px-6 py-6 justify-between"
)}>
  {!collapsed && (
    <div>
      <Link href="/">
        <h1 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Medical Prompt Hub
        </h1>
      </Link>
      <p className="text-xs text-muted-foreground mt-1">For Healthcare Professionals</p>
    </div>
  )}
  {collapsed && (
    <Link href="/">
      <Activity className="w-6 h-6 text-primary" />
    </Link>
  )}
  <button onClick={toggle}>
    {collapsed ? <ChevronRight /> : <ChevronLeft />}
  </button>
</div>
```

- 折りたたみ時：ロゴアイコンのみ表示
- 展開時：ロゴ + サイトタイトル + サブタイトル表示

**3. NavItemコンポーネントの抽出**

再利用可能な`NavItem`コンポーネントを作成し、コードの重複を削減しました。

```tsx
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed: boolean;
}

function NavItem({ icon, label, active, onClick, collapsed }: NavItemProps) {
  const button = (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "font-medium transition-all duration-200",
        active && "bg-secondary text-secondary-foreground",
        collapsed ? "w-10 h-10 p-0 justify-center" : "w-full justify-start"
      )}
      onClick={onClick}
    >
      <span className={cn(collapsed ? "" : "mr-2")}>
        {icon}
      </span>
      {!collapsed && label}
    </Button>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
```

**機能**：
- 折りたたみ時：アイコンのみ表示、ツールチップでラベル表示
- 展開時：アイコン + ラベル表示
- アクティブ状態のスタイリング

**4. フッター部分の動的表示**

```tsx
<div className={cn(
  "flex-shrink-0 border-t border-border/50 transition-all duration-300",
  collapsed ? "px-3 py-4" : "px-6 py-4"
)}>
  {!collapsed && (
    <div className="text-xs text-muted-foreground space-y-2">
      <p>© 2024 Medical Prompt Hub</p>
      <div className="flex flex-col gap-2">
        <Link href="/ai-literacy">AIリテラシー</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </div>
  )}
  {collapsed && (
    <div className="flex flex-col gap-2 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/ai-literacy">
            <button className="p-2 hover:bg-accent rounded-md">
              <Lightbulb className="w-4 h-4" />
            </button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>AIリテラシー</p>
        </TooltipContent>
      </Tooltip>
      {/* FAQ, Contact も同様 */}
    </div>
  )}
</div>
```

- 折りたたみ時：アイコンボタンのみ、ツールチップ表示
- 展開時：テキストリンク表示

**5. メインコンテンツの調整**

```tsx
<main className={cn(
  "flex-1 overflow-y-auto transition-all duration-300",
  "pt-16 lg:pt-0",
  isCollapsed ? "lg:ml-16" : "lg:ml-64"
)}>
  {children}
</main>
```

- サイドバーの幅に応じて左マージンを動的に変更
- スムーズなアニメーション

### 3. カテゴリーの表示制御

折りたたみ状態では、カテゴリー一覧を非表示にしました。

```tsx
{!collapsed && (
  <>
    <div className="mt-6 mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      Categories
    </div>
    <div className="space-y-1">
      {categories.map((category) => (
        <NavItem key={category.id} {...} />
      ))}
    </div>
  </>
)}
```

**理由**：
- カテゴリー数が多いため、折りたたみ時に表示すると視認性が低下
- 主要なナビゲーション項目（Home、Courses、Tips、Workflow、Favorites）に集中

## 技術実装

### アニメーション

CSS transitionを使用してスムーズなアニメーションを実現しました。

```css
transition-all duration-300
```

- `transition-all`：すべてのプロパティをアニメーション
- `duration-300`：300ms（0.3秒）のアニメーション時間

### 状態管理

React Hooksを使用してシンプルな状態管理を実装しました。

- `useState`：コンポーネント内の状態管理
- `useEffect`：localStorageとの同期
- カスタムフック：ロジックの再利用

### レスポンシブ対応

**デスクトップ（lg以上）**：
- 展開・折りたたみ可能なサイドバー
- 固定配置（`fixed`）
- メインコンテンツは左マージンで調整

**モバイル・タブレット（lg未満）**：
- 既存のモバイルメニュー（オーバーレイ）を維持
- トグル機能は無効

## ユーザー体験

### 折りたたみ状態の利点

1. **画面スペースの有効活用**：コンテンツ表示領域が広がる
2. **集中力の向上**：ナビゲーションが目立たなくなり、コンテンツに集中できる
3. **素早いアクセス**：アイコンで直感的にナビゲーション

### 展開状態の利点

1. **明確なラベル**：テキストで明確にナビゲーション項目を確認
2. **カテゴリー一覧**：すべてのカテゴリーを一覧表示
3. **フッターリンク**：追加情報へのアクセス

### 状態の永続化

localStorageを使用して、ユーザーの選択を保存します。

- 折りたたんだ状態で離脱 → 次回訪問時も折りたたまれている
- 展開した状態で離脱 → 次回訪問時も展開されている

## パフォーマンス

### 最適化

1. **CSS transitionの使用**：JavaScriptアニメーションよりも高速
2. **条件付きレンダリング**：不要な要素は非表示
3. **localStorageの効率的な使用**：状態変更時のみ保存

### トレードオフ

- **メリット**：
  - スムーズなアニメーション
  - 直感的な操作
  - 状態の永続化

- **デメリット**：
  - 若干のコード複雑性の増加
  - localStorageの使用（プライバシー考慮）

## 今後の拡張

### 追加機能の候補

1. **キーボードショートカット**：
   - `Cmd+B` / `Ctrl+B`でサイドバーをトグル

2. **アニメーション設定**：
   - ユーザーがアニメーションの有効/無効を選択可能

3. **サイドバーの位置**：
   - 左右の位置を選択可能（RTL対応）

4. **カスタマイズ**：
   - ナビゲーション項目の並び順を変更
   - お気に入りカテゴリーをピン留め

## アクセシビリティ

### 実装した配慮

1. **aria-label**：トグルボタンに適切な説明
2. **ツールチップ**：折りたたみ時にラベルを表示
3. **キーボードナビゲーション**：すべてのボタンがキーボードで操作可能
4. **フォーカス管理**：適切なフォーカススタイル

### 今後の改善

1. **スクリーンリーダー対応**：
   - 状態変更時の通知
   - ランドマークの適切な使用

2. **高コントラストモード**：
   - アイコンの視認性向上

## コミット情報

- **コミットハッシュ**: 8ea2242
- **ブランチ**: main
- **コミットメッセージ**: feat: Manusのような展開・折りたたみ可能なサイドバーを実装
- **変更ファイル数**: 2ファイル
- **追加行数**: 466行
- **削除行数**: 356行

## 参考資料

- [Manus](https://manus.im/) - デザイン参考
- [shadcn/ui](https://ui.shadcn.com/) - UIコンポーネント
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [React Hooks](https://react.dev/reference/react) - 状態管理
