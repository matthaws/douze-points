import { combineReducers } from "redux";
import auth from "./authReducer";
import scoresheets from "./scoresheetReducer";
import contests from "./contests_reducer";
import users from "./usersReducer";
import entries from "./entries_reducers";

export default combineReducers({
  auth,
  users,
  scoresheets,
  contests,
  entries
});
