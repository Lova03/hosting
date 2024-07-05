import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import avatarDefault from '../assets/avatar-default.png';

function UserAvatar({ src, size = 40 }) {
  const [loaded, setLoaded] = useState(false);

  const movingLight = useSpring({
    from: { transform: 'translateX(-150%)' },
    to: { transform: 'translateX(150%)' },
    loop: true,
    reset: true,
    delay: 500,
    config: { duration: 1000 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className='relative overflow-hidden rounded-full'>
      <img
        draggable={false}
        className={`${loaded ? 'block' : 'hidden'} object-contain select-none`}
        src={src || avatarDefault}
        alt="User's avatar"
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className='relative grid place-items-center w-[150%] h-full bg-english-violet-900/50'>
          <animated.div
            className='absolute h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent'
            style={{ ...movingLight }}
          />
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
