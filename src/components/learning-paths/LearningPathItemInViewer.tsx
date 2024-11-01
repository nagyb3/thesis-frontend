import { Card } from "@nextui-org/react";

export default function LearningPathItemInViewer({
  item,
}: {
  item: { title: string; id: string };
}) {
  return (
    <Card
      classNames={{
        base: "border-black/20 border",
      }}
      id={item.id}
      className="bg-background p-4 flex justify-center items-center h-[80px]"
    >
      <div className="flex gap-x-2 items-center">
        <p>{item?.title}</p>
      </div>
    </Card>
  );
}
