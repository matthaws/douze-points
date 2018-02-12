import { APIUrl } from "./constants";

export const fetchContest = async year => {
  const response = await fetch(`${APIUrl}/contests/${year}`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
};
