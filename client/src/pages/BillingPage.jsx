import { useSelector } from 'react-redux';
import UserPanel from '../components/UserPanel';
import { selectNavbarOpened } from '../features/controls/controlsSlice';
import PaymentPanel from '../components/PaymentPanel';
import { Helmet } from 'react-helmet-async';
import PaymentMethodSelect from '../components/PaymentMethodSelect';
import PaymentButton from '../components/PaymentButton';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../features/cart/cartSlice';
import SavedPaymentMethods from '../components/SavedPaymentMethods';
import Transactions from '../components/Transactions';
import Footer from '../components/Footer';
import logo from '../assets/logo512.png';
import { Link } from 'react-router-dom';
import CartPanelItem from '../components/CartPanelItem';

function BillingPage() {
  const opened = useSelector(selectNavbarOpened);
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  const cartItems = useSelector(selectCartItems);

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Billing Dashboard | ZoBlaze</title>
        <meta
          name='description'
          content='Access your ZoBlaze billing dashboard. Quick links to view your cart, add funds, and manage subscriptions all in one place for your convenience.'
        />
      </Helmet>
      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='mt-8 w-full flex justify-center'>
        <div className='relative w-full max-w-4xl flex flex-col items-center isolate'>
          <PaymentPanel />
          <PaymentMethodSelect />

          <PaymentButton />
        </div>

        <div
          className={`${
            opened ? 'hidden 2xl:flex' : 'hidden xl:flex'
          } rounded-lg flex-col w-full max-w-[22rem] h-[27rem] ml-2 bg-dark-purple`}>
          <span className='font-rubik uppercase py-2 px-4'>
            {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'} in cart
          </span>
          <div className='flex-1 flex flex-col overflow-y-auto nav-scrollbar'>
            {cartItems.length === 0 ? (
              <div className='h-full w-full flex flex-col items-center justify-center'>
                <img
                  className='h-28 invert opacity-40 object-contain select-none'
                  draggable={false}
                  src={logo}
                  alt='Logo'
                />
                <span className='mt-2 text-sm font-bold opacity-60'>Your cart is empty.</span>
              </div>
            ) : (
              cartItems.map((item, idx) => <CartPanelItem key={idx} item={item} />)
            )}
          </div>
          <div className='flex w-full items-center justify-between px-4 py-1'>
            <span className='text-slate-400'>Total</span>
            <span className='font-rubik font-bold text-lg'>{totalPrice.toFixed(2)} $</span>
          </div>
          <div className='w-full px-2 py-1 mb-2 grid place-items-center'>
            <Link
              to='/billing/cart'
              className='uppercase text-center w-full max-w-64 px-4 py-2 rounded-lg bg-flame-900 transition-all duration-300 hover:bg-flame-800'>
              View cart
            </Link>
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center mt-24'>
        <div className='relative w-full max-w-4xl flex justify-center'>
          <SavedPaymentMethods />
        </div>
      </div>

      <div className='w-full flex justify-center mt-16'>
        <div className='w-full max-w-6xl flex flex-col items-center'>
          <Transactions />
        </div>
      </div>

      <div className=' mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default BillingPage;
