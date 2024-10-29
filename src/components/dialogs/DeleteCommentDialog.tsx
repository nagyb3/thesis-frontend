import { CommentType } from "@/types/CommentType";
import { deleteComment } from "@/api-client/modules/commentApiClient";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";

export default function DeleteCommentDialog({
  comment,
  onOpenChange,
  isOpen,
}: {
  comment: CommentType | undefined;
  onOpenChange: () => void;
  isOpen: boolean;
}) {
  const handleDeleteComment = async () => {
    const result = await deleteComment(comment?.id ?? "");

    if (result.status === 200) {
      window.location.reload();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-y-2">
            <p>Delete Comment?</p>
            <p className="text-sm text-default-500 font-normal">
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="flex justify-end">
              <Button
                onClick={() => handleDeleteComment()}
                color="danger"
                className="w-fit"
              >
                Delete comment
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
