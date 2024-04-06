import { Helmet } from 'react-helmet-async';

function SupportPage() {
  return (
    <div className='page'>
      <Helmet>
        <title>Support | ZoBlaze</title>
        <meta
          name='description'
          content={`Get the help you need. Visit ZoBlaze's Support for FAQs, troubleshooting guides, or to contact our expert support team for personalized assistance.`}
        />
      </Helmet>
    </div>
  );
}

export default SupportPage;
