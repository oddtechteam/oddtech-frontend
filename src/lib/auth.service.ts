import { javaApi, makeUrl } from "./http";
import { endpoints } from "./endpoints";

export type LoginPayload = { email: string; password: string };
export type SignupPayload = Record<string, unknown>;

export async function login(payload: LoginPayload) {
  const url = makeUrl(javaApi.defaults.baseURL!, endpoints.auth.login);
  const { data } = await javaApi.post(url, payload);
  if (data?.token) localStorage.setItem("token", data.token);
  return data;
}

export async function signup(payload: SignupPayload) {
  const url = makeUrl(javaApi.defaults.baseURL!, endpoints.auth.signup);
  const { data } = await javaApi.post(url, payload);
  return data;
}
