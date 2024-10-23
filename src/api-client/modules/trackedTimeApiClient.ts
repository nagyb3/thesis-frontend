import { TrackedTimeType } from "@/types/TrackedTimeType";
import { apiClient } from "../apiClient";

export const createTrackedTime = async ({
  minutes,
  date,
}: {
  minutes: number;
  date: Date;
}) => {
  return await apiClient.post<TrackedTimeType>("/tracked-times", {
    minutes,
    date,
  });
};

export const deleteTrackedTime = async (trackedTimeId: string) => {
  return await apiClient.delete(`/tracked-times/${trackedTimeId}`);
};
