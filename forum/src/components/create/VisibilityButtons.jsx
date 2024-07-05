import { useDispatch, useSelector } from 'react-redux';
import { selectUnlisted, toggleUnlisted } from '../../features/create/createArticleSlice';

function VisibilityButtons() {
  const dispatch = useDispatch();
  const unlisted = useSelector(selectUnlisted);

  const setPublicVisibility = () => {
    dispatch(toggleUnlisted(false));
  };

  const setUnlistedVisibility = () => {
    dispatch(toggleUnlisted(true));
  };

  return (
    <div className='ml-4 flex space-x-4'>
      <button
        onClick={setPublicVisibility}
        className={`${
          unlisted
            ? 'bg-gray-500 hover:bg-gray-400 text-slate-200'
            : 'bg-emerald-400 hover:bg-emerald-300'
        } px-4 py-2 transition-all duration-300 rounded-md uppercase font-bold text-sm`}>
        Public
      </button>
      <button
        onClick={setUnlistedVisibility}
        className={`${
          unlisted
            ? 'bg-emerald-400 hover:bg-emerald-300'
            : 'bg-gray-500 hover:bg-gray-400 text-slate-200'
        } px-4 py-2 transition-all duration-300 rounded-md uppercase font-bold text-sm`}>
        Unlisted
      </button>
    </div>
  );
}

export default VisibilityButtons;
