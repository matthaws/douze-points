import { backendUrl } from "./constants";

export const fetchContest = async year => {
  const response = await fetch(`${backendUrl}/contests/${year}`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
};
