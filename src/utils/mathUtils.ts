interface Rating {
  id: number;
  would_take_again: boolean;
}

export function getWouldTakeAgainPercentage(ratings: Rating[]): number | null {
  if (!ratings || ratings.length == 0) {
    return null;
  }
  const wouldTakeAgainList = ratings.map((rating) => rating.would_take_again);

  return (
    (wouldTakeAgainList.filter((value) => value).length /
      wouldTakeAgainList.length) *
    100
  );
}

export function getAverage(list: number[]): number {
  return list.reduce((total, next) => total + next, 0) / list.length;
}
