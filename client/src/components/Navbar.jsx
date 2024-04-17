import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { selectNavbarOpened, toggleNavbar } from '../features/controls/controlsSlice';
import { ArrowUpTrayIcon, Bars3CenterLeftIcon, Bars3Icon } from '@heroicons/react/24/outline';
import {
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  GiftIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { BsDiscord, BsUiChecks } from 'react-icons/bs';
import { GiStoneBlock } from 'react-icons/gi';
import { TbDeviceDesktopCode } from 'react-icons/tb';
import { LuLayoutPanelLeft } from 'react-icons/lu';
import { FaHandshake } from 'react-icons/fa';
import NavItem from './NavItem';

import logo from '../assets/logo512.png';
import SignInButton from './SignInButton';
import { selectIsLoggedIn, selectUser } from '../features/user/userSlice';

function Navbar() {
  const dispatch = useDispatch();
  const opened = useSelector(selectNavbarOpened);
  const loggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const appDomainName = import.meta.env.VITE_APP_DOMAIN_NAME;

  const handleToggle = () => {
    dispatch(toggleNavbar());
  };

  const handleClose = () => {
    dispatch(toggleNavbar(false));
  };

  return (
    <div className='w-fit'>
      {/* Navigation for desktop */}
      <nav
        className={`hidden md:flex flex-col relative transition-all duration-200 ${
          opened ? 'w-64' : 'w-12'
        } h-screen bg-dark-purple`}>
        <div className='flex relative justify-between items-center'>
          <NavLink
            to='/'
            onClick={handleClose}
            className={`grid place-items-center transition-all duration-200 origin-top-left select-none ${
              opened ? 'scale-100 opacity-70 h-12 w-12 p-1' : 'scale-0 opacity-0 h-0 w-0'
            }`}>
            <img
              draggable={false}
              className={`object-contain invert h-9 w-9`}
              src={logo}
              alt='ZoBlaze Logo'
            />
          </NavLink>

          <Bars3Icon
            onClick={handleToggle}
            className={`z-10 h-12 p-1.5 text-slate-100 cursor-pointer transition-all duration-200 ${
              opened ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <Bars3CenterLeftIcon
            onClick={handleToggle}
            className={`absolute right-0 z-10 h-12 p-1.5 text-slate-100 cursor-pointer transition-all duration-200 ${
              opened ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Buttons */}
        <div
          className={`flex shrink-0 flex-col space-y-1 justify-center overflow-hidden transition-all duration-200 origin-top-left ${
            opened ? 'scale-100 opacity-100 h-fit p-1.5' : 'scale-0 opacity-0 h-0'
          } items-center w-full`}>
          {/* Login */}

          {loggedIn ? (
            <div className='h-8 flex w-5/6 space-x-1'>
              <div className='flex items-center justify-center rounded-md bg-english-violet-900 flex-1 border border-solid border-english-violet-800'>
                <span className='px-1 font-rubik font-bold'>${(user?.balance || 0).toFixed(2)}</span>
              </div>
              <Link
                to='/billing/funds'
                onClick={handleClose}
                className='flex items-center justify-center rounded-md transition-all cursor-pointer bg-flame-900 flex-1 hover:bg-darkflame'>
                <ArrowUpTrayIcon className='h-4' />
              </Link>
            </div>
          ) : (
            <SignInButton />
          )}
        </div>

        <div className='flex w-full flex-col overflow-y-auto overflow-x-hidden nav-scrollbar'>
          <span
            className={`transition-all duration-200 origin-top-left ${
              opened ? 'scale-100 opacity-100 h-fit p-1.5' : 'scale-0 opacity-0 h-0'
            } uppercase font-rubik font-bold select-none`}>
            Products
          </span>

          <NavItem Icon={GiStoneBlock} name='Minecraft' to='/products/minecraft' />
          <NavItem Icon={BsDiscord} name='Discord Bots' to='/products/discord' />
          <NavItem Icon={ServerStackIcon} name='VPS' to='/products/vps' />

          <span
            className={`transition-all duration-200 origin-top-left ${
              opened ? 'scale-100 opacity-100 h-fit p-1.5' : 'scale-0 opacity-0 h-0'
            } uppercase font-rubik font-bold mt-2 select-none`}>
            Hosting
          </span>
          <NavItem Icon={LuLayoutPanelLeft} name='ZPanel' to='/panel' />
          <NavItem Icon={ChatBubbleLeftRightIcon} name='Support' to='/support' />
          <NavItem Icon={GiftIcon} name='Rewards Program' to='rewards' />

          <span
            className={`transition-all duration-200 origin-top-left ${
              opened ? 'scale-100 opacity-100 h-fit p-1.5' : 'scale-0 opacity-0 h-0'
            } uppercase font-rubik font-bold mt-2 select-none`}>
            Company
          </span>
          <NavItem Icon={DocumentTextIcon} name='Terms & Conditions' to='/legal/terms-and-conditions' />
          <NavItem Icon={ShieldCheckIcon} name='Privacy Policy' to='/legal/privacy-policy' />
          <NavItem
            Icon={FaHandshake}
            name='Service Level Agreement'
            textSize='text-sm'
            to='/legal/service-level-agreement'
          />

          <span
            className={`transition-all duration-200 origin-top-left ${
              opened ? 'scale-100 opacity-100 h-fit p-1.5' : 'scale-0 opacity-0 h-0'
            } uppercase font-rubik font-bold mt-2 select-none`}>
            Tools
          </span>
          <NavItem Icon={BsUiChecks} name='Syntax Checker' to='/tools/syntax-checker' />
          <NavItem Icon={TbDeviceDesktopCode} name='Skript Editor' to='/tools/editor' />
          <NavItem Icon={UserGroupIcon} name='Skript Forum' to={`https://forum.${appDomainName}`} />
        </div>
      </nav>

      {/* Navigation for mobile */}
      <nav
        className={`flex md:hidden flex-col absolute transition-all duration-200 overflow-hidden ${
          opened ? 'h-screen' : 'h-12'
        } w-screen bg-dark-purple isolate z-20`}>
        <div className='flex relative justify-between items-center'>
          <NavLink
            to='/'
            onClick={handleClose}
            className={`grid place-items-center transition-all duration-200 origin-top-left select-none scale-100 opacity-70 h-12 w-12 p-1`}>
            <img
              draggable={false}
              className={`object-contain invert h-9 w-9`}
              src={logo}
              alt='ZoBlaze Logo'
            />
          </NavLink>

          <Bars3Icon
            onClick={handleToggle}
            className={`z-10 h-12 p-1.5 text-slate-100 cursor-pointer transition-all duration-200 ${
              opened ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <Bars3CenterLeftIcon
            onClick={handleToggle}
            className={`absolute right-0 z-10 h-12 p-1.5 text-slate-100 cursor-pointer transition-all duration-200 ${
              opened ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Body */}
        <div className='flex flex-col h-fit w-full overflow-x-hidden overflow-y-auto nav-scrollbar'>
          {/* Buttons */}
          <div className={`flex shrink-0 justify-center h-fit p-1.5 w-full`}>
            <div className='flex flex-col justify-center items-center w-full max-w-80'>
              {/* Login */}

              {loggedIn ? (
                <div className='h-8 flex w-5/6 space-x-1'>
                  <div className='flex items-center justify-center rounded-md bg-english-violet-900 flex-1 border border-solid border-english-violet-800'>
                    <span className='px-1 font-rubik font-bold'>${(user?.balance || 0).toFixed(2)}</span>
                  </div>
                  <Link
                    to='/billing/funds'
                    onClick={handleClose}
                    className='flex items-center justify-center rounded-md transition-all cursor-pointer bg-flame-900 flex-1 hover:bg-darkflame'>
                    <ArrowUpTrayIcon className='h-4' />
                  </Link>
                </div>
              ) : (
                <div className='mt-2'>
                  <SignInButton />
                </div>
              )}
            </div>
          </div>

          <span className={`p-1.5 uppercase font-rubik font-bold select-none`}>Products</span>

          <NavItem Icon={GiStoneBlock} name='Minecraft' to='/products/minecraft' />
          <NavItem Icon={BsDiscord} name='Discord Bots' to='/products/discord' />
          <NavItem Icon={ServerStackIcon} name='VPS' to='/products/vps' />

          <span className={`p-1.5 uppercase font-rubik font-bold mt-2 select-none`}>Hosting</span>
          <NavItem Icon={LuLayoutPanelLeft} name='ZPanel' to='/panel' />
          <NavItem Icon={ChatBubbleLeftRightIcon} name='Support' to='/support' />
          <NavItem Icon={GiftIcon} name='Rewards Program' to='rewards' />

          <span className={`p-1.5 uppercase font-rubik font-bold mt-2 select-none`}>Company</span>
          <NavItem Icon={DocumentTextIcon} name='Terms & Conditions' to='/legal/terms-and-conditions' />
          <NavItem Icon={ShieldCheckIcon} name='Privacy Policy' to='/legal/privacy-policy' />
          <NavItem
            Icon={FaHandshake}
            name='Service Level Agreement'
            to='/legal/service-level-agreement'
          />

          <span className={`p-1.5 uppercase font-rubik font-bold mt-2 select-none`}>Tools</span>
          <NavItem Icon={BsUiChecks} name='Syntax Checker' to='/tools/syntax-checker' />
          <NavItem Icon={TbDeviceDesktopCode} name='Skript Editor' to='/tools/editor' />
          <NavItem Icon={BsUiChecks} name='Skript Forum' to={`https://forum.${appDomainName}`} />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
