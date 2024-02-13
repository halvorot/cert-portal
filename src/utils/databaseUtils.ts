"use server";

import { createSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface Certification {
  name: string;
  description?: string;
  exam_code: string;
  url: string;
  badge_image_url?: string;
  user_id: string;
}

export interface Rating {
  comment?: string;
  overall: number;
  easiness: number;
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
  revalidatePath("/certifications");
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
  revalidatePath(`/certifications`);
}

export async function addCertification(certification: Certification) {
  const supabase = createSupabaseClient();

  if (certification.name.trim().length === 0) {
    return "Name cannot be empty.";
  }
  if (certification.exam_code.trim().length === 0) {
    return "Exam code cannot be empty.";
  }
  if (certification.url.trim().length === 0) {
    return "URL cannot be empty.";
  }
  if (certification.user_id.trim().length === 0) {
    return "User must be defines. Make sure you're logged in correctly.";
  }

  const existingCertWithExamCode = await supabase
    .from("certifications")
    .select()
    .match({ exam_code: certification.exam_code })
    .single();

  if (existingCertWithExamCode.data) {
    return `A certification with exam code '${certification.exam_code}' already exists`;
  }

  const { error } = await supabase.from("certifications").insert(certification);

  if (error) {
    console.log(error.message);
    return error.message;
  }
  revalidatePath("/");
}

export async function deleteCertification(idToDelete: number) {
  const supabase = createSupabaseClient();
  const certification = await supabase
    .from("certifications")
    .select(
      `
      id,
      badge_image_url
      `,
    )
    .match({ id: idToDelete })
    .single();
  const { error: deleteImageError } = await supabase
    .storage
    .from("certification-badges")
    .remove([certification.data?.badge_image_url.split('certification-badges/')[1]]);
  if (deleteImageError) {
    return deleteImageError;
  }
  const { error } = await supabase
    .from("certifications")
    .delete()
    .match({ id: idToDelete });
  if (error) {
    return error;
  }
  revalidatePath("/");
  redirect("/");
}
