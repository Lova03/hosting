import { useDispatch } from 'react-redux';
import { toggleSignInModal } from '../features/controls/controlsSlice';

function SignInButton() {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(toggleSignInModal(true));
  };

  return (
    <button
      onClick={handleOpen}
      className='relative rounded-md uppercase font-bold px-8 py-1.5 bg-flame-900 hover:bg-flame-800 transition-all duration-300'>
      Sign In
    </button>
  );
}

export default SignInButton;
