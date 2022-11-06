import FeedbackCard from '../cards/FeedbackCard';

function SuggestionContainer({ suggestions, clickable, navigate, loggedInUser }) {
  return (
    suggestions.map(suggestion => {
      return (
        <FeedbackCard
          key={suggestion._id}
          feedback={suggestion}
          clickable={clickable}
          clickHandler={() => navigate(`/feedbacks/${suggestion._id}`)}
          loggedInUser={loggedInUser}
        />
      );
    })
  );
};

export default SuggestionContainer;