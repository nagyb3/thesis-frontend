import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { TopicType } from "@/types/TopicType";
import { deleteTopic } from "@/api-client/modules/topicApiClient";

export default function DeleteTopicDialog({
  children,
  topic,
}: {
  children: React.ReactNode;
  topic: TopicType;
}) {
  const handleDeleteTopic = async () => {
    const result = await deleteTopic(topic.id);
    if (result.status === 200) {
      console.log("Topic deleted successfully");
      window.location.href = "/";
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Topic</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this topic? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={() => handleDeleteTopic()} variant="destructive">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
