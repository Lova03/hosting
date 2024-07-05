import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  resetCreateArticle,
  selectBlocks,
  selectDescription,
  selectTags,
  selectThumbnail,
  selectTitle,
  selectUnlisted,
} from '../../features/create/createArticleSlice';
import { selectSearchTerm } from '../../features/controls/controlsSlice';
import { fetchArticles, resetArticles } from '../../features/articles/articlesSlice';

function ConfirmAndPostArticle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const unlisted = useSelector(selectUnlisted);
  const title = useSelector(selectTitle);
  const description = useSelector(selectDescription);
  const thumbnail = useSelector(selectThumbnail);
  const tags = useSelector(selectTags);
  const blocks = useSelector(selectBlocks);

  const searchTerm = useSelector(selectSearchTerm);

  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleClick = () => {
    const filteredBlocks = blocks.filter((block) => block.content && block.content.trim() !== '');
    if (!title || !description || filteredBlocks.length === 0) {
      toast.error('Required fields are missing.');
      return;
    }

    const postData = {
      unlisted,
      title,
      description,
      thumbnail,
      tags,
      blocks: filteredBlocks,
    };

    const toastId = toast.loading('Creating article...');

    axios
      .post(`${baseUrl}/api/articles`, postData, {
        withCredentials: true,
      })
      .then((res) => {
        if (!unlisted) {
          dispatch(resetArticles());
          dispatch(fetchArticles({ query: searchTerm, page: 1 }));
        }
        dispatch(resetCreateArticle());
        navigate(`/articles/${res.data.article.id}`);
        toast.update(toastId, {
          render: 'Article created successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      })
      .catch((err) => {
        console.log('Failed to create the article:', err);
        toast.update(toastId, {
          render: `Failed to create the article. ${
            err.response?.data?.msg ? err.response.data.msg : 'Please try again.'
          }`,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
        });
      });
  };

  return (
    <div className='w-full isolate pb-8 pt-4 grid place-items-center'>
      <button
        onClick={handleClick}
        className='relative -z-10 isolate w-full max-w-80 mx-2 mt-8 py-3 rounded-lg bg-gradient-to-br from-flame-900 to-flame-700 transition-all duration-100 uppercase font-bold overflow-hidden group'>
        <span className='z-10'>Confirm and Post Article</span>
        <div className='absolute w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-300 -z-10 top-full transition-all duration-100 group-hover:top-0'></div>
      </button>
    </div>
  );
}

export default ConfirmAndPostArticle;
