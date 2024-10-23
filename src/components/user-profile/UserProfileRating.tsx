import { Button } from "../ui/button";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useParams } from "react-router-dom";
import { createRating } from "@/api-client/modules/ratingApiClient";

export default function UserProfileRating({
  averageRating,
  numberOfRatings,
  isYourProfile = false,
  score,
  setScore,
}: {
  averageRating: number | undefined;
  numberOfRatings: number | undefined;
  isYourProfile?: boolean;
  score?: number;
  setScore?: (score: number) => void;
}) {
  const { userId } = useParams();

  const handleSubmitRating = async () => {
    if (!score) return;
    const result = await createRating({
      score: score,
      toUser: userId,
    });

    if (result.status === 201 || result.status === 200) {
      window.location.reload();
    }
    console.log({ result });
  };

  return (
    <div className="grid grid-cols-2 gap-x-4">
      <div className="flex flex-col gap-y-4">
        <p className="text-2xl font-semibold">Rating:</p>
        {averageRating && numberOfRatings ? (
          <>
            <p>
              <span className="font-semibold">
                {averageRating.toFixed(2)}/5
              </span>
              {"  "}
              (from {numberOfRatings} ratings)
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500">
            {isYourProfile
              ? "You have not received any ratings yet."
              : "This user has not received any ratings yet."}
          </p>
        )}
      </div>
      {!isYourProfile && score && setScore && (
        <div className="flex flex-col gap-y-4">
          <p>Give a rating!</p>
          <div className="flex gap-x-4 items-center">
            <Rating
              value={score}
              onChange={setScore}
              style={{
                maxWidth: "170px",
              }}
            />
            <Button variant="secondary" onClick={() => handleSubmitRating()}>
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
