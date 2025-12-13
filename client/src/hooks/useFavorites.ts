import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fastStorage } from '../lib/fastJsonStorage';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    return fastStorage.getFavorites();
  });

  useEffect(() => {
    fastStorage.setFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        toast.success('お気に入りから削除しました');
        return prev.filter(favId => favId !== id);
      } else {
        toast.success('お気に入りに追加しました');
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
