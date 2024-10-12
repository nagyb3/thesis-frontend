import {
  getDiscussionById,
  getTopicById,
} from "@/api-client/modules/topicApiClient";
import { DiscussionType } from "@/types/DiscussionType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../ui/card";
import DiscussionFeedback from "../discussion/DiscussionFeedback";
import CommentCard from "../discussion/CommentCard";
import { CommentType } from "@/types/CommentType";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { createComment } from "@/api-client/modules/commentApiClient";
import DeleteDiscussionDialog from "../dialogs/DeleteDiscussionDialog";
import EditDiscussionDialog from "../dialogs/EditDiscussionDialog";
import { TopicType } from "@/types/TopicType";

export default function Discussion() {
  const { discussionId, topicId } = useParams();

  const [discussion, setDiscussion] = useState<DiscussionType | undefined>(
    undefined
  );

  const [topic, setTopic] = useState<TopicType | undefined>(undefined);

  const fetchDiscussion = async () => {
    const result = await getDiscussionById(discussionId ?? "");

    if (result.status === 200) {
      setDiscussion(result.data);
    }
  };

  const fetchTopic = async () => {
    const result = await getTopicById(topicId ?? "");

    if (result.status === 200) {
      setTopic(result.data);
    }
  };

  useEffect(() => {
    fetchDiscussion();
    fetchTopic();
  }, [discussionId, topicId]);

  const handleSubmitComment = async () => {
    const result = await createComment({
      content: inputState,
      discussionId: discussionId ?? "",
    });

    if (result.status === 201) {
      setDiscussion(
        discussion
          ? {
              ...discussion,
              comments: [...(discussion?.comments ?? []), result.data],
            }
          : discussion
      );

      setInputState("");
    }
  };

  const [inputState, setInputState] = useState("");

  const { profile } = useAuthContext();

  const isCurrentUserAuthorOfDiscussion =
    discussion?.author?.id === profile?.id;

  return (
    <div className="min-h-[calc(100vh-50px)] bg-slate-50 flex flex-col items-center py-8 gap-y-4">
      <a href={"/topic/" + topicId} className="self-start ml-16">
        <div className="flex gap-x-2 items-center hover:underline">
          <ArrowLeft size={20} />
          Back
        </div>
      </a>
      <Card className="py-4 px-8 w-[900px]">
        <div className="flex gap-x-2 items-center justify-between">
          <p className="font-semibold text-xl">{discussion?.title}</p>
          <div className="flex">
            <DiscussionFeedback
              discussion={discussion}
              fetchDiscussion={fetchDiscussion}
            />
            {isCurrentUserAuthorOfDiscussion && (
              <>
                <EditDiscussionDialog discussion={discussion}>
                  <Button
                    variant="outline"
                    className="ml-4 px-0 w-[42px] h-[42px]"
                  >
                    <Pencil />
                  </Button>
                </EditDiscussionDialog>
                <DeleteDiscussionDialog discussion={discussion}>
                  <Button
                    variant="destructive"
                    className="ml-2 px-0 w-[42px] h-[42px]"
                  >
                    <Trash />
                  </Button>
                </DeleteDiscussionDialog>
              </>
            )}
          </div>
        </div>
        <p className="pb-4 ml-8">
          Author:{" "}
          <a
            href={
              discussion?.author?.id === profile?.id
                ? "/your-profile"
                : "/user/" + discussion?.author?.id
            }
            className="font-bold hover:underline"
          >
            @{discussion?.author?.username}
          </a>
        </p>
        <p>{discussion?.content}</p>
      </Card>
      <Card className="py-4 px-8 w-[900px] flex flex-col gap-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitComment();
          }}
          className="py-4 flex gap-x-4 items-end"
        >
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="comment">Send a new comment:</Label>
            <Input
              required
              id="comment"
              onChange={(e) => setInputState(e.target.value)}
              value={inputState}
              className="p-2 border border-gray-300 rounded w-[300px]"
              placeholder="Write a comment..."
            />
          </div>
          <Button type="submit">Send</Button>
        </form>
        <p className="text-lg">Comments:</p>
        <div className="flex flex-col gap-y-2">
          {discussion?.comments
            .sort(
              (a, b) =>
                new Date(b?.created_at).getTime() -
                new Date(a?.created_at).getTime()
            )
            .map((comment: CommentType) => (
              <CommentCard comment={comment} key={comment?.id} topic={topic} />
            ))}
        </div>
      </Card>
    </div>
  );
}
