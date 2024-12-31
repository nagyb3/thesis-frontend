import { TopicType } from "@/types/TopicType";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useParams } from "react-router-dom";

export default function LearningPathsTab({ topic }: { topic: TopicType }) {
  const { topicId } = useParams();

  return (
    <Card
      classNames={{
        base: "border-black/20 border",
      }}
      className="w-[min(100vw,900px)]"
    >
      <CardHeader className="flex gap-x-4 items-center justify-between px-6 pt-6">
        <div>
          <p className="text-2xl font-bold">Learning paths</p>
          <p className="text-sm text-default-500">
            Here you can see all of the learning paths related to this topic:
          </p>
        </div>
        <Button
          color="primary"
          onClick={() =>
            (window.location.href = `/topic/${topicId}/create-learning-path`)
          }
        >
          Create Learning Path
        </Button>
      </CardHeader>
      <CardBody className="space-y-2 p-6">
        {topic?.learningPaths && topic?.learningPaths?.length > 0 ? (
          topic.learningPaths.map((learningPath) => (
            <a
              href={`/topic/${topicId}/learning-path/${learningPath?.id}`}
              key={learningPath.id}
            >
              <Card
                classNames={{
                  base: "border-black/20 border",
                }}
                className="p-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">{learningPath?.title}</p>

                  {learningPath?.author?.username && (
                    <p>
                      Created by: @
                      <span className="font-bold hover:underline">
                        {learningPath?.author?.username}
                      </span>
                    </p>
                  )}
                </div>
                <p className="text-gray-500">
                  {learningPath?.items?.length} items
                </p>
              </Card>
            </a>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No learning paths are created for this topic yet...
          </p>
        )}
      </CardBody>
    </Card>
  );
}
