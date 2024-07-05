import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import banner from '../assets/signinbanner_black.png';
import Footer from '../components/Footer';
import UserAvatar from '../components/UserAvatar';
import {
  selectUser,
  selectUserUpdating,
  updateUserSettings,
  deleteUserAccount,
} from '../features/user/userSlice';
import { LEVEL_COLOR_RANGES, DEFAULT_COLOR } from '../theme';
import { useLevelSystem } from '../hooks/useLevelingSystem';
import { Helmet } from 'react-helmet-async';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import UserPanel from '../components/UserPanel';
import SavedPaymentMethods from '../components/SavedPaymentMethods';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const user = useSelector(selectUser);
  const isUpdating = useSelector(selectUserUpdating);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentLevel } = useLevelSystem(user?.xp);

  const getLevelBorderColor = (level) => {
    const range = LEVEL_COLOR_RANGES.find((range) => level >= range.minLevel && level <= range.maxLevel);
    return range ? range.color : DEFAULT_COLOR;
  };

  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    contactNumber: user.contactNumber || '',
    billingAddress: user.billingAddress || '',
  });

  const [originalData, setOriginalData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    contactNumber: user.contactNumber || '',
    billingAddress: user.billingAddress || '',
  });

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      contactNumber: user.contactNumber || '',
      billingAddress: user.billingAddress || '',
    });

    setOriginalData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      contactNumber: user.contactNumber || '',
      billingAddress: user.billingAddress || '',
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserSettings(formData));
  };

  const handleDeleteAccount = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDeleteAccount = async () => {
    dispatch(deleteUserAccount()).then((action) => {
      if (action.payload.success) {
        navigate('/');
      }
    });
    setIsConfirmingDelete(false);
  };

  const cancelDeleteAccount = () => {
    setIsConfirmingDelete(false);
  };

  const isFieldChanged = (field) => {
    return formData[field] !== originalData[field];
  };

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Settings | ZoBlaze</title>
        <meta
          name='description'
          content='Manage your ZoBlaze account settings. Update your personal information, contact details, and billing address all in one place for a seamless experience.'
        />
      </Helmet>

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      {/* Main */}
      <div className='w-full flex justify-center'>
        <div className='my-4 rounded-lg w-full max-w-4xl pb-8 flex flex-col bg-dark-purple overflow-hidden'>
          <div className='relative flex justify-start items-end w-full h-32'>
            <img
              onLoad={() => setImageLoaded(true)}
              className={`${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } transition-all duration-500 absolute object-cover h-full w-full gradient-mask`}
              src={banner}
              alt='Settings Banner'
            />
            <h1 className='px-4 pb-6 text-4xl font-bold font-rubik uppercase'>Settings</h1>
          </div>

          {/* User Info */}
          <div className='flex p-4'>
            <UserAvatar
              size={96}
              src={
                user?.discordId && user?.avatar
                  ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png?size=2048`
                  : null
              }
            />

            <div className='flex-1 flex flex-col px-4 justify-center'>
              <div className='flex space-x-2 items-center w-fit'>
                <div
                  className={`${getLevelBorderColor(
                    currentLevel
                  )} rounded-lg min-w-12 px-1 h-6 grid place-items-center`}>
                  <span className='font-bold font-rubik'>{currentLevel}</span>
                </div>
                <span className='font-rubik font-bold text-2xl'>{user.username}</span>
              </div>
              <span className='text-sm text-slate-200'>{user.role}</span>
            </div>
          </div>
          {/* Settings Body */}
          <form
            className='flex flex-col space-y-8 mt-8 w-full px-4 items-center'
            onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-8 md:flex-row w-full max-w-2xl md:space-y-0 md:space-x-2'>
              <label className='relative flex flex-col w-full max-w-2xl isolate'>
                {isFieldChanged('firstName') && (
                  <div className='absolute flex justify-center isolate items-center -z-10 right-4'>
                    <ExclamationCircleIcon className='text-yellow-500 h-4 w-4' />
                    <ExclamationCircleIcon className='text-yellow-500 h-4 w-4 -z-10 animate-ping absolute' />
                  </div>
                )}
                <span className='uppercase text-sm font-rubik font-bold text-hunyadi-yellow'>
                  First Name
                </span>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`px-2 py-1 rounded-md outline-none bg-english-violet-900 ${
                    isFieldChanged('firstName') ? 'border border-yellow-500' : ''
                  }`}
                />
              </label>
              <label className='relative flex flex-col w-full max-w-2xl isolate'>
                {isFieldChanged('lastName') && (
                  <div className='absolute flex justify-center isolate items-center -z-10 right-4'>
                    <ExclamationCircleIcon className='text-yellow-500 h-4 w-4' />
                    <ExclamationCircleIcon className='text-yellow-500 h-4 w-4 -z-10 animate-ping absolute' />
                  </div>
                )}
                <span className='uppercase text-sm font-rubik font-bold text-hunyadi-yellow'>
                  Last Name
                </span>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`px-2 py-1 rounded-md outline-none bg-english-violet-900 ${
                    isFieldChanged('lastName') ? 'border border-yellow-500' : ''
                  }`}
                />
              </label>
            </div>
            <label className='relative flex flex-col w-full max-w-2xl isolate'>
              {isFieldChanged('contactNumber') && (
                <div className='absolute flex justify isolate-center items-center -z-10 right-4'>
                  <ExclamationCircleIcon className='text-yellow-500 h-4 w-4' />
                  <ExclamationCircleIcon className='text-yellow-500 h-4 w-4 -z-10 animate-ping absolute' />
                </div>
              )}
              <span className='uppercase text-sm font-rubik font-bold text-hunyadi-yellow'>
                Contact Number
              </span>
              <input
                type='text'
                name='contactNumber'
                value={formData.contactNumber}
                onChange={handleChange}
                className={`px-2 py-1 rounded-md outline-none bg-english-violet-900 ${
                  isFieldChanged('contactNumber') ? 'border border-yellow-500' : ''
                }`}
              />
            </label>
            <label className='relative flex flex-col w-full max-w-2xl isolate'>
              {isFieldChanged('billingAddress') && (
                <div className='absolute flex justify isolate-center items-center -z-10 right-4'>
                  <ExclamationCircleIcon className='text-yellow-500 h-4 w-4' />
                  <ExclamationCircleIcon className='text-yellow-500 h-4 w-4 -z-10 animate-ping absolute' />
                </div>
              )}
              <span className='uppercase text-sm font-rubik font-bold text-hunyadi-yellow'>
                Billing Address
              </span>
              <input
                type='text'
                name='billingAddress'
                value={formData.billingAddress}
                onChange={handleChange}
                className={`px-2 py-1 rounded-md outline-none bg-english-violet-900 ${
                  isFieldChanged('billingAddress') ? 'border border-yellow-500' : ''
                }`}
              />
            </label>
            <button
              type='submit'
              className='px-8 py-2.5 bg-flame-900 font-bold uppercase rounded-lg shadow-sm transition-colors duration-300 hover:bg-flame-700'
              disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Settings'}
            </button>
          </form>

          <div className='flex flex-col px-4 mt-16'>
            <span className='uppercase font-bold ml-4 mb-4'>Saved Payment Methods</span>
            <SavedPaymentMethods />
          </div>

          <div className='flex flex-col mt-16 px-4'>
            <span className='text-sm max-w-xl text-rose-500'>
              To delete your account, click the button below. Please note that this action is
              irreversible and will permanently remove all your data from our system.
            </span>
            <div className='flex justify-end'>
              <button
                className='mx-4 mt-2 px-4 py-2 bg-rose-700 text-white font-bold uppercase rounded-lg shadow-sm transition-colors duration-300 hover:bg-rose-600'
                onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>

          <Modal isOpen={isConfirmingDelete} onClose={cancelDeleteAccount}>
            <h2 className='text-xl font-bold mb-4 w-full text-center'>Confirm Delete Account</h2>
            <p className='mb-16 text-sm max-w-sm'>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className='flex justify-center space-x-4'>
              <button
                className='px-4 py-2 bg-rose-700 text-white font-bold uppercase rounded-lg transition-colors duration-300 hover:bg-rose-600'
                onClick={confirmDeleteAccount}>
                Yes, Delete
              </button>
              <button
                className='px-4 py-2 bg-flame-900 font-bold uppercase rounded-lg transition-colors duration-300 hover:bg-flame-700'
                onClick={cancelDeleteAccount}>
                Cancel
              </button>
            </div>
          </Modal>
        </div>
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default SettingsPage;
