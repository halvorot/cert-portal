"use server";

import { createSupabaseClient } from "@/utils/supabase/server";

interface Certification {
  id: number;
  name: string;
  exam_code: string;
  badge_image_url?: string;
  ratings: Rating[];
}

interface Rating {
  id: number;
  would_take_again: boolean;
}

export default async function fetchCertifications({
  page = 0,
  search,
}: {
  page?: number;
  search?: string;
}) {
  const ITEMS_PER_PAGE = 20;
  const { from, to } = getRange(page, ITEMS_PER_PAGE);
  const supabase = createSupabaseClient();

  if (search && search.length > 0) {
    return await supabase
      .from("certifications")
      .select(
        `
        id,
        name,
        exam_code,
        badge_image_url,
        ratings ( id, would_take_again )
        `,
      )
      .textSearch("examcode_name_description", search, {
        type: "websearch",
        config: "english",
      })
      .order("name", { ascending: true })
      .range(from, to);
  }
  return await supabase
    .from("certifications")
    .select(
      `
      id,
      name,
      exam_code,
      badge_image_url,
      ratings ( id, would_take_again )
      `,
    )
    .order("name", { ascending: true })
    .range(from, to);
}

function getRange(currentPage: number, itemsPerPage: number) {
  const from = currentPage * itemsPerPage;
  const to = from + itemsPerPage - 1;
  return { from, to };
}
