/**
 * ゲーミフィケーション統計表示コンポーネント
 * XP、レベル、ストリークを表示
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Star, TrendingUp } from "lucide-react";

interface GamificationStatsProps {
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
}

/**
 * レベル計算（フロントエンド用）
 */
function calculateLevel(totalXP: number): number {
  if (totalXP < 100) return 1;
  if (totalXP < 300) return 2;
  if (totalXP < 600) return 3;
  if (totalXP < 1000) return 4;
  return 5;
}

/**
 * 次のレベルまでのXPを計算
 */
function getXPForNextLevel(currentLevel: number): number {
  const levelThresholds: Record<number, number> = {
    1: 100,
    2: 300,
    3: 600,
    4: 1000,
    5: Infinity,
  };
  return levelThresholds[currentLevel] || Infinity;
}

/**
 * XP進捗を計算
 */
function getXPProgress(totalXP: number) {
  const currentLevel = calculateLevel(totalXP);
  const nextLevelXP = getXPForNextLevel(currentLevel);
  const previousLevelXP = currentLevel === 1 ? 0 : getXPForNextLevel(currentLevel - 1);
  const currentLevelXP = totalXP - previousLevelXP;
  const levelRange = nextLevelXP - previousLevelXP;
  const progress = levelRange === Infinity ? 1 : currentLevelXP / levelRange;

  return {
    currentLevel,
    currentLevelXP,
    nextLevelXP,
    progress: Math.min(1, Math.max(0, progress)),
  };
}

export function GamificationStats({
  totalXP,
  currentLevel,
  currentStreak,
  longestStreak,
  totalLessonsCompleted,
}: GamificationStatsProps) {
  const { currentLevelXP, nextLevelXP, progress } = getXPProgress(totalXP);
  const levelNames: Record<number, string> = {
    1: "初心者",
    2: "初級者",
    3: "中級者",
    4: "上級者",
    5: "エキスパート",
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* XP & レベル */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            レベル {currentLevel}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">{totalXP}</span>
            <span className="text-sm text-muted-foreground">XP</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentLevelXP} / {nextLevelXP === Infinity ? "∞" : nextLevelXP}</span>
              <span>{levelNames[currentLevel]}</span>
            </div>
            <Progress value={progress * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* ストリーク */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            連続学習
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">{currentStreak}</span>
            <span className="text-sm text-muted-foreground">日</span>
          </div>
          <div className="text-xs text-muted-foreground">
            最長記録: {longestStreak}日
          </div>
          {currentStreak > 0 && (
            <Badge variant="secondary" className="w-fit">
              🔥 {currentStreak}日連続！
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* 完了レッスン数 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            学習進捗
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">{totalLessonsCompleted}</span>
            <span className="text-sm text-muted-foreground">レッスン完了</span>
          </div>
          <div className="text-xs text-muted-foreground">
            継続的に学習を続けています
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
