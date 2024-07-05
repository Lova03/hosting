import { useDispatch, useSelector } from 'react-redux';
import { selectDescriptionToEdit, setDescriptionToEdit } from '../../features/edit/editArticleSlice';

function EditDescriptionInput() {
  const dispatch = useDispatch();
  const description = useSelector(selectDescriptionToEdit);

  const maxLines = 5;
  const handleChange = (e) => {
    const { target } = e;
    const lines = target.value.split('\n').length;
    if (lines >= maxLines) {
      e.preventDefault();
      const newValue = target.value.split('\n').slice(0, maxLines).join('\n');
      dispatch(setDescriptionToEdit(newValue));
      return;
    }
    dispatch(setDescriptionToEdit(target.value));
  };
  const handleKeyDown = (e) => {
    const { key } = e;
    if (key === 'Enter') {
      const lines = description.split('\n').length;
      if (lines >= maxLines) {
        e.preventDefault();
        return;
      }
    }
  };

  return (
    <textarea
      autoComplete='false'
      className='xs:ml-4 px-4 py-1.5 h-20 rounded-md w-full max-w-xl bg-english-violet-900 outline-none resize-none placeholder-slate-400 transition-all duration-200 hover:bg-english-violet-850'
      placeholder='Type your description here...'
      maxLength={300}
      type='textarea'
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={description}
    />
  );
}

export default EditDescriptionInput;
