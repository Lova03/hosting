import { XMarkIcon } from '@heroicons/react/24/outline';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='fixed isolate inset-0 flex items-center justify-center text-white'>
      <div className='absolute -z-10 bg-black/50 w-full h-full' onMouseDown={onClose}></div>
      <div className='bg-english-violet-900 rounded-lg p-8 max-w-4xl w-fit relative'>
        <XMarkIcon
          onClick={onClose}
          className='absolute top-2 right-2 h-7 transition-all duration-200 hover:cursor-pointer hover:text-flame-900'
        />
        {children}
      </div>
    </div>,
    document.getElementById('portal-root')
  );
};

export default Modal;
