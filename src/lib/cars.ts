import { seedCars } from "@/lib/sample-data";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { Car } from "@/types";

export async function getPublishedCars(limit?: number): Promise<Car[]> {
  if (!isSupabaseConfigured || !supabase) {
    return limit ? seedCars.slice(0, limit) : seedCars;
  }

  const query = supabase
    .from("cars")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (limit) {
    query.limit(limit);
  }

  const { data, error } = await query;

  if (error || !data?.length) {
    return limit ? seedCars.slice(0, limit) : seedCars;
  }

  return data as Car[];
}
