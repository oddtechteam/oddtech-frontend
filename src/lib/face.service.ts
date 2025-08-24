import { pyApi } from "./http";
import { endpoints } from "./endpoints";

export async function generateEmbedding(payload: any) {
  const { data } = await pyApi.post(endpoints.face.embed, payload);
  return data;
}

export async function compareEmbeddings(payload: any) {
  const { data } = await pyApi.post(endpoints.face.compare, payload);
  return data;
}
