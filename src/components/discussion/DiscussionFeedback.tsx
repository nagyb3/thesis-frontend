import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { DiscussionType } from "@/types/DiscussionType";
import { useAuthContext } from "@/contexts/AuthContext";
import { sendDiscussionFeedback } from "@/api-client/modules/discussionApiClient";
import { Button } from "@nextui-org/react";

export default function DiscussionFeedback({
  discussion,
  fetchDiscussion,
}: {
  discussion?: DiscussionType;
  fetchDiscussion: () => void;
}) {
  const { profile } = useAuthContext();

  const numberOfLikes = discussion?.discussionFeedback.filter(
    (feedback) => feedback.feedback === "like"
  ).length;

  const numberOfDislikes = discussion?.discussionFeedback.filter(
    (feedback) => feedback.feedback === "dislike"
  ).length;

  const [isOn, setIsOn] = useState(false);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    const currentUserLiked =
      discussion?.discussionFeedback
        ?.filter((discussionFeedback) => discussionFeedback.feedback === "like")
        .filter(
          (discussionFeedback) => discussionFeedback.user.id === profile?.id
        ) ?? [];

    const currentUserDisliked =
      discussion?.discussionFeedback
        ?.filter(
          (discussionFeedback) => discussionFeedback.feedback === "dislike"
        )
        .filter(
          (discussionFeedback) => discussionFeedback.user.id === profile?.id
        ) ?? [];

    setIsOn(currentUserLiked.length > 0);
    setIsDown(currentUserDisliked.length > 0);
  }, [discussion]);

  const handleClick = async (feedback: "like" | "dislike" | "none") => {
    const result = await sendDiscussionFeedback({
      discussionId: discussion?.id ?? "",
      feedback,
    });

    if (result.status === 200 || result.status === 201) {
      fetchDiscussion();
    }
  };

  return (
    <div className="flex gap-x-2">
      <Button
        className="p-2 h-fit flex gap-x-2"
        variant="faded"
        onClick={() => {
          if (isOn) {
            handleClick("none");
          } else {
            handleClick("like");
          }
          setIsOn(!isOn);
          setIsDown(false);
        }}
      >
        <p className="text-gray-500">{numberOfLikes ?? 0}</p>
        <ArrowUp strokeWidth="3px" color={!isOn ? "gray" : "orange"} />
      </Button>
      <Button
        className="p-2 h-fit flex gap-x-2"
        variant="faded"
        onClick={() => {
          if (isDown) {
            handleClick("none");
          } else {
            handleClick("dislike");
          }
          setIsDown(!isDown);
          setIsOn(false);
        }}
      >
        <p className="text-gray-500">{numberOfDislikes ?? 0}</p>
        <ArrowDown strokeWidth="3px" color={!isDown ? "gray" : "orange"} />
      </Button>
    </div>
  );
}
