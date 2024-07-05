import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function NavItem({ title = 'Unknown Link', to = '/', Icon, color }) {
  return (
    <Link
      to={to}
      className='flex items-center px-4 py-2.5 rounded-md transition-all duration-300 hover:bg-white/20'>
      {Icon ? (
        <Icon size={20} className={`h-5 sm:mb-0.5${color ? ' ' + color : ''}`} />
      ) : (
        <CubeTransparentIcon className={`h-5 sm:mb-0.5${color ? ' ' + color : ''}`} />
      )}
      <span className={`ml-2 hidden sm:block${color ? ' ' + color : ''}`}>{title}</span>
    </Link>
  );
}

export default NavItem;
