import React from "react";

export default function RatingsBar({
  label,
  score,
  maxScore,
  variant = "default",
}: {
  label: string;
  score: number;
  maxScore: number;
  variant?: "default" | "slim";
}) {
  return (
    <div
      className={`flex w-full flex-col gap-2 ${
        variant === "slim" ? "text-sm" : "text-base"
      }`}
    >
      <div className="flex justify-between">
        <span className="font-light">{label}</span>
        <span className="font-medium">{score.toFixed(1)}</span>
      </div>
      <div className="relative flex w-full items-center">
        <span
          className={`absolute left-0 ${
            variant === "slim" ? "h-1" : "h-2"
          } w-full rounded-full bg-light-accent`}
        />
        <span
          style={{ width: `${(score / maxScore) * 100}%` }}
          className={`absolute left-0 ${
            variant === "slim" ? "h-1" : "h-2"
          } rounded-full bg-primary`}
        />
      </div>
    </div>
  );
}
