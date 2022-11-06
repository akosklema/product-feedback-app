import { SET_SORT } from '../actions/types';

const initialState = {
  sortBy: 'Upvotes',
  ascending: true
};

function sortReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_SORT:
      return {
        ...state,
        sortBy: payload.sortBy,
        ascending: payload.ascending
      };
    
    default:
      return state;
  }
};

export default sortReducer;