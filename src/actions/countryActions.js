import { fetchCountries } from "../util/country_api_util";
export const RECEIVE_COUNTRIES = "RECEIVE_COUNTRIES";

export const receiveCountries = ({ countries }) => ({
  type: RECEIVE_COUNTRIES,
  countries
});

export const fetchAllCountries = () => async dispatch => {
  const payload = await fetchCountries();
  dispatch(receiveCountries(payload));
};
