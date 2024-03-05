import type { BodygramResponse } from "@types"

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

export function filterByMeasureName(measurements: BodygramResponse["entry"]["measurements"]) {
  return measurements
    .filter(measurement => FILTERED_MEASUREMENTS.includes(measurement.name))
    .map(measurement => ({
      name: measurement.name,
      value: Number(measurement.value) / 10
    }))
}
