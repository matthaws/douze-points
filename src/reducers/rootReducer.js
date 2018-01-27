import { combineReducers } from "redux";
import { authStateReducer } from "redux-auth";

export default combineReducers({
  auth: authStateReducer
});
