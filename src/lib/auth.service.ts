import { javaApi } from "./http";
import { endpoints } from "./endpoints";

export type LoginPayload = { email: string; password: string };
export type SignupPayload = Record<string, unknown>;

export async function login(payload: LoginPayload) {
  const { data } = await javaApi.post(endpoints.auth.login, payload);
  if (data?.token) localStorage.setItem("token", data.token);
  return data;
}

export async function signup(payload: SignupPayload) {
  const { data } = await javaApi.post(endpoints.auth.signup, payload);
  return data;
}
