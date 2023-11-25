import React from "react";

export default function RatingsBar({
  label,
  scores,
  maxScore,
}: {
  label: string;
  scores: number[];
  maxScore: number;
}) {
  const averageScore = scores.reduce((total, next) => total + next, 0) / scores.length;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between">
        <span className=" font-light">{label}</span>
        <span className=" font-medium">{averageScore.toFixed(1)}</span>
      </div>
      <div className="relative flex w-full items-center">
        <span className="absolute left-0 z-10 h-2 w-full rounded-full bg-light-accent" />
        <span
          style={{ width: `${(averageScore / maxScore) * 100}%` }}
          className="absolute left-0 z-20 h-2 rounded-full bg-primary"
        />
      </div>
    </div>
  );
}
