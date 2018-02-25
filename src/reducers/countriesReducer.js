import merge from "lodash/merge";
import { RECEIVE_COUNTRIES } from "../actions/countryActions";
import { RECEIVE_CURRENT_USER } from "../actions/authActions";

const countriesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COUNTRIES:
      return merge({}, state, action.countries);
    case RECEIVE_CURRENT_USER:
      if (action.payload.countries) {
        return action.payload.countries;
      } else {
        return merge({}, state);
      }
    default:
      return merge({}, state);
  }
};

export default countriesReducer;
