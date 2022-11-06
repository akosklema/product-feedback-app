import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { updateLoggedInUser, updateLoggedInUserImage } from '../../redux/actions/user';
import configData from '../../config';

import Form from '../UI/form-components/Form';
import InputLabel from '../UI/form-components/InputLabel';
import TextInput from '../UI/form-components/TextInput';
import FileInput from '../UI/form-components/FileInput';
import { H4 } from '../UI/headers';
import { Button1 } from '../UI/buttons';
import ProfileImg from '../UI/ProfileImg';
import CameraSVG from '../SVGs/CameraSVG';
import Modal from '../UI/Modal';

import placeholderImage from '../../images/placeholder/placeholder.png';

import classes from './UserProfileForm.module.css';

function UserProfileForm({ loggedInUser }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modal, setModal] = useState(false);

  const {
    value: fullname,
    errorMessage: fullnameError,
    checkValueIsEmpty: checkFullnameIsEmpty,
    valueChangeHandler: fullnameChangeHandler,
    resetField: resetFullnameField
  } = useInput(loggedInUser.fullname);

  const {
    value: username,
    errorMessage: usernameError,
    checkValueIsEmpty: checkUsernameIsEmpty,
    valueChangeHandler: usernameChangeHandler,
    resetField: resetUsernameField
  } = useInput(loggedInUser.username);

  const {
    value: password,
    errorMessage: passwordError,
    checkValueIsEmpty: checkPasswordIsEmpty,
    valueChangeHandler: passwordChangeHandler,
    resetField: resetPasswordField
  } = useInput('');

  const dispatch = useDispatch();

  const updateUserHandler = (event) => {
    event.preventDefault();

    const newFullname = fullname.trim() === '' ? loggedInUser.fullname : fullname;
    const newUsername = username.trim() === '' ? loggedInUser.username : username;

    if (imageFile) {
      dispatch(updateLoggedInUserImage(imageFile));
    }

    dispatch(updateLoggedInUser(newFullname, newUsername, password))
      .then(() => {
        setModal(true);
      })
      .catch((error) => console.log(error.message))
      .finally(() => resetPasswordField());
  };

  const selectFile = (event) => {
    const img = event.target.files[0];
    const nameStringArray = img.name.split('.');
    const extension = nameStringArray[nameStringArray.length - 1];

    if (!['jpg', 'jpeg', 'png'].includes(extension)){
      return console.log('The image file has to be jpg, jpeg or png!');
    }

    setImagePreview(URL.createObjectURL(img));
    setImageFile({ file: img, name: `${loggedInUser.id}.${extension}` });
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Fragment>
      {
      modal &&
        <Modal
          handleClick={closeModal}
          buttonText="OK"
        >
          Your profile is successfully updated.
        </Modal>
      }
      <Form submitHandler={updateUserHandler} className={classes['form']}>
        <div className={classes['image-container']}>
          <ProfileImg
            className={classes['profile-img']}
            src={imagePreview ||
              (loggedInUser.profileImageUrl !==
                '' ?
                `${configData.SERVER_URL}/${loggedInUser.profileImageUrl}` :
                placeholderImage)}
          />
          <FileInput className={classes['file-input']} onChangeHandler={selectFile}>
            <CameraSVG className={classes['camera-icon']} />
          </FileInput>
        </div>
        <div>
          <InputLabel id="name">
            <H4 className={classes['label-header']}>Full name</H4>
          </InputLabel>
          <TextInput
            value={fullname}
            errorMessage={fullnameError}
            changeHandler={fullnameChangeHandler}
            className={classes['form-input']}
            id="name"
          />
        </div>
        <div>
          <InputLabel id="username">
            <H4 className={classes['label-header']}>Username</H4>
          </InputLabel>
          <TextInput
            value={username}
            errorMessage={usernameError}
            changeHandler={usernameChangeHandler}
            className={classes['form-input']}
            id="username"
          />
        </div>
        <div>
          <InputLabel id="password">
            <H4 className={classes['label-header']}>Password</H4>
          </InputLabel>
          <TextInput
            type="password"
            value={password}
            errorMessage={passwordError}
            changeHandler={passwordChangeHandler}
            className={classes['form-input']}
            id="password"
          />
        </div>
        
        <div className={classes['button-container']}>
          <Button1 className={classes['btn--add-feedback']}>Save Changes</Button1>
        </div>
      </Form>
    </Fragment>
  );
};

export default UserProfileForm;