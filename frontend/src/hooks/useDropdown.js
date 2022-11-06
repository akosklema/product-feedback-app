import { useState, useEffect, useRef } from 'react';

function useDropdown(defaultState) {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultState);

  const ref = useRef();

  const dropdownActivateHandler = (event) => {
    event.preventDefault();
    setIsDropdownActive(prevState => !prevState);
  };

  const selectOptionHandler = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const isClickOutside = (event) => {
      if (isDropdownActive && ref.current && !ref.current.contains(event.target)) {
        setIsDropdownActive(false);
      }
    }

    document.addEventListener('mousedown', isClickOutside);

    return () => {
      document.removeEventListener('mousedown', isClickOutside);
    };
  }, [isDropdownActive]);

  return {
    isDropdownActive,
    dropdownActivateHandler,
    selectedOption,
    selectOptionHandler,
    ref
  };
};

export default useDropdown;