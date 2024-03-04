export const FILTERED_MEASUREMENTS = [
  "waistGirth",
  "bustGirth",
  "upperArmGirthR",
  "hipGirth",
  "thighGirthR",
  "calfGirthR"
]

export const TRANSLATED_MEASUREMENTS = {
  waistGirth: "Cintura",
  bustGirth: "Busto",
  upperArmGirthR: "Brazo",
  hipGirth: "Cadera",
  thighGirthR: "Muslo",
  calfGirthR: "Pantorrilla"
}

export type MeasurementName = keyof typeof TRANSLATED_MEASUREMENTS
export function measureNameToTitle(key: MeasurementName) {
  return TRANSLATED_MEASUREMENTS[key] ?? key
}
