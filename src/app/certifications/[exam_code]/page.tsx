import { createSupabaseClient } from "@/utils/supabase/server";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import Markdown from "react-markdown";
import RatingsSummaryCard from "@/components/RatingsSummaryCard";
import RatingsGrid from "@/components/RatingsGrid";
import AddRatingModal from "@/components/AddRatingModal";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { exam_code: string };
}) {
  const { exam_code } = params;
  const supabase = createSupabaseClient();
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
      {certification && (
        <>
          <H1
            preText={certification.name.split(" ").slice(0, -1).join(" ")}
            gradientText={certification.name.split(" ").slice(-1)}
          />

          <div className="mb-10 flex flex-col items-center justify-center gap-5">
            <RatingsSummaryCard ratings={certification.ratings || []} />
            <AddRatingModal certification_id={certification.id} />
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
