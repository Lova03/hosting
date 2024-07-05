import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function SavedPaymentMethod({ item }) {
  const [warning, setWarning] = useState(false);

  return (
    <div
      className={`relative w-full grid grid-cols-5 place-items-center border-b border-slate-700 px-3 py-2 overflow-x-hidden group ${
        item.isDefault ? 'bg-english-violet-850/25' : 'bg-transparent'
      }`}>
      <span className='mr-auto break-all'>{item.brand}</span>
      <span className='mr-auto break-all'>{item.type}</span>
      <span className='break-all'>
        **** **** ****{' '}
        <span className='font-rubik break-all px-1.5 py-0.5 rounded-sm bg-english-violet-900 font-semibold text-sm'>
          {item.lastFourDigits}
        </span>
      </span>
      <span className='font-rubik break-all'>{item.expirationDate}</span>
      <span
        className={`text-xs break-all font-bold uppercase px-1 py-0.5 ${
          item.isDefault ? 'bg-flame-900' : 'bg-zinc-500'
        }`}>
        {item.isDefault ? 'Default' : '----'}
      </span>

      <button
        onClick={() => setWarning(true)}
        className='absolute grid place-items-center md:-right-6 right-1 group-hover:right-1 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-rose-600 bg-rose-800/20 transition-all duration-300 cursor-pointer hover:bg-rose-600/20 hover:border-rose-500 group'>
        <XMarkIcon className='h-4 text-rose-600 group-hover:text-rose-500' />
      </button>
      {warning && (
        <div className='absolute isolate inset-0 z-50 w-full h-full backdrop-blur-sm flex justify-end items-center overflow-hidden'>
          <span className='uppercase text-xs rounded-sm mx-2 px-6 py-1 border border-rose-600 bg-rose-800/20 transition-all duration-300 hover:bg-rose-600/20 hover:border-rose-500'>
            Are you sure?
          </span>

          <div className='flex space-x-2 mr-2'>
            <button className='px-5 py-1 rounded border border-rose-600 bg-rose-900/70 transition-all duration-300 text-rose-500 hover:text-rose-400 hover:bg-rose-700/70 hover:border-rose-500 cursor-pointer text-xs uppercase font-semibold'>
              Yes
            </button>
            <button
              onClick={() => setWarning(false)}
              className='px-5 py-1 rounded border border-emerald-600 bg-emerald-900/70 transition-all duration-300 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-700/70 hover:border-emerald-500 cursor-pointer text-xs uppercase font-semibold'>
              No
            </button>
          </div>

          <div
            onClick={() => setWarning(false)}
            className='absolute w-full h-full bg-black/30 -z-10'></div>
        </div>
      )}
    </div>
  );
}

export default SavedPaymentMethod;
