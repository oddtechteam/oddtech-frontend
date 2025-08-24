export const endpoints = {
  auth: {
    // fallbacks keep you safe if an env is missing in prod
    login: import.meta.env.VITE_API_LOGIN_PATH ?? "/api/auth/login",
    signup: import.meta.env.VITE_API_SIGNUP_PATH ?? "/api/auth/signup",
  },
  face: {
    embed: import.meta.env.VITE_EMBEDDING_PATH ?? "/generate-embedding",
    compare: import.meta.env.VITE_COMPARE_PATH ?? "/compare-embeddings",
  },
  oauth: {
    google: "/oauth2/authorization/google",
  },
};
