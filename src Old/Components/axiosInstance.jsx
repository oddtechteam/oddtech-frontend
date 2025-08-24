import axios from 'axios';

// In prod, set VITE_API_BASE_URL to your Java backend URL.
// In dev, leave it empty so '/api' goes through Vite proxy.
const BACKEND = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

const http = axios.create({
  baseURL: BACKEND || '',                 // keep request paths like '/api/...'
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT automatically
http.interceptors.request.use((cfg) => {
  const t = localStorage.getItem('token');
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

export default http;
