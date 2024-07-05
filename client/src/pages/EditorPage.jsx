import React, { useRef, useState } from 'react';
import SkriptEditor from '../components/SkriptEditor';
import { toast } from 'react-toastify';
import { ArrowDownTrayIcon, ChevronLeftIcon, ClipboardIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import Modal from '../components/Modal';
import { Helmet } from 'react-helmet-async';

function EditorPage() {
  const editorRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleDownloadConfirm = () => {
    if (!fileName.trim()) {
      toast.error('File name cannot be empty');
      return;
    }

    const code = editorRef.current.getValue();
    const header = `# ==================================================
# This code was written using the ZoBlaze Editor
# ==================================================
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⢀⠀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⣠⣿⣧⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠁⣠⣴⣿⣿⣿⡃⠀⡿⠋⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⢀⣾⣿⣿⣿⣿⡿⠁⠀⠀⣠⡀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⣸⣿⣿⣿⣿⣿⣧⣤⣴⣾⣿⣇⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⢻⣿⣿⠋⠉⣿⣿⣿⣿⣿⣿⡟⠀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀⠈⢿⡏⠀⠀⠸⣿⣿⣿⣿⡿⠁⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠁⠀⣷⡀⠈⠻⠟⠋⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣤⣾⣿⣶⣤⣤⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
# ==================================================
`;

    const blob = new Blob([header + code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.sk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsModalOpen(false);
    setFileName('');
  };

  const copyCode = () => {
    const code = editorRef.current.getValue();
    const header = `# ==================================================
# This code was written using the ZoBlaze Editor
# ==================================================
`;

    navigator.clipboard.writeText(header + code).then(
      () => {
        toast.success('Code copied to clipboard!');
      },
      () => {
        toast.error('Failed to copy code to clipboard.');
      }
    );
  };

  return (
    <div className='flex flex-col h-screen'>
      <Helmet>
        <title>Skript Editor | ZoBlaze</title>
        <meta
          name='description'
          content='Edit and create Minecraft Skript programs with our advanced Skript Editor. Featuring syntax highlighting and auto-completion for an enhanced coding experience.'
        />
      </Helmet>

      {/* Controls */}
      <div className='flex justify-end p-2 bg-dark-purple'>
        <NavLink
          to='/'
          className='flex space-x-2 items-center mr-auto px-4 py-2 select-none rounded transition-all duration-300 hover:bg-white/10'>
          <ChevronLeftIcon className='h-4 mb-0.5' />
          <span>Back</span>
        </NavLink>
        <button
          onClick={copyCode}
          className='flex xs:space-x-2 items-center mr-2 px-4 py-2 select-none bg-blue-600 rounded transition-colors duration-300 hover:bg-blue-500'>
          <ClipboardIcon className='h-4 xs:mb-1' />
          <span className='hidden xs:block'>Copy Code</span>
        </button>
        <button
          onClick={handleDownloadClick}
          className='flex xs:space-x-2 items-center px-4 py-2 select-none bg-rose-600 rounded transition-colors duration-300 hover:bg-rose-500'>
          <ArrowDownTrayIcon className='h-4' />
          <span className='hidden xs:block'>Download Code</span>
        </button>
      </div>
      {/* Editor */}
      <SkriptEditor editorRef={editorRef} />

      {/* Modal for file name */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className='flex flex-col items-center px-6 py-6'>
          <h2 className='text-xl font-bold mb-4'>Enter File Name</h2>
          <div className='flex bg-dark-purple px-4 py-1 rounded mb-12'>
            <input
              type='text'
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className='appearance-none bg-dark-purple outline-none placeholder-zinc-400'
              placeholder='File name...'
            />
            <span className='select-none text-slate-400'>.sk</span>
          </div>
          <button
            onClick={handleDownloadConfirm}
            className='flex space-x-2 items-center px-4 py-2 select-none bg-rose-600 rounded transition-colors duration-300 hover:bg-rose-500'>
            <ArrowDownTrayIcon className='h-4' />
            <span className='hidden xs:block'>Download</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default EditorPage;
