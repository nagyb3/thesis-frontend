import { CommentType } from "./CommentType";
import { TopicType } from "./TopicType";
import { UserType } from "./UserType";

export type DiscussionType = {
  id: string;
  title: string;
  content: string;
  created_at: Date;
  author: UserType;
  topic: TopicType;
  comments: CommentType[];
};
