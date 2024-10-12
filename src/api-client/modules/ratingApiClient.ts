import { apiClient } from "../apiClient";

export const createRating = async ({
  score,
  toUser,
}: {
  score: number;
  toUser: string | undefined;
}) => {
  return await apiClient.post("/ratings", {
    score,
    toUser,
  });
};
