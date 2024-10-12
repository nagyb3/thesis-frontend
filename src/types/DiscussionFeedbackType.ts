import { UserType } from "./UserType";

export type DiscussionFeedbackType = {
  id: string;
  user: UserType;
  feedback: "like" | "dislike";
};
