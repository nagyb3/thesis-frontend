import { useEffect, useState } from "react";
import { AddTopicDialog } from "../dialogs/AddTopicDialog";
import { TopicType } from "@/types/TopicType";
import { getTopics } from "@/api-client/modules/topicApiClient";
import { Card, Input, Link } from "@nextui-org/react";

export default function Home() {
  const [allTopics, setAllTopics] = useState([]);
  const fetchTopics = async (name: string = "") => {
    try {
      const result = await getTopics(name);

      setAllTopics(result.data);
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTopicSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSearchInput = e.target.value;

    fetchTopics(newSearchInput);
  };

  return (
    <div className="min-h-[calc(100vh-50px)] bg-background flex flex-col items-center pb-8 px-8">
      <div className="flex flex-col max-w-[1100px] w-full">
        <div className="flex flex-col gap-y-2 m-8">
          <p className="text-4xl font-bold">Topics</p>
          <p className="text-lg">
            Explore that topics you can learn more about!
          </p>
          <AddTopicDialog>
            <p className="hover:underline mt-4 cursor-pointer w-fit">
              Don't see what you want? Create a new topic!
            </p>
          </AddTopicDialog>
        </div>
        <Input
          classNames={{
            inputWrapper: "border-black/40 border",
          }}
          variant="bordered"
          className="w-[400px] text-sm mb-8"
          placeholder="Search for name of topic..."
          onChange={handleTopicSearchInputChange}
        />
        {allTopics.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {allTopics.map((topic: TopicType) => (
              <Link href={`/topic/${topic?.id}`} key={topic?.id}>
                <Card
                  classNames={{
                    base: "border-black/20 border",
                  }}
                  className="p-4 cursor-pointer w-full h-full"
                >
                  <p className="text-lg">{topic?.name}</p>
                  <p className="text-sm text-gray-500 truncate">
                    {topic?.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            There are no topics yet....
          </p>
        )}
      </div>
    </div>
  );
}
