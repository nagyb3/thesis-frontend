import { editTopic } from "@/api-client/modules/topicApiClient";
import { TopicType } from "@/types/TopicType";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { Check, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Linkify from "react-linkify";

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
    <Card
      classNames={{
        base: "border-black/20 border",
      }}
      className="w-[min(100%,900px)]"
    >
      <CardHeader className="px-6 pt-6">
        <div className="flex gap-x-4 items-center justify-between w-full">
          <div>
            <p className="block font-bold text-2xl">Learning resources</p>
            <p className="block text-sm text-default-500">
              Here you can see the recommended learning resources by the owners
              of this topic.
            </p>
          </div>
          {isCurrentUserModeratorOfTopic && !isEditing && (
            <Tooltip
              color="primary"
              placement="bottom"
              showArrow={true}
              content={
                <p className="max-w-[500px] text-center">
                  You are an owners of the topic, so you have the right to edit
                  to Learning Resources for this topic.
                </p>
              }
            >
              <Button color="primary" onClick={() => setIsEditing(true)}>
                Edit learning resources
              </Button>
            </Tooltip>
          )}
        </div>
      </CardHeader>
      <CardBody className="space-y-2 p-6">
        {isEditing ? (
          <form onSubmit={(e) => handleSave(e)}>
            <ul className="list-disc flex flex-col gap-y-4">
              {learningResources?.map((resource, index) => (
                <li key={index} className="flex gap-x-3 w-full">
                  <Input
                    classNames={{
                      inputWrapper: "border-black/40 border",
                    }}
                    variant="bordered"
                    onChange={(e) => {
                      setLearningResources((prev) => {
                        const newResources = [...prev];
                        newResources[index] = e.target.value;
                        return newResources;
                      });
                    }}
                    isRequired
                    placeholder="Enter Learning resource..."
                    className="w-full"
                    value={resource}
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    onClick={(e) => {
                      e.preventDefault();
                      setLearningResources((prev) => {
                        const newResources = [...prev];
                        newResources.splice(index, 1);
                        return newResources;
                      });
                    }}
                  >
                    <CircleX />
                  </Button>
                </li>
              ))}
              <div className="flex justify-between">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setLearningResources((prev) => [...prev, ""]);
                  }}
                >
                  Add new item
                </Button>
                <Button color="success" type="submit">
                  Save
                  <Check />
                </Button>
              </div>
            </ul>
          </form>
        ) : (
          <ul className="list-disc list-inside learning-resource-item">
            <Linkify>
              {learningResources?.map((resource, index) => (
                <li key={index}>{resource}</li>
              ))}
            </Linkify>
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
