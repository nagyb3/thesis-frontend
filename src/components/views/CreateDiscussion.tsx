import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { createDiscussion } from "@/api-client/modules/discussionApiClient";
import { ImageUp, Trash2 } from "lucide-react";
import BackButtonWithLink from "../BackButtonWithLink";

export default function CreateDiscussion() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [file, setFile] = useState<File | undefined>(undefined);

  const { topicId } = useParams();

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleCreate = async () => {
    const base64Image = file ? await fileToBase64(file) : undefined;

    const result = await createDiscussion({
      title,
      content,
      topicId: topicId ?? "",
      image: base64Image,
    });

    if (result.status === 201) {
      console.log("Discussion created successfully");
      window.location.href = "/topic/" + topicId;
    }
  };

  const handleUploadClick = () => {
    const fileUploadInput = document.getElementById("file-upload");
    fileUploadInput?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("handle drop fired");
    event.preventDefault();
    event.stopPropagation();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const firstDroppedFile = Array.from(droppedFiles)[0];

      const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!validImageTypes.includes(firstDroppedFile.type)) {
        alert("Invalid file type. Please upload a PNG, JPEG or JPG file.");
      } else {
        setFile(firstDroppedFile);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-50px)] bg-neutral-100 flex flex-col items-center gap-y-4 py-8">
      <BackButtonWithLink backLink={"/topic/" + topicId} />
      <p className="font-semibold text-xl">Create New Discussion:</p>
      <div className="flex flex-col items-center w-[500px] gap-y-6">
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
        {file ? (
          <div className="relative">
            <img src={URL.createObjectURL(file)} alt="" />
            <Button
              variant="destructive"
              className="rounded-full absolute right-[-10px] top-[-10px] p-2"
              onClick={() => setFile(undefined)}
            >
              <Trash2 />
            </Button>
          </div>
        ) : (
          <div
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleUploadClick()}
            className="cursor-pointer bg-neutral-200 h-[200px] w-full rounded border border-dashed border-black flex justify-center items-center"
          >
            <div className="flex flex-col gap-y-2 items-center">
              <p className="text-gray-500 text-base">
                Upload an image for the discussions!
              </p>
              <ImageUp color="gray" />
              <p className="text-gray-500 text-sm">(Max file size: 50mb)</p>
            </div>
            <input
              onChange={(e) => handleInputChange(e)}
              type="file"
              className="hidden"
              id="file-upload"
            />
          </div>
        )}
        <Button onChange={() => {}} onClick={() => handleCreate()}>
          Submit Discussion
        </Button>
      </div>
    </div>
  );
}
