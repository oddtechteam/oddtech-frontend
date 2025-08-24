import axios from 'axios';

// strip trailing slash if present
const BACKEND = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

// Base points to your backend + /api, so all calls can be '/admin/...', '/tasks', etc.
export const http = axios.create({
  baseURL: BACKEND ? `${BACKEND}/api` : '/api', // dev proxy uses '/api'
  withCredentials: true, // keep if using cookies; fine to leave on
});

// Attach JWT on every request if present
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
