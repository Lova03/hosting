import map from '../assets/map.png';
import czechia from '../assets/czechia.png';
import germany from '../assets/germany.png';
import ServerLocation from './ServerLocation';

function ServerLocations() {
  return (
    <div className='relative w-full flex justify-center'>
      <div className='relative w-5/6'>
        <img className='w-full object-contain select-none' draggable={false} src={map} alt='World Map' />

        {/* Nodes */}
        <ServerLocation
          flag={germany}
          country='Germany'
          locations={['Berlin', 'Frankfurt']}
          position='top-[34.7%] left-[49%]'
        />
        <ServerLocation
          flag={czechia}
          country='Czechia'
          locations={['Prague', 'Brno']}
          position='top-[37%] left-[51%]'
        />
      </div>
    </div>
  );
}

export default ServerLocations;
