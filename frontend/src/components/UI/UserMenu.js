import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useDropdown from '../../hooks/useDropdown';
import { logout } from '../../redux/actions/auth';
import configData from '../../config';

import DownArrow from '../SVGs/DownArrow';
import ProfileImg from '../UI/ProfileImg';

import placeholderImage from '../../images/placeholder/placeholder.png';

import classes from './UserMenu.module.css';

function UserMenu({ loggedInUser }) {
  const { isDropdownActive, dropdownActivateHandler, ref } = useDropdown();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <div ref={ref} className={classes['user-menu-container']}>
      <button className={classes['user-header']} onClick={dropdownActivateHandler}>
        <div className={classes['user-name-container']}>
          <p className={classes['user-name']}>{loggedInUser.fullname}</p>
          <DownArrow className={`${classes['down-arrow']} ${isDropdownActive ? classes['animate-arrow-up'] : null}`} />
        </div>
        <ProfileImg
          className={classes['profile-img']}
          src={loggedInUser.profileImageUrl !== '' ? `${configData.SERVER_URL}/${loggedInUser.profileImageUrl}` : placeholderImage}
        />
      </button>
      <ul className={`${classes['user-menu']} ${isDropdownActive ? classes['user-menu--active'] : null}`}>
        <li onClick={() => navigate(`/user-settings`)}>Settings</li>
        <li onClick={logoutHandler}>Logout</li>
      </ul>
    </div>
  );
};

export default UserMenu;