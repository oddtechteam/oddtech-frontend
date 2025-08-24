export const HOST = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
export const API_BASE_URL = HOST ? `${HOST}/api` : '/api';
export const ADMIN_BASE_URL = `${API_BASE_URL}/admin`;
