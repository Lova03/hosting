import SkriptEditor from './SkriptEditor';
import { useEffect, useRef } from 'react';

const tailwindColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-gray-500',
  'bg-cyan-500',
  'bg-lime-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-fuchsia-500',
  'bg-sky-500',
];

function getColorFromContent(content) {
  const relevantContent = content.slice(0, 5); // Take up to the first 5 characters
  let hash = 0;
  for (let i = 0; i < relevantContent.length; i++) {
    hash = relevantContent.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);
  const colorIndex = hash % tailwindColors.length;
  return tailwindColors[colorIndex];
}

function BlockReadOnly({ block: { type, content } }) {
  const textAreaRef = useRef(null);
  const editorRef = useRef(null);

  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (type === 'text') adjustHeight(); // Adjust height on mount and content change
  }, [content, type]);

  const textBlockColor = type === 'text' ? getColorFromContent(content) : '';

  return (
    <div className={`relative isolate flex w-full justify-center`}>
      {type === 'text' && <div className={`my-0.5 w-1 rounded-full ${textBlockColor}`}></div>}
      {type === 'text' && (
        <textarea
          autoComplete='false'
          className='px-4 py-1.5 rounded-md w-full max-w-3xl bg-transparent outline-none resize-none placeholder-zinc-400 transition-all duration-200'
          placeholder='Loading...'
          type='textarea'
          value={content}
          ref={textAreaRef}
          readOnly={true}
        />
      )}
      {type === 'code' && (
        <div className='w-full max-w-7xl'>
          <SkriptEditor content={content} editorRef={editorRef} readOnly />
        </div>
      )}
    </div>
  );
}

export default BlockReadOnly;
