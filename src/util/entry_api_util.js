import { backendUrl } from './constants';

export const fetchEntry = async entryId => {
  const response = await fetch(
    `${backendUrl}entries/${entryId}`,
    { method: 'GET' }
  );
  const payload = await response.json();
  return payload;
};
