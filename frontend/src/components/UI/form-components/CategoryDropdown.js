import { useEffect } from 'react';

import useDropdown from '../../../hooks/useDropdown';

import DropdownMenu from '../DropdownMenu';
import DropdownInputHeader from './DropdownInputHeader';
import DropdownContentContainer from '../DropdownContentContainer';
import DropdownOption from '../DropdownOption';

import classes from './DropdownInput.module.css';

function CategoryDropdown({ value, className, setValueHandler }) {
  const { isDropdownActive, dropdownActivateHandler, selectedOption, selectOptionHandler, ref } = useDropdown(value);

  useEffect(() => {
    setValueHandler(selectedOption);
  }, [selectedOption, setValueHandler]);

  return (
    <DropdownMenu className={className} ref={ref}>
      <DropdownInputHeader
        activeField={selectedOption}
        active={isDropdownActive}
        clickHandler={dropdownActivateHandler}
      />
      <DropdownContentContainer
        className={classes['dropdown-container']}
        activeField={selectedOption}
        selectOptionHandler={selectOptionHandler}
        isDropdownActive={isDropdownActive}
      >
        <DropdownOption label="Feature" />
        <DropdownOption label="UI" />
        <DropdownOption label="UX" />
        <DropdownOption label="Enhancement" />
        <DropdownOption label="Bug" />
      </DropdownContentContainer>
    </DropdownMenu>
  );
};

export default CategoryDropdown;