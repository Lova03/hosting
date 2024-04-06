import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function LegalDocument({ title = 'Unknown title', desc = 'Unknown description', to = '/', Icon }) {
  return (
    <div className='flex flex-col p-4 rounded-md max-w-lg w-full mx-2 bg-english-violet-900 transition-all duration-300 hover:bg-english-violet-850'>
      {/* Document */}
      <div className='flex'>
        <div className='p-2'>
          {Icon ? <Icon className='h-14' size={56} /> : <CubeTransparentIcon className='h-14' />}
        </div>
        {/* Body */}
        <div className='flex flex-col flex-1 ml-2'>
          {/* Title */}
          <div>
            <span className='text-lg font-bold'>{title || 'Unknown title'}</span>
          </div>

          {/* Description */}
          <div>
            <span className='text-sm'>{desc || 'Unknown description'}</span>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className='flex w-full justify-end py-2 px-4'>
        <Link
          to={to}
          className='px-6 py-1 rounded bg-sky-700 transition-all duration-300 hover:bg-sky-500'>
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default LegalDocument;
