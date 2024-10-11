import { TopicType } from "@/types/TopicType";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";

export default function DiscussionsTab({ topic }: { topic: TopicType }) {
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
        {topic?.discussions.length > 0 ? (
          topic?.discussions.map((discussion) => (
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
