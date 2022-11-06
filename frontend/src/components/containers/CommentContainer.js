import CommentWithReply from '../UI/CommentWithReply';

function CommentContainer({ feedback, loggedInUser }) {
  return (
    <div>
      {
        feedback.comments.map(comment => {
          return (
            <CommentWithReply
              key={comment._id}
              commentData={comment}
              feedback={feedback}
              loggedInUser={loggedInUser}
            />
          );
        })
      }
    </div>
  );
};

export default CommentContainer;