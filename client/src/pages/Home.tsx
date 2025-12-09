import { Layout } from "@/components/Layout";
import { fullPrompts } from "@/lib/prompts-full";
import { Search, ArrowRight, GraduationCap } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { updateSEO, addHomeStructuredData } from "@/lib/seo";
import { trackSearch, trackCategorySelect } from "@/lib/analytics";
import { useGamification } from "@/hooks/useGamification";

export default function Home() {
  useEffect(() => {
    updateSEO({
      title: "医療従事者のためのAIプロンプトライブラリ",
      description: "医師や研究者がAI（ChatGPT, Claudeなど）を臨床、研究、教育に効果的に活用するためのプロンプト集。症例報告の作成、統計解析のコード生成、学会発表の準備など、具体的なタスクに特化した「使える」プロンプトを提供します。",
      path: "/",
      keywords: "医療,AI,プロンプト,症例報告,統計解析,学会発表,医学研究,医療従事者,医師,看護師,薬剤師"
    });
    addHomeStructuredData();
  }, []);
  
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { stats } = useGamification();

  // 検索イベントを追跡
  useEffect(() => {
    if (searchQuery.trim()) {
      trackSearch(searchQuery, filteredPrompts.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // カテゴリ選択イベントを追跡
  useEffect(() => {
    if (selectedCategory) {
      trackCategorySelect(selectedCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  // 検索・フィルタリングされたプロンプト
  const filteredPrompts = useMemo(() => {
    const filtered = fullPrompts.filter((prompt) => {
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? prompt.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
    return filtered;
  }, [searchQuery, selectedCategory]);

  // よく使われるプロンプト（上位4つ）
  const topPrompts = useMemo(() => fullPrompts.slice(0, 4), []);

  return (
    <Layout>
      <div className="min-h-screen">
        {/* ヒーローセクション - 国家プロジェクトレベル */}
        <section className="relative py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* メインメッセージ */}
            <div className="text-center mb-12">
              <h1 className="text-display font-bold mb-4" style={{ color: 'var(--neutral-900)' }}>
                医療従事者のための
                <br />
                AIプロンプトライブラリ
              </h1>
              <p className="text-h3 font-normal max-w-2xl mx-auto" style={{ color: 'var(--neutral-600)' }}>
                100以上の実践的なプロンプトで、診断、研究、文書作成を支援
              </p>
            </div>
            
            {/* 検索バー - 最優先機能 */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--neutral-400)' }} />
                <input
                  type="text"
                  placeholder="プロンプトを検索（例：鑑別診断、症例報告、統計解析）"
                  className="input-field w-full h-14 pl-12 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* セカンダリアクション */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLocation('/guides')}
                className="px-6 py-3 text-body font-semibold transition-colors duration-200"
                style={{ color: 'var(--primary-600)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-700)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-600)'}
              >
                使い方を学ぶ →
              </button>
            </div>
          </div>
        </section>

        {/* クイックアクセスセクション */}
        <section className="py-12" style={{ backgroundColor: 'var(--neutral-50)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-h2 font-semibold mb-6" style={{ color: 'var(--neutral-900)' }}>
              よく使われるプロンプト
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => setLocation(`/prompts/${prompt.id}`)}
                  className="group p-6 bg-white rounded-lg border transition-all duration-200 text-left"
                  style={{ borderColor: 'var(--neutral-200)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-300)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--neutral-200)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-caption font-medium uppercase tracking-wide" style={{ color: 'var(--primary-600)' }}>
                      {prompt.category}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-all duration-200" style={{ color: 'var(--neutral-400)' }} />
                  </div>
                  <h3 className="text-body font-semibold mb-2" style={{ color: 'var(--neutral-900)' }}>
                    {prompt.title}
                  </h3>
                  <p className="text-caption line-clamp-2" style={{ color: 'var(--neutral-600)' }}>
                    {prompt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 学習進捗セクション - 条件付き表示 */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            {stats.totalXP > 0 ? (
              // 進捗がある場合
              <>
                <div className="text-center mb-8">
                  <h2 className="text-h2 font-semibold mb-2" style={{ color: 'var(--neutral-900)' }}>
                    学習の進捗
                  </h2>
                  <p className="text-body" style={{ color: 'var(--neutral-600)' }}>
                    継続的な学習で、AIスキルを向上させましょう
                  </p>
                </div>
                
                <div className="rounded-2xl p-8 border" style={{ backgroundColor: 'var(--neutral-50)', borderColor: 'var(--neutral-200)' }}>
                  {/* レベルと進捗バー */}
                  <div className="flex items-center gap-8 mb-8">
                    {/* レベルアイコン */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-20 h-20 rounded-full flex items-center justify-center"
                        style={{ 
                          background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                          boxShadow: 'var(--shadow-lg)'
                        }}
                      >
                        <span className="text-3xl font-bold text-white">
                          {stats.currentLevel}
                        </span>
                      </div>
                      <p className="text-caption text-center mt-2" style={{ color: 'var(--neutral-600)' }}>
                        レベル {stats.currentLevel}
                      </p>
                    </div>
                    
                    {/* 進捗バー */}
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-body font-semibold" style={{ color: 'var(--neutral-900)' }}>
                          経験値
                        </span>
                        <span className="text-caption" style={{ color: 'var(--neutral-600)' }}>
                          {stats.totalXP} / {stats.nextLevelXP} XP
                        </span>
                      </div>
                      <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--neutral-200)' }}>
                        <div 
                          className="h-full transition-all duration-500 ease-out"
                          style={{ 
                            width: `${(stats.totalXP / stats.nextLevelXP) * 100}%`,
                            background: 'linear-gradient(90deg, var(--primary-500), var(--primary-600))'
                          }}
                        />
                      </div>
                      <p className="text-caption mt-2" style={{ color: 'var(--neutral-500)' }}>
                        次のレベルまで {stats.nextLevelXP - stats.totalXP} XP
                      </p>
                    </div>
                  </div>
                  
                  {/* 統計 */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-white rounded-lg border" style={{ borderColor: 'var(--neutral-200)' }}>
                      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--neutral-900)' }}>
                        {stats.totalLessonsCompleted}
                      </p>
                      <p className="text-caption" style={{ color: 'var(--neutral-600)' }}>
                        レッスン完了
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border" style={{ borderColor: 'var(--neutral-200)' }}>
                      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--neutral-900)' }}>
                        0
                      </p>
                      <p className="text-caption" style={{ color: 'var(--neutral-600)' }}>
                        バッジ獲得
                      </p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border" style={{ borderColor: 'var(--neutral-200)' }}>
                      <p className="text-3xl font-bold mb-1" style={{ color: 'var(--neutral-900)' }}>
                        {stats.averageXP}
                      </p>
                      <p className="text-caption" style={{ color: 'var(--neutral-600)' }}>
                        平均XP
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // 進捗がない場合（初回訪問者）
              <div className="text-center py-12 px-6 rounded-2xl border" style={{ backgroundColor: 'var(--neutral-50)', borderColor: 'var(--neutral-200)' }}>
                <GraduationCap className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--primary-500)' }} />
                <h2 className="text-h2 font-semibold mb-3" style={{ color: 'var(--neutral-900)' }}>
                  AIスキルを体系的に学ぶ
                </h2>
                <p className="text-body mb-6 max-w-xl mx-auto" style={{ color: 'var(--neutral-600)' }}>
                  プロンプトエンジニアリングの基礎から実践まで、
                  ステップバイステップで学べるコースを用意しています
                </p>
                <button
                  onClick={() => setLocation('/courses')}
                  className="btn-primary"
                >
                  学習を始める
                </button>
              </div>
            )}
          </div>
        </section>

        {/* プロンプトグリッドセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* セクションヘッダー */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-h2 font-semibold mb-2" style={{ color: 'var(--neutral-900)' }}>
                  {searchQuery || selectedCategory ? '検索結果' : 'すべてのプロンプト'}
                </h2>
                <p className="text-body" style={{ color: 'var(--neutral-600)' }}>
                  {filteredPrompts.length}件のプロンプト
                </p>
              </div>
              
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'var(--primary-50)', 
                    color: 'var(--primary-700)' 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-100)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-50)'}
                >
                  {selectedCategory} ×
                </button>
              )}
            </div>
            
            {/* プロンプトカードグリッド - 2列に変更 */}
            {filteredPrompts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => setLocation(`/prompts/${prompt.id}`)}
                    className="group p-6 bg-white rounded-xl border transition-all duration-200 text-left"
                    style={{ borderColor: 'var(--neutral-200)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary-300)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--neutral-200)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* カテゴリバッジ */}
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className="px-3 py-1 text-caption font-semibold rounded-full border"
                        style={{ 
                          backgroundColor: 'var(--primary-50)', 
                          color: 'var(--primary-700)',
                          borderColor: 'var(--primary-100)'
                        }}
                      >
                        {prompt.category}
                      </span>
                      <ArrowRight className="w-5 h-5 transition-all duration-200" style={{ color: 'var(--neutral-400)' }} />
                    </div>
                    
                    {/* タイトル */}
                    <h3 className="text-h3 font-semibold mb-3 transition-colors duration-200" style={{ color: 'var(--neutral-900)' }}>
                      {prompt.title}
                    </h3>
                    
                    {/* 説明 - 3行表示 */}
                    <p className="text-body leading-relaxed line-clamp-3" style={{ color: 'var(--neutral-600)' }}>
                      {prompt.description}
                    </p>
                    
                    {/* ボトムアクセント */}
                    <div className="mt-4 pt-4 border-t opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ borderColor: 'var(--neutral-100)' }}>
                      <span className="text-caption font-medium" style={{ color: 'var(--primary-600)' }}>
                        詳細を見る →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // 検索結果なし
              <div className="text-center py-20">
                <Search className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--neutral-300)' }} />
                <h3 className="text-h3 font-semibold mb-2" style={{ color: 'var(--neutral-900)' }}>
                  プロンプトが見つかりませんでした
                </h3>
                <p className="text-body mb-6" style={{ color: 'var(--neutral-600)' }}>
                  検索条件を変更してお試しください
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="btn-secondary"
                >
                  検索をクリア
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
