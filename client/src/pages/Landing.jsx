import ServiceCard from '../components/ServiceCard';
import ServicesCarousel from '../components/ServicesCarousel';
import UserPanel from '../components/UserPanel';
import Footer from '../components/Footer';

import discordImage from '../assets/discord_image.png';
import mcImage from '../assets/mc_image.png';
import vpsImage from '../assets/vps_image.png';
import skriptImage from '../assets/skript_image.png';
import editorImage from '../assets/editor_image.png';
import forumImage from '../assets/forum_image.png';
import LandingPanel from '../components/LandingPanel';
import { Helmet } from 'react-helmet-async';
import HostingFeatures from '../components/HostingFeatures';
import ServerLocations from '../components/ServerLocations';
import LandingFreeTool from '../components/LandingFreeTool';

function Landing() {
  const appDomainName = import.meta.env.VITE_APP_DOMAIN_NAME;

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Welcome to ZoBlaze | Hosting Solutions for All Your Needs</title>
        <meta
          name='description'
          content='ZoBlaze offers a range of hosting solutions including Minecraft server hosting, Discord bot hosting, and VPS. Start your project with our reliable and affordable services.'
        />
      </Helmet>

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='mx-1 md:mx-4 my-1 z-10'>
        <ServicesCarousel />
      </div>

      <div className='mt-7 mx-1 md:mx-4 mb-1'>
        <LandingPanel />
      </div>

      <div className='mt-7 mx-1 md:mx-4 mb-1 flex justify-center'>
        <span className='uppercase text-center text-white/20 text-2xl font-rubik font-bold'>
          Hosting Made Simple - Choose Your Path Below
        </span>
      </div>

      <div className='relative flex justify-center gap-8 mt-7 mx-1 md:mx-4 mb-1 flex-wrap'>
        <ServiceCard
          buttonOptions={{ to: '/products/minecraft', label: 'Buy Now' }}
          about='Order and deploy a new Minecraft server'
          title='Minecraft Hosting'
          className='bg-gradient-to-tr from-green-500 to-emerald-300'
          image={mcImage}
        />
        <ServiceCard
          buttonOptions={{ to: '/products/discord', label: 'Buy Now' }}
          about='Host your Discord bot on our powerful hardware'
          title='Discord Bot Hosting'
          className='bg-gradient-to-tr from-indigo-500 to-violet-400'
          image={discordImage}
        />
        <ServiceCard
          buttonOptions={{ to: '/products/vps', label: 'Buy Now' }}
          about='Deploy the fastest simple VPS in seconds'
          title='Virtual Private Servers'
          className='bg-gradient-to-tr from-red-500 to-rose-400'
          image={vpsImage}
        />
      </div>

      {/* Features */}
      <div className='mt-[9.75rem] mb-1 mx-1 md:mx-4 flex justify-center'>
        <HostingFeatures />
      </div>

      {/* Map of servers */}
      <div className='mt-[9.75rem] mb-1 mx-1 md:mx-4 flex flex-col'>
        <span className='ml-8 mb-8 uppercase text-center md:text-left text-white/20 text-2xl font-rubik font-bold'>
          Our Servers Locations
        </span>
        <ServerLocations />
      </div>

      <div className='flex flex-col mt-[5.75rem] md:mt-[9.75rem] mx-1 md:mx-4'>
        <span className='ml-8 mb-8 uppercase text-center md:text-left text-white/20 text-2xl font-rubik font-bold'>
          Free Tools
        </span>

        <div className='flex flex-col space-y-4'>
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
      </div>

      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
