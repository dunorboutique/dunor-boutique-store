import { supabase } from "@lib/supabase"

type Category = { id: number, name: string }
export async function getCategories() {
  const { data } = await supabase.from("categories").select("name")
  return data as Category[]
}

export async function getCategoryByName(name: string) {
  const { data } = await supabase
    .from("categories")
    .select("id, name")
    .eq("name", name)
  return data as Category[]
}

export async function getSubcategoryByName(name: string) {
  const { data } = await supabase
    .from("subcategories")
    .select("id, name")
    .eq("name", name)
  return data as Category[]
}
