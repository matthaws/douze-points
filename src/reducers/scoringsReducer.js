import merge from 'lodash/merge';
import { RECEIVE_SCORESHEET } from '../actions/scoresheet_actions';
import { RECEIVE_SCORING } from '../actions/scoringActions';

const defaultState = {
};

const scoringsReducer = (state = defaultState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SCORING:
      newState[action.payload.id] = action.payload;
      return newState;
    case RECEIVE_SCORESHEET:
      newState = merge({}, state, action.payload.scorings);
      return newState;
    default:
      return newState;
  }

};

export default scoringsReducer;
