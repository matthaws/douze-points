import { combineReducers } from "redux";
import auth from "./authReducer";
import users from "./usersReducer";

export default combineReducers({
  auth,
  users,
});
