import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { createDiscussion } from "@/api-client/modules/discussionApiClient";
import { FileVideo2, ImageUp } from "lucide-react";
import BackButtonWithLink from "../BackButtonWithLink";
import { Button, Input, Textarea } from "@nextui-org/react";
import { ImagePreview } from "../create-discussion/ImagePreview";
import { VideoPreview } from "../create-discussion/VideoPreview";

export default function CreateDiscussion() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [videoFile, setVideoFile] = useState<File | undefined>(undefined);

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

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const base64Image = imageFile ? await fileToBase64(imageFile) : undefined;
    const base64Video = videoFile ? await fileToBase64(videoFile) : undefined;

    const result = await createDiscussion({
      title,
      content,
      topicId: topicId ?? "",
      image: base64Image,
      video: base64Video,
    });

    if (result.status === 201) {
      console.log("Discussion created successfully");
      window.location.href = "/topic/" + topicId;
    }
  };

  const handleImageInputClick = () => {
    const imageInput = document.getElementById("image-upload");
    imageInput?.click();
  };

  const handleVideoInputClick = () => {
    const videoInput = document.getElementById("video-upload");
    videoInput?.click();
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (e.target.files && e.target.files.length > 0) {
      const firstFile = e.target.files?.[0];

      if (firstFile?.type && !validImageTypes.includes(firstFile.type)) {
        alert("Invalid file type. Please upload a PNG, JPEG or JPG file.");
        return;
      } else {
        setImageFile(e.target.files[0]);
      }
    }
  };

  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validVideoTypes = ["video/mp4"];

    if (e.target.files && e.target.files.length > 0) {
      const firstFile = e.target.files?.[0];

      if (firstFile?.type && !validVideoTypes.includes(firstFile.type)) {
        alert("Invalid file type. Please upload a MP4 file.");
        return;
      } else {
        setVideoFile(e.target.files[0]);
      }
    }
  };

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const firstDroppedFile = Array.from(droppedFiles)[0];

      const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];

      if (!validImageTypes.includes(firstDroppedFile.type)) {
        alert("Invalid file type. Please upload a PNG, JPEG or JPG file.");
      } else {
        setImageFile(firstDroppedFile);
      }
    }
  };

  const handleVideoDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const firstDroppedFile = Array.from(droppedFiles)[0];

      const validVideoTypes = ["video/mp4"];

      if (!validVideoTypes.includes(firstDroppedFile.type)) {
        alert("Invalid file type. Please upload a PNG, JPEG or JPG file.");
      } else {
        setVideoFile(firstDroppedFile);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-50px)] bg-background flex flex-col items-center gap-y-4 py-8">
      <BackButtonWithLink backLink={"/topic/" + topicId} />
      <p className="font-semibold text-xl">Create New Discussion:</p>
      <form
        className="flex flex-col items-center max-w-[532px] px-4 w-full gap-y-6"
        onSubmit={(e) => handleCreate(e)}
      >
        <div className="flex flex-col gap-y-2 w-full">
          <Input
            classNames={{
              inputWrapper: "border-black/40 border",
            }}
            variant="bordered"
            label="Title"
            isRequired
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <Textarea
            classNames={{
              inputWrapper: "border-black/40 border",
            }}
            label="Content"
            variant="bordered"
            isRequired
            value={content}
            onChange={(e) => setContent(e.target.value)}
            id="content"
          />
        </div>
        {imageFile ? (
          <ImagePreview
            imageFile={imageFile}
            onRemove={() => setImageFile(undefined)}
          />
        ) : (
          <div
            onDrop={(e) => handleImageDrop(e)}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleImageInputClick()}
            className="cursor-pointer bg-default-100 h-[200px] w-full rounded border border-dashed border-default-400 flex justify-center items-center"
          >
            <div className="flex flex-col gap-y-2 items-center">
              <p className="text-default-500 text-base">
                Upload an Image for the discussions!
              </p>
              <ImageUp color="gray" />
              <p className="text-default-500 text-sm">(Max file size: 50mb)</p>
              <p className="text-default-500 text-sm">
                Supported file types: png, jpeg, jpg
              </p>
            </div>
            <input
              onChange={(e) => handleImageInputChange(e)}
              type="file"
              className="hidden"
              id="image-upload"
            />
          </div>
        )}
        {videoFile ? (
          <VideoPreview
            videoFile={videoFile}
            onRemove={() => setVideoFile(undefined)}
          />
        ) : (
          <div
            onDrop={(e) => handleVideoDrop(e)}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => handleVideoInputClick()}
            className="cursor-pointer bg-default-100 h-[200px] w-full rounded border border-dashed border-default-400 flex justify-center items-center"
          >
            <div className="flex flex-col gap-y-2 items-center">
              <p className="text-default-500 text-base">
                Upload a Video for the discussion!
              </p>
              <FileVideo2 color="gray" />
              <p className="text-default-500 text-sm">(Max file size: 50mb)</p>
              <p className="text-default-500 text-sm">
                Supported file types: mp4
              </p>
            </div>
            <input
              onChange={(e) => handleVideoInputChange(e)}
              type="file"
              className="hidden"
              id="video-upload"
            />
          </div>
        )}
        <Button color="primary" onChange={() => {}} type="submit">
          Submit Discussion
        </Button>
      </form>
    </div>
  );
}
