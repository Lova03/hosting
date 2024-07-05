import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { format } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import Panel from '../components/Panel';
import BlockReadOnly from '../components/BlockReadOnly';
import { CodeBracketIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../features/user/userSlice';
import NewCommentInput from '../components/comments/NewCommentInput';
import {
  fetchArticle,
  selectArticle,
  selectArticleHasError,
  selectArticleLoading,
  selectComments,
  selectCommentsHasError,
  selectCommentsLoading,
} from '../features/singleArticle/singleArticleSlice';
import Comment from '../components/comments/Comment';

function ArticlePage() {
  const dispatch = useDispatch();

  const params = useParams();
  const articleId = params.id;

  const article = useSelector(selectArticle);
  const loading = useSelector(selectArticleLoading);
  const error = useSelector(selectArticleHasError);

  const comments = useSelector(selectComments);
  const commentsLoading = useSelector(selectCommentsLoading);
  const commentsHasError = useSelector(selectCommentsHasError);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchArticle({ articleId }));
  }, [articleId]);

  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength - 3) + '...';
  };

  return (
    <div className='page flex flex-col isolate'>
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
          <title>{truncateTitle(article.title, 34)} | ZoBlaze Forum</title>
          <meta name='description' content={article.description} />
        </Helmet>
      )}

      <div className='my-2 bg-transparent'>
        <Panel />
      </div>

      {loading && (
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
      {/* Article */}
      {!loading && !error && (
        <div className='flex flex-col w-full'>
          {/* Title & Author */}
          <div className='flex flex-col space-y-1 w-full'>
            <div className='flex space-x-2'>
              {article.unlisted && (
                <span className='px-4 py-1 w-fit text-xs text-zinc-400 rounded bg-white/10'>
                  This article is unlisted
                </span>
              )}
              {isLoggedIn && article.author?._id === user?._id && (
                <Link
                  to={`/edit/${article.id}`}
                  className='flex space-x-1 px-4 py-1 w-fit rounded bg-white/10 transition-colors duration-300 hover:bg-white/20'>
                  <PencilSquareIcon className='h-4 mb-0.5 text-zinc-400' />
                  <span className='text-xs text-zinc-400'>Edit Article</span>
                </Link>
              )}
            </div>
            <h1 className={`${article.unlisted ? 'mt-0' : 'mt-8'} text-center font-bold text-4xl`}>
              {article.title}
            </h1>
            <div className='flex justify-end'>
              <div className='flex flex-col items-start space-y-2'>
                <div className='flex space-x-1 items-center'>
                  <span className='text-xs text-zinc-400'>Author</span>
                  <span className='text-sm font-bold text-zinc-300'>{article.author.username}</span>
                </div>
                <div className='flex space-x-1 items-end'>
                  <span className='text-xs text-zinc-400'>Published on</span>
                  <span className='text-xs font-bold text-zinc-400'>
                    {format(new Date(article.createdAt), 'dd MMMM yyyy')}
                  </span>
                </div>
                {article.createdAt !== article.updatedAt && (
                  <div className='flex space-x-1 items-end'>
                    <span className='text-xs text-zinc-400'>Updated on</span>
                    <span className='text-xs font-bold text-zinc-400'>
                      {format(new Date(article.updatedAt), 'dd MMMM yyyy')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Thumbnail & Desc */}
          <div className='w-full grid place-items-center'>
            <div className='w-full max-w-4xl flex flex-col mt-8 space-y-2 items-center xs:flex-row xs:space-y-0 xs:space-x-2'>
              {article.thumbnail ? (
                <img
                  src={article.thumbnail}
                  draggable={false}
                  alt='Article Thumbnail'
                  className='w-32 h-32 object-cover select-none rounded-md shadow-lg bg-english-violet-900 transition-colors duration-300 hover:bg-english-violet-850'
                />
              ) : (
                <div
                  className={`w-32 h-32 grid place-items-center select-none rounded-md shadow-lg bg-english-violet-900 transition-colors duration-300 hover:bg-english-violet-850`}>
                  <CodeBracketIcon className='h-16' />
                </div>
              )}
              <p className='flex-1 text-center'>{article.description}</p>
            </div>
          </div>
          {/* Blocks */}
          <div className='flex flex-col space-y-8 mx-4 mt-12'>
            {article.blocks.map((block, idx) => (
              <BlockReadOnly block={block} key={idx} />
            ))}
          </div>

          {/* Comments */}
          <div className='w-full flex justify-center mt-16'>
            <div className='w-full flex flex-col max-w-4xl'>
              <NewCommentInput articleId={article.id} />
              <div className='flex flex-col-reverse'>
                {commentsLoading && (
                  <div className='w-full grid place-items-center py-8'>
                    <div className='animate-spin rounded-full h-8 w-8 border-4 border-white/10 border-t-flame-900'></div>
                  </div>
                )}

                {commentsHasError && (
                  <div className='w-full grid place-items-center py-8'>
                    <span>There was an error fetching comments!</span>
                  </div>
                )}

                {!commentsLoading &&
                  !commentsHasError &&
                  comments.map((comment, idx) => (
                    <div className='mt-4' key={idx}>
                      <Comment comment={comment} articleId={articleId} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;
