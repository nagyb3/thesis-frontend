import { CommentType } from "@/types/CommentType";
import { apiClient } from "../apiClient";

export const createComment = async ({
  content,
  discussionId,
}: {
  content: string;
  discussionId: string;
}) => {
  return await apiClient.post<CommentType>("/comments", {
    content,
    discussionId,
  });
};
