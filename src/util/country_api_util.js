import { backendUrl } from "./constants";

export const fetchCountries = async () => {
  const response = await fetch(`${backendUrl}/countries`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
};
