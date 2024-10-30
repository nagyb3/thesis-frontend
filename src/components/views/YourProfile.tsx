import { User } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import UserProfileAchievements from "../user-profile/UserProfileAchievements";
import { getUserById } from "@/api-client/modules/userApiClient";
import UserProfileRating from "../user-profile/UserProfileRating";
import UserProfileTrackedTime from "../user-profile/UserProfileTrackedTime";
import { Card, Divider } from "@nextui-org/react";

export default function MyProfile() {
  const { profile } = useAuthContext();

  const [averageRating, setAverageRating] = useState<number | undefined>(
    undefined
  );
  const [numberOfRatings, setNumberOfRatings] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getUserById(profile?.id ?? "");

      setAverageRating(result.data.rating);
      setNumberOfRatings(result.data.numberOfRatings);

      console.log(result);
    };

    fetchProfile();
  }, [profile?.id]);

  return (
    <div className="flex flex-col gap-y-2 bg-gray-100 items-center min-h-[calc(100vh-50px)] p-8">
      <Card className="w-[900px] px-8 py-8 flex flex-col gap-y-2">
        <div className="flex gap-x-4 items-end">
          <div className="bg-black p-2 rounded-full w-fit h-fit">
            <User color="white" />
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Your profile:</p>
            <div className="h-[40px] flex items-center">
              <p className="font-semibold text-3xl">@{profile?.username}</p>
            </div>
          </div>
        </div>
        <Divider className="my-4" />
        <UserProfileAchievements />
        <Divider className="my-4" />
        <UserProfileTrackedTime userId={profile?.id} isMyProfile={true} />
        <Divider className="my-4" />
        <UserProfileRating
          isYourProfile={true}
          averageRating={averageRating}
          numberOfRatings={numberOfRatings}
        />
      </Card>
    </div>
  );
}
