import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LearningResourcesTab() {
  return (
    <Card className="w-[900px]">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>
            <p>Learning resources</p>
          </CardTitle>
        </div>
        <CardDescription>
          Here you can see the recommended learning resources by the owners of
          this topic.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <ul className="list-disc list-inside">
          <li>first example</li>
          <li>second</li>
          <li>third example...</li>
        </ul>
      </CardContent>
    </Card>
  );
}
