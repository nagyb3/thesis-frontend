import { UserType } from "@/types/UserType";
import AchievementTooltip from "./AchievementTooltip";

export default function DailyTrackedTime({
  userProfile,
}: {
  userProfile: UserType | undefined;
}) {
  const isAchievementDone = (userProfile: UserType | undefined): boolean => {
    const trackedTimes = userProfile?.trackedTimes ?? [];

    let newData: { date: string; minutes: number }[] = [];

    const convertDateToISOString = trackedTimes.map((trackedTime) => ({
      ...trackedTime,
      date: new Date(trackedTime.date).toISOString().slice(0, 10),
    }));

    convertDateToISOString.forEach((trackedTime) => {
      const existingData = newData.find(
        (newDataItem) => newDataItem.date === trackedTime.date
      );

      if (existingData) {
        newData = newData.map((newDataItem) =>
          newDataItem.date === trackedTime.date
            ? {
                ...newDataItem,
                minutes: newDataItem.minutes + trackedTime.minutes,
              }
            : newDataItem
        );
      } else {
        newData.push({
          date: trackedTime.date,
          minutes: trackedTime.minutes,
        });
      }
    });

    const numberOfDaysWhereAchieved = newData.filter(
      (trackedTime) =>
        trackedTime.minutes >= (userProfile?.trackedMinutesDailyGoal ?? 30)
    );

    return numberOfDaysWhereAchieved.length >= 3;
  };

  const isAchieved = isAchievementDone(userProfile);

  return (
    <AchievementTooltip isAchieved={isAchieved}>
      <div
        className={`${
          isAchieved ? "bg-success/5" : "bg-danger/5"
        } h-48 rounded-lg p-4 flex flex-col gap-y-2 items-center justify-center`}
      >
        <p
          className={`${
            isAchieved ? "text-success" : "text-danger"
          } text-center font-semibold`}
        >
          Accomplish daily tracked minute goals for 3 days
        </p>
      </div>
    </AchievementTooltip>
  );
}
