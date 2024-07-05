import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchInputValue,
  changeSearchTerm,
  selectSearchInputValue,
  selectSearchTerm,
  setSearchPage,
  toggleSearchbarTyping,
} from '../features/controls/controlsSlice';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { fetchArticles, resetArticles, toggleMoreToLoad } from '../features/articles/articlesSlice';

function Searchbar() {
  const dispatch = useDispatch();
  const value = useSelector(selectSearchInputValue);
  const searchTerm = useSelector(selectSearchTerm);

  const startFetch = () => {
    dispatch(changeSearchTerm(value));
    dispatch(setSearchPage(1));
    dispatch(resetArticles());
    dispatch(fetchArticles({ query: value, page: 1 }));
    dispatch(toggleMoreToLoad(true));
  };

  useEffect(() => {
    const cooldown = setTimeout(() => {
      if (value !== searchTerm) {
        startFetch();
      }
      dispatch(toggleSearchbarTyping(false));
    }, 1000);

    return () => clearTimeout(cooldown);
  }, [dispatch, startFetch, searchTerm, value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(toggleSearchbarTyping(false));
    startFetch();
  };

  const handleChange = (e) => {
    dispatch(toggleSearchbarTyping(true));
    dispatch(changeSearchInputValue(e.target.value));
  };

  return (
    <div className='w-full grid place-items-center'>
      <form
        className='flex py-2.5 w-full rounded-xl bg-english-violet-900/70 max-w-3xl'
        onSubmit={handleSubmit}>
        <MagnifyingGlassIcon
          onClick={handleSubmit}
          className='h-5 my-auto px-3 text-zinc-500 cursor-pointer'
        />
        <input
          autoComplete='false'
          className='text-base flex-1 pr-2 bg-transparent outline-none placeholder-zinc-400 select-none'
          placeholder='Search for articles...'
          type='text'
          value={value}
          onChange={handleChange}
        />
        <button hidden></button>
      </form>
    </div>
  );
}

export default Searchbar;
