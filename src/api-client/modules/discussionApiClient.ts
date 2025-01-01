import { DiscussionType } from "@/types/DiscussionType";
import { apiClient } from "../apiClient";

export const createDiscussion = async ({
  title,
  content,
  topicId,
  image,
  video,
}: {
  title: string;
  content: string;
  topicId: string;
  image?: string;
  video?: string;
}) => {
  return await apiClient.post<DiscussionType>(
    `/topics/${topicId}/discussions`,
    {
      title,
      content,
      topicId,
      image,
      video,
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

export const sendDiscussionFeedback = async ({
  discussionId,
  feedback,
}: {
  discussionId: string;
  feedback: "like" | "dislike" | "none";
}) => {
  return await apiClient.post(
    `/discussions/${discussionId}/discussion-feedback`,
    {
      feedback,
    }
  );
};
