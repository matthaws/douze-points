import { backendUrl } from "./constants";

export const fetchCountries = async () => {
  const response = await fetch(`${backendUrl}/countries`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
};

export const fetchCountry = async (countryId) => {
  const response = await fetch(`${backendUrl}/countries/${countryId}`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
}
