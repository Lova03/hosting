import { useDispatch, useSelector } from 'react-redux';
import { selectTitle, setTitle } from '../../features/create/createArticleSlice';

function TitleInput() {
  const dispatch = useDispatch();
  const title = useSelector(selectTitle);

  const handleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <input
      autoComplete='false'
      className='xs:ml-4 px-4 py-1.5 rounded-md w-full max-w-xl bg-english-violet-900 outline-none placeholder-slate-400 transition-all duration-200 hover:bg-english-violet-850'
      placeholder='Type your title here...'
      maxLength={60}
      type='text'
      value={title}
      onChange={handleChange}
    />
  );
}

export default TitleInput;
