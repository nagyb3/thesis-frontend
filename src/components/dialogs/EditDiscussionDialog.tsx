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
import { DiscussionType } from "@/types/DiscussionType";
import { editDiscussion } from "@/api-client/modules/discussionApiClient";

export default function EditDiscussionDialog({
  discussion,
  children,
}: {
  discussion: DiscussionType | undefined;
  children: ReactNode;
}) {
  const [discussionTitle, setDiscussionTitle] = useState(
    discussion?.title ?? ""
  );
  const [discussionContent, setDiscussionContent] = useState(
    discussion?.content ?? ""
  );

  useEffect(() => {
    setDiscussionTitle(discussion?.title ?? "");
    setDiscussionContent(discussion?.content ?? "");
  }, [discussion]);

  const handleEditDiscussion = async () => {
    const result = await editDiscussion({
      id: discussion?.id ?? "",
      title: discussionTitle,
      content: discussionContent,
    });
    if (result.status === 200) {
      console.log("Discussion edited successfully");
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Discussion</DialogTitle>
          <DialogDescription>
            You are the author of this discussion. You can edit the title and
            the content of the discussion.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              autoComplete="off"
              value={discussionTitle}
              onChange={(e) => setDiscussionTitle(e.target.value)}
              id="title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              autoComplete="off"
              value={discussionContent}
              onChange={(e) => setDiscussionContent(e.target.value)}
              id="content"
              className="col-span-3"
            />
          </div>
          <div className="flex justify-between">
            <Button onClick={() => handleEditDiscussion()}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
