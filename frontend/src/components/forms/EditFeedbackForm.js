import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { updateFeedback, deleteFeedback } from '../../redux/actions/oneFeedback';

import Form from '../UI/form-components/Form';
import InputLabel from '../UI/form-components/InputLabel';
import TextInput from '../UI/form-components/TextInput';
import TextAreaInput from '../UI/form-components/TextAreaInput';
import CategoryDropdown from '../UI/form-components/CategoryDropdown';
import StatusDropdown from '../UI/form-components/StatusDropdown';
import { H1, H4 } from '../UI/headers';
import { Button1, Button3, Button4 } from '../UI/buttons';

import classes from './CreateFeedbackForm.module.css';

function EditFeedbackForm({ feedback }) {
  const [category, setCategory] = useState(feedback.category);
  const [status, setStatus] = useState(feedback.status);

  const {
    value: title,
    errorMessage: titleError,
    checkValueIsEmpty: checkTitleIsEmpty,
    valueChangeHandler: titleChangeHandler,
    resetField: resetTitleField,
    setErrorMessage: setTitleErrorMessage
  } = useInput(feedback.title);

  const {
    value: description,
    errorMessage: descriptionError,
    checkValueIsEmpty: checkDescriptionIsEmpty,
    valueChangeHandler: descriptionChangeHandler,
    resetField: resetDescriptionField,
    setErrorMessage: setDescriptionErrorMessage
  } = useInput(feedback.detail);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setCategoryValueHandler = (value) => {
    setCategory(value);
  };

  const setStatusValueHandler = (value) => {
    setStatus(value);
  };

  const updateFeedbackHandler = (event) => {
    event.preventDefault();

    const titleEmpty = checkTitleIsEmpty();
    const descriptionEmpty = checkDescriptionIsEmpty();

    if (titleEmpty || descriptionEmpty) {
      if (titleEmpty) {
        setTitleErrorMessage(`Can't be empty`);
      }

      if (descriptionEmpty) {
        setDescriptionErrorMessage(`Can't be empty`);
      }

      return;
    }

    dispatch(updateFeedback(feedback._id, title, category, status, description))
      .then(() => {
        console.log('Feedback updated');
        navigate(`/feedbacks/${feedback._id}`)
      })
      .catch((error) => console.log(error.message));
  };

  const deleteFeedbackHandler = (event) => {
    event.preventDefault();

    dispatch(deleteFeedback(feedback._id))
      .then(() => {
        console.log('Feedback deleted');
        navigate('/suggestions');
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <Form className={classes['form']} submitHandler={updateFeedbackHandler}>
      <H1>Editing '{feedback.title}'</H1>
      <div>
        <InputLabel id="title">
          <H4 className={classes['label-header']}>Feedback Title</H4>
          <p className={classes['description']}>
            Add a short, descriptive headline
          </p>
        </InputLabel>
        <TextInput
          className={classes['form-input']}
          id="title"
          value={title}
          changeHandler={titleChangeHandler}
          errorMessage={titleError}
        />
      </div>
      <div>
        <InputLabel id="category">
          <H4 className={classes['label-header']}>Category</H4>
          <p className={classes['description']}>
            Choose a category for your feedback
          </p>
        </InputLabel>
        <CategoryDropdown
          value={category}
          className={classes['form-input']}
          setValueHandler={setCategoryValueHandler}
        />
      </div>
      <div>
        <InputLabel id="status">
          <H4 className={classes['label-header']}>Update Status</H4>
          <p className={classes['description']}>
            Change feature state
          </p>
        </InputLabel>
        <StatusDropdown
          value={status}
          className={classes['form-input']}
          setValueHandler={setStatusValueHandler}
        />
      </div>
      <div>
        <InputLabel id="detail">
          <H4 className={classes['label-header']}>Feedback Detail</H4>
          <p className={classes['description']}>
            Include any specific comments on what should be improved, added, etc.
          </p>
        </InputLabel>
        <TextAreaInput
          className={classes['form-input']}
          id="detail"
          rows="4"
          value={description}
          changeHandler={descriptionChangeHandler}
          errorMessage={descriptionError}
        />
      </div>
      <div className={classes['button-container']}>
        <Button1 className={classes['btn--add-feedback']}>Edit Feedback</Button1>
        <Button3 className={classes['btn--add-cancel']} clickHandler={(event) => {
          event.preventDefault();
          navigate(`/${feedback.id}`)
        }}>
          Cancel
        </Button3>
        <Button4 className={classes['btn--add-delete']} clickHandler={deleteFeedbackHandler}>Delete</Button4>
      </div>
    </Form>
  );
};

export default EditFeedbackForm;