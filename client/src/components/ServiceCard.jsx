import { Link } from 'react-router-dom';
import serviceDefault from '../assets/service-default.png';

function ServiceCard({
  buttonOptions: { to, label } = { to: '/', label: 'Home' },
  about = 'Click and find out!',
  title = 'Unknown Service :3',
  image,
  className,
}) {
  return (
    <div
      className={`relative w-full max-w-[21rem] flex flex-col items-center rounded-lg overflow-hidden select-none p-5 transition-all duration-200 hover:-translate-y-0.5 ${
        className || ''
      }`}>
      <img
        draggable={false}
        className='object-contain w-36'
        src={image || serviceDefault}
        alt='Service'
      />

      <span className='font-semibold text-lg mt-10 text-center'>{title}</span>
      <span className='mt-3 mb-5 text-slate-100 text-center'>{about}</span>

      <Link
        className='mt-auto rounded bg-black/5 px-7 py-2 font-rubik text-sm transition-colors duration-200 hover:bg-white/10'
        to={to}>
        {label}
      </Link>
    </div>
  );
}

export default ServiceCard;
