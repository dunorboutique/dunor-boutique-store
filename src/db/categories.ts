import { supabase } from "@lib/supabase"

type Category = { name: string }
export async function getCategories() {
  const { data } = await supabase.from("categories").select("name")
  return data as Category[]
}
