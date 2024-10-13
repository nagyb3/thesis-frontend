import { TopicType } from "@/types/TopicType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import { DiscussionType } from "@/types/DiscussionType";
import { getDiscussionsForTopic } from "@/api-client/modules/topicApiClient";
import { Dispatch, SetStateAction } from "react";

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
    <Card className="w-[900px]">
      <CardHeader>
        <div className="flex gap-x-4 items-center justify-between">
          <div>
            <CardTitle className="block">Discussions</CardTitle>
            <CardDescription className="block">
              Here you can see all of the discussion by the other users related
              to this topic:
            </CardDescription>
          </div>
          <Button
            onClick={() =>
              (window.location.href = `/topic/${topic?.id}/create-discussion`)
            }
          >
            Create new discussion
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          className="w-[400px] text-sm mb-8"
          placeholder="Search for discussion..."
          onChange={(e) => fetchDiscussions(e)}
        />
        {discussions && discussions.length > 0 ? (
          discussions?.map((discussion: DiscussionType) => (
            <Card
              key={discussion.id}
              className="p-4 cursor-pointer"
              onClick={() =>
                (window.location.href =
                  "/topic/" + topic?.id + "/discussion/" + discussion.id)
              }
            >
              {discussion.title}
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No discussions are created for this topic yet...
          </p>
        )}
      </CardContent>
    </Card>
  );
}
