import { useDispatch } from 'react-redux';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { addToCart, removeAllFromCart, removeFromCart } from '../features/cart/cartSlice';
import logo from '../assets/logo512.png';

function CartPanelItem({ item }) {
  const dispatch = useDispatch();

  const itemConfigKey = item._id + '-' + (item.serverType || item.botLanguage || item.os || 'default');

  const removeItem = () => {
    dispatch(removeFromCart(itemConfigKey));
  };

  const removeAll = () => {
    dispatch(removeAllFromCart(itemConfigKey));
  };

  const addItem = () => {
    dispatch(addToCart({ ...item, itemConfigKey }));
  };

  return (
    <div className='flex items-center relative w-full h-28 shrink-0 p-2 transition-all duration-300 overflow-hidden hover:bg-white/10 group'>
      <img
        src={item.image || logo}
        draggable={false}
        className={`object-contain w-16 select-none${!item.image && ' invert'}`}
        alt='Hosting Item'
      />

      <div className='flex flex-col flex-1 h-full ml-2 py-2'>
        <span className='text-sm font-semibold'>
          {item.serviceType || 'Unknown Type'} - {item.planName || 'Unknown'}
        </span>
        <span className='text-xs'>
          {item.serverType || item.botLanguage || item.os || 'Default Configuration'}
        </span>
        <div className='mt-1 flex space-x-3'>
          <span className='text-xs'>{item.cpu || 'CPU'}</span>
          <span className='text-xs'>{item.ram || 'RAM'}</span>
          <span className='text-xs'>{item.storage || 'STORAGE'}</span>
        </div>
        <div className='mt-auto flex items-end justify-end'>
          <div className='flex items-center flex-1'>
            <span className='text-sm text-slate-400'>Quantity</span>
            <div className='flex items-center ml-auto'>
              <button
                onClick={removeItem}
                className='p-0.5 rounded bg-flame-900 cursor-pointer transition-all duration-200 hover:bg-darkflame'>
                <MinusIcon className='h-3' />
              </button>
              <span className='font-rubik text-sm px-2 mx-0.5 rounded select-none bg-english-violet-800'>
                {item.quantity || 0}x
              </span>
              <button
                onClick={addItem}
                className='p-0.5 rounded bg-flame-900 cursor-pointer transition-all duration-200 hover:bg-darkflame'>
                <PlusIcon className='h-3' />
              </button>
            </div>
          </div>
          <span className='ml-5 font-rubik'>
            {((item.pricePerMonth || 0) * (item.quantity || 1)).toFixed(2)} $
          </span>
        </div>
      </div>

      <button
        onClick={removeAll}
        className='absolute flex flex-col items-center justify-center w-10 h-12 rounded-r-md cursor-pointer bg-rose-800/80 transition-all duration-300 left-0 hover:bg-rose-600/95 -translate-x-full group-hover:translate-x-0'>
        <TrashIcon className='h-6' />
      </button>
    </div>
  );
}

export default CartPanelItem;
