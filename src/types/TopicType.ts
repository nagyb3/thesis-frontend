import { DiscussionType } from "./DiscussionType";
import { LearningPathType } from "./LearningPathType";
import { UserType } from "./UserType";

export type TopicType = {
  id: string;
  name: string;
  description?: string;
  create_at: Date;
  moderators: UserType[];
  discussions: DiscussionType[];
  learningResources: string[];
  learningPaths: LearningPathType[];
};
