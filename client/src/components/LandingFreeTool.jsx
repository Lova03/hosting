import { Link } from 'react-router-dom';

function LandingFreeTool({ image, title, desc, redirect }) {
  return (
    <div className='flex flex-col w-full max-w-2xl rounded-md p-4 bg-dark-purple overflow-hidden'>
      <div className='flex w-full'>
        <img
          draggable={false}
          className='select-none object-contain h-20 mr-6'
          src={image}
          alt='Free Tool'
        />
        <div className='flex flex-col h-full space-y-1'>
          <span className='uppercase font-bold text-lg'>{title}</span>
          <span className='text-sm text-slate-200'>{desc}</span>
        </div>
      </div>
      <Link
        className='ml-auto mt-4 px-6 py-1.5 rounded-md bg-english-violet-900 shadow-fuchsia-400 transition-all duration-200 hover:shadow-glow-hover hover:bg-english-violet-800'
        to={redirect}>
        Learn More
      </Link>
    </div>
  );
}

export default LandingFreeTool;
