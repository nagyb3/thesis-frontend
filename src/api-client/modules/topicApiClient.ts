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

export const getAllTopics = async () => {
  return await apiClient.get("/topics");
};

export const getTopicById = async (topicId: string) => {
  return await apiClient.get(`/topics/${topicId}`);
};
