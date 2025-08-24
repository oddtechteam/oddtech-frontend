// src/lib/api.js
import { login as tsLogin } from "./auth.service";
import { javaApi, makeUrl } from "./http";
import { endpoints } from "./endpoints";

export const BASE = javaApi.defaults.baseURL;

export function login(body) {
  // reuse the typed service (works from JS)
  return tsLogin(body);
}

export const googleAuthUrl = () =>
  makeUrl(javaApi.defaults.baseURL, endpoints.oauth.google);
