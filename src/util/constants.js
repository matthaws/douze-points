export const backendUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://douze-points-api.herokuapp.com/";

export const appId =
  process.env.NODE_ENV !== "production"
    ? "196365761124034"
    : "312658112474450"

export const authUrl = `${backendUrl}/auth`;
// this for requests to backend

export const authHeaders = () => {
  if (sessionStorage.getItem("token")) {
    return {
      Authorization: `bearer ${sessionStorage.getItem("token")}`
    };
  } else {
    return null;
  }
};
