import { combineReducers } from "redux";
import { reduxTokenAuthReducer } from 'redux-token-auth';

export default combineReducers({
  auth: reduxTokenAuthReducer
});
