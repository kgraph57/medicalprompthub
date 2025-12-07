import re

# prompts-full.tsファイルを読み込む
with open('/home/ubuntu/medicalprompthub/client/src/lib/prompts-full.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 修正マッピング: [プレースホルダー] -> {{key}}
# 各プロンプトで使用されているプレースホルダーとそれに対応するキーのマッピング
replacements = [
    # diagnosis-symptom-analysis
    (r'\[患者の症状や言葉を入力\]', '{{symptom}}'),
    
    # diagnosis-lab-interpretation
    (r'\[異常な検査項目と数値を入力\]', '{{lab_results}}'),
    (r'\[年齢、性別、主訴など\]', '{{patient_info}}'),
    
    # treatment-planning
    (r'\[診断名を入力\]', '{{diagnosis}}'),
    (r'\[年齢、合併症、アレルギーなど\]', '{{patient_context}}'),
    
    # doc-referral-letter
    (r'\[紹介先診療科\]', '{{target_dept}}'),
    (r'\[患者氏名\]', '{{patient_name}}'),
    (r'\[診断名\]', '{{diagnosis}}'),
    (r'\[紹介の目的（例：精査加療、手術依頼）\]', '{{purpose}}'),
    (r'\[これまでの経過、検査結果、治療内容\]', '{{history}}'),
    (r'\[処方薬リスト\]', '{{medications}}'),
    
    # doc-discharge-summary
    (r'\[日付ごとのイベント、検査、治療変更などを入力\]', '{{course}}'),
    
    # med-renal-dosing
    (r'\[薬剤名\]', '{{drug_name}}'),
    (r'\[年齢/性別\]', '{{patient_age_sex}}'),
    (r'\[Cre値\]', '{{creatinine}}'),
    (r'\[eGFRまたはCCr\]', '{{renal_function}}'),
    
    # med-interaction-check
    (r'\[薬剤名を入力（カンマ区切りまたは改行）\]', '{{drug_list}}'),
    
    # comm-patient-education
    (r'\[診断名や治療法、生活指導の内容\]', '{{topic}}'),
    (r'\[例：高齢の患者さん、小学生の子供を持つ親\]', '{{target}}'),
    
    # comm-bad-news
    (r'\[例：癌の再発、治療の中止など\]', '{{news}}'),
    (r'\[理解度、家族背景など\]', '{{patient_context}}'),
    
    # lit-paper-summary
    (r'\[Abstractのテキストを貼り付け\]', '{{abstract}}'),
    
    # res-timeline-builder
    (r'\[日付ごとのメモや経過を入力\]', '{{notes}}'),
    
    # com-mentor-email
    (r'\[例：抄録の確認をお願いしたい、学会発表の予演会をお願いしたい\]', '{{request}}'),
    (r'\[例：来週の火曜日が締め切り、現在はドラフトが完成した段階\]', '{{deadline}}'),
    
    # res-journal-finder
    (r'\[タイトルや要旨を入力\]', '{{content}}'),
    (r'\[例：Impact Factor 3以上、査読が早い、オープンアクセス希望\]', '{{preferences}}'),
    
    # res-case-intro
    (r'\[疾患名や背景知識\]', '{{background}}'),
    (r'\[今回の症例の特異な点\]', '{{unique_features}}'),
    (r'\[この症例から得られる教訓\]', '{{significance}}'),
    
    # res-case-discussion
    (r'\[症例の主な特徴\]', '{{summary}}'),
    (r'\[議論したい点、文献との比較\]', '{{points}}'),
    (r'\[読者に伝えたいこと\]', '{{conclusion}}'),
    
    # res-english-proofread
    (r'\[校正したい英文\]', '{{text}}'),
]

# 置換を実行
for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# ファイルに書き込む
with open('/home/ubuntu/medicalprompthub/client/src/lib/prompts-full.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("プロンプトの修正が完了しました。")
print(f"合計 {len(replacements)} 個のプレースホルダーを置換しました。")

