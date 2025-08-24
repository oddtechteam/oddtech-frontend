import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const sanitizeBase = (url: string | undefined) =>
  (url ?? "").replace(/\/+$/, ""); // drop trailing slash

const javaBase = sanitizeBase(import.meta.env.VITE_API_BASE_URL);
const pyBase   = sanitizeBase(import.meta.env.VITE_PYTHON_API_BASE_URL);

// Build a full URL safely (prevents "undefined/" and "//")
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

// ----- Auth header -----
const attachAuth = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  // *** DEBUG: log the final URL so we can spot any 'undefined' caller ***
  try {
    const base = (config.baseURL ?? javaBase) || "";
    const url  = config.url ?? "";
    const final = new URL(url, base + "/").toString();
    console.log(`[HTTP] ${config.method?.toUpperCase()} ${final}`);
  } catch {}

  return config;
};

javaApi.interceptors.request.use(attachAuth);
pyApi.interceptors.request.use(attachAuth);

const logError = (error: AxiosError) => Promise.reject(error);
javaApi.interceptors.response.use((r) => r, logError);
pyApi.interceptors.response.use((r) => r, logError);
