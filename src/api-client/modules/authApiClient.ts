import { apiClient } from "../apiClient";

export const getProfile = async () => {
  return await apiClient.get("/auth/profile");
};

export const registerNewAccount = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await apiClient.post("/auth/register", {
    username,
    password,
  });
};

export const loginToAccount = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return await apiClient.post("/auth/login", {
    username,
    password,
  });
};
