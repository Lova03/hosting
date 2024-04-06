import { useState } from 'react';

function ServerLocation({ flag, country = 'Narnia', locations = [], position }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${position} absolute flex isolate items-center justify-center`}>
      <div className='z-10 relative p-1 cursor-pointer rounded-full'>
        <div className={`w-3 h-3 rounded-full bg-flame-900`}></div>
      </div>
      <div className='absolute w-3 h-3 rounded-full border border-solid border-hunyadi-yellow animate-ping'></div>

      {/* Body */}

      <div
        className={`${
          hovered ? 'opacity-100' : 'opacity-0 invisible'
        } flex transition-all duration-300 absolute -translate-y-1/2 mb-2.5 z-20 flex-col items-center rounded-md p-2 bg-dark-purple/70 cursor-pointer`}>
        {/* Country */}
        <div className='flex items-center w-max mr-auto'>
          {flag && <img className='mr-2' src={flag} alt={`Flag of ${country}`} />}
          <span className='w-max'>Servers in {country}</span>
        </div>
        <div className='flex flex-col'>
          {locations.map((location, idx) => (
            <span className='w-max' key={idx}>
              - {location}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServerLocation;
