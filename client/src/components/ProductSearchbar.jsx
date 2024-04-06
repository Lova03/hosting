import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/products/productsSlice';

function ProductSearchbar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(value));
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='w-full grid place-items-center'>
      <form className='flex h-14 w-full rounded-xl bg-dark-purple/70 max-w-3xl' onSubmit={handleSubmit}>
        <MagnifyingGlassIcon
          onClick={handleSubmit}
          className='h-7 my-auto px-3 text-zinc-500 cursor-pointer'
        />
        <input
          autoComplete='false'
          className='text-base flex-1 pr-2 bg-transparent outline-none placeholder-zinc-400 select-none'
          placeholder='Search for products...'
          type='text'
          value={value}
          onChange={handleChange}
        />
        <button hidden></button>
      </form>
    </div>
  );
}

export default ProductSearchbar;
