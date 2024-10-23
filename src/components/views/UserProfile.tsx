import { useParams } from "react-router-dom";
import { Card } from "../ui/card";
import { useEffect, useMemo, useState } from "react";
import { UserType } from "@/types/UserType";
import { getUserById } from "@/api-client/modules/userApiClient";
import { User } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import UserProfileAchievements from "../user-profile/UserProfileAchievements";
import UserProfileRating from "../user-profile/UserProfileRating";
import { useAuthContext } from "@/contexts/AuthContext";
import UserProfileTrackedTime from "../user-profile/UserProfileTrackedTime";

export default function UserProfile() {
  const { userId } = useParams();

  const [userProfile, setUserProfile] = useState<UserType | undefined>(
    undefined
  );

  const [averageRating, setAverageRating] = useState<number | undefined>(
    undefined
  );
  const [numberOfRatings, setNumberOfRatings] = useState<number | undefined>(
    undefined
  );

  const [score, setScore] = useState<number>(5);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      const result = await getUserById(userId);

      if (result.status === 200) {
        setUserProfile(result.data.user);
        setAverageRating(result.data.rating);
        setNumberOfRatings(result.data.numberOfRatings);
        setScore(result.data.ratingByReqUser ?? 5);
      }
    };
    fetchUserProfile();
  }, [userId]);

  const { profile } = useAuthContext();

  const privateMessageRoomId = useMemo(() => {
    return [profile?.id, userId].sort().join("_") + "_pm";
  }, [profile, userId]);

  return (
    <div className="flex flex-col gap-y-2 bg-neutral-50 items-center min-h-[calc(100vh-50px)] p-8">
      <Card className="w-[900px] px-8 py-8 flex flex-col gap-y-2">
        <div className="flex gap-x-4 items-end">
          <div className="bg-primary p-2 rounded-full w-fit h-fit">
            <User color="white" />
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Profile of user:</p>
            <div className="h-[40px] flex items-center">
              <p className="font-semibold text-3xl">@{userProfile?.username}</p>
            </div>
          </div>
          <Button
            color="blue"
            className="ml-auto"
            onClick={() =>
              (window.location.href =
                "/user/" + userId + "/private-message/" + privateMessageRoomId)
            }
          >
            Send message
          </Button>
        </div>
        <Separator className="my-6" />
        <UserProfileAchievements />
        <Separator className="my-6" />
        <UserProfileTrackedTime userId={userId} isMyProfile={false} />
        <Separator className="my-6" />
        <UserProfileRating
          score={score}
          setScore={setScore}
          averageRating={averageRating}
          numberOfRatings={numberOfRatings}
        />
      </Card>
    </div>
  );
}
