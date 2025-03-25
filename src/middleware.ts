import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/client";

export async function middleware(request: NextRequest) {
  try {
    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    await supabase.auth.getSession();

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}
