import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='page flex justify-center items-center flex-col text-center'>
      <Helmet>
        <title>404 Page Not Found | ZoBlaze</title>
        <meta
          name='description'
          content="The page you're looking for cannot be found. It might have been removed, had its name changed, or is temporarily unavailable."
        />
      </Helmet>
      <h1 className='text-6xl font-bold mb-8'>404</h1>
      <h2 className='text-3xl mb-2'>Page Not Found</h2>
      <p className='text-lg mb-8'>The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to='/'
        className='px-5 py-2 rounded-md bg-english-violet-900 transition-colors duration-200 hover:bg-english-violet-800 font-bold'>
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
