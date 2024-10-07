/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { AddTopicDialog } from "../dialogs/AddTopicDialog";

export default function Home() {
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const result = await fetch(`${import.meta.env.VITE_API_URI}/topics`);

        const data = await result.json();
        setAllTopics(data);
      } catch (error) {
        console.error({ error });
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="min-h-[calc(100vh-50px)] bg-slate-50 flex flex-col items-center pb-8 px-8">
      <div className="flex flex-col max-w-[1200px] w-full">
        <div className="flex flex-col gap-y-2 m-8">
          <p className="text-4xl font-bold">Topics</p>
          <p className="text-lg">Explore our topics:</p>
          <AddTopicDialog>
            <p className="hover:underline mt-4 cursor-pointer">
              Don't see what you want? Create a new topic!
            </p>
          </AddTopicDialog>
        </div>
        <div className="flex flex-col gap-y-2">
          {allTopics.length > 0 ? (
            allTopics.map((topic: any) => (
              <Card
                onClick={() => (window.location.href = `/topic/${topic?.id}`)}
                className="p-4 cursor-pointer"
                key={topic?.id}
              >
                {topic?.name}
              </Card>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              There are no topics yet....
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
