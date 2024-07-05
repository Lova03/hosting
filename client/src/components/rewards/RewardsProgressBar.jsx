import { LEVEL_COLOR_RANGES, DEFAULT_COLOR } from '../../theme';
import { useLevelSystem } from '../../hooks/useLevelingSystem';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

function RewardsProgressBar() {
  const user = useSelector(selectUser);

  const { currentLevel, nextLevel, progressToNextLevel, xpForLevel } = useLevelSystem(user?.xp);

  const getLevelBorderColor = (level) => {
    const range = LEVEL_COLOR_RANGES.find((range) => level >= range.minLevel && level <= range.maxLevel);
    return range ? range.color : DEFAULT_COLOR;
  };

  return (
    <div className='flex w-full items-center justify-center'>
      <div className='flex flex-col w-full shrink-0 max-w-3xl'>
        <div className='flex px-2 justify-between mb-1 mt-8 items-end'>
          {/* Current Level */}
          <div
            className={`flex items-center justify-center py-0.5 px-1.5 min-w-10 rounded ${getLevelBorderColor(
              currentLevel
            )}`}>
            <span className='font-rubik text-xs'>{currentLevel}</span>
          </div>
          {/* Next Level */}
          <div
            className={`flex items-center justify-center py-0.5 px-1.5 min-w-10 rounded ${getLevelBorderColor(
              nextLevel
            )}`}>
            <span className='font-rubik text-xs'>{nextLevel}</span>
          </div>
        </div>
        {/* Bar */}
        <div className='relative h-8 rounded-lg w-full isolate bg-flame-900/20 overflow-hidden'>
          <div
            style={{
              width: `${progressToNextLevel.toFixed(2)}%`,
              backgroundImage:
                'repeating-linear-gradient(45deg, #f97316, #f97316 10px, transparent 10px, transparent 20px)',
            }}
            className={`absolute h-full bg-flame-800`}></div>
          <div className='absolute z-10 w-full h-full flex justify-center items-center'>
            <span className='font-bold font-rubik'>
              {Math.ceil(user?.xp - xpForLevel(currentLevel))}
              {' / '}
              {Math.ceil(xpForLevel(currentLevel + 1) - xpForLevel(currentLevel))}
            </span>
          </div>
        </div>
        <div
          style={{
            marginLeft: `${progressToNextLevel.toFixed(2)}%`,
          }}
          className='relative -translate-x-1/2 w-16 h-8 rounded-lg flex items-center justify-center bg-flame-900 mt-4'>
          <div
            style={{
              borderWidth: '0 10px 10px 10px',
              borderColor: 'transparent transparent #EE5622 transparent',
            }}
            className='absolute top-0 -translate-y-full w-0 h-0 border-solid'></div>
          <span className='text-sm font-rubik font-bold'>{progressToNextLevel.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}

export default RewardsProgressBar;
