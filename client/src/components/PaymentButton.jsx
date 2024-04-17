import { useSelector } from 'react-redux';
import { selectDepositAmount } from '../features/controls/controlsSlice';

function PaymentButton() {
  const depositAmount = useSelector(selectDepositAmount);
  const handlePayment = () => {};

  return (
    <button
      onClick={handlePayment}
      className='relative -z-10 isolate w-full max-w-80 mx-2 mt-8 py-3 rounded-lg bg-gradient-to-br from-flame-900 to-flame-700 transition-all duration-100 hover:shadow-emerald-400/5 hover:shadow-glow uppercase font-bold overflow-hidden group'>
      <span className='z-10'>Complete Deposit Of ${depositAmount.toFixed(2)}</span>
      <div className='absolute w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-300 -z-10 top-full transition-all duration-100 group-hover:top-0'></div>
    </button>
  );
}

export default PaymentButton;
