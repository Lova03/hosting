import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn, selectUser } from '../features/user/userSlice';
import { CreditCardIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';

function LandingPanel() {
  const loggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectUser);

  if (!loggedIn) return <div className='h-20 w-20'></div>;

  return (
    <div className='flex items-center justify-center flex-wrap md:justify-end gap-8'>
      <div className='relative flex flex-col h-40 w-full max-w-xs p-4 rounded-md bg-dark-purple overflow-hidden'>
        <div className='flex justify-between items-start'>
          <span className='font-rubik font-bold text-3xl'>${user?.balance || 0}</span>
          <CreditCardIcon className='h-7 text-flame-900' />
        </div>
        <span className='mt-1 text-slate-300 text-sm'>Available Balance</span>
        <Link
          to='/billing/funds'
          className='mt-auto ml-auto bg-english-violet-900 shadow-fuchsia-400 transition-all duration-200 hover:shadow-glow-hover hover:bg-english-violet-800 w-fit px-7 py-1.5 rounded-md'>
          Add Funds
        </Link>
      </div>
      <div className='relative flex flex-col h-40 w-full max-w-xs p-4 rounded-md bg-dark-purple overflow-hidden'>
        <div className='flex justify-between items-start'>
          <span className='font-rubik font-bold text-3xl'>1</span>
          <Square3Stack3DIcon className='h-7 text-flame-900' />
        </div>
        <span className='mt-1 text-slate-300 text-sm'>Active Services</span>
        <Link
          to='/panel/services'
          className='mt-auto ml-auto bg-english-violet-900 shadow-fuchsia-400 transition-all duration-200 hover:shadow-glow-hover hover:bg-english-violet-800 w-fit px-7 py-1.5 rounded-md'>
          View All Services
        </Link>
      </div>
    </div>
  );
}

export default LandingPanel;
