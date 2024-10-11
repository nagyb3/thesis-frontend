import { TopicType } from "@/types/TopicType";
import { Button } from "../ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserType } from "@/types/UserType";
import { useMemo } from "react";
import EditTopicDialog from "../dialogs/EditTopicDialog";
import DeleteTopicDialog from "../dialogs/DeleteTopicDialog";

export default function TopicHeader({ topic }: { topic: TopicType }) {
  const { profile } = useAuthContext();

  const isCurrentUserModeratorOfTopic = useMemo(
    () =>
      topic.moderators.some(
        (moderator: UserType) => moderator.id === profile?.id
      ),
    [profile, topic.moderators]
  );

  return (
    <div className="flex py-8 justify-between w-[900px]">
      <div className="flex flex-col gap-y-2">
        <p className="font-semibold text-3xl">{topic?.name}</p>
        <p>{topic?.description}</p>
      </div>
      {isCurrentUserModeratorOfTopic && (
        <div className="flex gap-x-4 items-center">
          <EditTopicDialog topic={topic}>
            <Button>Edit Topic</Button>
          </EditTopicDialog>
          <DeleteTopicDialog topic={topic}>
            <Button variant="destructive">Delete</Button>
          </DeleteTopicDialog>
        </div>
      )}
    </div>
  );
}