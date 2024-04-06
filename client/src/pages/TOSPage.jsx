import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

function TOSPage() {
  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Terms and Conditions | ZoBlaze</title>
        <meta
          name='description'
          content='Read the terms and conditions governing the use of ZoBlaze services.'
        />
      </Helmet>

      {/* Body */}
      <div className='w-full flex justify-center py-5 px-2'>
        <div className='flex flex-col items-center max-w-2xl text-center'>
          <h1 className='text-2xl font-bold text-center'>Terms and Conditions</h1>
          <p className='text-sm text-slate-300 text-center mb-4'>Effective date: 27.2.2024</p>
          <p className='mt-4'>
            Welcome to ZoBlaze, a comprehensive hosting solution provider accessible from zoblaze.com.
            These Terms and Conditions outline the rules and regulations for the use of ZoBlaze's
            services, including, but not limited to, Minecraft server hosting, Discord bot hosting, VPS
            hosting, and our suite of free tools. By accessing and using our services, you agree to
            comply with and be bound by the following terms.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>1. Account Registration and Use</h2>
          <p className='mt-4'>
            Users must register an account through Discord OAuth2 service and provide accurate
            information. Accounts are personal and should not be shared. ZoBlaze reserves the right to
            suspend or terminate accounts that violate our terms.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>2. Service Descriptions</h2>
          <p className='mt-4'>
            ZoBlaze provides various hosting plans with specific features and limitations as described on
            our service pages. We also offer free tools such as a Skript syntax checker, online editor,
            and a knowledge database. Services are subject to the performance and availability standards
            outlined in our Service Level Agreement (SLA).
          </p>

          <h2 className='mt-6 text-lg font-semibold'>3. Payment and Refill Policy</h2>
          <p className='mt-4'>
            Services are charged on a subscription basis. Users must maintain a positive balance to keep
            services active. Refills to the user balance can be made through the payment methods provided
            on our website. All transactions are final, except as required by law.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>4. Rewards and Leveling System</h2>
          <p className='mt-4'>
            Users participate in a leveling system by using our services, contributing to the community,
            or achieving certain milestones. Rewards include discounts, balance bonuses, and exclusive
            features. Specific terms and eligibility criteria for rewards are detailed on our Rewards
            Program page.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>5. Acceptable Use Policy</h2>
          <p className='mt-4'>
            Users must not use ZoBlaze services for any unlawful purpose, to spread malware, to infringe
            on intellectual property rights, or to engage in abusive activities. We reserve the right to
            terminate services for any user found in violation of these policies.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>6. Support and Service Management</h2>
          <p className='mt-4'>
            ZoBlaze offers a custom support system for service inquiries and technical assistance. Users
            can manage their services through our custom panel. Support availability and response times
            are subject to our support policy.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>7. Data Protection</h2>
          <p className='mt-4'>
            We are committed to protecting your data and privacy. Our data processing practices are
            described in our Privacy Policy. By using our services, you consent to such processing and
            warrant that all data provided by you is accurate.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>8. Modifications to Terms</h2>
          <p className='mt-4'>
            ZoBlaze reserves the right to modify these terms at any time. We will provide notice of
            significant changes and update the effective date. Continued use of the service after changes
            constitutes acceptance of the new terms.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>9. Governing Law</h2>
          <p className='mt-4'>
            These terms shall be governed and construed in accordance with the laws of [Jurisdiction],
            without regard to its conflict of law provisions.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>10. Contact Us</h2>
          <p className='mt-4'>
            For any questions or concerns regarding these terms, please contact us at
            zoblaze.com/support.
          </p>
        </div>
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default TOSPage;
