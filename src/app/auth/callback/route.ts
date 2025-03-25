import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return redirect(`/login?message=${error.message}`);
    }
  }

  return redirect(`${next}`);
}
