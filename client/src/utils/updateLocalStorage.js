export const updateLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
