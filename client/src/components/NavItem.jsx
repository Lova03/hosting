import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { selectNavbarOpened, toggleNavbar } from '../features/controls/controlsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import ReactDOM from 'react-dom';

function NavItem({ Icon, name = 'Unknown teleport', to = '/', textSize = 'text-base' }) {
  const dispatch = useDispatch();
  const opened = useSelector(selectNavbarOpened);
  const [showTooltip, setShowTooltip] = useState(false);
  const iconRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = () => {
    if (!opened && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + window.scrollY + rect.height / 2 - 10,
        left: rect.left + window.scrollX + rect.width + 8,
      });
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    dispatch(toggleNavbar(false));
  };

  const TooltipPortal = ({ children }) =>
    ReactDOM.createPortal(children, document.getElementById('portal-root'));

  return (
    <NavLink
      draggable={false}
      to={to}
      end
      onClick={handleClick}
      className='navitem text-slate-200 group'>
      <div
        ref={iconRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='navitem-icon peer group relative'>
        {Icon ? <Icon className='h-5 w-5' /> : <CubeTransparentIcon className='h-5 w-5' />}
      </div>
      {showTooltip && !opened && (
        <TooltipPortal>
          <div
            className='absolute z-50 py-1.5 px-3 rounded-md text-sm animate-fade-in bg-english-violet-850 shadow-lg text-slate-200'
            style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}>
            {name}
          </div>
        </TooltipPortal>
      )}
      <div className={`${opened ? 'flex' : 'hidden'} navitem-text ${textSize}`}>
        <span className='whitespace-nowrap'>{name}</span>
      </div>
    </NavLink>
  );
}

export default NavItem;
