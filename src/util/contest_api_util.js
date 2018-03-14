import { backendUrl } from "./constants";

export const fetchContest = async year => {
  const response = await fetch(`${backendUrl}/contests/${year}`, {
    method: "GET"
  });
  const payload = await response.json();
  return payload;
};

export const fetchContests = async () => {
  const response = await fetch(`${backendUrl}/contests`, {
    method: 'GET'
  })
  const payload = await response.json()
  return payload
}
