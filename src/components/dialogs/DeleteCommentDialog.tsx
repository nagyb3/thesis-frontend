import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CommentType } from "@/types/CommentType";
import { deleteComment } from "@/api-client/modules/commentApiClient";

export default function DeleteCommentDialog({
  children,
  comment,
}: {
  children: React.ReactNode;
  comment: CommentType | undefined;
}) {
  const handleDeleteComment = async () => {
    const result = await deleteComment(comment?.id ?? "");

    if (result.status === 200) {
      window.location.reload();
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={() => handleDeleteComment()} variant="destructive">
            Delete comment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
