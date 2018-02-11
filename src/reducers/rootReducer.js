import { combineReducers } from "redux";
import auth from "./authReducer";
import scoresheets from './scoresheetReducer';
import users from './usersReducer';

export default combineReducers({
  auth,
  users,
  scoresheets,
});
