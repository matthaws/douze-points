import merge from "lodash/merge";
import { RECEIVE_CONTEST, RECEIVE_CONTESTS } from "../actions/contest_actions";
import { RECEIVE_ENTRY } from "../actions/entryActions";
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
    case RECEIVE_ENTRY:
      const { entry } = action.payload;
      newState[entry.id] = entry;
      return newState;
    case RECEIVE_CONTESTS:
      let winningEntries = Object.keys(action.payload.contests).map( (contest) => {
        return action.payload.contests[contest].winning_entry;
      });
      newState = merge({}, state, winningEntries);
      return newState;
    default:
      return newState;
  }
};

export default entriesReducer;
