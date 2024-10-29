import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function LearningPathsTab() {
  return (
    <Card className="w-[min(100vw,900px)]">
      <CardHeader className="flex flex-col gap-y-2 items-start p-6">
        <p className="text-2xl font-bold">Learning paths</p>
        <p className="text-sm text-default-500">
          Here you can see all of the learning paths related to this topic:
        </p>
      </CardHeader>
      <CardBody className="space-y-2 p-6">
        <p className="text-gray-500 text-center">
          No learning paths are created for this topic yet...
        </p>
      </CardBody>
    </Card>
  );
}
