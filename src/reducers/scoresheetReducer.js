import merge from 'lodash/merge';
import { RECEIVE_SCORESHEET, RECEIVE_SCORESHEETS, REMOVE_SCORESHEET } from '../actions/scoresheet_actions';

const defaultState = {
};

const scoresheetReducer = (state = defaultState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SCORESHEET:
      newState = merge({}, state, action.payload.scoresheet);
      return newState;
    case RECEIVE_SCORESHEETS:
      newState = action.payload.scoresheets;
      return newState;
    case REMOVE_SCORESHEET:
      delete newState[action.scoresheetId];
      return newState;
    default:
      return newState;
  }
};

export default scoresheetReducer;
