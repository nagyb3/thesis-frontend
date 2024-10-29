import { TopicType } from "@/types/TopicType";
import EditTopicDialog from "../dialogs/EditTopicDialog";
import DeleteTopicDialog from "../dialogs/DeleteTopicDialog";

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
