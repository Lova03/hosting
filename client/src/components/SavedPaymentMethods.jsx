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
    <div className='w-full flex flex-col rounded-lg shadow-lg p-4 bg-dark-purple'>
      <span className='font-semibold text-xl'>Payment Methods</span>

      <div className='w-full overflow-x-auto table-scrollbar'>
        <div className='flex items-start w-[816px] md:w-auto flex-col mt-12 border-t border-slate-700'>
          {savedPaymentMethods.map((item, idx) => (
            <SavedPaymentMethod item={item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedPaymentMethods;
