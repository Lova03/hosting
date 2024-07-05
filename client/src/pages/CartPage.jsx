import { Helmet } from 'react-helmet-async';
import UserPanel from '../components/UserPanel';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeDiscount,
  selectCartDiscount,
  selectCartItems,
  selectCartPromocode,
  selectCartPromocodeApplied,
  selectCartTotalPrice,
  setDiscount,
} from '../features/cart/cartSlice';
import CartItem from '../components/CartItem';
import Footer from '../components/Footer';
import { selectUser } from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import logo from '../assets/logo512.png';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SparklesIcon } from '@heroicons/react/24/outline';

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const promocode = useSelector(selectCartPromocode);
  const discount = useSelector(selectCartDiscount);
  const promocodeApplied = useSelector(selectCartPromocodeApplied);
  const { balance } = useSelector(selectUser);

  const [promocodeInput, setPromocodeInput] = useState('');

  const validatePromocode = async () => {
    if (!promocodeInput.trim()) {
      toast.error('Please enter a promocode.');
      return;
    }

    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    try {
      const response = await axios.post(`${baseUrl}/api/validate-promocode`, {
        code: promocodeInput,
      });
      dispatch(setDiscount({ code: promocodeInput, discount: response.data.discount }));
      setPromocodeInput('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to validate promocode.');
      setPromocodeInput('');
    }
  };
  const removePromocode = () => {
    dispatch(removeDiscount());
  };

  const handlePayment = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before proceeding to checkout.');
      return;
    }

    // payment logic here
  };

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Your Cart | ZoBlaze</title>
        <meta
          name='description'
          content='Review your selected hosting plans in the cart. Easily adjust quantities or proceed to checkout to finalize your ZoBlaze services.'
        />
      </Helmet>

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='mt-20 w-full flex justify-center'>
        <div className='w-full max-w-6xl flex flex-col items-center justify-center space-y-12 lgx:space-y-0 lgx:flex-row lgx:space-x-6'>
          {/* Cart */}
          <div className='flex flex-col flex-1 w-full h-full max-w-3xl lgx:border-r lgx:border-solid lgx:border-r-slate-500'>
            <span className='text-base font-bold uppercase'>Your Cart</span>
            <div className='h-full flex flex-col space-y-2 lgx:mr-4'>
              {cartItems.map((item, idx) => (
                <CartItem item={item} key={idx} />
              ))}
              {cartItems?.length === 0 && (
                <div className='h-full w-full flex flex-col justify-center items-center'>
                  <img
                    className='h-28 invert opacity-40 object-contain select-none'
                    draggable={false}
                    src={logo}
                    alt='Logo'
                  />
                  <span className='mt-2 text-sm font-bold opacity-60'>Your cart is empty.</span>

                  <span className='mt-10 uppercase text-white/10 font-extrabold'>Browse Products</span>
                  <div className='mt-2 w-full flex justify-center space-x-4'>
                    <Link
                      to='/products/minecraft'
                      className='rounded-lg cursor-pointer w-40 h-12 flex items-center justify-center bg-emerald-300/10 hover:bg-emerald-200/20 shadow-md border-solid border border-emerald-400/50 transition-all duration-300'>
                      <span className='text-emerald-500 select-none'>Minecraft</span>
                    </Link>
                    <Link
                      to='/products/discord'
                      className='rounded-lg cursor-pointer w-40 h-12 flex items-center justify-center bg-blurple-900/10 hover:bg-blurple-800/20 shadow-md border-solid border border-blurple-800/50 transition-all duration-300'>
                      <span className='text-blurple-800 select-none'>Discord Bots</span>
                    </Link>
                    <Link
                      to='/products/vps'
                      className='rounded-lg cursor-pointer w-40 h-12 flex items-center justify-center bg-fuchsia-300/10 hover:bg-fuchsia-200/20 shadow-md border-solid border border-fuchsia-400/50 transition-all duration-300'>
                      <span className='text-fuchsia-500 select-none'>VPS</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkout */}
          <div className='flex flex-col items-center w-full h-full max-w-3xl lgx:w-72'>
            {/* Subtotal */}
            <span className='text-base font-bold uppercase w-full'>Subtotal</span>
            <div className='flex flex-col items-center w-full max-w-sm px-2 mt-2'>
              <div className='relative isolate flex flex-col mx-2 px-2 py-3 text-center rounded-lg w-full bg-white/5'>
                <span className='font-semibold'>
                  Your subtotal is <strong className='font-bold font-rubik'>{totalPrice}$</strong>
                </span>
                {promocodeApplied && (
                  <span className='text-xs mt-1'>Discount of {discount}% is active.</span>
                )}
                {promocodeApplied && (
                  <div className='absolute z-10 -top-3 -right-3'>
                    <SparklesIcon className='h-8 text-amber-300' />
                  </div>
                )}
              </div>

              <button
                onClick={handlePayment}
                className='relative isolate w-full mx-2 mt-8 py-3 rounded-lg bg-gradient-to-br from-flame-900 to-flame-700 uppercase font-bold overflow-hidden group'>
                <span className='z-10'>Pay Now</span>
                <div className='absolute w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-300 -z-10 top-full transition-all duration-100 group-hover:top-0'></div>
              </button>

              {balance !== null && cartItems.length > 0 && balance < totalPrice && (
                <div className='flex flex-col items-center mx-2 rounded-lg mt-8 p-2 w-60 bg-rose-800/20 border-solid border-red-600 border'>
                  <span className='text-sm text-center'>
                    Your current balance is insufficient to complete this purchase.
                  </span>
                  <span className='text-sm text-center font-semibold'>Please add funds to proceed.</span>

                  <Link
                    to='/billing/funds'
                    className='mt-4 px-4 py-0.5 rounded bg-red-600 transition-all duration-300 hover:bg-red-500'>
                    Deposit
                  </Link>
                </div>
              )}
              {balance !== null && cartItems.length > 0 && balance >= totalPrice && (
                <div className='flex flex-col items-center mx-2 rounded-lg mt-8 p-2 w-60 bg-emerald-400/10 border-solid border-emerald-600 border'>
                  <span className='text-sm text-center'>
                    Heads up! We'll be using{' '}
                    <strong className='font-rubik font-bold'>${totalPrice.toFixed(2)}</strong> from your
                    balance for this purchase.
                  </span>
                  <span className='text-sm text-center font-semibold'>
                    You'll have{' '}
                    <strong className='font-rubik font-bold'>
                      ${(balance - totalPrice).toFixed(2)}
                    </strong>{' '}
                    left afterward.
                  </span>
                </div>
              )}
            </div>
            {/* Promocode */}
            <span className='mt-8 text-base font-bold uppercase w-full'>Promocode</span>
            {!promocodeApplied && (
              <div className='flex flex-col items-center w-full max-w-sm px-2 mt-2'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validatePromocode();
                  }}
                  className='w-full mx-2'>
                  <input
                    type='text'
                    value={promocodeInput}
                    onChange={(e) => setPromocodeInput(e.target.value)}
                    className='w-full px-2 t py-2.5 text-sm rounded-lg bg-white/5 uppercase font-bold outline-none placeholder-zinc-400'
                    placeholder='Enter promocode...'
                    disabled={promocodeApplied}
                  />
                  <button hidden></button>
                </form>
                <button
                  onClick={validatePromocode}
                  className='relative isolate w-32 mr-auto mt-2 py-1.5 rounded-lg bg-gradient-to-br from-flame-900 to-flame-700 uppercase font-bold overflow-hidden group'>
                  <span className='z-10'>Apply</span>
                  <div className='absolute w-full h-full bg-gradient-to-br from-amber-500 to-amber-300 -z-10 top-full transition-all duration-100 group-hover:top-0'></div>
                </button>
              </div>
            )}
            {promocodeApplied && (
              <div className='flex flex-col items-center w-full max-w-sm px-2 mt-2'>
                <div className='rounded-lg px-3 py-1 text-center mx-2 bg-yellow-400/5 border-solid border-yellow-300 border'>
                  <span className='text-sm'>
                    Promocode <strong className='font-bold uppercase'>{promocode}</strong> successfully
                    applied. Pricing for applicable products will be adjusted.
                  </span>
                </div>
                <div className='mt-4 w-full flex px-4 items-center'>
                  <span className='uppercase'>{promocode}</span>
                  <button
                    onClick={removePromocode}
                    className='relative isolate w-24 ml-2 py-1 rounded-lg bg-gradient-to-br from-flame-900 to-flame-700 uppercase font-bold overflow-hidden group'>
                    <span className='z-10 text-sm'>Remove</span>
                    <div className='absolute w-full h-full bg-gradient-to-br from-red-800 to-red-500 -z-10 top-full transition-all duration-100 group-hover:top-0'></div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
