import { PrivateMessageType } from "@/types/PrivateMessageType";
import { apiClient } from "../apiClient";

export const createPrivateMessage = async ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}) => {
  const response = await apiClient.post("/private-messages", {
    receiverUserId: userId,
    message,
  });
  return response;
};

export const getConversation = async (userId: string) => {
  return await apiClient.get<PrivateMessageType[]>(
    `/private-messages/conversation/${userId}`
  );
};
