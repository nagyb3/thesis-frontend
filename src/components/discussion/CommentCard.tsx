import { CommentType } from "@/types/CommentType";
import { Card } from "../ui/card";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function CommentCard({ comment }: { comment: CommentType }) {
  return (
    <Card className="flex flex-col gap-y-2 px-4 p-4">
      <div className="flex justify-between">
        <p className="font-semibold">
          @
          <a href="" className="hover:underline p-0">
            {" "}
            {comment?.author?.username}
          </a>
        </p>
        <p>
          {comment?.created_at &&
            dayjs(comment?.created_at)
              .tz(dayjs.tz.guess())
              .format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <p>{comment?.content}</p>
    </Card>
  );
}