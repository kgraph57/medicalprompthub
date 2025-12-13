#!/usr/bin/env python3
"""
箇条書きをナラティブな文章に変換するスクリプト
"""

import re
import os
from pathlib import Path

def convert_bullet_list_to_narrative(text):
    """箇条書きをナラティブな文章に変換"""
    
    # パターン1: **タイトル**：の後に箇条書きが続く場合
    pattern1 = r'\*\*([^*]+)\*\*：\s*\n((?:- \*\*[^*]+\*\*：[^\n]+\n)+)'
    
    def replace_bullets1(match):
        title = match.group(1)
        bullets = match.group(2)
        
        # 箇条書きを抽出
        bullet_items = re.findall(r'- \*\*([^*]+)\*\*：([^\n]+)', bullets)
        
        if not bullet_items:
            return match.group(0)
        
        # ナラティブな文章に変換
        narrative = f"**{title}**：\n\n"
        
        if len(bullet_items) == 1:
            narrative += f"{bullet_items[0][0]}は{bullet_items[0][1]}という特徴があります。"
        else:
            for i, (item_title, item_desc) in enumerate(bullet_items):
                if i == 0:
                    narrative += f"{item_title}は{item_desc}という特徴があります。"
                elif i == len(bullet_items) - 1:
                    narrative += f"また、{item_title}は{item_desc}という特徴もあります。"
                else:
                    narrative += f"また、{item_title}は{item_desc}という特徴があります。"
        
        narrative += "\n"
        return narrative
    
    text = re.sub(pattern1, replace_bullets1, text)
    
    # パターン2: **タイトル**：の後に通常の箇条書きが続く場合
    pattern2 = r'\*\*([^*]+)\*\*：\s*\n((?:- [^\n]+\n)+)'
    
    def replace_bullets2(match):
        title = match.group(1)
        bullets = match.group(2)
        
        # 箇条書きを抽出
        bullet_items = re.findall(r'- ([^\n]+)', bullets)
        
        if not bullet_items:
            return match.group(0)
        
        # ナラティブな文章に変換
        narrative = f"**{title}**：\n\n"
        
        if len(bullet_items) == 1:
            narrative += bullet_items[0] + "。"
        else:
            for i, item in enumerate(bullet_items):
                if i == 0:
                    narrative += item
                elif i == len(bullet_items) - 1:
                    narrative += f"。また、{item}。"
                else:
                    narrative += f"。また、{item}"
        
        narrative += "\n"
        return narrative
    
    text = re.sub(pattern2, replace_bullets2, text)
    
    # パターン3: 番号付きリスト（1. 2. 3.など）
    pattern3 = r'\*\*([^*]+)\*\*：\s*\n((?:\d+\. [^\n]+\n)+)'
    
    def replace_numbered_list(match):
        title = match.group(1)
        items = match.group(2)
        
        # 番号付きリストを抽出
        numbered_items = re.findall(r'\d+\. ([^\n]+)', items)
        
        if not numbered_items:
            return match.group(0)
        
        # ナラティブな文章に変換
        narrative = f"**{title}**：\n\n"
        
        if len(numbered_items) == 1:
            narrative += numbered_items[0] + "。"
        else:
            for i, item in enumerate(numbered_items):
                if i == 0:
                    narrative += f"まず、{item}。"
                elif i == len(numbered_items) - 1:
                    narrative += f"最後に、{item}。"
                else:
                    narrative += f"次に、{item}。"
        
        narrative += "\n"
        return narrative
    
    text = re.sub(pattern3, replace_numbered_list, text)
    
    return text

def process_file(file_path):
    """ファイルを処理して箇条書きを変換"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 変換を実行
        converted = convert_bullet_list_to_narrative(content)
        
        # ファイルに書き戻し
        if content != converted:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(converted)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """メイン処理"""
    courses_dir = Path("client/src/data/courses")
    
    if not courses_dir.exists():
        print(f"Directory not found: {courses_dir}")
        return
    
    # すべてのMarkdownファイルを取得
    md_files = list(courses_dir.rglob("*.md"))
    
    print(f"Found {len(md_files)} Markdown files")
    
    converted_count = 0
    for md_file in md_files:
        if process_file(md_file):
            converted_count += 1
            print(f"Converted: {md_file}")
    
    print(f"\nConverted {converted_count} files")

if __name__ == "__main__":
    main()
