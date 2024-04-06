import { useMemo } from 'react';

/**
 *
 * 1$ = 80xp
 *
 */

function calculateLevel(totalXp) {
  let level = 1;
  while (xpForLevel(level) <= totalXp) {
    level++;
  }
  return level - 1;
}

function xpForLevel(level) {
  const baseXP = 500;
  const ratio = 1.15;

  if (level === 0) {
    return 0;
  }
  return baseXP * Math.pow(ratio, level - 1);
}

export function useLevelSystem(totalXp) {
  const isValidXp = totalXp !== null && totalXp !== undefined;

  const currentLevel = useMemo(() => {
    return isValidXp ? calculateLevel(totalXp) : 0;
  }, [totalXp, isValidXp]);

  const nextLevelXp = useMemo(() => {
    return isValidXp ? xpForLevel(currentLevel + 1) : xpForLevel(1);
  }, [currentLevel, isValidXp]);

  const currentLevelXp = xpForLevel(currentLevel);

  const progressToNextLevel = useMemo(() => {
    if (!isValidXp) return 0;
    return ((totalXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  }, [totalXp, currentLevelXp, nextLevelXp, isValidXp]);

  return {
    currentLevel,
    nextLevel: isValidXp ? currentLevel + 1 : 1,
    progressToNextLevel: Math.min(100, Math.max(0, progressToNextLevel)),
  };
}
