import { useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import UserAvatar from './UserAvatar';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../features/user/userSlice';
import { useLevelSystem } from '../hooks/useLevelingSystem';
import { LEVEL_COLOR_RANGES, DEFAULT_COLOR } from '../theme';
import { Link } from 'react-router-dom';

function UserDropdown() {
  const [opened, setOpened] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const dropdownRef = useRef(null);

  const user = useSelector(selectUser);
  const loggedIn = useSelector(selectIsLoggedIn);

  const { currentLevel, nextLevel, progressToNextLevel } = useLevelSystem(user?.xp);

  const getLevelBorderColor = (level) => {
    const range = LEVEL_COLOR_RANGES.find((range) => level >= range.minLevel && level <= range.maxLevel);
    return range ? range.color : DEFAULT_COLOR;
  };

  const handleSignOut = () => {
    window.open(`${apiBaseUrl}/auth/logout`, '_self');
  };

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 12],
        },
      },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!opened) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [opened, referenceElement]);

  return (
    <div ref={dropdownRef}>
      {/* Trigger Element */}
      <div
        ref={setReferenceElement}
        onClick={() => setOpened((prev) => !prev)}
        className='flex relative space-x-1 select-none items-center px-1 py-0.5 rounded cursor-pointer group'>
        <UserAvatar
          src={
            user?.discordId && user?.avatar
              ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png?size=2048`
              : null
          }
        />
        {opened ? (
          <ChevronUpIcon className='h-4 text-hunyadi-yellow' />
        ) : (
          <ChevronDownIcon className='h-4 group-hover:text-hunyadi-yellow' />
        )}
      </div>

      {/* TODO add shadow or darker bg */}

      {/* Dropdown */}
      {opened && loggedIn && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className='relative flex flex-col items-center bg-english-violet-900 rounded-md h-fit w-56 shadow-lg overflow-hidden'>
          {/* Header */}
          <div className='w-full flex flex-col items-center justify-center'>
            {/* Username */}
            <span
              className={`${getLevelBorderColor(currentLevel)} w-full py-2 px-2 text-center break-all`}>
              {user?.username}
            </span>
            {/* Levels */}
            <div className='flex flex-col space-y-2 w-full px-3 mt-1'>
              {/* Level Borders & Percentage */}
              <div className='flex px-2 justify-between items-end'>
                {/* Current Level */}
                <div className='flex flex-col items-center space-y-1'>
                  <span className='text-xs text-gray-400'>Level</span>
                  <div
                    className={`flex items-center justify-center py-0.5 px-1.5 min-w-10 rounded ${getLevelBorderColor(
                      currentLevel
                    )}`}>
                    <span className='font-rubik text-xs'>{currentLevel}</span>
                  </div>
                </div>
                {/* Percentage Progress */}
                <span className='text-xs font-rubik font-bold'>{progressToNextLevel.toFixed(2)}%</span>
                {/* Next Level */}
                <div className='flex flex-col items-center space-y-1'>
                  <span className='text-xs text-gray-400'>Level</span>
                  <div
                    className={`flex items-center justify-center py-0.5 px-1.5 min-w-10 rounded ${getLevelBorderColor(
                      nextLevel
                    )}`}>
                    <span className='font-rubik text-xs'>{nextLevel}</span>
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className='relative h-2 rounded w-full bg-flame-900/20 overflow-hidden'>
                <div
                  style={{ width: `${progressToNextLevel.toFixed(2)}%` }}
                  className={`absolute h-full bg-flame-800`}></div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='w-full px-3 mt-3'>
            <hr className='border-t border-solid border-t-slate-500/30' />
          </div>

          {/* Items */}
          <div className='flex flex-col mt-2 pb-6 w-full overflow-y-auto flex-1 dropdown-scrollbar'>
            <Link className='dropdown-item' to='/my-articles'>
              <NewspaperIcon className='h-4' />
              <span>My Articles</span>
            </Link>
            <button className='dropdown-item group' onClick={handleSignOut}>
              <ArrowRightStartOnRectangleIcon className='text-flame-900 h-4 transition-colors duration-200 group-hover:text-hunyadi-yellow' />
              <span className='text-flame-900 transition-colors duration-200 group-hover:text-hunyadi-yellow'>
                Sign Out
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
