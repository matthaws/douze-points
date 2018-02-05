export const authUrl = "http://localhost:3000/auth";
// this for requests to backend

export const authHeaders = () => {
  if (localStorage.getItem('token')) {
    return {
      'Authorization': localStorage.getItem('token')
    };
  } else {
    return null;
  }
};
