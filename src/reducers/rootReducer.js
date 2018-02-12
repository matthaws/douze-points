import { combineReducers } from "redux";
import auth from "./authReducer";
<<<<<<< HEAD
import scoresheets from './scoresheetReducer';
import users from './usersReducer';
=======
import scoresheets from "./scoresheetReducer";
import contests from "./contests_reducer";
import users from "./usersReducer";
import entries from "./entries_reducers";
>>>>>>> 64e48313a498600deae9cb0b6f592f4ddf182576

export default combineReducers({
  auth,
  users,
  scoresheets,
  contests,
  entries
});
