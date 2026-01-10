#!/usr/bin/env node
/**
 * guides/ディレクトリの内容をclient/に統合・同期するスクリプト
 * guides/を唯一のソースとして、client/src/assets/guides/とclient/public/assets/guides/に同期
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '..', 'guides');
const targetDirs = [
  path.join(__dirname, '..', 'client', 'src', 'assets', 'guides'),
  path.join(__dirname, '..', 'client', 'public', 'assets', 'guides'),
];

// コピーするファイルの拡張子
const ALLOWED_EXTENSIONS = ['.md', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

function shouldSkipFile(fileName) {
  // " 2.md" のような重複ファイルはスキップ
  return fileName.includes(' 2.');
}

function copyDirectory(src, dest, relativePath = '') {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  ソースディレクトリが存在しません: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // 重複ファイルをスキップ
    if (shouldSkipFile(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, path.join(relativePath, entry.name));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      // 許可された拡張子のファイルのみコピー
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        fs.copyFileSync(srcPath, destPath);
        const displayPath = path.join(relativePath, entry.name);
        console.log(`  ✅ ${displayPath}`);
      }
    }
  }
}

function cleanTargetDirectory(targetDir, sourceDir) {
  // ターゲットディレクトリ内の、ソースに存在しないファイルを削除
  if (!fs.existsSync(targetDir)) {
    return;
  }

  const entries = fs.readdirSync(targetDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const targetPath = path.join(targetDir, entry.name);
    const sourcePath = path.join(sourceDir, entry.name);

    if (entry.isDirectory()) {
      if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isDirectory()) {
        // サブディレクトリも再帰的にクリーンアップ
        cleanTargetDirectory(targetPath, sourcePath);
      } else {
        // ソースに存在しないディレクトリは削除しない（他のガイド用の可能性がある）
        console.log(`  ⚠️  スキップ: ${path.relative(path.join(__dirname, '..'), targetPath)} (ソースに存在しないが、他のガイド用の可能性があるため保持)`);
      }
    } else if (entry.isFile()) {
      // 重複ファイルを削除
      if (shouldSkipFile(entry.name)) {
        fs.unlinkSync(targetPath);
        console.log(`  🗑️  削除: ${path.relative(path.join(__dirname, '..'), targetPath)} (重複ファイル)`);
      }
    }
  }
}

console.log('🔄 guides/ディレクトリを統合・同期中...\n');
console.log('📋 ソース: guides/\n');

for (const targetDir of targetDirs) {
  const relativeTarget = path.relative(path.join(__dirname, '..'), targetDir);
  console.log(`📁 同期先: ${relativeTarget}`);
  
  // guides/内の各カテゴリ（ai-paper-writing, case-report, paper-reading）を同期
  const categories = ['ai-paper-writing', 'case-report', 'paper-reading'];
  
  for (const category of categories) {
    const sourceCategoryPath = path.join(sourceDir, category);
    const targetCategoryPath = path.join(targetDir, category);
    
    if (fs.existsSync(sourceCategoryPath)) {
      console.log(`  📂 ${category}/`);
      copyDirectory(sourceCategoryPath, targetCategoryPath, category);
    }
  }
  
  console.log('');
}

console.log('✨ 統合・同期完了！');
console.log('\n💡 guides/ディレクトリが唯一のソースです。');
console.log('   編集は guides/ で行い、npm run sync:guides で同期してください。');

