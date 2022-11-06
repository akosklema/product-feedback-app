import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { createComment } from '../../redux/actions/oneFeedback';

import Form from '../UI/form-components/Form';
import TextAreaInput from '../UI/form-components/TextAreaInput';
import InputLabel from '../UI/form-components/InputLabel';
import { H3 } from '../UI/headers';
import { Button1 } from '../UI/buttons';

import classes from './AddCommentForm.module.css';

function AddCommentForm({ className, loggedInUser, feedback }) {
  const dispatch = useDispatch();

  const {
    value: comment,
    errorMessage: commentError,
    checkValueIsEmpty: checkcommentIsEmpty,
    valueChangeHandler: commentChangeHandler,
    resetField: resetCommentField,
    setErrorMessage: setCommentErrorMessage
  } = useInput('');

  const addCommentHandler = (event) => {
    event.preventDefault();

    if (checkcommentIsEmpty()) {
      return setCommentErrorMessage(`Can't be empty`);
    }

    dispatch(createComment(feedback, comment, loggedInUser))
      .then()
      .catch((error) => console.log(error.message));

    resetCommentField();
  }

  return (
    <Form className={className} submitHandler={addCommentHandler}>
      <H3 className={classes['add-comment-title']}>
        <InputLabel id="comment">Add Comment</InputLabel>
      </H3>
      <TextAreaInput
        className={classes['text-area']}
        id="comment"
        value={comment}
        changeHandler={commentChangeHandler}
        errorMessage={commentError}
        placeholder="Type your comment here"
        rows="2"
        maxLength="250"
      />
      <div className={classes['btn-container']}>
        <p className={classes['characters-left']}>{250 - comment.length} Characters left</p>
        <Button1 className={classes['post-comment-button']}>Post Comment</Button1>
      </div>
    </Form>
  );
};

export default AddCommentForm;