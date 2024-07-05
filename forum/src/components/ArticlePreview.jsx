import { format } from 'date-fns';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

function ArticlePreview({
  title = 'Cool skript code!',
  thumbnail,
  description = 'Title says it all!',
  tags = ['skript', 'code'],
  id = '',
  createdAt = null,
}) {
  return (
    <div className='flex flex-col w-full max-w-3xl bg-dark-purple rounded-md'>
      {/* Information */}
      <div className='flex px-2 pt-2 pb-1'>
        {/* Thumbnail */}
        {thumbnail ? (
          <Link to={`articles/${id}`} className='mr-2 rounded-lg overflow-hidden h-fit group'>
            <img
              src={thumbnail}
              draggable={false}
              alt='Article Thumbnail'
              className='w-32 h-32 object-cover select-none bg-english-violet-900 transition-colors duration-300 group-hover:bg-english-violet-850'
            />
          </Link>
        ) : (
          <Link to={`articles/${id}`} className='mr-2 rounded-lg overflow-hidden h-fit group'>
            <div className='w-32 h-32 grid place-items-center bg-english-violet-900 transition-colors duration-300 group-hover:bg-english-violet-850'>
              <CodeBracketIcon className='h-16' />
            </div>
          </Link>
        )}

        {/* Content */}
        <div className='flex flex-1 min-h-[8rem] flex-col space-y-4 px-2 py-1'>
          {/* Title */}
          <Link
            to={`/articles/${id}`}
            className='text-xl w-fit font-extrabold text-left underline cursor-pointer transition-all hover:text-hunyadi-yellow'>
            {title}
          </Link>
          {/* Desc */}
          <span className='text-sm ml-4 text-zinc-200'>{description}</span>
        </div>
      </div>

      {/* Buttons & Tags */}
      <div className='flex flex-col space-y-2 w-full min-h-[2.5rem] px-2 pb-2'>
        {/* Tags */}
        <div className='flex ml-4 space-x-1 flex-wrap items-center'>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className='text-xs px-3 py-1 my-0.5 rounded bg-english-violet-900 transition-colors duration-300 hover:bg-english-violet-850 select-none'>
              {tag}
            </span>
          ))}
        </div>
        {/* Buttons */}
        <div className='flex justify-end items-center space-x-2'>
          {createdAt && (
            <div className='h-full flex justify-start items-end mr-auto'>
              <span className='text-xs text-slate-500 font-rubik'>
                {format(new Date(createdAt), 'dd MMMM yyyy')}
              </span>
            </div>
          )}
          {id && (
            <Link
              to={`/articles/${id}`}
              className='px-8 py-2 rounded-md transition-all duration-200 bg-flame-900 hover:bg-flame-700'>
              Expand!
            </Link>
          )}

          {/* Favourite Button */}

          {!id && (
            <div className='px-5 py-2 bg-english-violet-900 rounded-md transition-colors duration-300 hover:bg-english-violet-850'>
              <span className='text-sm'>Article has a missing ID and cannot be opened.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlePreview;
