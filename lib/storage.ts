

// check if the storage is available

export const isTokenAvailable = () => {
  return localStorage.getItem("token");
};
