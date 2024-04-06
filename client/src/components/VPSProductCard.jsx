import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addToCart } from '../features/cart/cartSlice';
import logo from '../assets/logo512.png';
import { selectIsLoggedIn } from '../features/user/userSlice';
import { toggleSignInModal } from '../features/controls/controlsSlice';

function VPSProductCard({ product }) {
  const dispatch = useDispatch();

  const loggedIn = useSelector(selectIsLoggedIn);

  const [selectedOption, setSelectedOption] = useState({
    value: product.defaultTypeValue,
    label: product.defaultTypeValue,
  });

  const operatingsystems = [
    { value: 'Ubuntu', label: 'Ubuntu' },
    { value: 'CentOS', label: 'CentOS' },
    { value: 'Debian', label: 'Debian' },
  ];

  const handleLanguageChange = (option) => {
    setSelectedOption(option);
  };

  const handleAddToCart = () => {
    if (!loggedIn) {
      toast.error('Please log in to add items to your cart.');
      dispatch(toggleSignInModal(true));
      return;
    }

    const productToAdd = {
      ...product,
      os: selectedOption.value,
    };
    dispatch(addToCart(productToAdd));
    toast.success(`Successfully added ${productToAdd.planName} - ${selectedOption.label} plan to cart!`);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: '#31263E', // dark-purple
      borderColor: 'transparent',
      boxShadow: 'none',
      outline: 'none',
      padding: '0px 0px 0px 8px',
      '&:hover': { borderColor: 'transparent' },
    }),
    menu: (provided) => ({
      ...provided,
      background: '#31263E',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? '#EE5622' : '#31263E', // flame-900 for selected
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

  return (
    <div className='relative flex flex-col items-center w-72 mt-14 bg-english-violet-900 rounded-md transition-all duration-300 hover:bg-english-violet-850 group'>
      {/* Product Image */}

      <img
        className={`absolute -translate-y-14 select-none object-contain w-28 h-28 ${
          !product.image ? 'invert' : ''
        }`}
        src={product.image || logo}
        draggable={false}
        alt='VPS Product'
      />

      {/* Padding */}
      <div className='w-full h-14 bg-transparent'></div>

      {/* Body */}
      <div className='flex flex-col flex-1 w-full px-2 py-2'>
        {/* Plan Name */}
        <span className='text-3xl font-bold font-rubik mt-2 tracking-wider text-center'>
          {product.planName} {product.ram}
        </span>

        {/* Price */}
        <span className='text-lg text-hunyadi-yellow text-center font-rubik'>
          ${product.pricePerMonth} / month
        </span>

        {/* Specifications */}
        <div className='flex flex-col w-full mt-5 items-center'>
          <span className='cursor-default text-sm font-bold ml-4 mr-auto'>Specifications</span>
          <div className='flex flex-col space-y-0.5 w-fit mt-1 py-2 px-10 rounded bg-dark-purple/40'>
            <span className='cursor-default text-sm text-center'>CPU: {product.cpu}</span>
            <span className='cursor-default text-sm text-center'>RAM: {product.ram}</span>
            <span className='cursor-default text-sm text-center'>Storage: {product.storage}</span>
          </div>
        </div>

        {/* Server Details */}
        <div className='flex flex-col w-full mt-2 items-center'>
          <span className='cursor-default text-sm font-bold ml-4 mr-auto'>Service Details</span>
          <div className='flex flex-col space-y-0.5 w-fit mt-1 py-2 px-6 rounded bg-dark-purple/40'>
            <div className='flex items-center text-sm text-center'>
              <label htmlFor='operating-system' className='mr-2'>
                OS:
              </label>
              <Select
                id='operating-system'
                isSearchable={false}
                value={selectedOption}
                onChange={handleLanguageChange}
                options={operatingsystems}
                styles={customStyles}
                classNamePrefix='react-select'
              />
            </div>
          </div>
        </div>

        {/* Hosting Features */}
        <div className='flex flex-col w-full mt-2 items-center'>
          <span className='cursor-default text-sm font-bold ml-4 mr-auto'>Hosting Features</span>
          <div className='flex flex-col space-y-0.5 w-fit mt-1 py-2 px-10 rounded bg-dark-purple/40'>
            <span className='cursor-default text-sm text-center'>DDoS Protection</span>
            <span className='cursor-default text-sm text-center'>Custom Control Panel</span>
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-4 mb-2 flex justify-center'>
          <button
            onClick={handleAddToCart}
            className='bg-gradient-to-tr from-purple-700 to-pink-500 text-white px-6 py-2 rounded transition-all duration-300 group-hover:px-12'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default VPSProductCard;
