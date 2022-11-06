import Comment from './Comment';

import classes from './CommentWithReply.module.css';

function CommentWithReply({ commentData, loggedInUser, feedback }) {
  return (
    <div className={classes['container']}>
      <Comment
        data={commentData}
        className={classes['comment']}
        feedback={feedback}
        loggedInUser={loggedInUser}
      />
      {
        commentData.replies.length !== 0 &&
        <div className={classes['reply-container']}>
        {
          commentData.replies.map(replyData => {
            return (
              <Comment
                key={replyData._id}
                data={replyData}
                commentData={commentData}
                reply={true}
                className={classes['reply']}
                feedback={feedback}
                loggedInUser={loggedInUser}
              />
            );
          })
        }
        </div>
      }
    </div>
  );
};

export default CommentWithReply;