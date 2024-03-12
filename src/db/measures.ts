import type { UserMeasure } from "@types"
import { supabase } from "@lib/supabase"

async function getMeasureByUserId(userId: string) {
  const { data, error } = await supabase.from("measures").select("*").eq("user_id", userId)
  return { measure: data?.[0] as UserMeasure | null, error }
}

export async function createUserMeasures(userMeasure: UserMeasure) {
  const { measure } = await getMeasureByUserId(userMeasure.user_id)
  if (measure) {
    const { data, error } = await supabase
      .from("measures")
      .update([userMeasure])
      .eq("user_id", userMeasure.user_id)
    return { userMeasure: data as UserMeasure | null, error }
  }
  const { data, error } = await supabase.from("measures").insert([userMeasure])
  return { userMeasure: data as UserMeasure | null, error }
}
