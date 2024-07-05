import { useSelector } from 'react-redux';
import { selectBlocks, selectThumbnail } from '../features/create/createArticleSlice';
import VisibilityButtons from '../components/create/VisibilityButtons';
import ThumbnailSelectButtons from '../components/create/ThumbnailSelectButtons';
import { PhotoIcon } from '@heroicons/react/24/solid';
import TitleInput from '../components/create/TitleInput';
import DescriptionInput from '../components/create/DescriptionInput';
import TagsInput from '../components/create/TagsInput';
import BlockEditable from '../components/create/BlockEditable';
import ConfirmAndPostArticle from '../components/create/ConfirmAndPostArticle';
import BlockCreateButtons from '../components/create/BlockCreateButtons';
import { Helmet } from 'react-helmet-async';
import Panel from '../components/Panel';

function CreatePage() {
  const blocks = useSelector(selectBlocks);
  const thumbnail = useSelector(selectThumbnail);

  return (
    <div className='page flex flex-col space-y-8 isolate'>
      <Helmet>
        <title>Create Skript Article | ZoBlaze Forum</title>
        <meta
          name='description'
          content='Craft your own Skript tutorial or share your knowledge with the Skript community on ZoBlaze Forum. Join our growing database of Skript resources.'
        />
      </Helmet>

      <div className='my-2 bg-transparent'>
        <Panel />
      </div>

      <div className='w-full flex justify-center'>
        <div className='w-full max-w-4xl p-4 rounded-lg bg-dark-purple flex flex-col space-y-8'>
          {/* Visibility */}
          <div className='flex flex-col space-y-4 m-4'>
            <span className='font-bold uppercase'>Visibility</span>
            {/* Visibility buttons */}
            <VisibilityButtons />
          </div>

          {/* Thumbnail */}
          <div className='flex flex-col space-y-4 m-4'>
            <span className='font-bold uppercase'>Thumbnail</span>
            <ThumbnailSelectButtons />
            <div className='flex flex-col w-full items-center xs:items-start'>
              <span className='uppercase text-xs font-bold font-rubik mr-auto'>preview</span>
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt='Thumbnail'
                  className='h-32 w-32 bg-white/10 object-cover rounded'
                />
              ) : (
                <div className='rounded grid place-items-center bg-white/10 relative h-32 w-32'>
                  <PhotoIcon className='h-16 text-slate-200' />
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className='flex flex-col space-y-4 m-4'>
            <span className='font-bold uppercase'>Title</span>
            <TitleInput />
          </div>

          {/* Description */}
          <div className='flex flex-col space-y-4 m-4'>
            <span className='font-bold uppercase'>Description</span>
            <DescriptionInput />
          </div>

          {/* Tags */}
          <div className='flex flex-col space-y-4 m-4'>
            <span className='font-bold uppercase'>Tags</span>
            <TagsInput />
          </div>

          {/* Blocks */}
          <div className='flex flex-col space-y-4 m-4'>
            <span className='font-bold uppercase w-full text-left'>Blocks</span>
            {blocks.map((block, idx) => (
              <BlockEditable block={block} key={idx} />
            ))}

            {/* Create blocks */}
            <div className='min-h-[200px] rounded-md w-full flex flex-col justify-center items-center text-center bg-english-violet-900'>
              {blocks?.length === 0 && (
                <span className='font-bold text-zinc-400 flex-1 flex items-end'>
                  Add some blocks to create an article!
                </span>
              )}
              <BlockCreateButtons />
            </div>
          </div>

          <ConfirmAndPostArticle />
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
