import { DiscussionType } from "./DiscussionType";
import { UserType } from "./UserType";

export type CommentType = {
  id: string;
  content: string;
  created_at: Date;
  author: UserType;
  discussion: DiscussionType;
};
