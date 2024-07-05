import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { addTagToEdit, removeTagToEdit, selectTagsToEdit } from '../../features/edit/editArticleSlice';

function EditTagsInput() {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const tags = useSelector(selectTagsToEdit);

  const handleChange = (e) => {
    // Prevent whitespace from being entered
    const newValue = e.target.value.replace(/\s+/g, '');
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length < 3) return;
    if (tags.length >= 20) return;

    const sanitizedValue = value.replace(/\s+/g, '');

    dispatch(addTagToEdit(sanitizedValue));
    setValue('');
  };

  return (
    <div className='flex flex-col space-y-2 xs:ml-4'>
      <form className='flex space-x-1' onSubmit={handleSubmit}>
        <input
          type='text'
          value={value}
          onChange={handleChange}
          pattern='[^\s]+' // This pattern prevents whitespace
          placeholder='Add a tag'
          maxLength={16}
          className='px-4 py-1.5 rounded-md w-full max-w-[16rem] bg-english-violet-900 outline-none placeholder-slate-400 transition-all duration-200 hover:bg-english-violet-850'
        />
        <button
          className='px-5 py-1.5 rounded-md transition-all duration-200 uppercase font-bold bg-flame-900 hover:bg-flame-700'
          type='submit'>
          Add
        </button>
      </form>
      <div className='flex w-full max-w-md flex-wrap'>
        {tags.map((tag, idx) => (
          <Tag key={idx} tag={tag} />
        ))}
      </div>
    </div>
  );
}

function Tag({ tag }) {
  const dispatch = useDispatch();

  const removeSelf = () => {
    dispatch(removeTagToEdit(tag));
  };

  return (
    <button
      onClick={removeSelf}
      className='flex text-xs items-center px-3 py-1 ml-1 my-0.5 rounded-full select-none hover:cursor-pointer bg-sky-600 transition-all duration-200 hover:bg-rose-500 group'>
      <div className='w-3 h-3 flex justify-center items-center'>
        <span className='block transition-all duration-200 opacity-100 group-hover:opacity-0 group-hover:hidden'>
          #
        </span>
        <XMarkIcon className='w-full hidden transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:flex' />
      </div>
      <span className='font-bold ml-0.5'>{tag}</span>
    </button>
  );
}

export default EditTagsInput;
