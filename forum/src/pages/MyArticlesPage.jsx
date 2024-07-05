import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MyArticle from '../components/MyArticle';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Panel from '../components/Panel';

function MyArticlesPage() {
  const [articles, setArticles] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const removeDeletedArticle = (articleId) => {
    setArticles((prev) => prev.filter((article) => article.id !== articleId));
    setFilteredArticles((prev) => prev.filter((article) => article.id !== articleId));
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/my-articles`, {
          withCredentials: true,
        });
        setArticles(response.data.data);
        setFilteredArticles(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticle();
  }, []);

  useEffect(() => {
    if (articles) {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredArticles(filtered);
    }
  }, [searchTerm, articles]);

  return (
    <div className='page flex flex-col isolate'>
      {loading && (
        <Helmet>
          <title>Loading Articles... | ZoBlaze Forum</title>
          <meta
            name='description'
            content='Your Skript articles are currently loading. Please wait a moment.'
          />
        </Helmet>
      )}
      {error && (
        <Helmet>
          <title>Error Loading Articles | ZoBlaze Forum</title>
          <meta
            name='description'
            content='An error occurred while trying to fetch your Skript articles. Please try again later.'
          />
        </Helmet>
      )}
      {!loading && !error && (
        <Helmet>
          <title>My Articles | ZoBlaze Forum</title>
          <meta
            name='description'
            content='View and manage your articles on ZoBlaze Forum. Edit, share, or remove your contributions to the ZoBlaze community.'
          />
        </Helmet>
      )}

      <div className='my-2 z-50 bg-transparent'>
        <Panel />
      </div>

      <div className='sticky top-0 w-full grid place-items-center mt-4 backdrop-blur-md'>
        <div className='flex py-2.5 w-full rounded-xl bg-english-violet-900/70 max-w-4xl'>
          <MagnifyingGlassIcon className='h-5 my-auto px-3 text-zinc-500' />
          <input
            autoComplete='false'
            className='text-base flex-1 pr-2 bg-transparent outline-none placeholder-zinc-400 select-none'
            placeholder='Search your articles...'
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && (
        <div className='grid w-full flex-1 place-items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-white/10 border-t-flame-900'></div>
        </div>
      )}
      {error && (
        <div className='flex flex-col flex-1 w-full justify-center items-center text-center'>
          <h1 className='text-6xl font-bold mb-8'>Oops!</h1>
          <h2 className='text-3xl mb-2'>Failed to fetch your articles!</h2>
          <p className='text-lg mb-8'>You are either not logged in or there was an error fetching it.</p>
          <Link
            to='/'
            className='px-5 py-2 rounded-md bg-english-violet-900 transition-all duration-200 hover:bg-english-violet-800 font-bold'>
            Go Back Home
          </Link>
        </div>
      )}

      {!loading && !error && (
        <div className='flex flex-col flex-1 items-center my-8 space-y-4'>
          {filteredArticles.map((a, idx) => (
            <MyArticle key={idx} article={a} removeDeletedArticle={removeDeletedArticle} />
          ))}
          {filteredArticles.length === 0 && (
            <div className='grid place-items-center w-full flex-1'>
              <span>No articles found!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyArticlesPage;
