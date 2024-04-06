function calculateLevel(totalXp) {
  let level = 1;

  while (xpForLevel(level) <= totalXp) {
    level++;
  }

  return level - 1;
}

function xpForLevel(level) {
  const baseXP = 1000; // XP required for level 1
  const ratio = 1.2; // Growth ratio for each level

  if (level === 0) {
    return 0; // 0 XP required for level 0
  }
  return baseXP * Math.pow(ratio, level - 1);
}

console.log(xpForLevel(0));
console.log(xpForLevel(1));
console.log(xpForLevel(2));
console.log(xpForLevel(3));
console.log(calculateLevel(0));
console.log(calculateLevel(1));
console.log(calculateLevel(999));
console.log(calculateLevel(1000));
console.log(calculateLevel(1001));
console.log(calculateLevel(1002));
console.log(calculateLevel(1199));
console.log(calculateLevel(1200));
console.log(calculateLevel(1201));
