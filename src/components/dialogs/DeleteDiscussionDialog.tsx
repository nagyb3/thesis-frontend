import { DiscussionType } from "@/types/DiscussionType";
import { deleteDiscussion } from "@/api-client/modules/discussionApiClient";
import { useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Trash } from "lucide-react";

export default function DeleteDiscussionDialog({
  discussion,
}: {
  discussion: DiscussionType | undefined;
}) {
  const { topicId } = useParams();

  const handleDeleteDiscussion = async () => {
    const result = await deleteDiscussion(discussion?.id ?? "");

    if (result.status === 200) {
      window.location.href = "/topic/" + topicId;
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="danger"
        className="ml-2 px-0 w-[42px] h-[42px]"
      >
        <Trash />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-y-2">
            <p>Delete Discussion?</p>
            <p className="text-sm text-default-500 font-normal">
              Are you sure you want to delete this discussion? This action
              cannot be undone.
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="flex justify-end gap-y-4 w-full">
              <Button
                onClick={() => handleDeleteDiscussion()}
                color="danger"
                className="w-fit"
              >
                Delete Discussions
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
