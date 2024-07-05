import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ArrowPathIcon, HomeIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import {
  fetchUser,
  selectIsLoggedIn,
  selectUser,
  selectUserHasError,
  selectUserLoading,
} from '../features/user/userSlice';
import { useEffect } from 'react';
import SignInButton from './SignInButton';
import UserDropdown from './UserDropdown';
import ZoBlazeButton from './ZoBlazeButton';
import NavItem from './NavItem';
import Searchbar from './Searchbar';
import Notifications from './Notifications';

function Panel({ searchbar = false }) {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectUserLoading);
  const hasError = useSelector(selectUserHasError);

  const user = useSelector(selectUser);

  const reFetchUser = () => {
    dispatch(fetchUser());
  };

  useEffect(() => {
    const announceError = () => {
      toast.error('Failed to fetch data! Try again later!');
    };

    if (!isLoading && hasError) {
      announceError();
    }
  }, [isLoading, hasError]);

  return (
    <div className='relative isolate z-[99] flex justify-between items-center w-full h-16 rounded-lg bg-dark-purple px-3 py-1 shadow-lg'>
      <div className='flex space-x-2 items-center'>
        <div className='mr-0 xxs:mr-2 xs:mr-6'>
          <ZoBlazeButton />
        </div>
        <NavItem to='/' title='Home' Icon={HomeIcon} />
        {(user?.isContributor || user?.isAdmin) && (
          <NavItem color='text-emerald-400' to='/create' title='Create' Icon={PlusCircleIcon} />
        )}
      </div>

      {/* Searchbar */}
      {searchbar && (
        <div className='hidden mdx:flex flex-1 mx-2'>
          <Searchbar />
        </div>
      )}

      {loggedIn ? (
        // Logged In
        <div className='flex items-center'>
          <div className='mr-4'>
            <Notifications />
          </div>

          {/* Username */}
          <div className='mr-3 flex flex-col select-none'>
            <span className='font-semibold'>{user.username || 'Unknown user'}</span>
            <span className='ml-auto text-xs'>{user.role || 'Unknown role'}</span>
          </div>
          {/* Dropdown Menu */}
          <UserDropdown />
        </div>
      ) : // Not Logged In Or Error
      hasError ? (
        <div
          onClick={reFetchUser}
          className='rounded-full h-7 w-7 border-2 grid place-items-center border-rose-800 cursor-pointer relative group'>
          <div className='absolute -translate-x-[0.5px] w-4 h-0.5 rounded rotate-45 group-hover:-rotate-45 group-hover:opacity-0 bg-rose-800 transition-all duration-300'></div>
          <div className='absolute -translate-x-[0.5px] w-4 h-0.5 rounded -rotate-45 group-hover:rotate-[225deg] group-hover:opacity-0 bg-rose-800 transition-all duration-500'></div>
          <ArrowPathIcon className='h-5 text-rose-800 opacity-0 group-hover:opacity-100 group-hover:rotate-[360deg] transition-all duration-700' />
        </div>
      ) : isLoading ? (
        <div className='animate-spin rounded-full h-7 w-7 border-4 border-english-violet-900 border-t-english-violet-800'></div>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

export default Panel;
