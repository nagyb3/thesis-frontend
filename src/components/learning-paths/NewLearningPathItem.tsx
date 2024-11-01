import { Button, Card, Input } from "@nextui-org/react";
import { LearningPathItem } from "../views/CreateLearningPath";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

export default function NewLearningPathItem({
  item,
  setItems,
}: {
  item: LearningPathItem;
  setItems: React.Dispatch<React.SetStateAction<LearningPathItem[]>>;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newItemTitle, setNewItemTitle] = useState<string>(item.title);
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItems((prevItems) =>
      prevItems.map((prevItem) => {
        if (prevItem.id === item.id) {
          return {
            ...prevItem,
            title: newItemTitle,
          };
        }
        return prevItem;
      })
    );
    setIsEditing(false);
  };

  const handleDeleteItem = () => {
    setItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.id !== item.id)
    );
  };

  return (
    <Card
      classNames={{
        base: "border-black/20 border",
      }}
      id={item.id}
      className="bg-background p-4 flex justify-center items-center h-[80px]"
    >
      <div className="flex gap-x-2 items-center">
        {!isEditing ? (
          <>
            <p>{item.title}</p>
            <Button
              onPress={() => setIsEditing(true)}
              size="sm"
              isIconOnly
              variant="light"
            >
              <Pencil size={18} />
            </Button>
            <Button
              onPress={() => handleDeleteItem()}
              size="sm"
              isIconOnly
              variant="light"
            >
              <Trash size={18} color="red" />
            </Button>
          </>
        ) : (
          <form
            onSubmit={(e) => handleSave(e)}
            className="flex gap-x-2 items-center"
          >
            <Input
              isRequired
              type="text"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              classNames={{
                inputWrapper: "border-black/40 border",
              }}
              placeholder="Item title..."
              variant="bordered"
            />
            <Button type="submit" color="success">
              Save
            </Button>
            <Button
              onClick={() => {
                setIsEditing(false);
                setNewItemTitle(item.title);
              }}
            >
              Cancel
            </Button>
          </form>
        )}
      </div>
    </Card>
  );
}
