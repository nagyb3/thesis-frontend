import { TopicType } from "@/types/TopicType";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { editTopic } from "@/api-client/modules/topicApiClient";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

export default function EditTopicDialog({ topic }: { topic: TopicType }) {
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Edit Topic
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-y-2">
                <p>Edit Topic</p>
                <p className="text-sm text-default-500 font-normal">
                  Change the name and the description of the topic
                </p>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    variant="faded"
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
                    variant="faded"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    className="col-span-3"
                  />
                </div>
                <div className="flex justify-end gap-x-2">
                  <Button onPress={onClose}>Cancel</Button>
                  <Button color="primary" onClick={() => handleEditTopic()}>
                    Submit
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
