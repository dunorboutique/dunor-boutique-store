import type { Product } from "@types"
import { supabase } from "@lib/supabase"

export async function getProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories!inner(name)")
    .eq("category.name", category)
  return { products: data as Product[] | null, error }
}

export async function getProductsById(productId: string) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", productId)
  return { product: data?.[0] as Product | null, error }
}

export async function getProductsByIds(productIds: string[]) {
  const { data, error } = await supabase
    .from("products")
    .select()
    .in("id", productIds)
  return { products: data as Product[] | null, error }
}
