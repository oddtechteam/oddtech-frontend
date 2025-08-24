export const endpoints = {
  auth: {
    login: import.meta.env.VITE_API_LOGIN_PATH,
    signup: import.meta.env.VITE_API_SIGNUP_PATH,
  },
  face: {
    embed: import.meta.env.VITE_EMBEDDING_PATH,
    compare: import.meta.env.VITE_COMPARE_PATH,
  },
};
