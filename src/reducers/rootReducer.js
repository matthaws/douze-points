import { combineReducers } from "redux";
import auth from "./authReducer";
import scoresheets from './scoresheetReducer';

export default combineReducers({
  auth,
  scoresheets,
});
