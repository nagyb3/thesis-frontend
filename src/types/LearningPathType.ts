import { TopicType } from "./TopicType";
import { UserType } from "./UserType";

export type LearningPathType = {
  id: string;
  title: string;
  created_at: Date;
  items: { title: string; id: string }[];
  topic: TopicType;
  author: UserType;
};
