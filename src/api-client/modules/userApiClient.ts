import { UserType } from "@/types/UserType";
import { apiClient } from "../apiClient";

export const getUserById = async (userId: string) => {
  return await apiClient.get<{
    user: UserType;
    rating: number | undefined;
    numberOfRatings: number | undefined;
    ratingByReqUser: number | undefined;
  }>(`/users/${userId}`);
};
