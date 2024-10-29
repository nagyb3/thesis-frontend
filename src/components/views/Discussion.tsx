import {
  getDiscussionById,
  getTopicById,
} from "@/api-client/modules/topicApiClient";
import { DiscussionType } from "@/types/DiscussionType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiscussionFeedback from "../discussion/DiscussionFeedback";
import CommentCard from "../discussion/CommentCard";
import { CommentType } from "@/types/CommentType";
import { Label } from "@radix-ui/react-label";
import { useAuthContext } from "@/contexts/AuthContext";
import { createComment } from "@/api-client/modules/commentApiClient";
import DeleteDiscussionDialog from "../dialogs/DeleteDiscussionDialog";
import EditDiscussionDialog from "../dialogs/EditDiscussionDialog";
import { TopicType } from "@/types/TopicType";
import BackButtonWithLink from "../BackButtonWithLink";
import { Button, Card, Textarea } from "@nextui-org/react";

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
    <div className="min-h-[calc(100vh-50px)] bg-background flex flex-col items-center py-8 gap-y-4">
      <BackButtonWithLink backLink={"/topic/" + topicId} />
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
                <EditDiscussionDialog discussion={discussion} />
                <DeleteDiscussionDialog discussion={discussion} />
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
        <div>
          {discussion?.content && (
            <p>
              {discussion?.content.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          )}
        </div>
        {discussion?.image && (
          <div className="flex justify-center">
            <img
              src={discussion.image}
              className="max-h-[300px] max-w-full self-center"
              alt="image for the discussion"
            />
          </div>
        )}
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
            <Textarea
              isRequired
              variant="faded"
              id="comment"
              onChange={(e) => setInputState(e.target.value)}
              value={inputState}
              className="w-[400px]"
              placeholder="Write a comment..."
            />
          </div>
          <Button color="primary" type="submit">
            Send
          </Button>
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
