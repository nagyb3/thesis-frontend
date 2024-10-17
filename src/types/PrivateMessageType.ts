import { UserType } from "./UserType";

export type PrivateMessageType = {
  id: string;
  sender: UserType;
  receiver: UserType;
  message: string;
  created_at: Date;
};
