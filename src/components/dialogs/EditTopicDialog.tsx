import { TopicType } from "@/types/TopicType";
import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { editTopic } from "@/api-client/modules/topicApiClient";

export default function EditTopicDialog({
  topic,
  children,
}: {
  topic: TopicType;
  children: ReactNode;
}) {
  const [name, setName] = useState(topic.name);
  const [description, setDescription] = useState(topic?.description ?? "");

  useEffect(() => {
    setName(topic.name);
    setDescription(topic?.description ?? "");
  }, [topic]);

  const handleEditTopic = async () => {
    const result = await editTopic({
      id: topic.id,
      name,
      description,
    });
    if (result.status === 200) {
      console.log("Topic edited successfully");
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Topic</DialogTitle>
          <DialogDescription>
            Change the name and the description of the topic
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="col-span-3"
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={() => handleEditTopic()}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
