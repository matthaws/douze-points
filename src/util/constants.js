export const authUrl = "http://localhost:3000/auth";

export const authHeaders = () => {
  debugger
  if (localStorage.getItem('token')) {
    return {
      'Authorization': localStorage.getItem('token')
    }
  } else {
    return null;
  }
}
