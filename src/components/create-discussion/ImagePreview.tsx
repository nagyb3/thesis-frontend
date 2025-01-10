import { Button } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import { memo, useMemo } from "react";

export const ImagePreview = memo(
  ({ imageFile, onRemove }: { imageFile: File; onRemove: () => void }) => {
    const urlObject = useMemo(
      () => URL.createObjectURL(imageFile),
      [imageFile]
    );

    return (
      <div className="relative">
        <img src={urlObject} alt="Preview" className="w-full h-auto" />
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
