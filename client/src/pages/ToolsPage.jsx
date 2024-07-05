import skriptImage from '../assets/skript_image.png';
import editorImage from '../assets/editor_image.png';
import forumImage from '../assets/forum_image.png';
import LandingFreeTool from '../components/LandingFreeTool';
import UserPanel from '../components/UserPanel';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

function ToolsPage() {
  const appDomainName = import.meta.env.VITE_APP_DOMAIN_NAME;

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Tools | ZoBlaze</title>
        <meta
          name='description'
          content='Explore ZoBlaze Tools: Test your Skript code for syntax accuracy, enhance your coding with our editor, and join the community on our forum.'
        />
      </Helmet>

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='flex flex-col items-center mt-8 space-y-4'>
        <LandingFreeTool
          title='Skript Code Testing'
          desc='Test your Skript code for syntax accuracy quickly and easily.'
          image={skriptImage}
          redirect='/tools/syntax-checker'
        />
        <LandingFreeTool
          title='Skript Editor'
          desc='Enhance your Skript coding with our syntax-highlighting, auto-completing editor.'
          image={editorImage}
          redirect='/tools/editor'
        />
        <LandingFreeTool
          title='Skript Forum'
          desc='Explore our Skript Forum: Share, learn, and collaborate with fellow developers in a dynamic community space.'
          image={forumImage}
          redirect={`https://forum.${appDomainName}`}
        />
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default ToolsPage;
