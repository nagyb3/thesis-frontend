import { apiClient } from "../apiClient";

export const createTopic = async ({
  name,
  description,
}: {
  name: string;
  description?: string;
}) => {
  return await apiClient.post("/topics", {
    name,
    description,
  });
};
