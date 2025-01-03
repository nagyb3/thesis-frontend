import { UserType } from "@/types/UserType";
import DailyTrackedTimeAchievement from "./achievement-cards/DailyTrackedTimeAchievement";
import TotalLearningAchievement from "./achievement-cards/TotalLearningAchievement";
import CreatedDiscussionAchievement from "./achievement-cards/CreatedDiscussionAchievement";

export default function UserProfileAchievements({
  userProfile,
}: {
  userProfile: UserType | undefined;
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-semibold">Achievements:</p>
      <div className="grid grid-cols-3 gap-4">
        <DailyTrackedTimeAchievement userProfile={userProfile} />
        <TotalLearningAchievement userProfile={userProfile} />
        <CreatedDiscussionAchievement userProfile={userProfile} />
      </div>
    </div>
  );
}
