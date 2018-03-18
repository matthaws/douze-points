import { fetchCountries, fetchCountry } from "../util/country_api_util";
export const RECEIVE_COUNTRIES = "RECEIVE_COUNTRIES";
export const RECEIVE_COUNTRY = "RECEIVE_COUNTRY";

export const receiveCountries = ({ countries }) => ({
  type: RECEIVE_COUNTRIES,
  countries
});

export const receiveCountry = (payload) => ({
  type: RECEIVE_COUNTRY,
  payload
})

export const fetchAllCountries = () => async dispatch => {
  const payload = await fetchCountries();
  dispatch(receiveCountries(payload));
};

export const fetchCountryDetails = (countryId) => async dispatch => {
  const payload = await fetchCountry(countryId);
  dispatch(receiveCountry(payload));
}
