import merge from "lodash/merge";
import { START_SPINNER, END_SPINNER, SET_SORT_FILTER } from "../actions/uiActions";

const defaultState = {
  spinner: false
};

const uiReducer = (state = defaultState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case START_SPINNER:
      newState.spinner = true;
      return newState;
    case END_SPINNER:
      newState.spinner = false;
      return newState;
    case SET_SORT_FILTER:
      newState.sortBy = action.sortBy;
      return newState;
    default:
      return newState;
  }
};

export default uiReducer;
