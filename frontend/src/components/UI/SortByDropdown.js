import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useDropdown from '../../hooks/useDropdown';
import { setSort } from '../../redux/actions/sort';

import DropdownMenu from './DropdownMenu';
import DropdownHeaderSortBy from './DropdownHeaderSortBy';
import DropdownContentContainer from './DropdownContentContainer';
import DropdownOption from './DropdownOption';

import classes from './SortByDropdown.module.css';

function SortByDropdown() {
  const { isDropdownActive, dropdownActivateHandler, selectedOption, selectOptionHandler, ref } = useDropdown('Most Upvotes');

  const dispatch = useDispatch();

  useEffect(() => {
    switch (selectedOption) {
      case 'Most Upvotes':
        return dispatch(setSort('upvotesCount', false));
      
      case 'Least Upvotes':
        return dispatch(setSort('upvotesCount', true));
      
      case 'Most Comments':
        return dispatch(setSort('commentsCount', false));
      
      case 'Least Comments':
        return dispatch(setSort('commentsCount', true));
      
      default:
        return dispatch(setSort('upvotesCount', false));
    }
  }, [selectedOption, dispatch]);

  return (
    <DropdownMenu ref={ref}>
      <DropdownHeaderSortBy
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
        <DropdownOption label="Most Upvotes" />
        <DropdownOption label="Least Upvotes" />
        <DropdownOption label="Most Comments" />
        <DropdownOption label="Least Comments" />
      </DropdownContentContainer>
    </DropdownMenu>
  );
};

export default SortByDropdown;