import apiClient from "./apiClient";

export const getUsers = async () => {
  const res = await apiClient.get("/users");
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await apiClient.put(`/users/${id}`, { role });
  return res.data;
};
