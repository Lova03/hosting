import { useState } from 'react';
import SavedPaymentMethod from './SavedPaymentMethod';

const dummyData = [
  {
    id: 1,
    type: 'credit_card',
    lastFourDigits: '1234',
    expirationDate: '10/24',
    cardholderName: 'John Doe',
    brand: 'Visa',
    isDefault: true,
  },
  {
    id: 2,
    type: 'debit_card',
    lastFourDigits: '5678',
    expirationDate: '12/25',
    cardholderName: 'Jane Smith',
    brand: 'Mastercard',
    isDefault: false,
  },
];

function SavedPaymentMethods() {
  const [savedPaymentMethods, setSavedPaymentMethods] = useState(dummyData);

  return (
    <div className='w-full grid place-items-center overflow-x-auto table-scrollbar'>
      <div className='flex flex-shrink-0 items-start w-[816px] flex-col border-t border-slate-700'>
        {savedPaymentMethods.map((item, idx) => (
          <SavedPaymentMethod item={item} key={idx} />
        ))}
        {savedPaymentMethods?.length === 0 && (
          <div className='flex flex-col items-center justify-center w-full py-6 px-2 text-center'>
            <span>You have no payment methods saved!</span>
            <div className='flex space-x-2 mt-4'>
              <button className='px-6 py-1 rounded border border-flame-700 bg-flame-900/10 transition-colors duration-300 hover:bg-flame-900/20'>
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedPaymentMethods;
