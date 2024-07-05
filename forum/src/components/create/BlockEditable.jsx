import { useDispatch, useSelector } from 'react-redux';
import {
  moveBlock,
  removeBlock,
  selectBlocks,
  setContent,
} from '../../features/create/createArticleSlice';
import SkriptEditor from '../SkriptEditor';
import { useEffect, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

function BlockEditable({ block: { type, id } }) {
  const textAreaRef = useRef(null);
  const editorRef = useRef(null);

  const dispatch = useDispatch();

  const blocks = useSelector(selectBlocks);
  const content = blocks.find((block) => block.id === id).content;

  const removeSelf = () => {
    dispatch(removeBlock(id));
  };

  const handleMoveUp = () => {
    dispatch(moveBlock({ id, dir: 'up' }));
  };

  const handleMoveDown = () => {
    dispatch(moveBlock({ id, dir: 'down' }));
  };

  const handleChange = (value) => {
    if (type === 'code') dispatch(setContent({ id, content: value }));
    if (type === 'text') {
      dispatch(setContent({ id, content: value.target.value }));
      adjustHeight();
    }
  };

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height,
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (type === 'text') adjustHeight(); // Adjust height on mount and content change
  }, [content, type]);

  return (
    <div className={`flex flex-col w-full space-y-1 my-4`}>
      {/* Options */}
      <div className='flex w-full justify-end items-end'>
        {/* Move Buttons */}
        <div className='flex space-x-1 items-end mr-6'>
          <span className='uppercase text-xs font-bold text-slate-200'>move block</span>
          <button
            onClick={handleMoveUp}
            className='p-1 rounded bg-english-violet-900 transition-colors duration-300 hover:bg-english-violet-850'>
            <ChevronUpIcon className='h-5' />
          </button>
          <button
            onClick={handleMoveDown}
            className='p-1 rounded bg-english-violet-900 transition-colors duration-300 hover:bg-english-violet-850'>
            <ChevronDownIcon className='h-5' />
          </button>
        </div>
        <span className='uppercase font-bold mr-2 text-slate-200 text-xs'>{type} BLOCK</span>
        <button
          className='px-4 py-1 bg-rose-800 rounded transition-colors duration-300 hover:bg-rose-700'
          onClick={removeSelf}>
          Remove
        </button>
      </div>
      {/* Text Block */}
      {type === 'text' && (
        <textarea
          autoComplete='false'
          className='px-4 py-1.5 min-h-[200px] rounded-md w-full bg-english-violet-900 outline-none resize-none placeholder-slate-400'
          placeholder='Start you text block here...'
          type='textarea'
          ref={textAreaRef}
          onChange={handleChange}
          value={content}
        />
      )}
      {type === 'code' && (
        <SkriptEditor content={content} handleChange={handleChange} editorRef={editorRef} />
      )}
    </div>
  );
}

export default BlockEditable;
