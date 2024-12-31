import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@nextui-org/react";
import Arrow, { DIRECTION } from "react-arrows";
import { useState } from "react";
import { Plus } from "lucide-react";
import NewLearningPathItem from "./NewLearningPathItem";
import { reorder } from "./utils/reorder";
import { LearningPathItem } from "../views/CreateLearningPath";
import { v4 as uuidv4 } from "uuid";

export default function LearningPathItems({
  items,
  setItems,
}: {
  items: LearningPathItem[];
  setItems: React.Dispatch<React.SetStateAction<LearningPathItem[]>>;
}) {
  const [hideArrows, setHideArrows] = useState<boolean>(false);

  const onDragEnd = (result: DropResult<string>) => {
    setHideArrows(false);
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reorderedItems);
  };

  const handleAddNewPathItem = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        title: "New Item",
      },
    ]);
  };

  return (
    <div>
      <DragDropContext
        onDragStart={() => setHideArrows(true)}
        onDragEnd={(e) => onDragEnd(e)}
      >
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div
              className="flex flex-col gap-y-8 p-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <div key={item.id}>
                  <Draggable draggableId={item.id} index={items.indexOf(item)}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <NewLearningPathItem item={item} setItems={setItems} />
                      </div>
                    )}
                  </Draggable>
                  {index !== items.length - 1 && !hideArrows && (
                    <Arrow
                      className="arrow"
                      from={{
                        direction: DIRECTION.BOTTOM,
                        node: () => document.getElementById(item.id),
                        translation: [0, 0],
                      }}
                      to={{
                        direction: DIRECTION.TOP,
                        node: () =>
                          document.getElementById(items[index + 1].id),
                        translation: [0, 0],
                      }}
                    />
                  )}
                </div>
              ))}
              {provided.placeholder}
              <Button
                onPress={() => handleAddNewPathItem()}
                color="primary"
                className="w-full h-[80px] text-lg"
              >
                <Plus color="white" />
                Add new item
              </Button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
