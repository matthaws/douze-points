import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from '../reducers/rootReducer';

const initialState = {
auth: {
  currentUser: null
  }
}
// All your other state
const configureStore = (preloadedState = initialState) => (
  createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;
