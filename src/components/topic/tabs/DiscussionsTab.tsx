import { TopicType } from "@/types/TopicType";
import { DiscussionType } from "@/types/DiscussionType";
import { getDiscussionsForTopic } from "@/api-client/modules/topicApiClient";
import { Dispatch, SetStateAction } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Link,
} from "@nextui-org/react";

export default function DiscussionsTab({
  topic,
  discussions,
  setDiscussions,
}: {
  topic: TopicType | undefined;
  discussions: DiscussionType[] | undefined;
  setDiscussions: Dispatch<SetStateAction<DiscussionType[] | undefined>>;
}) {
  const fetchDiscussions = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await getDiscussionsForTopic(
      topic?.id ?? "",
      e.target.value
    );

    if (result.status === 200) {
      setDiscussions(result.data);
    }
  };

  return (
    <Card className="w-[min(100%,900px)]">
      <CardHeader className="px-6 pt-6">
        <div className="flex gap-x-4 items-center justify-between w-full">
          <div className="flex flex-col gap-y-2">
            <p className="block font-bold text-2xl">Discussions</p>
            <p className="block text-sm text-default-500">
              Here you can see all of the discussion by the other users related
              to this topic:
            </p>
          </div>
          <Button
            color="primary"
            onClick={() =>
              (window.location.href = `/topic/${topic?.id}/create-discussion`)
            }
          >
            Create new discussion
          </Button>
        </div>
      </CardHeader>
      <CardBody className="space-y-2 p-6">
        <Input
          variant="faded"
          className="w-[400px] text-sm mb-6"
          placeholder="Search for discussion..."
          onChange={(e) => fetchDiscussions(e)}
        />
        {discussions && discussions.length > 0 ? (
          discussions?.map((discussion: DiscussionType) => (
            <Link
              key={discussion.id}
              href={"/topic/" + topic?.id + "/discussion/" + discussion.id}
            >
              <Card className="p-4 cursor-pointer flex flex-col items-center w-full">
                <p className="self-start text-xl font-semibold">
                  {discussion.title}
                </p>
                {discussion?.image && (
                  <img
                    src={discussion?.image}
                    alt=""
                    className="h-[200px] max-w-full"
                  />
                )}
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No discussions are created for this topic yet...
          </p>
        )}
      </CardBody>
    </Card>
  );
}
