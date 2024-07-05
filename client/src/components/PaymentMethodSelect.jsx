import PaymentMethod from './PaymentMethod';
import ethLogo from '../assets/ethereum-eth-logo-full-horizontal-white.svg';
import solLogo from '../assets/solana-sol-logo-horizontal-white.svg';
import { useRef, useState } from 'react';

function PaymentMethodSelect() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // fast scroll
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full flex mt-2 p-2 rounded-lg shadow-lg bg-english-violet-900 overflow-x-auto table-scrollbar'
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
      <div className='flex justify-start space-x-2'>
        <PaymentMethod
          isDragging={isDragging}
          text='Bitcoin'
          id='bitcoin'
          imgSrc='https://bitcoin.org/img/icons/logo-footer.svg'
        />
        <PaymentMethod isDragging={isDragging} text='Ethereum' id='ethereum' imgSrc={ethLogo} />
        <PaymentMethod
          isDragging={isDragging}
          text='Litecoin'
          id='litecoin'
          imgSrc='https://cryptologos.cc/logos/versions/litecoin-ltc-logo-full.svg'
        />
        <PaymentMethod
          isDragging={isDragging}
          text='Tether USDT'
          id='tether'
          imgSrc='https://cryptologos.cc/logos/tether-usdt-logo.svg'
        />
        <PaymentMethod isDragging={isDragging} text='Solana' id='solana' imgSrc={solLogo} />
        {/* <PaymentMethod isDragging={isDragging} text='Paypal' id='paypal' imgSrc='https://content.something.host/paypal.png' />
        <PaymentMethod isDragging={isDragging} text='Cards' id='stripe' imgSrc='https://content.something.host/stripe.png' />
        <PaymentMethod
          isDragging={isDragging} text='Paysafecard'
          id='paysafecard'
          imgSrc='https://customer.cc.at.paysafecard.com/rest/payment/logo.svg?mid=1000062124&country=GR'
        />
        <PaymentMethod
          isDragging={isDragging} text='Bank transfer'
          id='banktransfer'
          imgSrc='https://content.something.host/bank.png'
        /> */}
      </div>
    </div>
  );
}

export default PaymentMethodSelect;
