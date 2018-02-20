import merge from "lodash/merge";
import { RECEIVE_CONTEST, RECEIVE_CONTESTS } from "../actions/contest_actions";
import { RECEIVE_ENTRY } from "../actions/entryActions";

const contestsReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CONTESTS:
      newState = merge({}, action.payload);
      return newState;
    case RECEIVE_CONTEST:
      newState = merge({}, newState, {
        [action.payload.contest.year]: action.payload.contest
      });
      return newState;
    case RECEIVE_ENTRY:
      const { contest } = action.payload;
      newState[contest.id] = contest;
      return newState;
    default:
      return newState;
  }
};

export default contestsReducer;
