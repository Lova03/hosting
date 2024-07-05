import { useMemo } from 'react';

/**
 *
 * 1$ = 80xp
 *
 */

const BASE_XP = 500;
const XP_INCREMENT = 500;

function calculateLevel(totalXp) {
  let level = 1;
  if (totalXp >= xpForLevel(100)) return 100;

  while (xpForLevel(level) <= totalXp) {
    level++;
  }
  return level - 1;
}

function xpForLevel(level) {
  if (level === 0) return 0;

  let requiredXp = BASE_XP;
  for (let i = 1; i < level; i++) {
    requiredXp += BASE_XP + (i - 1) * XP_INCREMENT;
  }

  return requiredXp;
}

// function calculateLevel(totalXp) {
//   let level = 1;
//   while (xpForLevel(level) <= totalXp) {
//     level++;
//   }
//   return level - 1;
// }

// function xpForLevel(level) {
//   const baseXP = 500;
//   const ratio = 1.15;

//   if (level === 0) {
//     return 0;
//   }
//   return baseXP * Math.pow(ratio, level - 1);
// }

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
    xpForLevel,
    calculateLevel,
  };
}
