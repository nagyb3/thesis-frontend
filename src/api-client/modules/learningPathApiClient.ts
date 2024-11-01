import { LearningPathItem } from "@/components/views/CreateLearningPath";
import { apiClient } from "../apiClient";
import { LearningPathType } from "@/types/LearningPathType";

export const createLearningPath = async ({
  topicId,
  title,
  items,
}: {
  topicId: string;
  title: string;
  items: LearningPathItem[];
}) => {
  return await apiClient.post(`/topics/${topicId}/learning-paths`, {
    title,
    items,
  });
};

export const getLearningPathById = async (learningPathId: string) => {
  return await apiClient.get<LearningPathType>(
    `/learning-paths/${learningPathId}`
  );
};

export const deleteLearningPathById = async (learningPathId: string) => {
  return await apiClient.delete(`/learning-paths/${learningPathId}`);
};
