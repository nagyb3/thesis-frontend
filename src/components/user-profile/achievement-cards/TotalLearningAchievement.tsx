import { UserType } from "@/types/UserType";
import AchievementTooltip from "./AchievementTooltip";

export default function TotalLearningAchievement({
  userProfile,
}: {
  userProfile: UserType | undefined;
}) {
  const hoursToAchieve = 2;

  const isAchievementDone = (userProfile: UserType | undefined): boolean => {
    if (userProfile?.trackedTimes === undefined) return false;

    const totalLearningMinutes = userProfile.trackedTimes.reduce(
      (a, b) => a + b.minutes,
      0
    );

    return totalLearningMinutes >= hoursToAchieve * 60;
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
          Complete {hoursToAchieve} hours of learning in total
        </p>
      </div>
    </AchievementTooltip>
  );
}
