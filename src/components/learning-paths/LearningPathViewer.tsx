import Arrow, { DIRECTION } from "react-arrows";
import LearningPathItemInViewer from "./LearningPathItemInViewer";

export default function LearningPathViewer({
  items,
}: {
  items?: { title: string; id: string }[];
}) {
  console.log();
  return (
    items &&
    items.length > 0 &&
    items.map((item, index) => (
      <div key={item.id}>
        <LearningPathItemInViewer item={item} />

        {index !== items.length - 1 && (
          <Arrow
            className="arrow"
            from={{
              direction: DIRECTION.BOTTOM,
              node: () => document.getElementById(item.id),
              translation: [0, 0],
            }}
            to={{
              direction: DIRECTION.TOP,
              node: () => document.getElementById(items[index + 1].id),
              translation: [0, 0],
            }}
          />
        )}
      </div>
    ))
  );
}
