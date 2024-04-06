import { Helmet } from 'react-helmet-async';
import Footer from '../components/Footer';

function SLAPage() {
  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Service Level Agreement (SLA) | ZoBlaze</title>
        <meta
          name='description'
          content='Understand the service commitments and performance standards ZoBlaze provides to its customers.'
        />
      </Helmet>

      {/* Body */}
      <div className='w-full flex justify-center py-5 px-2'>
        <div className='flex flex-col items-center max-w-2xl text-center'>
          <h1 className='text-2xl font-bold text-center'>Service Level Agreement (SLA)</h1>
          <p className='text-sm text-slate-300 text-center mb-4'>Effective date: 27.2.2024</p>
          <p className='mt-4'>
            This Service Level Agreement (SLA) is a policy governing the use of ZoBlaze services under
            the terms of the ZoBlaze Customer Agreement (the "Customer Agreement") between ZoBlaze,
            ("ZoBlaze", "us" or "we") and users of ZoBlaze's services ("you"). This SLA applies
            separately to each account registered with ZoBlaze.
          </p>
          <p className='mt-4'>
            By using ZoBlaze services, you agree to the terms of this SLA. If you have questions about
            this SLA, please contact us at zoblaze.com/support.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>1. Service Commitment</h2>
          <p className='mt-4'>
            ZoBlaze commits to providing a monthly uptime percentage of at least 99.9% for all hosting
            services. This does not apply to any periods of scheduled maintenance. Should we fail to meet
            this commitment, you will be eligible for a service credit as described below.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>2. Service Credits</h2>
          <p className='mt-4'>
            Service credits are calculated as a monetary amount in USD and credited to your ZoBlaze
            account balance. These credits are based on the total charges paid by you for the service
            that did not meet the uptime commitment in a given billing cycle.
          </p>
          <ul className='list-disc list-inside mt-2 text-start'>
            <li>
              <strong>99.0% to 99.9%</strong> - You will receive a service credit equivalent to 10% of
              your monthly service charge.
            </li>
            <li>
              <strong>95.0% to 98.9%</strong> - You will receive a service credit equivalent to 30% of
              your monthly service charge.
            </li>
            <li>
              <strong>Less than 95.0%</strong> - You will receive a service credit equivalent to 50% of
              your monthly service charge.
            </li>
          </ul>
          <p className='mt-4'>
            These credits can be used towards future payments for ZoBlaze services. Service credits are
            not refundable and cannot be exchanged for cash or other forms of payment.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>3. Support Services</h2>
          <p className='mt-4'>
            ZoBlaze will provide 24/7 support services through our online support system. We aim to
            respond to support tickets within 1 hour of submission for critical issues and within 24
            hours for non-critical issues.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>4. Scheduled Maintenance</h2>
          <p className='mt-4'>
            Scheduled maintenance will be communicated at least 48 hours in advance. Maintenance periods
            are excluded from uptime calculations.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>5. Exclusions</h2>
          <p className='mt-4'>This SLA does not apply to any service interruptions caused by:</p>
          <ul className='list-disc list-inside mt-2 text-start'>
            <li>Factors outside of ZoBlaze’s reasonable control</li>
            <li>Services not provided by ZoBlaze</li>
            <li>Actions or inactions of you or any third party</li>
            <li>Your equipment, software, or other technology</li>
          </ul>

          <h2 className='mt-6 text-lg font-semibold'>6. Claiming Credits</h2>
          <p className='mt-4'>
            To claim a service credit, you must submit a request by emailing support@zoblaze.com. Each
            request must be received by us by the end of the second billing cycle after which the
            incident occurred and must include:
          </p>
          <ul className='list-disc list-inside mt-2 text-start'>
            <li>The words "SLA Credit Request" in the subject line</li>
            <li>The dates and times of each incident you claim was not within our SLA</li>
            <li>
              Your request logs that document the errors and corroborate your claimed outage (if
              applicable)
            </li>
          </ul>

          <h2 className='mt-6 text-lg font-semibold'>7. SLA Changes</h2>
          <p className='mt-4'>
            We may update this SLA from time to time. We will notify you of any changes by posting the
            new SLA on the ZoBlaze site. Your continued use of the service after the effective date of
            such changes constitutes your acceptance of the new terms.
          </p>

          <h2 className='mt-6 text-lg font-semibold'>8. Contact Us</h2>
          <p className='mt-4'>
            For any questions or concerns regarding this SLA, please contact us at zoblaze.com/support.
          </p>
        </div>
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default SLAPage;
