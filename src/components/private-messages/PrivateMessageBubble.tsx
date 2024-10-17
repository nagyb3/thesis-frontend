import { useAuthContext } from "@/contexts/AuthContext";
import { PrivateMessageType } from "@/types/PrivateMessageType";

export default function PrivateMessageBubble({
  privateMessage,
}: {
  privateMessage: PrivateMessageType;
}) {
  const { profile } = useAuthContext();

  return (
    <div
      className={`p-2 rounded-xl w-fit ${
        privateMessage.sender?.id === profile?.id
          ? "bg-blue-200 self-end"
          : "bg-gray-200"
      }`}
    >
      {privateMessage?.message}
    </div>
  );
}
