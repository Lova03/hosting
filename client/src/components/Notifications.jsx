import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../features/user/userSlice';
import { usePopper } from 'react-popper';
import { BellIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo512.png';
import {
  selectNotifications,
  selectNotificationsHasError,
  selectNotificationsLoading,
  fetchNotifications,
} from '../features/notifications/notificationsSlice';
import Notification from './Notification';

function Notifications() {
  const [opened, setOpened] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const dropdownRef = useRef(null);

  const user = useSelector(selectUser);
  const loggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const notifications = useSelector(selectNotifications);
  const isLoading = useSelector(selectNotificationsLoading);
  const hasError = useSelector(selectNotificationsHasError);

  const serverUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 14],
        },
      },
    ],
  });

  const refetchNotis = () => {
    if (user._id) {
      dispatch(fetchNotifications(user._id));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!opened) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [opened, referenceElement]);

  useEffect(() => {
    const socket = socketIOClient(serverUrl);
    if (user?._id) {
      socket.emit('subscribe', user?._id);

      socket.on('notification', (notification) => {
        dispatch(fetchNotifications(user._id));
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    if (user._id) {
      dispatch(fetchNotifications(user._id));
    }
  }, [user, dispatch]);

  return (
    <div ref={dropdownRef}>
      {/* Trigger Element */}
      <div
        ref={setReferenceElement}
        onClick={() => setOpened((prev) => !prev)}
        className='flex relative space-x-1 select-none items-center p-2 rounded transition-all duration-200 cursor-pointer hover:bg-white/10 group'>
        <div className='grid place-items-center'>
          {opened ? (
            <BellIcon className='h-6 text-hunyadi-yellow' />
          ) : (
            <BellIcon className='h-6 transition-colors duration-300 group-hover:text-hunyadi-yellow' />
          )}
          {notifications?.filter((n) => !n.read)?.length > 0 && (
            <div className='flex items-center justify-center absolute top-0 right-0 w-4 h-4 bg-flame-900 rounded-full'>
              <span className='text-xs font-rubik'>{notifications?.filter((n) => !n.read)?.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {opened && loggedIn && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className='relative flex flex-col items-center bg-english-violet-900 rounded-md h-[28rem] w-80 shadow-lg overflow-hidden'>
          {isLoading && (
            <div className='h-full w-full grid place-items-center'>
              <div className='animate-spin rounded-full h-8 w-8 border-2 border-white/10 border-t-flame-900'></div>
            </div>
          )}
          {hasError && (
            <div className='h-full w-full flex flex-col justify-center items-center'>
              <span>Failed to fetch notifications!</span>
              <button
                className='px-7 py-1 rounded-md bg-sky-600 transition-colors duration-300 hover:bg-sky-500 mt-1'
                onClick={refetchNotis}>
                Try Again
              </button>
            </div>
          )}
          {!isLoading && !hasError && (
            <div className='flex flex-col space-y-2 p-2 w-full h-full overflow-y-auto dropdown-scrollbar'>
              {notifications?.map((noti, idx) => (
                <Notification
                  id={noti._id}
                  isRead={noti?.read}
                  content={noti?.content}
                  type={noti?.type}
                  link={noti?.link}
                  createdAt={noti?.createdAt}
                  key={idx}
                />
              ))}
              {notifications?.length === 0 && (
                <div className='h-full w-full flex flex-col items-center justify-center'>
                  <img
                    className='h-28 invert opacity-40 object-contain select-none'
                    draggable={false}
                    src={logo}
                    alt='Logo'
                  />
                  <span className='mt-2 text-sm font-bold opacity-60'>
                    You don't have any notifications!
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
