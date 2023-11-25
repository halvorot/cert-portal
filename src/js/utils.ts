import type { CertificationType } from "./types";

export function getWouldTakeAgainPercentage(
  certification: CertificationType,
): number | null {
  if (!certification.ratings || certification.ratings.length == 0) {
    return null;
  }
  const wouldTakeAgainList = certification.ratings.map(
    (rating) => rating.would_take_again,
  );

  const percentThatWouldTakeAgain =
    (wouldTakeAgainList.filter((value) => value === true).length /
      wouldTakeAgainList.length) *
    100;
  return percentThatWouldTakeAgain;
}