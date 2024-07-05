import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Panel from '../components/Panel';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchArticleToEdit,
  selectArticleToEditAuthor,
  selectArticleToEditHasError,
  selectArticleToEditLoading,
  selectBlocksToEdit,
  selectThumbnailToEdit,
  selectTitleToEdit,
} from '../features/edit/editArticleSlice';
import EditVisibilityButtons from '../components/edit/EditVisibilityButtons';
import EditThumbnailSelectButtons from '../components/edit/EditThumbnailSelectButtons';
import { PhotoIcon } from '@heroicons/react/24/solid';
import EditTitleInput from '../components/edit/EditTitleInput';
import EditDescriptionInput from '../components/edit/EditDescriptionInput';
import EditTagsInput from '../components/edit/EditTagsInput';
import EditBlockEditable from '../components/edit/EditBlockEditable';
import EditBlockCreateButtons from '../components/edit/EditBlockCreateButtons';
import ConfirmAndEditArticle from '../components/edit/ConfirmAndEditArticle';
import { selectUser } from '../features/user/userSlice';
import { toast } from 'react-toastify';

function EditPage() {
  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();
  const articleId = params.id;

  const loading = useSelector(selectArticleToEditLoading);
  const error = useSelector(selectArticleToEditHasError);
  const blocks = useSelector(selectBlocksToEdit);
  const thumbnail = useSelector(selectThumbnailToEdit);
  const title = useSelector(selectTitleToEdit);

  const author = useSelector(selectArticleToEditAuthor);
  const user = useSelector(selectUser);

  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    dispatch(fetchArticleToEdit({ articleId }));
  }, [dispatch, articleId]);

  useEffect(() => {
    if (author && !loading) {
      if (author._id !== user._id) {
        toast.error('You do not have permission to edit this article.');
        navigate('/');
      } else {
        setAllowed(true);
      }
    }
  }, [author]);

  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className='page flex flex-col isolate space-y-8'>
      {loading && (
        <Helmet>
          <title>Loading Article... | ZoBlaze Forum</title>
          <meta name='description' content='Loading article details. Please wait...' />
        </Helmet>
      )}
      {error && (
        <Helmet>
          <title>Article Not Found | ZoBlaze Forum</title>
          <meta
            name='description'
            content='The requested article could not be found or an error occurred while fetching article details.'
          />
        </Helmet>
      )}
      {!loading && !error && (
        <Helmet>
          <title>Edit {truncateTitle(title, 29)} | ZoBlaze Forum</title>
          <meta name='description' content={`Editing article: ${title}`} />
        </Helmet>
      )}

      <div className='my-2 bg-transparent'>
        <Panel />
      </div>

      {(loading || !allowed) && !error && (
        <div className='grid w-full flex-1 place-items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-flame-900'></div>
        </div>
      )}
      {error && (
        <div className='flex flex-col flex-1 w-full justify-center items-center text-center'>
          <h1 className='text-6xl font-bold mb-8'>Oops!</h1>
          <h2 className='text-3xl mb-2'>Article Not Found</h2>
          <p className='text-lg mb-8'>
            The article you're looking for either doesn't exist or there was an error fetching it.
          </p>
          <Link
            to='/'
            className='px-5 py-2 rounded-md bg-english-violet-900 transition-all duration-200 hover:bg-english-violet-800 font-bold'>
            Go Back Home
          </Link>
        </div>
      )}

      {!loading && !error && allowed && (
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-4xl p-4 rounded-lg bg-dark-purple flex flex-col space-y-8'>
            {/* Visibility */}
            <div className='flex flex-col space-y-4 m-4'>
              <span className='font-bold uppercase'>Visibility</span>
              {/* Visibility buttons */}
              <EditVisibilityButtons />
            </div>

            {/* Thumbnail */}
            <div className='flex flex-col space-y-4 m-4'>
              <span className='font-bold uppercase'>Thumbnail</span>
              <EditThumbnailSelectButtons />
              <div className='flex flex-col w-full items-center xs:items-start'>
                <span className='uppercase text-xs font-bold font-rubik mr-auto'>preview</span>
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt='Thumbnail'
                    className='h-32 w-32 bg-white/10 object-cover rounded'
                  />
                ) : (
                  <div className='rounded grid place-items-center bg-white/10 relative h-32 w-32'>
                    <PhotoIcon className='h-16 text-slate-200' />
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div className='flex flex-col space-y-4 m-4'>
              <span className='font-bold uppercase'>Title</span>
              <EditTitleInput />
            </div>

            {/* Description */}
            <div className='flex flex-col space-y-4 m-4'>
              <span className='font-bold uppercase'>Description</span>
              <EditDescriptionInput />
            </div>

            {/* Tags */}
            <div className='flex flex-col space-y-4 m-4'>
              <span className='font-bold uppercase'>Tags</span>
              <EditTagsInput />
            </div>

            {/* Blocks */}
            <div className='flex flex-col space-y-4 m-4'>
              <span className='font-bold uppercase w-full text-left'>Blocks</span>
              {blocks.map((block, idx) => (
                <EditBlockEditable block={block} key={idx} />
              ))}

              {/* Create blocks */}
              <div className='min-h-[200px] rounded-md w-full flex flex-col justify-center items-center text-center bg-english-violet-900'>
                {blocks?.length === 0 && (
                  <span className='font-bold text-zinc-400 flex-1 flex items-end'>
                    Article has to have at least one block!
                  </span>
                )}
                <EditBlockCreateButtons />
              </div>
            </div>

            <ConfirmAndEditArticle />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPage;
