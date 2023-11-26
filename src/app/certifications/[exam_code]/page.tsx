import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";
import H1 from "@/components/H1";
import { BsArrowLeft,} from "react-icons/bs";
import H2 from "@/components/H2";
import Link from "next/link";
import Markdown from "react-markdown";
import RatingsSummaryCard from "@/components/RatingsSummaryCard";
import RatingsGrid from "@/components/RatingsGrid";

export default async function Page({
  params,
}: {
  params: { exam_code: string };
}) {
  const { exam_code } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: certification, error } = await supabase
    .from("certifications")
    .select(
      `
        id,
        name,
        description,
        exam_code,
        badge_image_url,
        ratings ( id, comment, overall, difficulty, usefulness, would_take_again )`,
    )
    .eq("exam_code", exam_code)
    .single();

  if (error) {
    return (
      <>
        <H2 text="An error occurred when fetching data about the certification" />
        <p>{error.message}</p>
      </>
    );
  }
  if (!certification) {
    return (
      <H2 text={`No certification with the exam code ${exam_code} found`} />
    );
  }
  return (
    <>
      <Link
        href="/"
        className="group absolute left-8 top-8 flex items-center rounded-md bg-dark-accent px-4 py-2 text-sm text-light no-underline hover:bg-light-accent/20"
      >
        <BsArrowLeft className="w-4" />
        Back
      </Link>
      {certification && (
        <>
          <H1
            preText={certification.name.split(" ").slice(0, -1).join(" ")}
            gradientText={certification.name.split(" ").slice(-1)}
          />
          
          <div className="mb-20 flex justify-center">
            <RatingsSummaryCard ratings={certification.ratings || []} />
          </div>
          {certification.description && (
            <>
              <H2 text="Description" />
              <Markdown className="markdown mb-20">
                {certification.description}
              </Markdown>
            </>
          )}
          {certification.ratings.length > 0 && (
            <>
              <H2 text="Ratings" />
              <RatingsGrid ratings={certification.ratings} />
            </>
          )}
        </>
      )}
    </>
  );
}
