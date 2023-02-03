import ENVS from "@/constants/envs";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  ENVS.supabaseURL as string,
  ENVS.anonKey as string
);
