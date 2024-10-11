import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

export default function LearningPathsTab() {
  return (
    <Card className="w-[900px]">
      <CardHeader>
        <CardTitle>Learning paths</CardTitle>
        <CardDescription>
          Here you can see all of the learning paths related to this topic:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-500 text-center">
          No learning paths are created for this topic yet...
        </p>
      </CardContent>
    </Card>
  );
}
