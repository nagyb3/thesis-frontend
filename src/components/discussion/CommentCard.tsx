import { CommentType } from "@/types/CommentType";
import { Card } from "../ui/card";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMemo } from "react";
import { TopicType } from "@/types/TopicType";
import DeleteCommentDialog from "../dialogs/DeleteCommentDialog";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function CommentCard({
  comment,
  topic,
}: {
  comment: CommentType;
  topic: TopicType | undefined;
}) {
  const { profile } = useAuthContext();

  const allowDeleteComment = useMemo(
    () =>
      comment?.author?.id === profile?.id ||
      topic?.moderators?.some((moderator) => moderator.id === profile?.id),
    [comment, profile]
  );

  console.log({ topic });

  return (
    <Card className="flex flex-col gap-y-2 px-4 p-4">
      <div className="flex justify-between h-[40px] items-center">
        <p className="font-semibold">
          <a
            href={
              comment?.author?.id === profile?.id
                ? "/your-profile"
                : "/user/" + comment?.author?.id
            }
            className="hover:underline p-0"
          >
            @{comment?.author?.username}
          </a>
        </p>
        <div className="flex gap-x-4 items-center">
          <p>
            {comment?.created_at &&
              dayjs(comment?.created_at)
                .tz(dayjs.tz.guess())
                .format("YYYY-MM-DD HH:mm:ss")}
          </p>
          {allowDeleteComment && (
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" className="p-0 w-[40px]">
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="h-fit">
                <DeleteCommentDialog comment={comment}>
                  <Button variant="destructive">Delete comment</Button>
                </DeleteCommentDialog>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <p>{comment?.content}</p>
    </Card>
  );
}
