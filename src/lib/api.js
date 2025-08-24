// src/lib/api.js
const BASE = import.meta.env.VITE_API_BASE_URL || '/api';
export { BASE };

export async function login(body) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    // try to read server message
    let msg = 'Login failed';
    try { const j = await res.json(); msg = j.message || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export const googleAuthUrl = () => `${BASE}/oauth2/authorization/google`;
