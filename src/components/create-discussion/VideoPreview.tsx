import { Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { memo, useMemo } from "react";

export const VideoPreview = memo(
  ({ videoFile, onRemove }: { videoFile: File; onRemove: () => void }) => {
    const urlObject = useMemo(
      () => URL.createObjectURL(videoFile),
      [videoFile]
    );

    return (
      <div className="relative">
        <video className="w-[500px] aspect-video" src={urlObject} controls />
        <Button
          color="danger"
          className="rounded-full absolute right-[-10px] top-[-10px] p-2 hover:bg-[rgb(243, 18, 96)]"
          onPress={onRemove}
        >
          <Trash2 />
        </Button>
      </div>
    );
  }
);
