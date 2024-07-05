import { CubeTransparentIcon } from '@heroicons/react/24/outline';

function RewardCard({ text, imageSrc, invert = false }) {
  return (
    <div className='flex flex-col p-4 w-full h-64 bg-black/10 rounded-lg select-none transition-colors duration-300 hover:bg-white/5 overflow-y-auto dropdown-scrollbar'>
      <div className='relative w-24 h-24'>
        {imageSrc ? (
          <img
            draggable={false}
            src={imageSrc}
            className={`${invert ? 'invert' : 'invert-0'} object-contain w-full h-full`}
            alt='Reward Icon'
          />
        ) : (
          <CubeTransparentIcon className='h-full' />
        )}
      </div>
      <div className='w-full mt-4'>
        <span className='text-sm'>{text}</span>
      </div>
    </div>
  );
}

export default RewardCard;
