import { createSupabaseClient } from "@/utils/supabase/server";
import CertificationCard from "./CertificationCard";
import H2 from "./H2";

export const revalidate = 0;

export default async function CertificationGrid() {
  const supabase = createSupabaseClient();
  const { data: certifications, error } = await supabase.from("certifications")
    .select(`
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
        </>
      ) : (
        <ul
          role="list"
          className="grid grid-flow-row gap-8 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((row) => (
            <li key={row.id}>
              <CertificationCard certification={row} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
