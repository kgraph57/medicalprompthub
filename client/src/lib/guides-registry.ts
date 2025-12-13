export interface GuideMetadata {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  tags: string[];
  icon: string;
}

export const guidesRegistry: GuideMetadata[] = [
  // 既存のガイド
  {
    id: 'case-report',
    title: '症例報告執筆ガイド',
    titleEn: 'Case Report Writing Guide',
    description: 'AI活用により、従来の90%の時間を削減する革新的ワークフロー',
    category: '研究・論文',
    difficulty: 'advanced',
    estimatedTime: '40分',
    tags: ['症例報告', '論文執筆', 'AI活用'],
    icon: '📝'
  },
  {
    id: 'english-proofreading',
    title: '英文校正ガイド',
    titleEn: 'English Proofreading Guide',
    description: 'AIを使った効率的な英文校正のテクニック',
    category: '研究・論文',
    difficulty: 'intermediate',
    estimatedTime: '30分',
    tags: ['英文校正', '論文執筆'],
    icon: '✍️'
  },
  {
    id: 'paper-reading',
    title: '論文読解ガイド',
    titleEn: 'Paper Reading Guide',
    description: 'AIを活用した効率的な論文読解法',
    category: '研究・論文',
    difficulty: 'beginner',
    estimatedTime: '35分',
    tags: ['論文読解', '文献レビュー'],
    icon: '📚'
  },
  
  // 優先度の高い新規ガイド
  {
    id: 'conference-presentation',
    title: 'カンファレンス発表資料作成支援',
    titleEn: 'Conference Presentation Support',
    description: 'AIを活用した効果的なカンファレンス発表資料の作成',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '40分',
    tags: ['カンファレンス', '発表資料', 'プレゼンテーション'],
    icon: '🎤'
  },
  {
    id: 'differential-diagnosis',
    title: '鑑別診断リスト生成',
    titleEn: 'Differential Diagnosis Generation',
    description: 'AIによる包括的な鑑別診断リストの作成',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '30分',
    tags: ['鑑別診断', '診断支援'],
    icon: '🔍'
  },
  {
    id: 'patient-explanation',
    title: '患者説明シナリオ作成',
    titleEn: 'Patient Explanation Scenarios',
    description: 'わかりやすく、配慮の行き届いた患者説明の作成',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '40分',
    tags: ['患者説明', 'インフォームド・コンセント'],
    icon: '💬'
  },
  {
    id: 'literature-search',
    title: '論文検索・読解サポート',
    titleEn: 'Literature Search & Reading Support',
    description: 'AIを活用した効率的な文献検索と読解',
    category: '研究・論文',
    difficulty: 'intermediate',
    estimatedTime: '40分',
    tags: ['文献検索', '論文読解', 'エビデンス'],
    icon: '🔬'
  },
  {
    id: 'medical-documents',
    title: '診断書・紹介状作成支援',
    titleEn: 'Medical Document Creation Support',
    description: 'AIで医療文書作成を効率化・標準化',
    category: '文書作成',
    difficulty: 'intermediate',
    estimatedTime: '40分',
    tags: ['診断書', '紹介状', '医療文書'],
    icon: '📄'
  },
  
  // 並行処理で作成した新規ガイド
  {
    id: 'research-protocol',
    title: '研究計画書作成支援',
    titleEn: 'Research Protocol Creation Support',
    description: 'AIを活用した質の高い研究計画書の作成',
    category: '研究・論文',
    difficulty: 'advanced',
    estimatedTime: '50分',
    tags: ['研究計画書', '研究デザイン'],
    icon: '📋'
  },
  {
    id: 'conference-presentation-slides',
    title: '学会発表スライド作成支援',
    titleEn: 'Academic Presentation Slides Support',
    description: 'インパクトのある学会発表スライドの作成',
    category: '研究・論文',
    difficulty: 'intermediate',
    estimatedTime: '45分',
    tags: ['学会発表', 'スライド', 'プレゼンテーション'],
    icon: '📊'
  },
  {
    id: 'ethics-review-application',
    title: '倫理審査申請書類作成支援',
    titleEn: 'Ethics Review Application Support',
    description: '倫理審査申請書類の効率的な作成',
    category: '研究・論文',
    difficulty: 'advanced',
    estimatedTime: '45分',
    tags: ['倫理審査', '研究倫理'],
    icon: '⚖️'
  },
  {
    id: 'new-drug-information',
    title: '新薬情報収集・要約',
    titleEn: 'New Drug Information Collection',
    description: '最新の新薬情報を効率的に収集・要約',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '35分',
    tags: ['新薬', '薬剤情報'],
    icon: '💊'
  },
  {
    id: 'rare-disease-information',
    title: '希少疾患情報収集',
    titleEn: 'Rare Disease Information Collection',
    description: '希少疾患に関する最新情報の収集',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '35分',
    tags: ['希少疾患', '疾患情報'],
    icon: '🧬'
  },
  {
    id: 'guideline-comparison',
    title: '治療ガイドライン比較',
    titleEn: 'Treatment Guideline Comparison',
    description: '複数のガイドラインを比較・統合',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '30分',
    tags: ['ガイドライン', 'エビデンス'],
    icon: '📖'
  },
  {
    id: 'multilingual-medical-consultation',
    title: '多言語医療相談支援',
    titleEn: 'Multilingual Medical Consultation Support',
    description: '多言語での医療相談を円滑に',
    category: '臨床実践',
    difficulty: 'beginner',
    estimatedTime: '25分',
    tags: ['多言語', '医療通訳'],
    icon: '🌐'
  },
  {
    id: 'medical-news-commentary',
    title: '医療ニュース・トピック解説',
    titleEn: 'Medical News Commentary',
    description: '最新の医療ニュースをわかりやすく解説',
    category: '情報収集',
    difficulty: 'beginner',
    estimatedTime: '25分',
    tags: ['医療ニュース', '情報収集'],
    icon: '📰'
  },
  {
    id: 'patient-education-materials',
    title: '患者教育資料作成',
    titleEn: 'Patient Education Materials Creation',
    description: 'わかりやすい患者教育資料の作成',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '35分',
    tags: ['患者教育', '資料作成'],
    icon: '📚'
  },
  {
    id: 'incident-report-creation',
    title: 'インシデントレポート作成支援',
    titleEn: 'Incident Report Creation Support',
    description: '正確で建設的なインシデントレポートの作成',
    category: '文書作成',
    difficulty: 'intermediate',
    estimatedTime: '30分',
    tags: ['インシデント', '医療安全'],
    icon: '⚠️'
  },
  {
    id: 'consultation-email',
    title: '専門医へのコンサルトメール作成',
    titleEn: 'Consultation Email Creation',
    description: '効果的なコンサルトメールの作成',
    category: '文書作成',
    difficulty: 'intermediate',
    estimatedTime: '30分',
    tags: ['コンサルト', 'メール'],
    icon: '✉️'
  },
  {
    id: 'clinical-trial-search',
    title: '臨床試験情報検索',
    titleEn: 'Clinical Trial Search',
    description: '関連する臨床試験情報の効率的な検索',
    category: '研究・論文',
    difficulty: 'intermediate',
    estimatedTime: '35分',
    tags: ['臨床試験', '情報検索'],
    icon: '🔬'
  },
  {
    id: 'medical-statistics-consultation',
    title: '医療統計・データ分析相談',
    titleEn: 'Medical Statistics Consultation',
    description: 'AIを活用した医療統計の理解と分析',
    category: '研究・論文',
    difficulty: 'advanced',
    estimatedTime: '45分',
    tags: ['統計', 'データ分析'],
    icon: '📈'
  },
  {
    id: 'image-diagnosis-report-reading',
    title: '画像診断レポート読解支援',
    titleEn: 'Image Diagnosis Report Reading Support',
    description: '画像診断レポートの理解を深める',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '30分',
    tags: ['画像診断', 'レポート読解'],
    icon: '🩻'
  },
  {
    id: 'post-discharge-follow-up',
    title: '退院後フォローアップ計画作成',
    titleEn: 'Post-Discharge Follow-up Planning',
    description: '包括的な退院後フォローアップ計画の作成',
    category: '臨床実践',
    difficulty: 'intermediate',
    estimatedTime: '35分',
    tags: ['退院計画', 'フォローアップ'],
    icon: '🏥'
  },
  {
    id: 'medical-safety-manual',
    title: '医療安全マニュアル作成',
    titleEn: 'Medical Safety Manual Creation',
    description: '実践的な医療安全マニュアルの作成',
    category: '文書作成',
    difficulty: 'advanced',
    estimatedTime: '45分',
    tags: ['医療安全', 'マニュアル'],
    icon: '🛡️'
  },
  {
    id: 'infection-control-manual',
    title: '感染対策マニュアル作成',
    titleEn: 'Infection Control Manual Creation',
    description: '効果的な感染対策マニュアルの作成',
    category: '文書作成',
    difficulty: 'advanced',
    estimatedTime: '45分',
    tags: ['感染対策', 'マニュアル'],
    icon: '🦠'
  },
  {
    id: 'polypharmacy-support',
    title: 'ポリファーマシー対策支援',
    titleEn: 'Polypharmacy Support',
    description: '多剤併用の適正化を支援',
    category: '臨床実践',
    difficulty: 'advanced',
    estimatedTime: '40分',
    tags: ['ポリファーマシー', '薬剤管理'],
    icon: '💊'
  },
  {
    id: 'palliative-care-planning',
    title: '緩和ケア計画立案支援',
    titleEn: 'Palliative Care Planning Support',
    description: '患者中心の緩和ケア計画の立案',
    category: '臨床実践',
    difficulty: 'advanced',
    estimatedTime: '45分',
    tags: ['緩和ケア', 'ケア計画'],
    icon: '🕊️'
  }
];

export function getGuideById(id: string): GuideMetadata | undefined {
  return guidesRegistry.find(guide => guide.id === id);
}

export function getGuidesByCategory(category: string): GuideMetadata[] {
  return guidesRegistry.filter(guide => guide.category === category);
}

export function getGuidesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): GuideMetadata[] {
  return guidesRegistry.filter(guide => guide.difficulty === difficulty);
}

export function searchGuides(query: string): GuideMetadata[] {
  const lowerQuery = query.toLowerCase();
  return guidesRegistry.filter(guide => 
    guide.title.toLowerCase().includes(lowerQuery) ||
    guide.titleEn.toLowerCase().includes(lowerQuery) ||
    guide.description.toLowerCase().includes(lowerQuery) ||
    guide.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
