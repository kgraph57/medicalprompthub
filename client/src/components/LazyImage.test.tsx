import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LazyImage } from './LazyImage';

// IntersectionObserverのモック
class IntersectionObserverMock {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  
  callback: IntersectionObserverCallback;
  
  // テスト用に手動でトリガー
  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as any);
  }
}

describe('LazyImage', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;
  
  beforeEach(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    // @ts-ignore
    window.IntersectionObserver = IntersectionObserverMock;
  });
  
  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
    vi.clearAllMocks();
  });

  it('should render with placeholder initially', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
  });

  it('should load image when intersecting', async () => {
    let observerInstance: IntersectionObserverMock | null = null;
    
    // @ts-ignore
    window.IntersectionObserver = vi.fn((callback) => {
      observerInstance = new IntersectionObserverMock(callback);
      return observerInstance;
    }) as any;
    
    render(<LazyImage src="/test.jpg" alt="Test image" />);
    
    // 画像の読み込みをシミュレート
    const mockImage = {
      src: '',
      onload: null as any,
      onerror: null as any,
    };
    
    const ImageSpy = vi.spyOn(global, 'Image').mockImplementation(() => mockImage as any);
    
    // IntersectionObserverをトリガー
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (observerInstance) {
      observerInstance.trigger([{
        isIntersecting: true,
        intersectionRatio: 1,
        target: screen.getByAltText('Test image'),
      } as IntersectionObserverEntry]);
      
      // 画像の読み込みをシミュレート
      await new Promise(resolve => setTimeout(resolve, 50));
      if (mockImage.onload) {
        mockImage.onload();
      }
      
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('src', '/test.jpg');
      }, { timeout: 1000 });
    }
  });

  it('should use fallback on error', async () => {
    let observerInstance: IntersectionObserverMock | null = null;
    
    // @ts-ignore
    window.IntersectionObserver = vi.fn((callback) => {
      observerInstance = new IntersectionObserverMock(callback);
      return observerInstance;
    }) as any;
    
    render(<LazyImage src="/test.jpg" alt="Test image" fallback="/fallback.jpg" />);
    
    const mockImage = {
      src: '',
      onload: null as any,
      onerror: null as any,
    };
    
    vi.spyOn(global, 'Image').mockImplementation(() => mockImage as any);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (observerInstance) {
      observerInstance.trigger([{
        isIntersecting: true,
        intersectionRatio: 1,
        target: screen.getByAltText('Test image'),
      } as IntersectionObserverEntry]);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      // エラーをシミュレート
      if (mockImage.onerror) {
        mockImage.onerror();
      }
      
      await waitFor(() => {
        const img = screen.getByAltText('Test image');
        expect(img).toHaveAttribute('src', '/fallback.jpg');
      }, { timeout: 1000 });
    }
  });
});
