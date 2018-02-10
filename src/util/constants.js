export const backendUrl = "http://localhost:3000/";
export const authUrl = "http://localhost:3000/auth";
// this for requests to backend

export const APIUrl = "http://localhost:3000/";

export const authHeaders = () => {
  if (localStorage.getItem('token')) {
    return {
      'Authorization': localStorage.getItem('token')
    };
  } else {
    return null;
  }
};
