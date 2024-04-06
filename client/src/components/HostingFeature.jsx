import { useSelector } from 'react-redux';
import { selectNavbarOpened } from '../features/controls/controlsSlice';

function HostingFeature({ image, desc, title }) {
  const opened = useSelector(selectNavbarOpened);

  return (
    <div
      className={`${
        opened ? 'col-span-2 xl:col-span-1' : 'col-span-2 lg:col-span-1'
      } flex p-2 items-center max-w-xl mx-2`}>
      {/* Image */}
      <img
        draggable={false}
        className='select-none object-contain h-20 mr-6'
        src={image}
        alt='Hosting Feature'
      />
      {/* Text */}
      <div className='flex flex-col h-full space-y-1'>
        <span className='uppercase font-bold text-lg'>{title}</span>
        <span className='text-sm text-slate-200'>{desc}</span>
      </div>
    </div>
  );
}

export default HostingFeature;
