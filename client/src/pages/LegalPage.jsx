import { DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import Footer from '../components/Footer';
import LegalDocument from '../components/LegalDocument';
import UserPanel from '../components/UserPanel';
import { FaHandshake } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

function LegalPage() {
  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Legal Documents | ZoBlaze</title>
        <meta
          name='description'
          content={`Familiarize yourself with ZoBlaze's legal policies. Access our Privacy Policy, Terms and Conditions, and Service Level Agreement to understand your rights and obligations.`}
        />
      </Helmet>
      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='mt-8 flex flex-col w-full items-center space-y-8'>
        <LegalDocument
          title='Terms and Conditions'
          desc='Read the terms and conditions governing the use of ZoBlaze services.'
          to='/legal/terms-and-conditions'
          Icon={DocumentTextIcon}
        />
        <LegalDocument
          title='Privacy Policy'
          desc='Understand how ZoBlaze protects your privacy and handles your personal data.'
          to='/legal/privacy-policy'
          Icon={ShieldCheckIcon}
        />
        <LegalDocument
          title='Service Level Agreement (SLA)'
          desc='Understand the service commitments and performance standards ZoBlaze provides to its customers.'
          to='/legal/service-level-agreement'
          Icon={FaHandshake}
        />
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default LegalPage;
