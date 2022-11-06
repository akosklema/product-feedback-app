import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_PW_REQUEST,
  RESET_PW_SUCCESS,
  RESET_PW_FAIL,
  LOGOUT
} from "../actions/types";

const jwt = JSON.parse(localStorage.getItem('jwt'));

const initialState = jwt ?
  { isAuthenticated: true, isLoading: false, error: false } :
  { isAuthenticated: false, isLoading: false, error: false };

function authReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    
    case SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true
      };
    
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: true
      };
    
    case RESET_PW_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case RESET_PW_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    
    case RESET_PW_FAIL:
      return {
        ...state,
        isLoading: false
      }

    case LOGOUT: 
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    
    default:
      return state;
    }
};

export default authReducer;