import {
  CREATE_USER,
  GET_LOGGED_IN_USER_REQUEST,
  GET_LOGGED_IN_USER_SUCCESS,
  GET_LOGGED_IN_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_IMAGE
} from '../actions/types';

const initialState = {
  isLoading: false,
  loaded: false,
  loggedInUser: null,
  otherUser: null,
  error: false
}

function userReducer(state = initialState, { type, payload }) {
  let updatedUser;
  switch (type) {
    case CREATE_USER:
      return {
        ...state
      };
    
    case GET_LOGGED_IN_USER_REQUEST:
      return {
        ...state,
        loaded: false,
        isLoading: true,
        loggedInUser: null
      }
    
    case GET_LOGGED_IN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        loggedInUser: payload.user
      }
    
    case GET_LOGGED_IN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true
      }
    
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    
    case UPDATE_USER_SUCCESS:
      updatedUser = {
        ...state.loggedInUser,
        fullname: payload.fullname,
        username: payload.username,
      }
      return {
        ...state,
        isLoading: false,
        loggedInUser: updatedUser
      }
    
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true
      }

    case UPDATE_USER_IMAGE:
      updatedUser = {
        ...state.loggedInUser,
        profileImageUrl: payload.profileImageUrl
      }
      return {
        ...state,
        loggedInUser: updatedUser
      }
    
    default:
      return state;
  }
};

export default userReducer;