import merge from "lodash/merge";
import { RECEIVE_CONTEST } from "../actions/contest_actions"


const contestsReducer = (state = {}, action) => {
  let newState = merge({}, state)
  switch (action.type) {
    case RECEIVE_CONTEST:
      newState = merge({}, newState, {[action.payload.contest.id]: action.payload.contest})
      return newState
    default:
      return newState
  }
}

export default contestsReducer
