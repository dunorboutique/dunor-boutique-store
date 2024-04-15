import type { Product } from "@types"
import { supabase } from "@lib/supabase"
import { getCategoryByName } from "./categories"

export async function getAllProducts() {
  const { data, error } = await supabase.from("products").select()
  return { products: data as Product[] | null, error }
}

export async function getProductsByCategory(category: string) {
  const categoryData = await getCategoryByName(category)
  if (!categoryData.length) return { products: null, error: { message: "Category not found" } }
  
  const categoryId = categoryData[0].id  
  const { data, error } = await supabase
    .from("products")
    .select()
    .contains("category_ids", [categoryId])
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
