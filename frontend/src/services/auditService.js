import apiClient from "./apiClient";

export const getAuditLogs = async (filters = {}) => {
  const res = await apiClient.get("/audit", { params: filters });
  return res.data;
};
