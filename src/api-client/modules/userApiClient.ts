import { UserType } from "@/types/UserType";
import { apiClient } from "../apiClient";
import { TrackedTimeType } from "@/types/TrackedTimeType";

export const getUserById = async (userId: string) => {
  return await apiClient.get<{
    user: UserType;
    rating: number | undefined;
    numberOfRatings: number | undefined;
    ratingByReqUser: number | undefined;
  }>(`/users/${userId}`);
};

export const getTrackedTimesByUserId = async (userId: string) => {
  return await apiClient.get<TrackedTimeType[]>(
    `/users/${userId}/tracked-times`
  );
};

export const updateTrackedMinutesDailyGoal = async (
  userId: string,
  newGoal: number
) => {
  return await apiClient.put<UserType>(
    `/users/${userId}/tracked-minutes-daily-goal`,
    {
      trackedMinutesDailyGoal: newGoal,
    }
  );
};
