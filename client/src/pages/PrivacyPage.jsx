import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

function PrivacyPage() {
  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Privacy Policy | ZoBlaze</title>
        <meta
          name='description'
          content='Understand how ZoBlaze protects your privacy and handles your personal data.'
        />
      </Helmet>

      {/* Body */}
      <div className='w-full flex justify-center py-5 px-2'>
        <div className='flex flex-col items-center max-w-2xl text-center'>
          <h1 className='text-2xl font-bold'>Privacy Policy for ZoBlaze</h1>
          <p className='text-sm text-slate-300'>Last updated: 27.2.2024</p>
          <p className='mt-4'>
            Welcome to ZoBlaze, accessible from zoblaze.com. Your privacy is critically important to us.
            This document outlines the types of information we collect and record, and how we use it.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>Account Registration and Personal Information</h2>
          <p className='mt-4'>
            At ZoBlaze, we simplify the registration process by utilizing Discord's OAuth2 service for
            authentication. This secure method allows you to log in using your Discord account, enhancing
            both convenience and security. During this process, we access your:
          </p>
          <ul className='list-disc list-inside mt-2'>
            <li>
              <strong>Discord Profile Information:</strong> We collect basic profile information provided
              by Discord, including your username and ID, to identify you on our platform.
            </li>
            <li>
              <strong>Email Address:</strong> Your email address is obtained for account management and
              communication purposes. For your privacy and security, email addresses are hashed within
              our system.
            </li>
          </ul>
          <p className='mt-4'>
            Additional personal information may be requested at the point of checkout to complete your
            transaction. This includes but is not limited to, your name, billing address, and payment
            details.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>Use of Your Information</h2>
          <p className='mt-4'>The information we collect is used in a variety of ways, including:</p>
          <ul className='list-disc list-inside mt-2 text-start'>
            <li>Providing, operating, and maintaining our services</li>
            <li>Improving, personalizing, and expanding our services</li>
            <li>Understanding and analyzing how you use our services</li>
            <li>Developing new products, services, features, and functionality</li>
            <li>Communicating with you for customer service, updates, and marketing</li>
            <li>Processing your transactions and orders</li>
            <li>Preventing fraud and ensuring security</li>
          </ul>

          <h2 className='mt-6 text-lg font-semibold'>Data Security</h2>
          <p className='mt-4'>
            We prioritize the security of your personal information. ZoBlaze implements a variety of
            security measures to maintain the safety of your personal data when you submit a request,
            place an order, or access your personal information.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>Changes to This Privacy Policy</h2>
          <p className='mt-4'>
            Our Privacy Policy is subject to change. We will notify you of any changes by posting the new
            Privacy Policy on this page. We will let you know via email and/or a prominent notice on our
            Service, prior to the change becoming effective and update the "last updated" date at the top
            of this Privacy Policy.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>Contact Us</h2>
          <p className='mt-4'>
            If you have any questions about this Privacy Policy, You can contact us:
          </p>
          <ul className='list-disc list-inside mt-2'>
            <li>By visiting this page on our website: zoblaze.com/support</li>
          </ul>
        </div>
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default PrivacyPage;
