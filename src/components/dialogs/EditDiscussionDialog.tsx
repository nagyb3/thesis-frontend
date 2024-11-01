import { useEffect, useState } from "react";
import { DiscussionType } from "@/types/DiscussionType";
import { editDiscussion } from "@/api-client/modules/discussionApiClient";
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
import { Pencil } from "lucide-react";

export default function EditDiscussionDialog({
  discussion,
}: {
  discussion: DiscussionType | undefined;
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
        variant="bordered"
        className="ml-4 px-0 w-[42px] h-[42px]"
      >
        <Pencil />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-y-2">
            <p>Edit Discussion</p>
            <p className="text-sm text-default-500 font-normal">
              You are the author of this discussion. You can edit the title and
              the content of the discussion.
            </p>
          </ModalHeader>
          <ModalBody className="flex flex-col gap-y-4">
            <Input
              classNames={{
                inputWrapper: "border-black/40 border",
              }}
              variant="bordered"
              label="Title"
              autoComplete="off"
              value={discussionTitle}
              onChange={(e) => setDiscussionTitle(e.target.value)}
              id="title"
              className="col-span-3"
            />

            <Textarea
              classNames={{
                inputWrapper: "border-black/40 border",
              }}
              variant="bordered"
              label="Content"
              autoComplete="off"
              value={discussionContent}
              onValueChange={setDiscussionContent}
              id="content"
              className="col-span-3"
            />

            <div className="flex justify-end">
              <Button color="primary" onClick={() => handleEditDiscussion()}>
                Submit
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
