import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { UserType } from "@/types/UserType";
import { getUserById } from "@/api-client/modules/userApiClient";
import { User } from "lucide-react";
import UserProfileAchievements from "../user-profile/UserProfileAchievements";
import UserProfileRating from "../user-profile/UserProfileRating";
import { useAuthContext } from "@/contexts/AuthContext";
import UserProfileTrackedTime from "../user-profile/UserProfileTrackedTime";
import { Button, Card, Divider } from "@nextui-org/react";

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

  const videoChatRoomId = useMemo(() => {
    return [profile?.id, userId].sort().join("_") + "_vc";
  }, [profile, userId]);

  return (
    <div className="flex flex-col gap-y-2 bg-background items-center min-h-[calc(100vh-50px)] p-8">
      <Card className="w-[900px] px-8 py-8 flex flex-col gap-y-2">
        <div className="flex gap-x-4 items-end">
          <div className="bg-black p-2 rounded-full w-fit h-fit">
            <User color="white" />
          </div>
          <div className="flex flex-col gap-y-2">
            <p>Profile of user:</p>
            <div className="h-[40px] flex items-center">
              <p className="font-semibold text-3xl">@{userProfile?.username}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 ml-auto">
            <Button
              variant="faded"
              onClick={() =>
                (window.location.href =
                  "/user/" + userId + "/video-chat/" + videoChatRoomId)
              }
            >
              Enter video consultation
            </Button>
            <Button
              color="primary"
              onClick={() =>
                (window.location.href =
                  "/user/" +
                  userId +
                  "/private-message/" +
                  privateMessageRoomId)
              }
            >
              Send message
            </Button>
          </div>
        </div>
        <Divider className="my-6" />
        <UserProfileAchievements />
        <Divider className="my-6" />
        <UserProfileTrackedTime userId={userId} isMyProfile={false} />
        <Divider className="my-6" />
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
