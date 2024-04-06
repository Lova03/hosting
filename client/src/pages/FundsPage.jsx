import { Helmet } from 'react-helmet-async';
import UserPanel from '../components/UserPanel';
import DepositSlider from '../components/DepositSlider';
import PaymentMethodSelect from '../components/PaymentMethodSelect';
import Footer from '../components/Footer';
import Transactions from '../components/Transactions';
import { useSelector } from 'react-redux';
import { selectDepositAmount } from '../features/controls/controlsSlice';
import SavedPaymentMethods from '../components/SavedPaymentMethods';

function FundsPage() {
  const depositAmount = useSelector(selectDepositAmount);
  const handlePayment = () => {};

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Add Funds | ZoBlaze</title>
        <meta
          name='description'
          content='Securely add funds to your ZoBlaze wallet. Ensure uninterrupted service and take advantage of exclusive offers by keeping your balance topped up.'
        />
      </Helmet>

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='mt-8 w-full flex justify-center'>
        <div className='relative w-full max-w-4xl flex flex-col items-center isolate'>
          <div className='w-full min-h-64 p-4 rounded-lg shadow-lg bg-dark-purple'>
            <div className='flex flex-col'>
              <span className='text-xl font-semibold'>Choose a deposit amount</span>
              <span className='mt-4 text-slate-300 text-sm'>
                You can deposit funds to your account to auto-renew any services that you have active
                under your account.
              </span>
            </div>
            <DepositSlider />
          </div>
          <PaymentMethodSelect />

          <button
            onClick={handlePayment}
            className='relative -z-10 isolate w-full max-w-80 mx-2 mt-8 py-3 rounded-lg bg-gradient-to-br from-flame-900 to-flame-700 transition-all duration-100 hover:shadow-emerald-400/5 hover:shadow-glow uppercase font-bold overflow-hidden group'>
            <span className='z-10'>Complete Deposit Of ${depositAmount.toFixed(2)}</span>
            <div className='absolute w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-300 -z-10 top-full transition-all duration-100 group-hover:top-0'></div>
          </button>
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

export default FundsPage;
