import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from '../reducers/rootReducer';

const initialState = {
auth: {
  currentUser: {
    isLoading: false,
    isSignedIn: false,
    attributes: {
      username: null,
      name: null,
      imageUrl: null,
      bio: null
    },
  },
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
