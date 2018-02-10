import { APIUrl, authHeaders } from "./constants";

export const fetchUser = async userId => {
  const response = await fetch(`${APIUrl}/users/${userId}`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
};
