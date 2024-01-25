import { createSupabaseClient } from "@/utils/supabase/server";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import Markdown from "react-markdown";
import RatingsSummaryCard from "@/components/RatingsSummaryCard";
import AddRatingModal from "@/components/AddRatingModal";
import RealtimeRatings from "@/components/RealtimeRatings";
import { Flex, SlideFade, Stack } from "@chakra-ui/react";
import DeleteCertificationButton from "@/components/DeleteCertificationButton";

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
        user_id,
        ratings ( id, comment, overall, easiness, usefulness, would_take_again, certification, user_id )`,
    )
    .eq("exam_code", exam_code)
    .single();

  if (error) {
    return (
      <Stack textAlign="center">
        <H2 text="An error occurred when fetching data about the certification" />
        {error.code === "PGRST116" ? (
          <p>No certification with the exam code '{exam_code}' was found</p>
        ) : (
          <>
            <p>{error.message}</p>
            <p>{error.details}</p>
          </>
        )}
      </Stack>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {certification && (
        <SlideFade in={true} offsetY={"20px"}>
          <H1
            preText={certification.name.split(" ").slice(0, -1).join(" ")}
            gradientText={certification.name.split(" ").slice(-1)}
          />

          <Flex
            marginBottom="3.5rem"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap="1.25rem"
          >
            {user && user.id === certification.user_id && (
              <DeleteCertificationButton certification_id={certification.id} />
            )}
            <RatingsSummaryCard ratings={certification.ratings || []} />
            <AddRatingModal certificationId={certification.id} />
          </Flex>
          {certification.description && (
            <>
              <H2 text="Description" />
              <Markdown className="markdown">
                {certification.description}
              </Markdown>
            </>
          )}

          <H2 text="Ratings" />
          <RealtimeRatings
            serverRatings={certification.ratings}
            certificationId={certification.id}
          />
        </SlideFade>
      )}
    </>
  );
}
