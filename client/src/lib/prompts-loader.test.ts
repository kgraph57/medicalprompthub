import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadPrompts, getPromptsSync, clearPromptsCache, getPromptById } from './prompts-loader';
import type { Prompt } from './prompts';

// モックデータ
const mockPrompts: Prompt[] = [
  {
    id: 'test-1',
    title: 'Test Prompt 1',
    description: 'Test description',
    category: 'diagnosis',
    riskLevel: 'low',
    template: 'Test template',
    inputs: [],
  },
  {
    id: 'test-2',
    title: 'Test Prompt 2',
    description: 'Test description 2',
    category: 'treatment',
    riskLevel: 'medium',
    template: 'Test template 2',
    inputs: [],
  },
];

describe('prompts-loader', () => {
  beforeEach(() => {
    clearPromptsCache();
    vi.clearAllMocks();
  });

  it('should load prompts asynchronously', async () => {
    // モジュールをモック
    vi.mock('./prompts-full', () => ({
      fullPrompts: mockPrompts,
    }));

    const prompts = await loadPrompts();
    expect(prompts).toBeDefined();
    expect(prompts.length).toBeGreaterThan(0);
  });

  it('should return cached prompts on second call', async () => {
    const prompts1 = await loadPrompts();
    const prompts2 = await loadPrompts();
    
    // 同じインスタンスを返すべき（キャッシュ）
    expect(prompts1).toBe(prompts2);
  });

  it('should return null when cache is empty', () => {
    const prompts = getPromptsSync();
    expect(prompts).toBeNull();
  });

  it('should return prompts after loading', async () => {
    await loadPrompts();
    const prompts = getPromptsSync();
    expect(prompts).not.toBeNull();
    expect(prompts!.length).toBeGreaterThan(0);
  });

  it('should get prompt by id', async () => {
    await loadPrompts();
    const prompts = await loadPrompts();
    // 実際に存在するIDを使用
    if (prompts.length > 0) {
      const testId = prompts[0].id;
      const prompt = await getPromptById(testId);
      expect(prompt).toBeDefined();
      expect(prompt?.id).toBe(testId);
    } else {
      // プロンプトが存在しない場合はスキップ
      expect(true).toBe(true);
    }
  });

  it('should return undefined for non-existent id', async () => {
    await loadPrompts();
    const prompt = await getPromptById('non-existent-id');
    expect(prompt).toBeUndefined();
  });
});
