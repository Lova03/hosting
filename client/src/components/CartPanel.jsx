import { useRef, useState, useEffect } from 'react';
import { usePopper } from 'react-popper';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../features/cart/cartSlice';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import CartPanelItem from './CartPanelItem';
import logo from '../assets/logo512.png';

function CartPanel() {
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const dropdownRef = useRef(null);

  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 14],
        },
      },
    ],
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!opened) return;
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [opened, referenceElement]);

  return (
    <div ref={dropdownRef} className='relative isolate'>
      {/* Trigger Element */}
      <div
        ref={setReferenceElement}
        onClick={() => setOpened((prev) => !prev)}
        className='relative flex items-center justify-center select-none p-2 rounded transition-all duration-200 cursor-pointer hover:bg-white/10 group'>
        <ShoppingCartIcon
          className={`h-6 transition-all duration-200 group-hover:text-hunyadi-yellow ${
            opened && 'text-hunyadi-yellow'
          }`}
        />
        {totalQuantity > 0 && (
          <div className='flex items-center justify-center absolute top-0 right-0 w-4 h-4 bg-flame-900 rounded-full'>
            <span className='text-xs font-rubik'>{totalQuantity}</span>
          </div>
        )}
      </div>

      {/* TODO add shadow or darker bg */}

      {/* Dropdown */}
      {opened && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className='relative flex flex-col items-center bg-english-violet-900 rounded-md shadow-lg h-[28rem] w-80'>
          {/* Header */}
          <div className='w-full pt-2 px-2 flex items-center justify-between'>
            <span className='font-rubik uppercase'>
              {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in cart
            </span>
            <div onClick={() => setOpened(false)} className='p-1 rounded-md cursor-pointer group'>
              <XMarkIcon className='h-6 transition-all duration-200 group-hover:text-hunyadi-yellow' />
            </div>
          </div>

          {/* Items */}
          <div className='flex flex-col w-full overflow-y-auto flex-1 dropdown-scrollbar'>
            {items.map((item, idx) => (
              <div key={idx} className='flex flex-col w-full h-fit'>
                <CartPanelItem item={item} />
                {idx !== items?.length - 1 && (
                  <hr className='border-t border-solid border-t-slate-500/30 mx-4' />
                )}
              </div>
            ))}
            {items?.length === 0 && (
              <div className='h-full w-full flex flex-col items-center justify-center'>
                <img
                  className='h-28 invert opacity-40 object-contain select-none'
                  draggable={false}
                  src={logo}
                  alt='Logo'
                />
                <span className='mt-2 text-sm font-bold opacity-60'>Your cart is empty.</span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className='flex w-full items-center justify-between px-4 py-1'>
            <span className='text-slate-400'>Total</span>
            <span className='font-rubik font-bold text-lg'>{totalPrice.toFixed(2)} $</span>
          </div>

          {/* Buttons */}
          <div className='flex flex-col items-center py-2'>
            <Link
              to='/billing/cart'
              className='uppercase px-16 py-1.5 bg-flame-900 rounded-md transition-all duration-300 hover:bg-darkflame'>
              View Cart
            </Link>
            <button
              onClick={handleClearCart}
              className='w-fit uppercase text-sm mt-2 transition-all duration-200 hover:text-flame-900'>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPanel;
