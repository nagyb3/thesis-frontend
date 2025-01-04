import { TopicType } from "@/types/TopicType";
import EditTopicDialog from "../dialogs/EditTopicDialog";
import DeleteTopicDialog from "../dialogs/DeleteTopicDialog";
import { UserType } from "@/types/UserType";
import { Link } from "@nextui-org/react";

export default function TopicHeader({
  topic,
  isCurrentUserModeratorOfTopic,
}: {
  topic: TopicType;
  isCurrentUserModeratorOfTopic: boolean;
}) {
  return (
    <div className="flex py-8 justify-between w-[min(100%,900px)] px-6">
      <div className="flex flex-col gap-y-2">
        <p className="font-semibold text-3xl">{topic?.name}</p>
        <p>{topic?.description}</p>
        <p className="mt-2">
          Moderators of topic:{" "}
          {topic?.moderators.map((moderator: UserType) => (
            <Link
              className="font-bold hover:underline"
              href={`/user/${moderator.id}`}
            >
              @{moderator.username}
            </Link>
          ))}
        </p>
      </div>
      {isCurrentUserModeratorOfTopic && (
        <div className="flex gap-x-4 items-center">
          <EditTopicDialog topic={topic} />
          <DeleteTopicDialog topic={topic} />
        </div>
      )}
    </div>
  );
}
