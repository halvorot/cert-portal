import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bpydvhufllpenvzgzbwx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweWR2aHVmbGxwZW52emd6Ynd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODY2MjcsImV4cCI6MjAxNjE2MjYyN30.K_I-CgxO29YkMLA8xd7bz6gnM3jiOvUhd1CH9SEQyr0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: "cert-portal-auth-token",
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
