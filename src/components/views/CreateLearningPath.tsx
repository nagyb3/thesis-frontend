import { Button, Input } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LearningPathItems from "../learning-paths/LearningPathItems";
import { v4 as uuidv4 } from "uuid";
import { createLearningPath } from "@/api-client/modules/learningPathApiClient";

export type LearningPathItem = {
  id: string;
  title: string;
};

export default function CreateLearningPath() {
  const { topicId } = useParams();

  const [title, setTitle] = useState("");

  const [items, setItems] = useState<LearningPathItem[]>([
    { title: "New Item", id: uuidv4() },
  ]);

  const handleSaveNewLearningPath = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (items.length < 1) {
      alert("Please add at least one item to the learning path.");
      return;
    }

    const result = await createLearningPath({
      topicId: topicId ?? "",
      title,
      items,
    });

    if (result.status === 201) {
      window.location.href =
        "/topic/" + topicId + "/learning-path/" + result.data.id;
    }

    console.log({ result });
  };

  return (
    <div className="h-[calc(100vh-50px)] bg-background flex flex-col items-center gap-y-4 py-8">
      <a href={"/topic/" + topicId} className="self-start ml-16">
        <div className="flex gap-x-2 items-center hover:underline">
          <ArrowLeft size={20} />
          Back
        </div>
      </a>
      <p className="font-semibold text-xl">Create Learning Path:</p>
      <form
        onSubmit={(e) => handleSaveNewLearningPath(e)}
        className="flex justify-between items-end w-full max-w-[900px] px-4 gap-x-4"
      >
        <div className="flex flex-col items-center w-[500px] gap-y-2 w-full">
          <Label htmlFor="title" className="self-start">
            Title
          </Label>
          <Input
            isRequired
            classNames={{
              inputWrapper: "border-black/40 border",
            }}
            placeholder="Enter title..."
            variant="bordered"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </div>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
      <div className="max-w-[900px] w-full">
        <LearningPathItems items={items} setItems={setItems} />
      </div>
    </div>
  );
}
