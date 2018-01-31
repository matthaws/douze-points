export const authenticate = async socialToken => {
  const response = await fetch(
    `http://localhost:3000/auth`, {
      method: 'POST',
      headers: {
        'Authorization': `${socialToken}`
      }
    }
  );
  const payload = await response.json();
  return payload;
};
