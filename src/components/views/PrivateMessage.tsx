import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { UserType } from "@/types/UserType";
import { getUserById } from "@/api-client/modules/userApiClient";
import {
  createPrivateMessage,
  getConversation,
} from "@/api-client/modules/privateMessageApiClient";
import { PrivateMessageType } from "@/types/PrivateMessageType";
import PrivateMessageBubble from "../private-messages/PrivateMessageBubble";
import { Button, Card, Input } from "@nextui-org/react";

export default function PrivateMessage() {
  const { privateMessageRoomId, userId } = useParams();

  const [otherUserProfile, setOtherUserProfile] = useState<
    UserType | undefined
  >(undefined);

  const [newMessageInput, setNewMessageInput] = useState<string>("");
  const [conversation, setConversation] = useState<PrivateMessageType[]>([]);
  const [rejectedFromRoom, setRejectedFromRoom] = useState<boolean>(false);

  const scrollDownMessagesContainer = () => {
    const containerElement = document.getElementById("messages-container");

    if (containerElement) {
      window.requestAnimationFrame(() => {
        containerElement.scrollTop = containerElement.scrollHeight;
      });
    }
  };

  const fetchOtherUserProfile = async () => {
    if (!userId) return;
    const result = await getUserById(userId);
    setOtherUserProfile(result.data.user);
  };

  const fetchConversation = async () => {
    if (!userId) return;
    const result = await getConversation(userId);
    setConversation(result.data);
    scrollDownMessagesContainer();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createPrivateMessage({
      userId: userId ?? "",
      message: newMessageInput,
    });
    if (result.status === 201) {
      setNewMessageInput("");
    }
  };

  useEffect(() => {
    fetchOtherUserProfile();
    fetchConversation();
    if (privateMessageRoomId) {
      const socket = io(import.meta.env.VITE_API_URI, {
        withCredentials: true,
      });
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.emit("join-private-message-room", privateMessageRoomId);

      socket.on("join-private-message-room-accept", (roomId) => {
        console.log("Joined room", roomId);
      });

      socket.on("join-private-message-room-reject", (roomId) => {
        console.log("Rejected from room!", roomId);
        setRejectedFromRoom(true);
      });

      socket.on("new-private-message", (newPrivateMessage) => {
        const parsedNewMessage = JSON.parse(newPrivateMessage);
        setConversation((prev) => [...prev, parsedNewMessage]);
        scrollDownMessagesContainer();
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [privateMessageRoomId]);

  return (
    <div className="min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bg-gray-50 p-4 flex justify-center">
      {!rejectedFromRoom ? (
        <Card className="flex flex-col justify-start max-w-[900px] w-full">
          <div className="px-8 py-6 border-b border-default-300">
            <p className="text-2xl font-semibold">
              {otherUserProfile?.username}
            </p>
          </div>
          <div
            id="messages-container"
            className="flex flex-col gap-y-2 px-4 pb-4 max-h-full overflow-y-scroll"
          >
            {conversation.map((privateMessage: PrivateMessageType) => (
              <PrivateMessageBubble
                key={privateMessage.id}
                privateMessage={privateMessage}
              />
            ))}
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-auto p-4 flex gap-x-4 justify-between items-center border-t border-default-300"
          >
            <div className="w-full">
              <Input
                variant="faded"
                label="Message"
                value={newMessageInput}
                onChange={(e) => setNewMessageInput(e.target.value)}
                id="message"
              />
            </div>
            <Button color="primary" className="self-end">
              Send
            </Button>
          </form>
        </Card>
      ) : (
        <p className="font-semibold text-lg">
          Unable to join to private message...
        </p>
      )}
    </div>
  );
}
