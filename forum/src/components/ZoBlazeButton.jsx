import { Link } from 'react-router-dom';
import logo from '../assets/logo512.png';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

function ZoBlazeButton() {
  const clientUrl = import.meta.env.VITE_APP_CLIENT_URL;

  return (
    <Link to={clientUrl} className='p-1 flex relative group'>
      <div className='relative w-12 h-12 select-none'>
        <img
          className='object-contain w-full h-full invert-[70%] transition-all duration-300 group-hover:invert'
          draggable={false}
          src={logo}
          alt='ZoBlaze Logo'
        />
      </div>
      <ShoppingCartIcon className='absolute -rotate-12 transition-transform duration-1000 group-hover:rotate-[-372deg] text-yellow-300 h-6 bottom-0 right-0' />
    </Link>
  );
}

export default ZoBlazeButton;
