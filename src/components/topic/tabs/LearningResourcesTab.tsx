import { editTopic } from "@/api-client/modules/topicApiClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TopicType } from "@/types/TopicType";
import { Check, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function LearningResourcesTab({
  isCurrentUserModeratorOfTopic,
  topic,
}: {
  isCurrentUserModeratorOfTopic: boolean;
  topic: TopicType;
}) {
  const { topicId } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [learningResources, setLearningResources] = useState<string[]>([]);

  useEffect(() => {
    setLearningResources(topic?.learningResources ?? "");
  }, [topic]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await editTopic({
      id: topicId ?? "",
      learningResources,
    });

    setIsEditing(false);
  };

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <div className="flex gap-x-4 items-center justify-between">
          <div>
            <CardTitle>Learning resources</CardTitle>
            <CardDescription>
              Here you can see the recommended learning resources by the owners
              of this topic.
            </CardDescription>
          </div>
          {isCurrentUserModeratorOfTopic && !isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {isEditing ? (
          <form onSubmit={(e) => handleSave(e)}>
            <ul className="list-disc flex flex-col gap-y-4">
              {learningResources?.map((resource, index) => (
                <li key={index} className="flex gap-x-2 w-full">
                  <Input
                    onChange={(e) => {
                      setLearningResources((prev) => {
                        const newResources = [...prev];
                        newResources[index] = e.target.value;
                        return newResources;
                      });
                    }}
                    required
                    placeholder="Enter Learning resource..."
                    className="w-full"
                    value={resource}
                  />
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setLearningResources((prev) => {
                        const newResources = [...prev];
                        newResources.splice(index, 1);
                        return newResources;
                      })
                    }
                  >
                    <CircleX />
                  </Button>
                </li>
              ))}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setLearningResources((prev) => [...prev, ""]);
                  }}
                >
                  Add new item
                </Button>
                <Button type="submit">
                  Save
                  <Check />
                </Button>
              </div>
            </ul>
          </form>
        ) : (
          <ul className="list-disc list-inside">
            {learningResources?.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
