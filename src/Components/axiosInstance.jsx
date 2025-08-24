// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default axiosInstance;


import axios from 'axios';

// Read the backend URL from Vite env (set in Railway). Remove trailing slash if any.
const BACKEND = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

// In production: baseURL = "https://<your-backend>.up.railway.app"
// In local dev: leave it empty so requests like "/api/..." hit the Vite proxy.
const axiosInstance = axios.create({
  baseURL: BACKEND || '',      // NOTE: do NOT put '/api' here
  withCredentials: true,       // keep if you might use cookies
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT automatically (from your login flow)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
