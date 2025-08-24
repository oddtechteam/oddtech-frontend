// In prod (Railway) this comes from service Variables.
// In dev, we fall back to the Vite proxy at /api.
const BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function login(body) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res;
}

// add other calls here and keep all API URLs in one place:
export const getUsers = () => fetch(`${BASE}/api/users/all`);
