export const backendUrl = "http://localhost:3000/";
export const authUrl = "http://localhost:3000/auth";
// this for requests to backend

export const authHeaders = () => {
  if (sessionStorage.getItem('token')) {
    return {
      'Authorization': sessionStorage.getItem('token')
    };
  } else {
    return null;
  }
};
