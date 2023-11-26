import { RatingType } from "@/js/types";
import React from "react";
import RatingsBar from "./RatingBar";
import { MAX_SCORE } from "@/js/constants";
import {
  BsCheck,
  BsCheckCircleFill,
  BsPatchCheckFill,
  BsPatchExclamationFill,
  BsXCircleFill,
  BsXLg,
  BsXOctagonFill,
} from "react-icons/bs";

export default function RatingCard({ rating }: { rating: RatingType }) {
  return (
    <div className="relative flex w-96 flex-col justify-between gap-4 rounded-md bg-dark-accent p-4 pb-5">
      <RatingsBar
        label="Overall score"
        score={rating.overall}
        maxScore={MAX_SCORE}
        variant="slim"
      />
      <RatingsBar
        label="Difficulty"
        score={rating.difficulty}
        maxScore={MAX_SCORE}
        variant="slim"
      />
      <RatingsBar
        label="Usefulness"
        score={rating.usefulness}
        maxScore={MAX_SCORE}
        variant="slim"
      />
      <div className="flex items-center gap-2 text-sm">
        Would take again?
        {rating.would_take_again ? (
          <div className="text-success flex items-center gap-1">
            <BsPatchCheckFill /> <p>Yes</p>
          </div>
        ) : (
          <div className="text-error flex items-center gap-1">
            <BsXOctagonFill /> <p>No</p>
          </div>
        )}
      </div>
      {rating.comment && (
        <p className="line-clamp-3 text-sm text-light-accent">
          {rating.comment}
        </p>
      )}
    </div>
  );
}
