import merge from "lodash/merge";
import { RECEIVE_CURRENT_USER, SIGN_OUT_USER } from "../actions/auth_actions";

const defaultState = {
  currentUser: null
};

const authReducer = (state = defaultState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState.currentUser = action.payload.user;
      localStorage.setItem("token", action.payload.auth_token);
      return newState;
    case SIGN_OUT_USER:
      localStorage.removeItem("token");
      return { currentUser: null };
    default:
      return newState;
  }
};

export default authReducer;
