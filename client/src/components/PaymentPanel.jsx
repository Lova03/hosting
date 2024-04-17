import DepositSlider from './DepositSlider';

function PaymentPanel() {
  return (
    <div className='w-full min-h-64 p-4 rounded-lg shadow-lg bg-dark-purple'>
      <div className='flex flex-col'>
        <span className='text-xl font-semibold'>Choose a deposit amount</span>
        <span className='mt-4 text-slate-300 text-sm'>
          You can deposit funds to your account to auto-renew any services that you have active under
          your account.
        </span>
      </div>
      <DepositSlider />
    </div>
  );
}

export default PaymentPanel;
