import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const javaBase = import.meta.env.VITE_API_BASE_URL;
const pyBase = import.meta.env.VITE_PYTHON_API_BASE_URL;

export const javaApi = axios.create({
  baseURL: javaBase,
  headers: { "Content-Type": "application/json" },
});

export const pyApi = axios.create({
  baseURL: pyBase,
  headers: { "Content-Type": "application/json" },
});

// --- request auth interceptor (Axios v1 typing) ---
const attachAuth = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    // make sure headers object exists, then set Authorization
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

javaApi.interceptors.request.use(attachAuth);
pyApi.interceptors.request.use(attachAuth);

// --- optional: uniform error logging ---
const logError = (error: AxiosError) => {
  // you can add toast/snackbar here
  return Promise.reject(error);
};

javaApi.interceptors.response.use((r) => r, logError);
pyApi.interceptors.response.use((r) => r, logError);
