import { RatingType } from "@/js/types";
import React from "react";
import { BsChatRightQuote } from "react-icons/bs";
import RatingsBar from "./RatingBar";

export default function RatingsSummary({ ratings }: { ratings: RatingType[] }) {
  const MAX_SCORE = 5;

  const averageOverallScore =
    ratings.reduce((total, next) => total + next.overall, 0) / ratings.length;

  return (
    <div className="relative flex gap-4 w-96 flex-col justify-between rounded-md bg-dark-accent p-4 pb-5 text-center">
      {ratings.length > 0 ? (
        <>
          <div className="flex w-full gap-2">
            <span className="text-3xl font-light">
              {averageOverallScore.toFixed(1)}
            </span>
            <div className="relative flex w-full items-center">
              <span className="absolute left-0 z-10 h-2 w-full rounded-full bg-light-accent" />
              <span
                style={{ width: `${(averageOverallScore / MAX_SCORE) * 100}%` }}
                className="absolute left-0 z-20 h-2 rounded-full bg-primary"
              />
            </div>
            <div className="flex items-center">
              <BsChatRightQuote className="mx-2 w-4" />
              {ratings.length}
            </div>
          </div>
          <RatingsBar
            label="Usefullness"
            maxScore={5}
            scores={ratings.map((rating) => rating.usefulness)}
          />
          <RatingsBar
            label="Difficulty"
            maxScore={5}
            scores={ratings.map((rating) => rating.difficulty)}
          />
        </>
      ) : (
        <span>No ratings yet</span>
      )}
    </div>
  );
}
