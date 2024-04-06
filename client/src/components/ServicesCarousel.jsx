import { Carousel } from 'react-responsive-carousel';
import minecraft from '../assets/mc_carousel.jpg';
import discord from '../assets/discord_carousel.png';
import vps from '../assets/vps_carousel.png';
import sk from '../assets/sk_carousel.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectNavbarOpened } from '../features/controls/controlsSlice';

function ServicesCarousel() {
  const navbarOpened = useSelector(selectNavbarOpened);

  return (
    <div className='grid place-items-center w-full'>
      <Carousel
        interval={4000}
        autoPlay
        infiniteLoop
        swipeable
        emulateTouch
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        className='rounded-lg bg-raisin-black overflow-hidden h-64 w-full max-w-6xl'>
        <div className='service-slide'>
          {/* Image background */}
          <div className='absolute w-full h-full -z-10 flex items-center justify-center'>
            <img
              className='object-cover h-full w-full'
              src={minecraft}
              alt='Minecraft Carousel Banner'
            />
            <div className='absolute inset-0 bg-black/50'></div>
          </div>
          {/* Body */}
          <div className='flex flex-col md:items-start relative w-full h-full items-center'>
            <span className='font-minecraft uppercase font-bold text-4xl xs:text-5xl'>
              Minecraft Hosting
            </span>
            <span
              className={`${
                navbarOpened ? 'hidden lg:block' : 'hidden md:block'
              } pl-5 mt-5 text-lg max-w-2xl text-start text-slate-200`}>
              Unleash the full potential of your Minecraft world with our high-performance hosting. Quick
              setups, endless possibilities!
            </span>
            <div className='flex w-full flex-1 items-center justify-center'>
              <Link
                to='/products/minecraft'
                className='select-none mt-5 px-8 py-4 bg-gradient-to-tr from-lime-500 to-emerald-500 rounded font-bold'>
                Adventure Awaits
              </Link>
            </div>
          </div>
        </div>
        <div className='service-slide'>
          {/* Image background */}
          <div className='absolute w-full h-full -z-10 flex items-center justify-center'>
            <img className='object-cover h-full w-full' src={discord} alt='Discord Carousel Banner' />
            <div className='absolute inset-0 bg-black/50'></div>
          </div>
          {/* Body */}
          <div className='flex flex-col md:items-start relative w-full h-full items-center'>
            <span className='font-whitney uppercase font-bold text-4xl xs:text-5xl'>
              Discord Bot Hosting
            </span>
            <span
              className={`${
                navbarOpened ? 'hidden lg:block' : 'hidden md:block'
              } pl-5 mt-5 text-lg max-w-2xl text-start text-slate-200`}>
              Host your Discord bots with unparalleled uptime and support. Scale effortlessly as your
              community grows!
            </span>
            <div className='flex w-full flex-1 items-center justify-center'>
              <Link
                to='/products/discord'
                className='select-none mt-5 px-8 py-4 bg-gradient-to-tr from-blurple-900 to-indigo-500 rounded font-bold'>
                Initiate Bot Launch
              </Link>
            </div>
          </div>
        </div>
        <div className='service-slide'>
          {/* Image background */}
          <div className='absolute w-full h-full -z-10 flex items-center justify-center'>
            <img className='object-cover h-full w-full' src={vps} alt='VPS Carousel Banner' />
            <div className='absolute inset-0 bg-black/50'></div>
          </div>
          {/* Body */}
          <div className='flex flex-col md:items-start relative w-full h-full items-center'>
            <span className='font-tech uppercase font-bold text-4xl xs:text-5xl'>VPS Hosting</span>
            <span
              className={`${
                navbarOpened ? 'hidden lg:block' : 'hidden md:block'
              } pl-5 mt-5 text-lg max-w-2xl text-start text-slate-200`}>
              Discover the power of dedicated resources with our VPS hosting. Optimal performance, full
              control, and scalable resources at your fingertips!
            </span>
            <div className='flex w-full flex-1 items-center justify-center'>
              <Link
                to='/products/vps'
                className='select-none mt-5 px-8 py-4 bg-gradient-to-tr from-purple-700 to-pink-500 rounded font-bold'>
                Engage Hyperdrive
              </Link>
            </div>
          </div>
        </div>
        <div className='service-slide'>
          {/* Image background */}
          <div className='absolute w-full h-full -z-10 flex items-center justify-center'>
            <img className='object-cover h-full w-full' src={sk} alt='Skript Tools Carousel Banner' />
            <div className='absolute inset-0 bg-black/50'></div>
          </div>
          {/* Body */}
          <div className='flex flex-col md:items-start relative w-full h-full items-center'>
            <span className='font-magic uppercase text-3xl xs:text-4xl'>Skript Wizardry</span>
            <span
              className={`${
                navbarOpened ? 'hidden lg:block' : 'hidden md:block'
              } pl-5 mt-5 text-lg max-w-2xl text-start text-slate-200`}>
              Refine your Skript code with our Syntax Checker and enhance your scripting with our Online
              Editor, featuring syntax highlighting and auto-completions.
            </span>
            <div className='flex w-full flex-1 flex-col xs:flex-row items-center justify-center'>
              <Link
                to='/tools/syntax-checker'
                className='select-none xs:mr-2 xs:mt-5 px-8 py-4 bg-gradient-to-tr from-rose-700 to-red-500 rounded font-bold'>
                Spell Check Code
              </Link>
              <Link
                to='/tools/editor'
                className='select-none mt-2 xs:mt-5 px-8 py-4 bg-gradient-to-tr from-gray-700 to-zinc-500 rounded font-bold'>
                Craft Your Story
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default ServicesCarousel;
