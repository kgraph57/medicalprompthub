# パフォーマンス最適化計画（Core Web Vitals 95点以上）

## 目標
- Core Web Vitals 95点以上（LCP < 2.5s、FID < 100ms、CLS < 0.1）
- Lighthouseスコア 95点以上（パフォーマンス、アクセシビリティ、ベストプラクティス、SEO）

## 最適化項目

### 1. LCP（Largest Contentful Paint）最適化
- [ ] 画像の最適化（WebP形式、適切なサイズ、遅延読み込み）
- [ ] クリティカルCSSのインライン化
- [ ] フォントの最適化（font-display: swap、サブセット化）
- [ ] サーバーサイドレンダリング（SSR）の検討

### 2. FID（First Input Delay）最適化
- [ ] JavaScriptの最適化（コード分割、ツリーシェイキング）
- [ ] メインスレッドブロッキングの回避
- [ ] 初期バンドルサイズの削減（< 200KB gzipped）

### 3. CLS（Cumulative Layout Shift）最適化
- [ ] 画像・動画のサイズ指定（width、height属性）
- [ ] フォントの読み込み最適化
- [ ] 動的コンテンツのプレースホルダー

### 4. バンドルサイズ最適化
- [ ] コード分割の最適化
- [ ] 不要な依存関係の削除
- [ ] バンドルサイズの監視

### 5. 画像最適化
- [ ] WebP形式への変換
- [ ] レスポンシブ画像の実装
- [ ] 遅延読み込み（lazy loading）

### 6. キャッシュ戦略
- [ ] 静的アセットのキャッシュ
- [ ] Service Workerの最適化
- [ ] CDNの活用（可能な範囲で）

## 測定方法
- Lighthouse（Chrome DevTools）
- PageSpeed Insights
- WebPageTest
- Chrome DevTools Performanceタブ
