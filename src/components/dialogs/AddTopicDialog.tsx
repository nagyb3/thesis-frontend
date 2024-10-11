import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { createTopic } from "@/api-client/modules/topicApiClient";

export function AddTopicDialog({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateNewTopic = async () => {
    const result = await createTopic({ name, description });

    if (result.status === 201) {
      console.log("Topic created successfully");
      window.location.href = "/topic/" + result.data.id;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Topic</DialogTitle>
          <DialogDescription>
            You can create a new topic in something you are interested in here.
            Note: when you create a new topic, you become the new owner of it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleCreateNewTopic()}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
