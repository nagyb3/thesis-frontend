import { DiscussionType } from "@/types/DiscussionType";
import { apiClient } from "../apiClient";

export const createDiscussion = async ({
  title,
  content,
  topicId,
}: {
  title: string;
  content: string;
  topicId: string;
}) => {
  return await apiClient.post<DiscussionType>(
    `/topics/${topicId}/discussions`,
    {
      title,
      content,
      topicId,
    }
  );
};

export const deleteDiscussion = async (discussionId: string) => {
  return await apiClient.delete(`/discussions/${discussionId}`);
};

export const editDiscussion = async ({
  id,
  title,
  content,
}: {
  id: string;
  title?: string;
  content?: string;
}) => {
  return await apiClient.put(`/discussions/${id}`, {
    title,
    content,
  });
};