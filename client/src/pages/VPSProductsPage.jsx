import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import UserPanel from '../components/UserPanel';
import {
  fetchProducts,
  selectFilteredProducts,
  selectProductsHasError,
  selectProductsIsLoading,
  selectProductsSearchTerm,
  setSearchTerm,
} from '../features/products/productsSlice';
import VPSProductCard from '../components/VPSProductCard';
import Footer from '../components/Footer';
import MinecraftProductCard from '../components/MinecraftProductCard';
import DiscordProductCard from '../components/DiscordProductCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductSearchbar from '../components/ProductSearchbar';

function VPSProductsPage() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectProductsIsLoading);
  const hasError = useSelector(selectProductsHasError);
  const searchTerm = useSelector(selectProductsSearchTerm);

  const { minecraft, discordBot, vps } = useSelector(selectFilteredProducts);

  const handleSearchReset = () => {
    dispatch(setSearchTerm(''));
  };

  const refetchProducts = () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(setSearchTerm(''));
  }, [dispatch]);

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>VPS Hosting Solutions | ZoBlaze</title>
        <meta
          name='description'
          content="Unlock the full potential of your projects with ZoBlaze's VPS hosting. Offering scalable, secure, and high-performance virtual private servers for all your needs."
        />
      </Helmet>

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='my-4'>
        <ProductSearchbar />
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className='min-h-[calc(100vh-10rem)] w-full flex justify-center items-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-[6px] border-white/10 border-t-flame-900'></div>
        </div>
      )}

      {/* Error Message */}
      {hasError && (
        <div className='min-h-[calc(100vh-10rem)] w-full flex flex-col justify-center items-center text-center px-4'>
          <h2 className='text-2xl font-semibold text-white mb-4'>Oops! Something went wrong.</h2>
          <p className='text-white mb-6'>
            We're having trouble loading the VPS products right now. Please try again later.
          </p>

          {/* Refetch Button */}
          <button
            onClick={refetchProducts}
            className='bg-flame-900 text-white font-bold py-2 px-4 rounded hover:bg-flame-800 transition-colors duration-300 ease-in-out'>
            Try Again
          </button>
        </div>
      )}

      {/* Products */}
      {!isLoading && !hasError && (
        <div className='flex w-full flex-col items-center mt-8'>
          {searchTerm.length > 0 && (
            <div className='flex text-base w-full px-4 py-4 items-center'>
              <button
                onClick={handleSearchReset}
                className='font-semibold transition-all duration-100 hover:text-zinc-400'>
                VPS Products
              </button>
              <ChevronRightIcon className='h-4' />
              <span>Search results for "{searchTerm}"</span>
            </div>
          )}

          <div className='relative w-full max-w-5xl mx-6'>
            {/* Cards */}
            <div
              className='w-full grid place-items-center gap-4'
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(288px, 1fr))',
              }}>
              {vps.map((item, idx) => (
                <VPSProductCard key={idx} product={item} />
              ))}
              {searchTerm.length > 0 &&
                minecraft.map((item, idx) => <MinecraftProductCard key={idx} product={item} />)}
              {searchTerm.length > 0 &&
                discordBot.map((item, idx) => <DiscordProductCard key={idx} product={item} />)}
            </div>
            {/* No Cards Found */}
            {minecraft.length === 0 && discordBot.length === 0 && vps.length === 0 && (
              <div className='w-full min-h-80 grid place-items-center px-8 py-4'>
                <div className='flex flex-col max-w-lg'>
                  <span className='mb-16 text-xl font-bold'>No products found :/</span>
                  <button
                    onClick={handleSearchReset}
                    className='rounded px-6 py-1.5 bg-flame-900 transition-all duration-300 hover:bg-flame-850'>
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className=' mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default VPSProductsPage;
