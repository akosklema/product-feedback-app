import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';

import { createFeedback } from '../../redux/actions/oneFeedback';

import Form from '../UI/form-components/Form';
import InputLabel from '../UI/form-components/InputLabel';
import TextInput from '../UI/form-components/TextInput';
import TextAreaInput from '../UI/form-components/TextAreaInput';
import CategoryDropdown from '../UI/form-components/CategoryDropdown';
import { H1, H4 } from '../UI/headers';
import { Button1, Button3 } from '../UI/buttons';

import classes from './CreateFeedbackForm.module.css';

function CreateFeedbackForm() {
  const {
    value: title,
    errorMessage: titleError,
    checkValueIsEmpty: checkTitleIsEmpty,
    valueChangeHandler: titleChangeHandler,
    resetField: resetTitleField
  } = useInput('');

  const [category, setCategory] = useState('Feature');

  const {
    value: detail,
    errorMessage: detailError,
    checkValueIsEmpty: checkDetailIsEmpty,
    valueChangeHandler: detailChangeHandler,
    resetField: resetDetailField
  } = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createFeedbackHandler = (event) => {
    event.preventDefault();

    const titleEmpty = checkTitleIsEmpty('Title');
    const detailEmpty = checkDetailIsEmpty('Detail');

    if(titleEmpty || detailEmpty) {
      return;
    }

    dispatch(createFeedback(title, detail, category))
      .then(() => {
        console.log('Feedback created');
        navigate('/suggestions');
      })
      .catch((error) => console.log(error.message));

    resetTitleField();
    setCategory('Feature');
    resetDetailField();
  }

  const setCategoryValueHandler = (value) => {
    setCategory(value);
  }

  const cancelHandler = (event) => {
    event.preventDefault();
    navigate('/suggestions');
  };

  return (
    <Form className={classes['form']} submitHandler={createFeedbackHandler}>
      <H1>Create New Feedback</H1>
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
          value={detail}
          changeHandler={detailChangeHandler}
          errorMessage={detailError}
        />
      </div>
      <div className={classes['button-container']}>
        <Button1 className={classes['btn--add-feedback']}>Add Feedback</Button1>
        <Button3 className={classes['btn--add-cancel']} clickHandler={cancelHandler}>Cancel</Button3>
      </div>
    </Form>
  );
};

export default CreateFeedbackForm;