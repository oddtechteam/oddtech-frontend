import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const sanitizeBase = (url: string | undefined) =>
  (url ?? "").replace(/\/+$/, ""); // remove trailing slash

const javaBase = sanitizeBase(import.meta.env.VITE_API_BASE_URL);
const pyBase   = sanitizeBase(import.meta.env.VITE_PYTHON_API_BASE_URL);

// build a full URL safely (no double slashes, no "undefined")
export const makeUrl = (base: string, path: string) => {
  if (!base) throw new Error("Missing API base URL");
  if (!path) throw new Error("Missing API path");
  return new URL(path, base + "/").toString();
};

export const javaApi = axios.create({
  baseURL: javaBase,
  headers: { "Content-Type": "application/json" },
});

export const pyApi = axios.create({
  baseURL: pyBase,
  headers: { "Content-Type": "application/json" },
});

const attachAuth = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return config;
};

javaApi.interceptors.request.use(attachAuth);
pyApi.interceptors.request.use(attachAuth);

const logError = (error: AxiosError) => Promise.reject(error);
javaApi.interceptors.response.use((r) => r, logError);
pyApi.interceptors.response.use((r) => r, logError);
