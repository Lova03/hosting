import ArticlePreview from '../components/ArticlePreview';
import { toast } from 'react-toastify';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyArticle({
  article: { title, description, thumbnail, tags, id, unlisted },
  removeDeletedArticle,
}) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDeleteArticle = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDeleteArticle = async (articleId) => {
    await deleteArticle(articleId);
    setIsConfirmingDelete(false);
  };

  const cancelDeleteArticle = () => {
    setIsConfirmingDelete(false);
  };

  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const deleteArticle = async (articleId) => {
    const toastId = toast.loading('Deleting article...');
    try {
      await axios.delete(`${baseUrl}/api/articles/${articleId}`, {
        withCredentials: true,
      });

      toast.update(toastId, {
        render: 'Deleted article!',
        type: 'success',
        autoClose: 5000,
        isLoading: false,
      });
      // Update state to remove deleted article from the list
      removeDeletedArticle(articleId);
    } catch (err) {
      toast.update(toastId, {
        render: 'There was an error while deleting article!',
        type: 'error',
        autoClose: 5000,
        isLoading: false,
      });
      console.error('Error deleting article:', err);
    }
  };

  return (
    <div className='flex w-full items-center flex-col space-y-1'>
      <div className='flex justify-end w-full max-w-3xl items-center px-2'>
        {unlisted && (
          <span className='px-3 py-1 mr-auto select-none text-lime-400 text-xs rounded bg-white/10 uppercase transition-colors duration-300 hover:bg-white/20'>
            Unlisted
          </span>
        )}
        <Link
          to={`/edit/${id}`}
          className='flex space-x-1 mr-1 items-center px-4 py-1 bg-orange-600 rounded transition-all duration-200 hover:bg-orange-500'>
          <PencilSquareIcon className='h-4' />
          <span>Edit</span>
        </Link>
        <button
          onClick={handleDeleteArticle}
          className='flex space-x-1 items-center px-4 py-1 bg-rose-800 rounded transition-all duration-200 hover:bg-rose-700'>
          <TrashIcon className='h-4 mb-0.5' />
          <span>Delete</span>
        </button>
      </div>
      <ArticlePreview
        title={title}
        description={description}
        thumbnail={thumbnail}
        tags={tags}
        id={id}
      />
      <Modal isOpen={isConfirmingDelete} onClose={cancelDeleteArticle}>
        <h2 className='text-xl font-bold mb-4 w-full text-center'>Confirm Delete Article</h2>
        <p className='mb-16 text-sm max-w-sm'>
          Are you sure you want to delete article "{title}"? This action cannot be undone.
        </p>
        <div className='flex justify-center space-x-4'>
          <button
            className='px-4 py-2 bg-rose-700 text-white font-bold uppercase rounded-lg transition-colors duration-300 hover:bg-rose-600'
            onClick={() => confirmDeleteArticle(id)}>
            Yes, Delete
          </button>
          <button
            className='px-4 py-2 bg-flame-900 font-bold uppercase rounded-lg transition-colors duration-300 hover:bg-flame-700'
            onClick={cancelDeleteArticle}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default MyArticle;
