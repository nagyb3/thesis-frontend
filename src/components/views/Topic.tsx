import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getTopicById } from "@/api-client/modules/topicApiClient";
import { TopicType } from "@/types/TopicType";
import DiscussionsTab from "../topic/tabs/DiscussionsTab";
import LearningPathsTab from "../topic/tabs/LearningPathsTab";
import TopicHeader from "../topic/TopicHeader";
import LearningResourcesTab from "../topic/tabs/LearningResourcesTab";
import { Book, Send, Waypoints } from "lucide-react";

export default function Topic() {
  const [topic, setTopic] = useState<TopicType | undefined>(undefined);

  const { topicId } = useParams();

  useEffect(() => {
    const fetchTopic = async () => {
      if (!topicId) return;

      try {
        const result = await getTopicById(topicId);

        if (result.status === 200) {
          setTopic(result.data);
        }
      } catch (error) {
        console.error({ error });
      }
    };

    fetchTopic();
  }, [topicId]);

  return (
    <div className="h-[calc(100vh-50px)] bg-slate-50">
      {topic && (
        <div className="flex flex-col items-center">
          <TopicHeader topic={topic} />

          <Tabs
            defaultValue="discussions"
            className="flex flex-col items-center w-full"
          >
            <TabsList className="grid grid-cols-3 w-[600px]">
              <TabsTrigger value="discussions">
                <div className="flex gap-x-2 items-center">
                  Discussions
                  <Send size={16} />
                </div>
              </TabsTrigger>
              <TabsTrigger value="learning-paths">
                <div className="flex gap-x-2 items-center">
                  Learning paths
                  <Waypoints size={16} />
                </div>
              </TabsTrigger>
              <TabsTrigger value="learning-resources">
                <div className="flex gap-x-2 items-center">
                  Learning resources
                  <Book size={16} />
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="discussions">
              <DiscussionsTab topic={topic} />
            </TabsContent>
            <TabsContent value="learning-paths">
              <LearningPathsTab />
            </TabsContent>
            <TabsContent value="learning-resources">
              <LearningResourcesTab />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
