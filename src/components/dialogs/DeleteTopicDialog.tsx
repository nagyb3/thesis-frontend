import { TopicType } from "@/types/TopicType";
import { deleteTopic } from "@/api-client/modules/topicApiClient";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function DeleteTopicDialog({ topic }: { topic: TopicType }) {
  const handleDeleteTopic = async () => {
    const result = await deleteTopic(topic.id);
    if (result.status === 200) {
      console.log("Topic deleted successfully");
      window.location.href = "/";
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-y-2">
                <p>Delete Topic</p>
                <p className="text-sm text-default-500 font-normal">
                  Are you sure you want to delete this topic? This action cannot
                  be undone.
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-end gap-x-2">
                  <Button onPress={onClose}>Cancel</Button>
                  <Button onClick={() => handleDeleteTopic()} color="danger">
                    Delete
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
