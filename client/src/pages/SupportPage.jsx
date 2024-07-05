import { Helmet } from 'react-helmet-async';
import UserPanel from '../components/UserPanel';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../features/user/userSlice';

function SupportPage() {
  const loggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Support | ZoBlaze</title>
        <meta
          name='description'
          content={`Get the help you need. Visit ZoBlaze's Support for FAQs, troubleshooting guides, or to contact our expert support team for personalized assistance.`}
        />
      </Helmet>

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      {/* Support team stuff */}

      {/* Submit a ticket */}

      {/* FAQ */}
    </div>
  );
}

export default SupportPage;
