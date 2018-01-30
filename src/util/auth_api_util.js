export const authenticate = async socialToken => {
  const response = await fetch(
    `http://localhost:3000/omniauth/callback?token=${socialToken}`
  );
  const payload = await response.json();
  return payload;
};
