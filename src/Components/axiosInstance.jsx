import axios from "axios";

// Root hosts (no trailing slash)
const JAVA_ROOT = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080").replace(/\/+$/, "");
const PY_ROOT   = (import.meta.env.VITE_PYTHON_API_BASE_URL || "http://localhost:8000").replace(/\/+$/, "");
const FACE_RECOGNITION_ROOT = (import.meta.env.VITE_FACE_RECOGNITION_API_BASE_URL || "http://localhost:5005").replace(/\/+$/, "");

// Helper makes sure every path begins with /api
const apiPath = (p) => p.startsWith("/api") ? p : `/api${p}`;

export const api = axios.create({
  baseURL: JAVA_ROOT,               // <- no /api here
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // only if you use cookies
});

// Python service (usually no /api)
export const pyApi = axios.create({
  baseURL: PY_ROOT,
  headers: { "Content-Type": "application/json" },
});

// Face Recognition service
export const faceRecognitionApi = axios.create({
  baseURL: FACE_RECOGNITION_ROOT,
  headers: { "Content-Type": "application/json" },
});

// Java wrappers (prefix /api once)
export const get    = (path, cfg) => api.get(apiPath(path), cfg);
export const del    = (path, cfg) => api.delete(apiPath(path), cfg);
export const post   = (path, data, cfg) => api.post(apiPath(path), data, cfg);
export const put    = (path, data, cfg) => api.put(apiPath(path), data, cfg);
export const patch  = (path, data, cfg) => api.patch(apiPath(path), data, cfg);

// Python wrappers (use as-is; add '/api' in the call only if your Python backend uses it)
export const pyGet   = (path, cfg) => pyApi.get(path, cfg);
export const pyPost  = (path, data, cfg) => pyApi.post(path, data, cfg);

// Face Recognition wrappers
export const faceRecognitionGet  = (path, cfg) => faceRecognitionApi.get(path, cfg);
export const faceRecognitionPost = (path, data, cfg) => faceRecognitionApi.post(path, data, cfg);

export default api;
