import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserLoading } from '../../features/user/userSlice';
import { toggleSignInModal } from '../../features/controls/controlsSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { fetchComments } from '../../features/singleArticle/singleArticleSlice';

const NewCommentInput = ({ articleId }) => {
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
        toast.error('Comment cannot be empty!');
        return;
      }

      setSubmitting(true);
      try {
        const response = await axios.post(
          `${baseUrl}/api/articles/${articleId}/comments`,
          { content },
          { withCredentials: true }
        );

        if (response.data?.success) {
          toast.success('Comment created!');
          setContent('');
          dispatch(fetchComments({ articleId }));
        } else {
          toast.error('Failed to create comment!');
        }
      } catch (error) {
        toast.error(
          `Failed to create comment! ${
            error.response?.data?.msg ? error.response.data.msg : 'Please try again.'
          }`
        );
      } finally {
        setSubmitting(false);
      }
    },
    [baseUrl, articleId, content, dispatch, isLoggedIn]
  );

  return (
    <div className='flex flex-col mt-2 pb-6 border-b border-solid border-zinc-600 '>
      <textarea
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className='text-sm sm:text-md bg-dark-purple flex p-2 h-20 rounded-md outline-none resize-none placeholder-zinc-400'
        placeholder='Leave a comment...'
        value={content}
        maxLength='250'
      />
      <button
        className='relative flex justify-center items-center ml-auto mr-6 px-7 py-2 mt-2 rounded-sm shadow-md bg-flame-900 overflow-hidden isolate group'
        onClick={handleSubmit}
        disabled={isLoading || submitting}>
        {isLoading || submitting ? (
          <div className='animate-spin rounded-full h-5 w-5 border-2 border-zinc-200 border-t-zinc-500'></div>
        ) : (
          <>
            <div className='absolute inset-0 -z-10 bg-emerald-400 transition-transform duration-300 -translate-x-full group-hover:-translate-x-0'></div>
            <PaperAirplaneIcon className='h-5' />
          </>
        )}
      </button>
    </div>
  );
};

export default NewCommentInput;
