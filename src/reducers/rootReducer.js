import { combineReducers } from "redux";
import auth from "./authReducer";
import scoresheets from "./scoresheetReducer";
import contests from "./contests_reducer";
import users from "./usersReducer";
import entries from "./entries_reducers";
import countries from "./countriesReducer";
import scorings from "./scoringsReducer";
import ui from "./uiReducer";

export default combineReducers({
  auth,
  users,
  scoresheets,
  contests,
  entries,
  countries,
  scorings,
  ui
});
