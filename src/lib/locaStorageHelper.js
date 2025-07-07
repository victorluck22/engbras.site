export const saveToLocal = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getFromLocal = (key) => JSON.parse(localStorage.getItem(key));

export const removeFromLocal = (key) => localStorage.removeItem(key);
