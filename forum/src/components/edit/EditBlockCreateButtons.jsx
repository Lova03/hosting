import { PlusIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { addBlockToEdit } from '../../features/edit/editArticleSlice';

function EditBlockCreateButtons() {
  const dispatch = useDispatch();

  const handleAddText = () => {
    dispatch(addBlockToEdit('text'));
  };

  const handleAddCode = () => {
    dispatch(addBlockToEdit('code'));
  };

  return (
    <div className='flex flex-1 items-center justify-start space-x-2'>
      <button
        onClick={handleAddText}
        className='pl-1 pr-3 py-1 xxs:py-2 xxs:pl-2 xxs:pr-4 flex space-x-1 rounded shadow-md cursor-pointer items-center bg-orange-700 transition-all hover:bg-orange-600'>
        <PlusIcon className='h-5' />
        <span className='text-xs xxs:text-sm sm:hidden'>Text</span>
        <span className='text-xs xxs:text-sm hidden sm:block'>Add Text Block</span>
      </button>
      <button
        onClick={handleAddCode}
        className='pl-1 pr-3 py-1 xxs:py-2 xxs:pl-2 xxs:pr-4 flex space-x-1 rounded shadow-md cursor-pointer items-center bg-teal-600 transition-all hover:bg-teal-500'>
        <PlusIcon className='h-5' />
        <span className='text-xs xxs:text-sm sm:hidden'>Code</span>
        <span className='text-xs xxs:text-sm hidden sm:block'>Add Code Block</span>
      </button>
    </div>
  );
}

export default EditBlockCreateButtons;
