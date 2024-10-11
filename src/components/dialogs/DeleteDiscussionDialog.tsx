import { DiscussionType } from "@/types/DiscussionType";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteDiscussion } from "@/api-client/modules/discussionApiClient";
import { useParams } from "react-router-dom";

export default function DeleteDiscussionDialog({
  children,
  discussion,
}: {
  children: React.ReactNode;
  discussion: DiscussionType | undefined;
}) {
  const { topicId } = useParams();

  const handleDeleteDiscussion = async () => {
    const result = await deleteDiscussion(discussion?.id ?? "");

    if (result.status === 200) {
      window.location.href = "/topic/" + topicId;
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Discussion?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this discussion? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={() => handleDeleteDiscussion()}
            variant="destructive"
          >
            Delete Discussions
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
