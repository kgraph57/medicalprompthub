import re
import json

# prompts-full.tsファイルを読み込む
with open('/home/ubuntu/medicalprompthub/client/src/lib/prompts-full.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# テンプレート内のプレースホルダーを{{key}}形式に変換する関数
def fix_template_placeholders(template, inputs):
    """
    テンプレート内の[...]プレースホルダーを{{key}}形式に変換
    """
    fixed_template = template
    
    # 各inputのkeyに対して、テンプレート内のプレースホルダーを置換
    for input_item in inputs:
        key = input_item['key']
        # [label]形式を{{key}}形式に置換
        # 例: [主訴を入力] -> {{chief_complaint}}
        # ただし、既に{{key}}形式になっている場合は何もしない
        
    return fixed_template

# プロンプトごとに修正が必要かチェック
def analyze_prompts(content):
    """
    各プロンプトのテンプレートとinputsを分析し、修正が必要なものをリストアップ
    """
    # プロンプトの定義を抽出（簡易的な方法）
    prompt_pattern = r'\{\s*id:\s*["\']([^"\']+)["\'].*?template:\s*`([^`]+)`.*?inputs:\s*\[(.*?)\]'
    
    # より正確な分析のため、行ごとに処理
    lines = content.split('\n')
    
    issues = []
    current_id = None
    in_template = False
    template_content = []
    
    for i, line in enumerate(lines):
        # IDを検出
        id_match = re.search(r'id:\s*["\']([^"\']+)["\']', line)
        if id_match:
            current_id = id_match.group(1)
            
        # テンプレート内の[...]プレースホルダーを検出
        if current_id and '[' in line and ']' in line:
            # [何かを入力]のようなパターンを検出
            placeholder_match = re.findall(r'\[([^\]]+)\]', line)
            if placeholder_match:
                for placeholder in placeholder_match:
                    if '入力' in placeholder or '例' in placeholder:
                        issues.append({
                            'id': current_id,
                            'line': i + 1,
                            'placeholder': f'[{placeholder}]',
                            'line_content': line.strip()
                        })
    
    return issues

# 分析実行
issues = analyze_prompts(content)

print(f"修正が必要なプレースホルダーを持つプロンプト数: {len(set([issue['id'] for issue in issues]))}")
print(f"総プレースホルダー数: {len(issues)}")

# 最初の10件を表示
print("\n最初の10件:")
for issue in issues[:10]:
    print(f"  ID: {issue['id']}, Line: {issue['line']}, Placeholder: {issue['placeholder']}")

