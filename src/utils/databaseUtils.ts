"use server";

import { createSupabaseClient } from "@/utils/supabase/server";

export interface Rating {
  comment?: string;
  overall: number;
  difficulty: number;
  usefulness: number;
  would_take_again: boolean;
  certification: number;
  user_id: string;
}

export async function addRating(rating: Rating) {
  const supabase = createSupabaseClient();

  const existingRatingsForUserForCert = await supabase
    .from("ratings")
    .select()
    .match({ certification: rating.certification, user_id: rating.user_id });

  if (
    existingRatingsForUserForCert.data?.length &&
    existingRatingsForUserForCert.data.length > 0
  ) {
    return "You have already added a rating for this certification";
  }

  const { error } = await supabase.from("ratings").insert(rating);

  if (error) {
    console.log(error.message);
    return error.message;
  }
}
