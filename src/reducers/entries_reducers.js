import merge from "lodash/merge";
import { RECEIVE_CONTEST } from "../actions/contest_actions";
import { RECEIVE_SCORESHEET } from "../actions/scoresheet_actions";

const entriesReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CONTEST:
      newState = merge({}, state, action.payload.entries);
      return newState;
    case RECEIVE_SCORESHEET:
      newState = merge({}, state, action.payload.entries);
      return newState;
    default:
      return newState;
  }
};

export default entriesReducer;
