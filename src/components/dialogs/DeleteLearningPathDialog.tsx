import { deleteLearningPathById } from "@/api-client/modules/learningPathApiClient";
import { LearningPathType } from "@/types/LearningPathType";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useParams } from "react-router-dom";

export default function DeleteLearningPathDialog({
  learningPath,
}: {
  learningPath: LearningPathType | undefined;
}) {
  const { topicId } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeleteLearningPath = async () => {
    const result = await deleteLearningPathById(learningPath?.id ?? "");
    if (result.status === 200) {
      window.location.href = "/topic/" + topicId;
    }
  };

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
            <p>Delete Learning Path?</p>
            <p className="text-sm text-default-500 font-normal">
              Are you sure you want to delete this learning path? This action
              cannot be undone.
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="flex justify-end gap-y-4 w-full">
              <Button
                onClick={() => handleDeleteLearningPath()}
                color="danger"
                className="w-fit"
              >
                Delete Learning Path
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
