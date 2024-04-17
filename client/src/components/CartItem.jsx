import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  changeItemKey,
  removeAllFromCart,
  removeFromCart,
  updateItemQuantity,
} from '../features/cart/cartSlice';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const [warningOpened, setWarningOpened] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  useEffect(() => {
    setQuantity(item.quantity.toString());
  }, [item.quantity]);
  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    if (newQuantity === '' || /^[1-9]\d*$/.test(newQuantity)) {
      setQuantity(newQuantity);
    }
  };
  const updateQuantity = () => {
    const finalQuantity = quantity === '' ? 1 : parseInt(quantity, 10);

    if (finalQuantity !== item.quantity) {
      dispatch(updateItemQuantity({ itemConfigKey: item.itemConfigKey, quantity: finalQuantity }));
      setQuantity(finalQuantity.toString());
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  };

  const itemType = item.serviceType.includes('Minecraft')
    ? 'minecraft'
    : item.serviceType.includes('Discord Bot')
    ? 'discordBot'
    : 'vps';

  const [selectedOption, setSelectedOption] = useState({
    value: item.serverType || item.botLanguage || item.os,
    label: item.serverType || item.botLanguage || item.os,
  });
  useEffect(() => {
    setSelectedOption({
      value: item.serverType || item.botLanguage || item.os,
      label: item.serverType || item.botLanguage || item.os,
    });
  }, [item.itemConfigKey]);

  const options = {
    minecraft: [
      { value: 'Vanilla', label: 'Vanilla' },
      { value: 'Forge', label: 'Forge' },
      { value: 'Spigot', label: 'Spigot' },
      { value: 'Paper', label: 'Paper' },
      { value: 'Bukkit', label: 'Bukkit' },
    ],
    discordBot: [
      { value: 'Node.js', label: 'Node.js' },
      { value: 'Python', label: 'Python' },
    ],
    vps: [
      { value: 'Ubuntu', label: 'Ubuntu' },
      { value: 'CentOS', label: 'CentOS' },
      { value: 'Debian', label: 'Debian' },
    ],
  };

  const handleChangeType = (selectedOption) => {
    setSelectedOption(selectedOption);

    let newConfig = {};
    if (itemType === 'minecraft') {
      newConfig = { serverType: selectedOption.value };
    } else if (itemType === 'discordBot') {
      newConfig = { botLanguage: selectedOption.value };
    } else if (itemType === 'vps') {
      newConfig = { os: selectedOption.value };
    }

    dispatch(
      changeItemKey({
        itemConfigKey: item.itemConfigKey,
        newConfig,
      })
    );
  };

  const removeItem = () => {
    if (item.quantity === 1) {
      setWarningOpened(true);
    } else {
      dispatch(removeFromCart(item.itemConfigKey));
    }
  };

  const addItem = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const removeAll = () => {
    dispatch(removeAllFromCart(item.itemConfigKey));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: '#3a363a', // dark-purple
      borderColor: 'transparent',
      boxShadow: 'none',
      outline: 'none',
      padding: '0px 0px 0px 8px',
      '&:hover': { borderColor: 'transparent' },
    }),
    menu: (provided) => ({
      ...provided,
      background: '#3a363a',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? '#EE5622' : '#3a363a', // flame-900 for selected
      color: state.isSelected ? 'white' : 'white',
      '&:hover': { background: '#EE5622' }, // flame-900 for hover
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'white',
      '&:hover': { color: '#EE5622', cursor: 'pointer' }, // flame-900 for hover
    }),
  };

  const WarningModal = ({ onClose, onConfirm }) => (
    <div className='absolute isolate rounded-lg inset-0 z-50 w-full h-full backdrop-blur-sm flex flex-col justify-center items-center overflow-hidden'>
      <p className='text-lg text-center font-bold z-10'>
        Are you sure you want to remove this item from your cart?
      </p>
      <div className='flex space-x-2 mt-3 z-10'>
        <button
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-all duration-300 select-none'
          onClick={onConfirm}>
          Remove
        </button>
        <button
          className='bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-400 transition-all duration-300 select-none'
          onClick={onClose}>
          Cancel
        </button>
      </div>
      <div onClick={onClose} className='absolute w-full h-full bg-black/30'></div>
    </div>
  );

  return (
    <div className='relative flex flex-col justify-start items-start p-4 bg-white/5 rounded-lg'>
      <div className='flex relative h-full items-start justify-start'>
        <img
          draggable={false}
          src={item.image}
          alt={item.planName}
          className='object-contain select-none h-20 w-20 mr-4'
        />
        <div className='flex flex-col h-full'>
          <span className='font-bold text-xl text-flame-800'>
            {item.serviceType} - <strong className='font-bold text-flame-600'>{item.planName}</strong>
          </span>
          <div className='flex flex-row space-x-4 mt-1'>
            <span className='text-xs'>{item.cpu || 'CPU'}</span>
            <span className='text-xs'>{item.ram || 'RAM'}</span>
            <span className='text-xs'>{item.storage || 'STORAGE'}</span>
          </div>
          <div className='flex mt-4'>
            <Select
              value={selectedOption}
              onChange={handleChangeType}
              options={options[itemType]}
              styles={customStyles}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col xs:flex-row w-full mt-16 justify-between items-center'>
        <button
          className='uppercase px-3 py-1 bg-rose-900/50 transition-all duration-300 hover:bg-rose-800/70 rounded mr-auto xs:mr-0'
          onClick={() => setWarningOpened(true)}>
          <span className='hidden sm:block text-sm'>Remove from cart</span>
          <TrashIcon className='h-5 sm:hidden' />
        </button>
        <div className='flex flex-row items-center justify-end mt-2 ml-auto xs:ml-1 xs:mt-0'>
          <span className='hidden xs:block mr-12 text-zinc-400'>Quantity</span>

          <div className='flex space-x-2 relative'>
            <button
              onClick={removeItem}
              className='w-7 h-7 rounded-lg p-1 bg-darkflame cursor-pointer transition-all duration-200 hover:bg-flame-900'>
              <MinusIcon className='h-5' />
            </button>
            <input
              type='text'
              value={quantity}
              onChange={handleQuantityChange}
              onBlur={updateQuantity}
              onKeyDown={handleKeyDown}
              className='text-end px-1.5 py-0.5 rounded-lg w-16 h-7 bg-white/5 select-none font-rubik outline-none'
            />
            <button
              onClick={addItem}
              className='w-7 h-7 rounded-lg p-1 bg-darkflame cursor-pointer transition-all duration-200 hover:bg-flame-900'>
              <PlusIcon className='h-5' />
            </button>
          </div>

          <div className='ml-2 h-full min-w-24 text-end px-1.5 py-0.5'>
            <span className='font-rubik font-semibold'>
              {((item.pricePerMonth || 0) * (item.quantity || 1)).toFixed(2)} $
            </span>
          </div>
        </div>
      </div>
      {warningOpened && (
        <WarningModal
          onClose={() => setWarningOpened(false)}
          onConfirm={() => {
            removeAll();
            setWarningOpened(false);
          }}
        />
      )}
    </div>
  );
}

export default CartItem;
