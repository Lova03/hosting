import { useDispatch, useSelector } from 'react-redux';
import { selectDepositMethod, setDepositMethod } from '../features/controls/controlsSlice';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

function PaymentMethod({ id, imgSrc, text }) {
  const dispatch = useDispatch();
  const selectedMethod = useSelector(selectDepositMethod);
  const handleMethodChange = (e) => {
    dispatch(setDepositMethod(e.target.value));
  };

  return (
    <label
      htmlFor={id}
      className='relative isolate flex flex-col justify-start overflow-hidden cursor-pointer py-2 px-4 h-28 w-52 shrink-0 rounded-lg bg-black/10'>
      <span className='uppercase font-bold text-sm text-hunyadi-yellow'>{text}</span>
      <img
        draggable={false}
        className='select-none object-contain h-12 px-4 mt-3'
        src={imgSrc}
        alt={`${text} payment option`}
      />
      <input
        type='radio'
        id={id}
        name='paymentMethod'
        hidden
        className='peer'
        value={id}
        checked={selectedMethod === id}
        onChange={handleMethodChange}
      />
      <div className='opacity-0 peer-checked:opacity-100 transition-all duration-300 z-10 absolute rounded-full border border-solid border-emerald-300 shadow-emerald-300/20 shadow-glow top-0 right-0 mr-1 mt-1'>
        <CheckCircleIcon className='h-8 text-emerald-400' />
      </div>
    </label>
  );
}

export default PaymentMethod;
