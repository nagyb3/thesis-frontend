import { DiscussionType } from "./DiscussionType";
import { TrackedTimeType } from "./TrackedTimeType";

export type UserType = {
  id: string;
  username: string;
  trackedMinutesDailyGoal: number;
  discussions: DiscussionType[] | undefined;
  trackedTimes: TrackedTimeType[] | undefined;
};
