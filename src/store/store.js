import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/rootReducer';

const initialState = {
auth: {
    currentUser: null
  },
};
// All your other state
const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const configureStore = (preloadedState = initialState) => (
  createStore(RootReducer, preloadedState, applyMiddleware(...middlewares))
);
export default configureStore;
