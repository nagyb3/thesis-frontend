import { useState } from "react";
import { createTopic } from "@/api-client/modules/topicApiClient";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create New Topic</ModalHeader>
              <ModalBody className="flex flex-col gap-y-4 items-center">
                <Input
                  variant="faded"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="w-[350px]"
                />

                <Textarea
                  variant="faded"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="w-[350px]"
                />
              </ModalBody>
              <ModalFooter className="flex justify-end gap-x-4">
                <Button
                  color="primary"
                  variant="faded"
                  onPress={() => onClose()}
                >
                  Cancel
                </Button>
                <Button color="primary" onClick={() => handleCreateNewTopic()}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
