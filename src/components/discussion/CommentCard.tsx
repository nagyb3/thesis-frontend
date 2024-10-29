import { CommentType } from "@/types/CommentType";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useAuthContext } from "@/contexts/AuthContext";
import { Ellipsis } from "lucide-react";
import { useMemo, useState } from "react";
import { TopicType } from "@/types/TopicType";
import DeleteCommentDialog from "../dialogs/DeleteCommentDialog";
import {
  Button,
  Card,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";

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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

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
            <Popover
              showArrow={true}
              placement="bottom"
              isOpen={isPopoverOpen}
              onOpenChange={() => setIsPopoverOpen((prev) => !prev)}
            >
              <PopoverTrigger>
                <Button isIconOnly variant="faded" className="p-0 w-[40px]">
                  <Ellipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="h-fit p-2">
                <Button
                  onPress={() => {
                    setIsPopoverOpen((prev) => !prev);
                    onOpen();
                  }}
                  color="danger"
                >
                  Delete comment
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div>
        {comment?.content && (
          <p>
            {comment?.content.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}
      </div>
      <DeleteCommentDialog
        comment={comment}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </Card>
  );
}
