import { NoSymbolIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { selectThumbnailToEdit, setThumbnailToEdit } from '../../features/edit/editArticleSlice';

function EditThumbnailSelectButtons() {
  const dispatch = useDispatch();
  const thumbnail = useSelector(selectThumbnailToEdit);
  const inputFileRef = useRef(null);

  const selectNone = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
    dispatch(setThumbnailToEdit(''));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setThumbnailToEdit(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='ml-4 flex flex-col space-y-4 xs:space-y-0 xs:flex-row xs:space-x-4'>
      <button
        onClick={selectNone}
        className={`${
          !thumbnail
            ? 'bg-emerald-400 hover:bg-emerald-300'
            : 'bg-gray-500 hover:bg-gray-400 text-slate-200'
        } pl-1.5 pr-4 py-2 transition-all duration-300 rounded-md uppercase font-bold text-sm flex w-fit items-center space-x-1`}>
        <NoSymbolIcon className='h-5' />
        <span>None</span>
      </button>

      <div className='relative cursor-pointer group w-fit'>
        <button className='bg-blue-400 group-hover:bg-blue-300 pl-1.5 pr-4 py-2 transition-all duration-300 rounded-md uppercase font-bold text-sm flex items-center space-x-1'>
          <PhotoIcon className='h-5' />
          <span>Select Thumbnail</span>
        </button>
        <input
          ref={inputFileRef}
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='absolute file-input opacity-0 inset-0 cursor-pointer bg-red-500'
        />
      </div>
    </div>
  );
}

export default EditThumbnailSelectButtons;
