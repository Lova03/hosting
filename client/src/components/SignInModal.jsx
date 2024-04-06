import { useDispatch, useSelector } from 'react-redux';
import { toggleSignInModal } from '../features/controls/controlsSlice';
import banner from '../assets/signinbanner_black.png';
import logo from '../assets/logo512.png';
import { useState } from 'react';
import { BsDiscord } from 'react-icons/bs';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { selectIsLoggedIn, selectUserLoading } from '../features/user/userSlice';

function SignInModal() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [pingTerms, setPingTerms] = useState(false);
  const [pingPrivacy, setPingPrivacy] = useState(false);

  const loggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectUserLoading);

  const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleSignInModal(false));
  };

  const handleLogin = () => {
    if (!termsAccepted || !privacyAccepted) {
      if (!termsAccepted) {
        setPingTerms(false);
        setTimeout(() => {
          setPingTerms(true);
        }, 1);
      }

      if (!privacyAccepted) {
        setPingPrivacy(false);
        setTimeout(() => {
          setPingPrivacy(true);
        }, 1);
      }

      return;
    }

    dispatch(toggleSignInModal(false));
    window.open(`${apiBaseUrl}/auth/discord`, '_self');
  };

  if (loggedIn || isLoading) return <div></div>;

  return (
    <div className='fixed flex inset-0 items-center justify-center w-screen h-screen py-3 px-1 xs:px-3 z-50 isolate'>
      {/* BG */}
      <div onMouseDown={handleClose} className='absolute w-full top-0 left-0 h-full bg-black/50'></div>

      {/* Modal */}
      <div className='relative isolate flex flex-col h-full w-full max-w-lg max-h-[40rem] rounded-lg bg-dark-purple overflow-hidden'>
        {/* Banner */}
        <div className='relative flex justify-center items-center w-full h-36 overflow-hidden'>
          <img
            onLoad={() => setImageLoaded(true)}
            className={`${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } transition-all duration-500 absolute object-cover h-full w-full gradient-mask`}
            src={banner}
            alt='SignIn Modal Banner'
          />

          {/* Logo */}
          <div className='flex items-center space-x-1 h-16 w-fit p-1 select-none z-10'>
            <img
              draggable={false}
              className='object-contain h-14 invert'
              src={logo}
              alt='ZoBlaze Logo'
            />
            <span className='uppercase text-4xl font-rubik font-bold mt-2'>ZoBlaze</span>
          </div>
        </div>

        {/* Body */}
        <div className='p-3 flex flex-1 flex-col items-center overflow-y-auto'>
          <span className='text-xl'>
            Welcome to <strong className='font-bold'>ZoBlaze</strong>! 👋
          </span>

          <span className='mt-3 text-slate-300'>
            Please sign-in to your account and start the adventure
          </span>

          {/* Main */}
          <div className='flex flex-col flex-1 items-center justify-center py-4'>
            {/* Button */}
            <button
              onClick={handleLogin}
              className='flex items-center px-6 py-1.5 rounded-md select-none bg-blurple-900 transition-all duration-200 hover:bg-blurple-800 hover:cursor-pointer group'>
              <BsDiscord className='transition-all duration-300 group-hover:-rotate-12' size={20} />
              <span className='ml-1.5 font-rubik'>Sign In</span>
            </button>
            <div className='mt-8 flex flex-col items-center'>
              <label className='relative isolate flex items-center select-none'>
                <input
                  type='checkbox'
                  className='appearance-none z-10 w-4 h-4 bg-white rounded hover:cursor-pointer checked:bg-flame-900'
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted((prev) => !prev)}
                />
                {pingTerms && (
                  <input
                    type='checkbox'
                    className='absolute bg-flame-900 appearance-none w-4 h-4 animate-ping-once rounded'
                    checked={termsAccepted}
                    disabled
                  />
                )}
                <span className='ml-2 text-sm'>
                  I accept and agree to the{' '}
                  <Link
                    onClick={handleClose}
                    to='/legal/terms-and-conditions'
                    className='font-bold underline underline-offset-2'>
                    Terms and Conditions
                  </Link>
                </span>
              </label>
              <label className='relative isolate flex items-center mt-2 select-none'>
                <input
                  type='checkbox'
                  className='appearance-none z-10 w-4 h-4 bg-white rounded hover:cursor-pointer checked:bg-flame-900'
                  checked={privacyAccepted}
                  onChange={() => setPrivacyAccepted((prev) => !prev)}
                />
                {pingPrivacy && (
                  <input
                    type='checkbox'
                    className='absolute bg-flame-900 appearance-none w-4 h-4 animate-ping-once rounded'
                    checked={privacyAccepted}
                    disabled
                  />
                )}
                <span className='ml-2 text-sm'>
                  I accept and agree to the{' '}
                  <Link
                    onClick={handleClose}
                    to='/legal/privacy-policy'
                    className='font-bold underline underline-offset-2'>
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>
          </div>

          {/* X Button */}
          <div className='my-9 flex'>
            <XCircleIcon
              onClick={handleClose}
              className='h-16 transition-all duration-200 hover:cursor-pointer hover:text-flame-900'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
