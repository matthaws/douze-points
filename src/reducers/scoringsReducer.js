import merge from 'lodash/merge';
import { RECEIVE_SCORESHEET } from '../actions/scoresheet_actions';

const defaultState = {
};

const scoringsReducer = (state = defaultState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_SCORESHEET:
      newState = merge({}, state, action.payload.scorings);
      return newState;
    default:
      return newState;
  }

};

export default scoringsReducer;
