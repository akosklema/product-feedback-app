import { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/useInput';
import { createReply } from '../../redux/actions/oneFeedback';
import configData from '../../config';

import { H4 } from './headers';
import { ReplyButton } from './buttons';
import { Body2 } from './paragraphs';
import TextAreaInput from './form-components/TextAreaInput';
import { Button1 } from './buttons';
import ProfileImg from './ProfileImg';

import placeholderImage from '../../images/placeholder/placeholder.png';

import classes from './Comment.module.css';

function Comment({ data, commentData = null, feedback, reply = false, className, loggedInUser }) {
  const [isReplyActive, setIsReplyActive] = useState(false);

  const author = data.author;

  const dispatch = useDispatch();
  const textareaEl = useRef();

  const {
    value: replyContent,
    errorMessage: replyError,
    checkValueIsEmpty: checkReplyContentIsEmpty,
    valueChangeHandler: replyContentChangeHandler,
    resetField: resetReplyContentField,
    setErrorMessage: setReplyErrorMessage,
  } = useInput('');

  useEffect(() => {
    if (isReplyActive) {
      textareaEl.current.focus();
    }

    if (!isReplyActive) {
      setReplyErrorMessage(null);
    }
  }, [isReplyActive, setReplyErrorMessage]);

  let content = data.content;

  if (reply) {
    content = (
      <Fragment>
        <span className={classes['replying-to']}>
          @{data.replyTo.username}
        </span>
        &nbsp;
        {data.content}
      </Fragment>
    );
  }

  const showReplyInputHandler = () => {
    setIsReplyActive(state => !state);
  };

  const createReplyHandler = () => {

    if(checkReplyContentIsEmpty()) {
      return setReplyErrorMessage(`Can't be empty`);
    }

    let replyToComment;
    if (reply) {
      replyToComment = commentData;
    } else {
      replyToComment = data;
    }

    dispatch(createReply(replyToComment._id, replyContent, author))
      .then()
      .catch((error) => console.log(error.message));

    resetReplyContentField();
    setIsReplyActive(false);
  }

  return (
    <div className={`${classes['comment-container']} ${reply ? classes['reply'] : classes['comment']} ${className}`}>
      <ProfileImg
        className={classes['profile-img']}
        src={author.profileImageUrl !== '' ? `${configData.SERVER_URL}/${author.profileImageUrl}` : placeholderImage}
      />
      <div className={classes['names']}>
        <H4 className={classes['author-name']}>{author.fullname}</H4>
        <p className={classes['author-username']}>@{author.username}</p>
      </div>
      <Body2 className={classes['content']}>
        {content}
      </Body2>
      <ReplyButton
        className={classes['button-reply']}
        clickHandler={showReplyInputHandler}
      >
          Reply
      </ReplyButton>
      <div
        className={`${classes['reply-container']} ${isReplyActive ? classes['reply-container--active'] : ''}`}
      >
        <TextAreaInput
          className={`${classes['reply-textarea-input']} ${reply && classes['textarea-for-reply']}`}
          placeholder="Type your reply here"
          value={replyContent}
          changeHandler={replyContentChangeHandler}
          errorMessage={replyError}
          maxLength="250"
          ref={textareaEl}
        />
        <Button1 className={classes['post-reply-button']} clickHandler={createReplyHandler}>
          Post Reply
        </Button1>
      </div>
    </div>
  );
};

export default Comment;