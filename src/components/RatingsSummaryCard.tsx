import { RatingType } from "@/js/types";
import React from "react";
import { BsChatRightQuote } from "react-icons/bs";
import RatingsBar from "./RatingBar";
import { getAverage, getWouldTakeAgainPercentage } from "@/js/utils";
import { MAX_SCORE } from "@/js/constants";

export default function RatingsSummaryCard({
  ratings,
}: {
  ratings: RatingType[];
}) {
  const averageOverallScore =
    ratings.reduce((total, next) => total + next.overall, 0) / ratings.length;

  const wouldTakeAgainPercentage = getWouldTakeAgainPercentage(ratings);

  return (
    <div className="relative flex w-96 flex-col justify-between gap-4 rounded-md bg-dark-accent p-4 text-center">
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
            score={getAverage(ratings.map((rating) => rating.usefulness))}
            maxScore={MAX_SCORE}
          />
          <RatingsBar
            label="Difficulty"
            score={getAverage(ratings.map((rating) => rating.difficulty))}
            maxScore={MAX_SCORE}
          />
          <div
            className={`mt-1 font-medium ${
              wouldTakeAgainPercentage && wouldTakeAgainPercentage < 50
                ? "text-error"
                : "text-success"
            }`}
          >
            {ratings.length > 0 &&
              wouldTakeAgainPercentage + "% would take again!"}
          </div>
        </>
      ) : (
        <span>No ratings yet</span>
      )}
    </div>
  );
}
