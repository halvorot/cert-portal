import type { RatingType } from "./types";

interface Rating {
  id: number;
  would_take_again: boolean;
}

export function getWouldTakeAgainPercentage(
  ratings: Rating[],
): number | null {
  if (!ratings || ratings.length == 0) {
    return null;
  }
  const wouldTakeAgainList = ratings.map((rating) => rating.would_take_again);

  const percentThatWouldTakeAgain =
    (wouldTakeAgainList.filter((value) => value === true).length /
      wouldTakeAgainList.length) *
    100;
  return percentThatWouldTakeAgain;
}

export function getAverage(list: number[]): number {
  return list.reduce((total, next) => total + next, 0) / list.length;
}
