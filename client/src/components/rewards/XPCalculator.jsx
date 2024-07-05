import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../features/user/userSlice';
import { useLevelSystem } from '../../hooks/useLevelingSystem';

function XPCalculator() {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [xpValue, setXPValue] = useState(user?.xp || 0);
  const [lvlValue, setLvlValue] = useState(0);
  const { xpForLevel, calculateLevel } = useLevelSystem();

  useEffect(() => {
    if (user?.xp) {
      setXPValue(user.xp);
      setLvlValue(calculateLevel(user.xp));
    }
  }, [user, calculateLevel]);

  const handleXPChange = (e) => {
    let value = e.target.value;
    if (!value) value = 0;
    if (/^\d*$/.test(value)) {
      const xp = parseInt(value, 10);
      setXPValue(xp);
      setLvlValue(Math.round(calculateLevel(xp) * 100) / 100);
    }
  };

  const handleLevelChange = (e) => {
    let value = e.target.value;
    if (!value) value = 0;
    if (/^\d*$/.test(value)) {
      const level = parseInt(value, 10);
      setLvlValue(level);
      setXPValue(Math.round(xpForLevel(level) * 100) / 100);
    }
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
        <div className='flex flex-col'>
          <label className='text-xs px-2 font-bold font-rubik uppercase text-slate-400'>XP</label>
          <input
            type='text'
            value={xpValue}
            onChange={handleXPChange}
            className='bg-dark-purple px-3 font-rubik font-bold py-2 rounded-lg shadow-sm focus:outline-none focus:border focus:ring-hunyadi-yellow focus:border-hunyadi-yellow'
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-xs px-2 sm:ml-auto font-bold font-rubik uppercase text-slate-400'>
            Level
          </label>
          <input
            type='text'
            value={lvlValue}
            onChange={handleLevelChange}
            className='bg-dark-purple px-3 font-rubik font-bold py-2 rounded-lg shadow-sm focus:outline-none focus:border focus:ring-hunyadi-yellow focus:border-hunyadi-yellow'
          />
        </div>
      </div>
      {/* Additional Information */}
      <div className='mt-4'>
        <p>
          {isLoggedIn ? (
            xpForLevel(lvlValue) - user?.xp <= 0 ? (
              'You already reached that level!'
            ) : (
              <>
                XP needed for the level:{' '}
                <span className='text-hunyadi-yellow font-bold font-rubik'>
                  {(xpForLevel(lvlValue) - user?.xp).toFixed(2)}
                </span>
              </>
            )
          ) : (
            <>
              XP needed for the level:{' '}
              <span className='text-hunyadi-yellow font-bold font-rubik'>
                {xpForLevel(lvlValue).toFixed(2)}
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default XPCalculator;
