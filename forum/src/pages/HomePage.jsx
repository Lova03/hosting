import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel from '../components/Panel';
import {
  fetchArticles,
  resetArticles,
  resetLastSearchedTerm,
  selectArticles,
  selectArticlesHasError,
  selectArticlesLoading,
  selectLastSearchedTerm,
  selectMoreToLoad,
} from '../features/articles/articlesSlice';
import ArticlePreview from '../components/ArticlePreview';
import Searchbar from '../components/Searchbar';
import {
  incrementSearchPage,
  resetSearchTerm,
  selectSearchBarTyping,
  selectSearchPage,
  selectSearchTerm,
} from '../features/controls/controlsSlice';
import { Helmet } from 'react-helmet-async';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

function HomePage() {
  const dispatch = useDispatch();

  const articlesBox = useRef(null);

  const articlesLoading = useSelector(selectArticlesLoading);
  const articlesError = useSelector(selectArticlesHasError);
  const articles = useSelector(selectArticles);

  const searchTerm = useSelector(selectSearchTerm);
  const lastSearchedTerm = useSelector(selectLastSearchedTerm);
  const typing = useSelector(selectSearchBarTyping);
  const page = useSelector(selectSearchPage);
  const moreToLoad = useSelector(selectMoreToLoad);

  const fetchMore = () => {
    dispatch(fetchArticles({ query: searchTerm, page: page + 1 }));
    dispatch(incrementSearchPage());
  };

  const handleInfiniteScrolling = () => {
    const scrollY = articlesBox.current.scrollHeight - articlesBox.current.scrollTop;
    const height = articlesBox.current.offsetHeight;
    const offset = height - scrollY;
    if (offset > -100 && !articlesLoading && moreToLoad) {
      fetchMore();
    }
  };

  const refreshArticles = () => {
    dispatch(fetchArticles({ query: searchTerm, page: 1 }));
  };

  const handleSearchReset = () => {
    dispatch(resetArticles());
    dispatch(resetLastSearchedTerm());
    dispatch(resetSearchTerm());
    dispatch(fetchArticles({ query: '', page: 1 }));
  };

  return (
    <div
      ref={articlesBox}
      onScroll={handleInfiniteScrolling}
      className='relative flex flex-col isolate w-full h-screen pb-8 px-3 pt-1 overflow-y-auto overflow-x-hidden'>
      <Helmet>
        <title>Home | Zoblaze Forum</title>
        <meta
          name='description'
          content='Explore a wide range of Skript tutorials. Learn how to enhance your server with our community-contributed scripts.'
        />
      </Helmet>
      <div className='my-2 bg-transparent'>
        <Panel searchbar />
      </div>

      <div className='flex mdx:hidden justify-center items-center my-2'>
        <div className='w-full max-w-xl'>
          <Searchbar />
        </div>
      </div>

      {lastSearchedTerm && (
        <div className='flex space-x-1 sm:space-x-3 text-xs sm:text-base w-full mt-2 sm:px-8 items-center'>
          <button
            onClick={handleSearchReset}
            className='font-semibold transition-all duration-100 hover:text-zinc-400'>
            All articles
          </button>
          <ChevronRightIcon className='h-4' />
          <span>Search results for "{searchTerm}"</span>
        </div>
      )}

      {(typing || (!typing && articles?.length === 0 && articlesLoading)) && !articlesError && (
        <div className='min-h-[calc(100vh-14rem)] w-full flex justify-center items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-[6px] border-white/10 border-t-flame-900'></div>
        </div>
      )}

      {articles?.length === 0 && !articlesLoading && !typing && (
        <div className='flex flex-col items-center justify-center w-full flex-1'>
          <span>No articles found!</span>
          <button
            onClick={refreshArticles}
            className='px-5 py-2 mt-2 uppercase text-sm rounded-md bg-english-violet-900 transition-colors duration-200 hover:bg-english-violet-800 font-bold font-rubik'>
            Refresh
          </button>
        </div>
      )}

      {/* Articles */}
      <div className='mt-6 w-full flex flex-col items-center space-y-4'>
        {!typing &&
          articles?.map((article, idx) => (
            <ArticlePreview
              title={article.title}
              description={article.description}
              id={article.id}
              thumbnail={article.thumbnail}
              tags={article.tags}
              createdAt={article.createdAt}
              key={idx}
            />
          ))}

        {articlesLoading && articles.length > 0 && (
          <div className='w-full h-20 grid place-items-center'>
            <div className='animate-spin rounded-full h-9 w-9 border-[6px] border-white/10 border-t-flame-900'></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
