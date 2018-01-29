import merge from "lodash/merge";
import { RECEIVE_CURRENT_USER } from "../actions/auth_actions";

const defaultState = {
  currentUser: null
};

const authReducer = (state = defaultState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = merge(newState, action.user);
      return newState;
    default:
      return newState;
  }
};

export default authReducer;
