import { APIUrl } from "./constants";

export const fetchCountries = async () => {
  const response = await fetch(`${APIUrl}/countries`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
};
