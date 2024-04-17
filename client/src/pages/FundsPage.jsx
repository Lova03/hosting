import { Helmet } from 'react-helmet-async';
import UserPanel from '../components/UserPanel';
import PaymentMethodSelect from '../components/PaymentMethodSelect';
import Footer from '../components/Footer';
import Transactions from '../components/Transactions';
import { useSelector } from 'react-redux';
import { selectDepositAmount } from '../features/controls/controlsSlice';
import SavedPaymentMethods from '../components/SavedPaymentMethods';
import PaymentPanel from '../components/PaymentPanel';
import PaymentButton from '../components/PaymentButton';

function FundsPage() {
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
          <PaymentPanel />
          <PaymentMethodSelect />
          <PaymentButton />
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
