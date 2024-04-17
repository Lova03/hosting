import PaymentMethod from './PaymentMethod';

function PaymentMethodSelect() {
  return (
    <div
      className={`relative w-full max-w-[872px] flex justify-start md:justify-center md:w-fit lgx:w-full space-x-2 mt-2 p-2 rounded-lg shadow-lg bg-english-violet-900 overflow-x-auto table-scrollbar`}>
      <div className='flex justify-start space-x-2 md:grid md:grid-cols-2 md:space-x-0 md:gap-2 lgx:flex lgx:gap-0 lgx:space-x-2'>
        <PaymentMethod text='Paypal' id='paypal' imgSrc='https://content.something.host/paypal.png' />
        <PaymentMethod text='Cards' id='stripe' imgSrc='https://content.something.host/stripe.png' />
        <PaymentMethod
          text='Paysafecard'
          id='paysafecard'
          imgSrc='https://customer.cc.at.paysafecard.com/rest/payment/logo.svg?mid=1000062124&country=GR'
        />
        <PaymentMethod
          text='Bank transfer'
          id='banktransfer'
          imgSrc='https://content.something.host/bank.png'
        />
      </div>
    </div>
  );
}

export default PaymentMethodSelect;
