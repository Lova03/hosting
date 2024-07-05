import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserLoading } from '../../features/user/userSlice';
import { toggleSignInModal } from '../../features/controls/controlsSlice';
import { fetchComments } from '../../features/singleArticle/singleArticleSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

function ReplyInput({ handleClose, commentId, articleId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectUserLoading);

  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const maxLines = 5;

  const handleChange = useCallback((e) => {
    const { target } = e;
    const lines = target.value.split('\n').length;
    if (lines > maxLines) {
      const newValue = target.value.split('\n').slice(0, maxLines).join('\n');
      setContent(newValue);
      return;
    }
    setContent(target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && content.split('\n').length >= maxLines) {
        e.preventDefault();
      }
    },
    [content]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isLoggedIn) {
        dispatch(toggleSignInModal(true));
        return;
      }

      if (!content.trim()) {
        toast.error('Reply cannot be empty!');
        return;
      }

      setSubmitting(true);
      try {
        const response = await axios.post(
          `${baseUrl}/api/articles/comments/${commentId}/replies`,
          { content },
          { withCredentials: true }
        );

        if (response.data?.success) {
          toast.success('Reply sent!');
          setContent('');
          dispatch(fetchComments({ articleId }));
        } else {
          toast.error('Failed to send reply!');
        }
      } catch (error) {
        toast.error(
          `Failed to send reply! ${
            error.response?.data?.msg ? error.response.data.msg : 'Please try again.'
          }`
        );
      } finally {
        setSubmitting(false);
      }
    },
    [baseUrl, commentId, articleId, content, dispatch, isLoggedIn]
  );

  return (
    <div className='flex flex-col pb-2'>
      <textarea
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className='text-sm sm:text-md bg-black/15 flex p-2 h-20 rounded-md outline-none resize-none placeholder-zinc-400'
        placeholder='Leave a reply...'
        value={content}
        maxLength='250'
      />
      <div className='flex space-x-2 justify-end mx-6 mt-1'>
        <button
          className='flex justify-center items-center px-5 py-1.5 mt-2 rounded-sm shadow-md transition-colors duration-300 bg-red-600 hover:bg-red-500'
          onClick={handleClose}
          disabled={isLoading || submitting}>
          {isLoading || submitting ? (
            <div className='animate-spin rounded-full h-4 w-4 border border-zinc-200 border-t-zinc-500'></div>
          ) : (
            <span className='font-rubik font-bold text-xs uppercase'>Cancel</span>
          )}
        </button>
        <button
          className='relative flex justify-center items-center px-7 py-1.5 mt-2 rounded-sm shadow-md bg-sky-500 overflow-hidden isolate group'
          onClick={handleSubmit}
          disabled={isLoading || submitting}>
          {isLoading || submitting ? (
            <div className='animate-spin rounded-full h-4 w-4 border border-zinc-200 border-t-zinc-500'></div>
          ) : (
            <>
              <div className='absolute inset-0 -z-10 bg-emerald-400 transition-transform duration-300 -translate-x-full group-hover:-translate-x-0'></div>
              <PaperAirplaneIcon className='h-4' />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ReplyInput;
