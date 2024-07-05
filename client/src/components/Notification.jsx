import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { markNotificationAsRead } from '../features/notifications/notificationsSlice';
import { format } from 'date-fns';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function Notification({ id, isRead, type, link, content, createdAt }) {
  const dispatch = useDispatch();

  const handleMarkAsRead = () => {
    dispatch(markNotificationAsRead(id));
  };

  const forumUrl = import.meta.env.VITE_APP_FORUM_URL;

  const finalLink =
    type === 'payment'
      ? '/billing'
      : type === 'article'
      ? `${forumUrl}/articles/${link}`
      : type === 'support'
      ? `/support/${link}`
      : null; // type === 'info';

  return (
    <Link
      onClick={handleMarkAsRead}
      to={finalLink}
      className={`relative flex flex-col min-h-16 flex-shrink-0 px-4 py-2 rounded-lg shadow transition-colors duration-300 ${
        isRead ? 'bg-black/10 hover:bg-black/15' : 'bg-english-violet-850 hover:bg-white/10'
      } group`}>
      <div className='flex justify-between items-center'>
        <span className='text-xs text-slate-400'>
          {format(new Date(createdAt), 'dd MMMM yyyy HH:mm')}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleMarkAsRead();
          }}
          className='ml-2'>
          {isRead ? (
            <EyeIcon className='h-5 text-slate-400 transition-colors duration-300 group-hover:text-slate-300' />
          ) : (
            <EyeSlashIcon className='h-5 text-slate-400 transition-colors duration-300 hover:text-flame-900' />
          )}
        </button>
      </div>
      <span className='text-sm font-bold py-1 break-words'>{content}</span>
    </Link>
  );
}

export default Notification;
