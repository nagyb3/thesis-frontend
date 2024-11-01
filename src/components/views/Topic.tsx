import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicById } from "@/api-client/modules/topicApiClient";
import { TopicType } from "@/types/TopicType";
import DiscussionsTab from "../topic/tabs/DiscussionsTab";
import LearningPathsTab from "../topic/tabs/LearningPathsTab";
import TopicHeader from "../topic/TopicHeader";
import LearningResourcesTab from "../topic/tabs/LearningResourcesTab";
import { Book, Send, Waypoints } from "lucide-react";
import { DiscussionType } from "@/types/DiscussionType";
import { UserType } from "@/types/UserType";
import { useAuthContext } from "@/contexts/AuthContext";
import { Tab, Tabs } from "@nextui-org/react";

export default function Topic() {
  const [topic, setTopic] = useState<TopicType | undefined>(undefined);
  const [discussions, setDiscussions] = useState<DiscussionType[] | undefined>(
    undefined
  );

  const { topicId } = useParams();

  const { profile } = useAuthContext();

  useEffect(() => {
    const fetchTopic = async () => {
      if (!topicId) return;

      try {
        const result = await getTopicById(topicId);

        if (result.status === 200) {
          setTopic(result.data);
          setDiscussions(result.data.discussions);
        }
      } catch (error) {
        console.error({ error });
      }
    };

    fetchTopic();
  }, [topicId]);

  const isCurrentUserModeratorOfTopic = useMemo(
    () =>
      topic?.moderators?.some(
        (moderator: UserType) => moderator.id === profile?.id
      ) ?? false,
    [profile, topic?.moderators]
  );

  return (
    <div className="h-[calc(100vh-50px)] bg-background">
      {topic && (
        <div className="flex flex-col items-center">
          <TopicHeader
            topic={topic}
            isCurrentUserModeratorOfTopic={isCurrentUserModeratorOfTopic}
          />
          <Tabs
            color="primary"
            classNames={{
              tabList: "bg-black/5 border border-black/20",
            }}
          >
            <Tab
              key="discussions"
              title={
                <div className="flex gap-x-2 items-center">
                  Discussions
                  <Send size={16} />
                </div>
              }
              className="w-full px-4"
            >
              <div className="flex justify-center">
                <DiscussionsTab
                  topic={topic}
                  discussions={discussions}
                  setDiscussions={setDiscussions}
                />
              </div>
            </Tab>
            <Tab
              key="learning-paths"
              title={
                <div className="flex gap-x-2 items-center">
                  Learning paths
                  <Waypoints size={16} />
                </div>
              }
              className="w-full px-4"
            >
              <div className="flex justify-center">
                <LearningPathsTab topic={topic} />
              </div>
            </Tab>
            <Tab
              key="learning-resources"
              title={
                <div className="flex gap-x-2 items-center">
                  Learning resources
                  <Book size={16} />
                </div>
              }
              className="w-full px-4"
            >
              <div className="flex justify-center">
                <LearningResourcesTab
                  isCurrentUserModeratorOfTopic={isCurrentUserModeratorOfTopic}
                  topic={topic}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}
