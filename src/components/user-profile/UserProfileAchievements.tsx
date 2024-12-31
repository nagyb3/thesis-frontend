import { UserType } from "@/types/UserType";

export default function UserProfileAchievements({
  userProfile,
}: {
  userProfile: UserType | undefined;
}) {
  console.log({ userProfile });

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-semibold">Achievements:</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-danger/5 h-48 rounded-lg p-4 flex flex-col gap-y-2 items-center justify-center">
          <p className="text-danger text-center font-semibold">
            Accomplish daily tracked minute goals for 3 days
          </p>
        </div>
        <div className="bg-success/5 h-48 rounded-lg p-4 flex flex-col gap-y-2 items-center justify-center">
          <p className="text-success text-center font-semibold">
            Complete 2 hours of learning in total
          </p>
        </div>
        <div className="bg-danger/5 h-48 rounded-lg p-4 flex flex-col gap-y-2 items-center justify-center">
          <p className="text-danger text-center font-semibold">
            Create a new discussion
          </p>
        </div>
      </div>
    </div>
  );
}
