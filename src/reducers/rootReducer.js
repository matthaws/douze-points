import { combineReducers } from "redux";
import auth from "./authReducer";
import scoresheets from './scoresheetReducer';
import contests from './contests_reducer';
import users from './usersReducer';

export default combineReducers({
  auth,
  users,
  scoresheets,
  contests
});
