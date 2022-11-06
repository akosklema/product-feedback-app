import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import feedbackListReducer from './reducers/feedbackList';
import oneFeedbackReducer from './reducers/oneFeedback';
import sortReducer from './reducers/sort';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  feedbackList: feedbackListReducer,
  feedback: oneFeedbackReducer,
  sort: sortReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

export default store;