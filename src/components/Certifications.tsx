import { createSupabaseClient } from "@/utils/supabase/server";
import CertificationCard from "./CertificationCard";
import H2 from "./H2";
import { SimpleGrid } from "@chakra-ui/react";
import CertificationGrid from "./CertificationsGrid";

export default async function Certifications() {
  const supabase = createSupabaseClient();
  const { data: certifications, error } = await supabase
    .from("certifications")
    .select(
      `
      id,
      name,
      description,
      exam_code,
      badge_image_url,
      ratings ( id, comment, overall, difficulty, usefulness, would_take_again, user_id )
    `,
    )
    .order("name", { ascending: true });

  return (
    <>
      {error ? (
        <>
          <H2 text="Could not get certifications" />
          <p>{error.message}</p>
          <p>{error.details}</p>
        </>
      ) : (
        <CertificationGrid certifications={certifications} />
      )}
    </>
  );
}
