import apiClient from "./apiClient";

export const createPolicy = async (data) => {
  const res = await apiClient.post("/policies", data);
  return res.data; // return actual data
};
export const getPolicies = async () => {
  return await apiClient.get("/policies");
};

export const getPolicyById = async (id) => {
  return await apiClient.get(`/policies/${id}`);
};

export const updatePolicy = async (id, data) => {
  return await apiClient.put(`/policies/${id}`, data);
};

export const deletePolicy = async (id) => {
  return await apiClient.delete(`/policies/${id}`);
};

export const approvePolicy = async (id) => {
  return await apiClient.put(`/policies/approve/${id}`);
};

// export const changePolicyStatus = async (id, status) => {
//   return await apiClient.patch(`/policies/status/${id}`, { status });
// };

export const changeStatus = async (id, status) => {
  const res = await apiClient.patch(`/policies/status/${id}`, {
    status,
  });
  return res.data;
};

