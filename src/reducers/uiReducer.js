import merge from "lodash/merge";
import { START_SPINNER, END_SPINNER, SET_SORT_FILTER, SET_DISPLAY_SCORESHEET } from "../actions/uiActions";

const defaultState = {
  spinner: false,
  displayId: null,
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
    case SET_DISPLAY_SCORESHEET:
      newState.displayId = action.displayId;
      return newState;
    default:
      return newState;
  }
};

export default uiReducer;
