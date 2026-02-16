import apiClient from "./apiClient";

export const getClaims = async () => {
  const res = await apiClient.get("/claims");
  return res.data;
};

export const getClaimById = async (id) => {
  const res = await apiClient.get(`/claims/${id}`);
  return res.data;
};

export const createClaim = async (data) => {
  const res = await apiClient.post("/claims", data);
  return res.data;
};

export const reviewClaim = async (id) => {
  return apiClient.put(`/claims/review/${id}`);
};

export const approveClaim = async (id) => {
  return apiClient.put(`/claims/approve/${id}`);
};

export const rejectClaim = async (id) => {
  return apiClient.put(`/claims/reject/${id}`);
};

export const settleClaim = async (id) => {
  return apiClient.put(`/claims/settle/${id}`);
};
