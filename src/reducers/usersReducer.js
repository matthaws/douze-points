import merge from "lodash/merge";
import { RECEIVE_USER } from "../actions/userActions";

const usersReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_USER:
      const { user } = action;
      newState[user.id] = user;
      return newState;
    default:
      return newState;
  }
};

export default usersReducer;
