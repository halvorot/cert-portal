"use server";

import { createSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface Rating {
  comment?: string;
  overall: number;
  difficulty: number;
  usefulness: number;
  would_take_again: boolean;
  certification: number;
  user_id: string;
}

export async function deleteRating(idToDelete: number) {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("ratings")
    .delete()
    .match({ id: idToDelete });
  if (error) {
    return error;
  }
  revalidatePath("/certifications")
};

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
  revalidatePath(`/certifications`);
}
