import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import UserAvatar from '../UserAvatar';
import TimeAgo from 'react-timeago';
import { useState } from 'react';
import ReplyInput from './ReplyInput';

function Comment({ comment, articleId }) {
  const [isReplying, setIsReplying] = useState(false);

  const toggleReply = () => {
    setIsReplying((prev) => !prev);
  };

  const handleClose = () => {
    setIsReplying(false);
  };

  return (
    <div className='flex flex-col rounded-md bg-dark-purple p-2 space-y-2'>
      <div className='flex items-center'>
        {!comment.isDeleted ? (
          <UserAvatar
            size={28}
            src={
              comment.author.discordId && comment.author.avatar
                ? `https://cdn.discordapp.com/avatars/${comment.author.discordId}/${comment.author.avatar}.png?size=2048`
                : null
            }
          />
        ) : (
          <UserAvatar size={28} src={null} />
        )}
        <span className='font-bold ml-2'>
          {!comment.isDeleted ? comment.author.username : 'Unknown author'}
        </span>
        <div className='ml-auto px-2 text-xs'>
          <TimeAgo date={new Date(comment.createdAt)} />
        </div>
      </div>
      <div className='rounded-md bg-english-violet-900 px-4 py-2 text-sm'>
        {comment.content.split('\n').map((line, idx) => (
          <span className='break-words' key={idx}>
            {line}
            {idx < comment.content.split('\n').length - 1 && <br />}
          </span>
        ))}
      </div>
      {!comment.isDeleted && (
        <div className='flex px-4 justify-end'>
          <button
            onClick={toggleReply}
            className='flex space-x-1 rounded-full px-3 py-1 transition-colors duration-300 hover:bg-white/10'>
            <ChatBubbleLeftIcon className='h-4' />
            <span className='font-bold text-xs'>Reply</span>
          </button>
        </div>
      )}
      {isReplying && (
        <ReplyInput handleClose={handleClose} commentId={comment._id} articleId={articleId} />
      )}
      {/* Replies */}
      <div className='flex flex-col-reverse ml-4 xs:ml-8 sm:ml-12'>
        {comment.replies.map((reply, idx) => (
          <Comment key={idx} comment={reply} articleId={articleId} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
