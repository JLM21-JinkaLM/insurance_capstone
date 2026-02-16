import apiClient from "./apiClient";

export const getTreaties = async () => {
  const res = await apiClient.get("/treaties");
  return res.data;
};

export const createTreaty = async (data) => {
  const res = await apiClient.post("/treaties", data);
  return res.data;
};

export const getAllocations = async () => {
  const res = await apiClient.get("/risk-allocation");
  return res.data;
};

export const createAllocation = async (data) => {
  const res = await apiClient.post("/risk-allocation", data);
  return res.data;
};
