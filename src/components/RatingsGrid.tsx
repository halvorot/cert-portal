import CertificationCard from "./CertificationCard";
import H2 from "./H2";
import { CertificationType, RatingType } from "@/js/types";
import RatingCard from "./RatingCard";
import React from "react";

export default async function RatingsGrid({
  ratings,
}: {
  ratings: RatingType[];
}) {
  return (
    <ul
      role="list"
      className="grid grid-flow-row gap-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    >
      {ratings.map((rating) => (
        <li key={rating.id}>
          <RatingCard rating={rating} />
        </li>
      ))}
    </ul>
  );
}
