import { UserType } from "@/types/UserType";

export default function CreatedDicussionAchievement({
  userProfile,
}: {
  userProfile: UserType | undefined;
}) {
  const isAchieved =
    userProfile?.discussions && userProfile?.discussions?.length > 0;

  return (
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
        Create a new discussion
      </p>
    </div>
  );
}