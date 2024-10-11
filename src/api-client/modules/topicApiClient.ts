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

export const editTopic = async ({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) => {
  return await apiClient.put(`/topics/${id}`, {
    name,
    description,
  });
};

export const deleteTopic = async (topicId: string) => {
  return await apiClient.delete(`/topics/${topicId}`);
};

export const getDiscussionById = async (discussionId: string) => {
  return await apiClient.get(`/discussions/${discussionId}`);
};
