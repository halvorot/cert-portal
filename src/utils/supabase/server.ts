import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    "https://bpydvhufllpenvzgzbwx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweWR2aHVmbGxwZW52emd6Ynd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODY2MjcsImV4cCI6MjAxNjE2MjYyN30.K_I-CgxO29YkMLA8xd7bz6gnM3jiOvUhd1CH9SEQyr0",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}