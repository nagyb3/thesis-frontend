import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { createDiscussion } from "@/api-client/modules/discussionApiClient";
import { ArrowLeft } from "lucide-react";

export default function CreateDiscussion() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { topicId } = useParams();

  const handleCreate = async () => {
    const result = await createDiscussion({
      title,
      content,
      topicId: topicId ?? "",
    });

    if (result.status === 201) {
      console.log("Discussion created successfully");
      window.location.href = "/topic/" + topicId;
    }
  };

  return (
    <div className="h-[calc(100vh-50px)] bg-slate-50 flex flex-col items-center gap-y-4 py-8">
      <a href={"/topic/" + topicId} className="self-start ml-16">
        <div className="flex gap-x-2 items-center hover:underline">
          <ArrowLeft size={20} />
          Back
        </div>
      </a>
      <p className="font-semibold text-xl">Create New Discussion:</p>
      <div className="flex flex-col items-center w-[500px] gap-y-4">
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="title">Title</Label>
          <Input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Label htmlFor="Content">Content</Label>
          <Textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
          />
        </div>
        <Button onClick={() => handleCreate()}>Submit Discussion</Button>
      </div>
    </div>
  );
}
