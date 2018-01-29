export const authenticate = async (socialToken) => {

  const response = await fetch(`http://localhost:3000/omniauth/callback?token=${socialToken}`)
  const user = await response.json()
  debugger
};
