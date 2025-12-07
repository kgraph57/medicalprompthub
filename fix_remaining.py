import re

# prompts-full.tsファイルを読み込む
with open('/home/ubuntu/medicalprompthub/client/src/lib/prompts-full.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 残りの修正マッピング
remaining_replacements = [
    # res-cq-pico
    (r'\[疑問の内容を入力\]', '{{question}}'),
    
    # res-pubmed-query
    (r'\[PICOの内容を入力\]', '{{pico}}'),
    
    # res-gap-analysis
    (r'\[先行研究の要約リストを入力\]', '{{literature_summary}}'),
    (r'\[自分の研究テーマを入力\]', '{{research_theme}}'),
    
    # res-check-care
    (r'\[ドラフトを入力\]', '{{draft}}'),
    
    # res-ref-format-convert
    (r'\[例: Vancouver Style, APA Style, New England Journal of Medicine Style\]', '{{target_style}}'),
    (r'\[文献リストを入力\]', '{{references}}'),
    
    # jc-quick-summary
    (r'\[Abstractまたは本文を入力\]', '{{paper_text}}'),
    
    # jc-clinical-application
    (r'\[論文の要約や結論を入力\]', '{{paper_summary}}'),
    (r'\[診療科や専門分野を入力\]', '{{specialty}}'),
    
    # jc-slide-outline
    (r'\[論文のタイトル、要約などを入力\]', '{{paper_info}}'),
    
    # pat-term-translation
    (r'\[説明したい用語を入力\]', '{{medical_term}}'),
    
    # pat-treatment-comparison
    (r'\[治療法Aの名前\]', '{{treatment_a}}'),
    (r'\[治療法Bの名前\]', '{{treatment_b}}'),
    (r'\[患者の状況や背景\]', '{{patient_context}}'),
    
    # pat-faq-response
    (r'\[患者からの質問を入力\]', '{{question}}'),
    (r'\[診断名や状況を入力\]', '{{context}}'),
    
    # pat-handout-generator
    (r'\[病気や治療の詳細\]', '{{content}}'),
]

# 置換を実行
for pattern, replacement in remaining_replacements:
    content = re.sub(pattern, replacement, content)

# ファイルに書き込む
with open('/home/ubuntu/medicalprompthub/client/src/lib/prompts-full.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("残りのプロンプトの修正が完了しました。")
print(f"合計 {len(remaining_replacements)} 個のプレースホルダーを置換しました。")

