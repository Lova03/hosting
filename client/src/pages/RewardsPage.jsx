import { Helmet } from 'react-helmet-async';
import UserPanel from '../components/UserPanel';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUser,
  selectUserHasError,
  selectUserLoading,
} from '../features/user/userSlice';
import { LEVEL_COLOR_RANGES, DEFAULT_COLOR } from '../theme';
import Footer from '../components/Footer';
import UserAvatar from '../components/UserAvatar';
import { useLevelSystem } from '../hooks/useLevelingSystem';
import RewardsProgressBar from '../components/rewards/RewardsProgressBar';
import RewardCard from '../components/rewards/RewardCard';
import logo from '../assets/logo512.png';
import XPCalculator from '../components/rewards/XPCalculator';

function RewardsPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserLoading);
  const hasError = useSelector(selectUserHasError);

  const { currentLevel, nextLevel, progressToNextLevel, xpForLevel } = useLevelSystem(user?.xp);

  const getLevelBorderColor = (level) => {
    const range = LEVEL_COLOR_RANGES.find((range) => level >= range.minLevel && level <= range.maxLevel);
    return range ? range.color : DEFAULT_COLOR;
  };

  return (
    <div className='page flex flex-col isolate'>
      <Helmet>
        <title>Rewards Program | ZoBlaze</title>
        <meta
          name='description'
          content='Explore the ZoBlaze Rewards Program. Track your XP, level progress, and unlock exciting rewards as you advance.'
        />
      </Helmet>

      {isLoading && !isLoggedIn && (
        <div className='min-h-full w-full flex justify-center items-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-[6px] border-white/10 border-t-flame-900'></div>
        </div>
      )}

      <div className='my-2 z-20'>
        <UserPanel />
      </div>

      <div className='w-full flex flex-col items-center'>
        {/* Main Info About Rewards Program */}
        <div className='mt-8 max-w-4xl w-full flex flex-col rounded-lg shadow-md bg-english-violet-900 p-4 transition-colors duration-300 hover:bg-english-violet-850'>
          <h2 className='uppercase font-rubik font-bold text-3xl'>Exclusive Rewards Program</h2>
          <span className='mt-4 max-w-xl px-4'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque aliquam sint assumenda?
            Aspernatur earum unde quasi adipisci consequuntur repudiandae consequatur eaque dicta non
            asperiores dolor, tempora saepe. Sunt qui doloremque, sit hic maxime animi laboriosam aliquid
            dolor dolorum sapiente quis voluptates vero voluptatibus, magnam debitis ratione eius? Dicta,
            hic autem?
          </span>
        </div>

        {/* User Level Stats */}
        {isLoggedIn && !hasError && (
          <div className='mt-8 max-w-4xl w-full flex flex-col rounded-lg shadow-md bg-english-violet-900 p-4 transition-colors duration-300 hover:bg-english-violet-850'>
            {/* Avatar & User Details */}
            <div className='flex'>
              <UserAvatar
                size={128}
                src={
                  user?.discordId && user?.avatar
                    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png?size=2048`
                    : null
                }
              />
              <div className='flex flex-col ml-4 mt-4 flex-1 select-none'>
                <span
                  style={{
                    color: user?.role?.toLowerCase() === 'admin' ? 'rgb(225, 29, 72)' : 'white',
                  }}
                  className='font-rubik font-bold text-2xl'>
                  {user?.username || 'Unknown user'}
                </span>
                <span className='text-sm text-slate-300 mt-1'>{user?.role || 'Unknown role'}</span>
              </div>
            </div>
            {/* Total XP & Level */}
            <div className='flex mt-6 space-x-4'>
              <div className='flex flex-col w-1/2'>
                <span className='font-bold font-rubik uppercase text-sm px-2'>Total XP</span>
                <div className='w-full mt-1 px-4 py-1.5 rounded flex justify-center bg-black/10'>
                  <span className='font-rubik text-hunyadi-yellow font-bold text-lg'>
                    <span className='break-all'>{user?.xp?.toLocaleString('en-US')}</span> XP
                  </span>
                </div>
              </div>
              <div className='flex flex-col w-1/2'>
                <span className='font-bold font-rubik uppercase text-sm px-2'>Current Level</span>
                <div className='w-full mt-1 px-4 py-1.5 rounded flex justify-center bg-black/10'>
                  <span className='font-rubik text-hunyadi-yellow font-bold text-lg'>
                    {currentLevel.toLocaleString('en-US')}
                  </span>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <RewardsProgressBar />
          </div>
        )}

        {/* Grid Of Rewards */}
        <div
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
          }}
          className='mt-8 max-w-4xl w-full grid place-items-center gap-2 rounded-lg shadow-md bg-english-violet-900 p-4 transition-colors duration-300 hover:bg-english-violet-850'>
          {new Array(6).fill(null).map((_, idx) => (
            <RewardCard
              imageSrc={logo}
              invert
              key={idx}
              text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Et aut nam odio quas eum tenetur enim, dolorem recusandae.'
            />
          ))}
        </div>

        {/* XP/Level Calculator */}
        <div className='mt-8 max-w-4xl w-full flex flex-col rounded-lg shadow-md bg-english-violet-900 p-4 transition-colors duration-300 hover:bg-english-violet-850'>
          <span className='text-xl font-rubik font-bold uppercase mb-6'>XP & Level Calculator</span>
          <XPCalculator />
          <span className='mt-8 text-hunyadi-yellow text-sm'>
            You receive 80 XP for every dollar you add to your wallet.
          </span>
          <span className='mt-1 text-hunyadi-yellow text-sm'>
            You receive 150 XP for every dollar you spend on ZoBlaze.
          </span>
          <span className='mt-1 text-slate-400 text-xs'>
            Leveling system is currently capped at level 100. After level 100, you'll still gain xp, but
            won't level up anymore.
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className='mt-44'>
        <Footer />
      </div>
    </div>
  );
}

export default RewardsPage;
