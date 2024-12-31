import { useParams } from "react-router-dom";
import BackButtonWithLink from "../BackButtonWithLink";
import { Card } from "@nextui-org/react";
import { LearningPathType } from "@/types/LearningPathType";
import { useEffect, useState } from "react";
import { getLearningPathById } from "@/api-client/modules/learningPathApiClient";
import LearningPathViewer from "../learning-paths/LearningPathViewer";
import { useAuthContext } from "@/contexts/AuthContext";
import DeleteLearningPathDialog from "../dialogs/DeleteLearningPathDialog";

export default function LearningPath() {
  const { topicId, learningPathId } = useParams();

  const { profile } = useAuthContext();

  const [learningPath, setLearningPath] = useState<
    LearningPathType | undefined
  >(undefined);

  const fetchLearningPath = async (id: string) => {
    const result = await getLearningPathById(id);
    setLearningPath(result.data);
  };

  useEffect(() => {
    fetchLearningPath(learningPathId ?? "");
  }, [topicId]);

  return (
    <div className="min-h-[calc(100vh-50px)] bg-background flex flex-col items-center py-8 gap-y-4 p-4  ">
      <BackButtonWithLink backLink={"/topic/" + topicId} />
      <Card
        classNames={{
          base: "border-black/20 border",
        }}
        className="py-4 px-8 w-[min(100%,900px)] flex flex-col gap-y-4"
      >
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">{learningPath?.title}</p>
            {learningPath?.author?.id === profile?.id && (
              <DeleteLearningPathDialog learningPath={learningPath} />
            )}
          </div>
          <p className="pb-4">
            Created by:{" "}
            <a
              href={
                learningPath?.author?.id === profile?.id
                  ? "/your-profile"
                  : "/user/" + learningPath?.author?.id
              }
              className="font-bold hover:underline"
            >
              @{learningPath?.author?.username}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-y-8 p-4">
          <LearningPathViewer items={learningPath?.items} />
        </div>
      </Card>
    </div>
  );
}
