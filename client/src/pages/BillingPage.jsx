import { useSelector } from 'react-redux';
import UserPanel from '../components/UserPanel';
import { selectNavbarOpened } from '../features/controls/controlsSlice';
import PaymentPanel from '../components/PaymentPanel';
import { Helmet } from 'react-helmet-async';

function BillingPage() {
  const opened = useSelector(selectNavbarOpened);

  return (
    <div className='page'>
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

      <div className='mx-4 mt-8'>
        <div className={`flex items-center md:items-start xl:space-x-2`}>
          {/* PaymentPanel */}
          <PaymentPanel />
          <div
            className={`${
              opened ? 'hidden 2xl:flex' : 'hidden xl:flex'
            } rounded-lg w-full max-w-[22rem] h-[25.5rem] bg-rose-800`}></div>
        </div>
      </div>

      <div className='mx-4 mt-2'>
        <div className='block w-full rounded-lg h-[36rem] bg-sky-800'></div>
      </div>
    </div>
  );
}

export default BillingPage;
