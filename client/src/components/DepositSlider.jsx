import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setDepositAmount } from '../features/controls/controlsSlice';
import { selectCartTotalPrice } from '../features/cart/cartSlice';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { selectUser } from '../features/user/userSlice';

function DepositSlider() {
  const dispatch = useDispatch();
  const [deposit, setDeposit] = useState([2, 5]);
  const [depositInputValue, setDepositInputValue] = useState('5');

  const cartTotal = useSelector(selectCartTotalPrice);
  const { balance } = useSelector(selectUser);

  const handleChange = (value) => {
    setDeposit(value);
    setDepositInputValue(value[1].toFixed(2));
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    if (newAmount === '' || /^(?=.*[1-9])\d*\.?\d*$/.test(newAmount)) {
      setDepositInputValue(newAmount);
    }
  };

  const updateAmount = () => {
    if (isNaN(parseFloat(depositInputValue))) {
      setDeposit((prev) => [prev[0], 5]);
      setDepositInputValue('5.00');
      updateDepositInState(5);
      return;
    }
    let finalAmount = depositInputValue === '' ? 5 : Math.round(parseFloat(depositInputValue) * 2) / 2;

    if (finalAmount < 2) finalAmount = 2;

    setDeposit((prev) => [prev[0], finalAmount]);
    setDepositInputValue(finalAmount.toFixed(2));
    updateDepositInState(finalAmount);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const increaseAmount = () => {
    const amount = deposit[1];
    const newAmount = amount + 0.5;
    setDeposit((prev) => [prev[0], newAmount]);
    setDepositInputValue(newAmount.toFixed(2));
    updateDepositInState(newAmount);
  };
  const decreaseAmount = () => {
    const amount = deposit[1];
    let newAmount = amount - 0.5;
    if (newAmount < 2) newAmount = 2;
    setDeposit((prev) => [prev[0], newAmount]);
    setDepositInputValue(newAmount.toFixed(2));
    updateDepositInState(newAmount);
  };

  const updateDepositInState = (amount) => {
    dispatch(setDepositAmount(amount || deposit[1]));
  };

  const setDepositToCartTotal = () => {
    const newAmount = cartTotal - balance < 2 ? 2 : Math.ceil(cartTotal - balance);
    setDeposit((prev) => [prev[0], newAmount]);
    setDepositInputValue(newAmount.toFixed(2));
    updateDepositInState(newAmount);
  };

  return (
    <div className='mt-8 flex w-full flex-col xs:flex-row items-start xs:justify-center'>
      <div className='flex items-center mb-4 xs:mb-0 xs:flex-col'>
        <div className='flex space-x-2 relative'>
          <button
            onClick={decreaseAmount}
            className='w-7 h-7 rounded-lg p-1 bg-darkflame cursor-pointer transition-all duration-200 hover:bg-flame-900'>
            <MinusIcon className='h-5' />
          </button>
          <input
            type='text'
            value={depositInputValue}
            onChange={handleAmountChange}
            onBlur={updateAmount}
            onKeyDown={handleKeyDown}
            className='text-end px-1.5 py-0.5 rounded-lg w-16 h-7 bg-white/5 select-none font-rubik outline-none'
          />
          <button
            onClick={increaseAmount}
            className='w-7 h-7 rounded-lg p-1 bg-darkflame cursor-pointer transition-all duration-200 hover:bg-flame-900'>
            <PlusIcon className='h-5' />
          </button>
        </div>

        {cartTotal - balance > 0 && (
          <button
            onClick={setDepositToCartTotal}
            className='relative ml-4 xs:ml-0 xs:mt-10 text-sm px-2 py-1.5 rounded-lg bg-flame-900 border border-solid border-flame-700 group transition-all duration-300 hover:bg-flame-800 hover:border-flame-600'>
            Top up{' '}
            <strong className='font-bold font-rubik'>
              ${cartTotal - balance < 2 ? '2.00' : Math.ceil(cartTotal - balance).toFixed(2)}
            </strong>
            <div className='absolute -top-3 -right-3'>
              <ShoppingCartIcon className='h-5 rotate-12 text-amber-300 transition-all duration-300 group-hover:scale-125' />
            </div>
          </button>
        )}
      </div>
      <div className='flex-1 w-full xs:w-auto flex flex-col xs:ml-4 pb-8 xs:pb-0'>
        <RangeSlider
          className='single-thumb w-full max-w-3xl appearance-none bg-black/15'
          defaultValue={[2, 5]}
          min={2}
          max={100}
          step={0.5}
          thumbsDisabled={[true, false]}
          rangeSlideDisabled={true}
          value={deposit}
          onInput={handleChange}
          onThumbDragEnd={updateDepositInState}
        />
        <div className='relative mt-2 w-full max-w-3xl bg-red-500'>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(3%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>5$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(8%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(13%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>15$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(18%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(23%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>25$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(28%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(33%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>35$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(38%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(43%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>45$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(48%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(53%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>55$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(58%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(63%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>65$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(68%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(73%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>75$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(78%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(83%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>85$</span>
          </div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(88%+6px)]'></div>
          <div className='absolute h-2 w-0.5 bg-slate-500 left-[calc(93%+6px)]'>
            <span className='absolute text-xs font-rubik font-bold -bottom-5 -translate-x-1/2'>95$</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositSlider;
