import { Link } from 'react-router-dom';
import logo from '../assets/logo512.png';
import { BsGithub, BsTwitter, BsDiscord } from 'react-icons/bs';

function Footer() {
  return (
    <footer className='relative flex flex-col'>
      {/* Upper Part */}
      <div className='flex flex-col lg:flex-row items-center lg:items-start p-4 border-b border-solid border-white/10'>
        {/* Logo */}
        <div className='flex items-center space-x-1 h-12 w-fit p-1 select-none'>
          <img draggable={false} className='object-contain h-10 invert' src={logo} alt='ZoBlaze Logo' />
          <span className='uppercase text-2xl font-rubik font-bold mt-2'>ZoBlaze</span>
        </div>

        {/* Links (About, Follow Us, Legal) */}

        <div className='flex w-full gap-6 flex-wrap mt-6 pb-6 lg:flex-1 lg:w-auto lg:justify-end'>
          {/* About */}
          <div className='flex flex-col px-4 py-1 text-slate-200'>
            <span className='uppercase font-bold select-none'>About</span>
            <div className='flex flex-col space-y-2 mt-4'>
              <span>ZoBlaze</span>
              <Link className='transition-colors duration-200 hover:text-slate-400' to='/tools'>
                Tools
              </Link>
            </div>
          </div>
          {/* Follow Us */}
          <div className='flex flex-col px-4 py-1 text-slate-200'>
            <span className='uppercase font-bold select-none'>Follow Us</span>
            <div className='flex flex-col space-y-2 mt-4'>
              <span>Discord</span>
              <span>Twitter</span>
            </div>
          </div>

          {/* Legal */}
          <div className='flex flex-col px-4 py-1 text-slate-200'>
            <span className='uppercase font-bold select-none'>Legal</span>
            <div className='flex flex-col space-y-2 mt-4'>
              <Link
                className='transition-colors duration-200 hover:text-slate-400'
                to='/legal/terms-and-conditions'>
                Terms & Conditions
              </Link>
              <Link
                className='transition-colors duration-200 hover:text-slate-400'
                to='/legal/privacy-policy'>
                Privacy Policy
              </Link>
              <Link
                className='transition-colors duration-200 hover:text-slate-400'
                to='/legal/service-level-agreement'>
                Service Level Agreement
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Part */}
      <div className='flex flex-col lg:flex-row justify-center lg:justify-between mt-6'>
        {/* Copyright */}
        <div className='text-center text-sm text-slate-400 px-4 py-1'>
          <span>COPYRIGHT © 2024 ZoBlaze.com, All rights Reserved</span>
        </div>

        {/* Socials */}
        <div className='flex justify-center lg:justify-start space-x-2 px-6 py-1 mt-4 lg:mt-0'>
          <div className='p-2 rounded transition-all duration-200 cursor-pointer hover:bg-white/10'>
            <BsDiscord size={24} />
          </div>
          <div className='p-2 rounded transition-all duration-200 cursor-pointer hover:bg-white/10'>
            <BsGithub size={24} />
          </div>
          <div className='p-2 rounded transition-all duration-200 cursor-pointer hover:bg-white/10'>
            <BsTwitter size={24} />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
