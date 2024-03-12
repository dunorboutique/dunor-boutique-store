import type { BodygramResponse } from "@types"

const FILTERED_MEASUREMENTS = [
  "waistGirth",
  "bustGirth",
  "upperArmGirthR",
  "hipGirth",
  "thighGirthR",
  "calfGirthR"
]

const TRANSLATED_MEASUREMENTS = {
  waistGirth: "Cintura",
  bustGirth: "Busto",
  upperArmGirthR: "Brazo",
  hipGirth: "Cadera",
  thighGirthR: "Muslo",
  calfGirthR: "Pantorrilla"
}

const FILTERED_MEASUREMENTS_ADMIN = [
  "acrossBackShoulderWidth",
  "backNeckPointToGroundContoured",
  "backNeckPointToWaist",
  "backNeckPointToWristLengthR",
  "bellyWaistGirth",
  "bustGirth",
  "calfGirthR",
  "forearmGirthR",
  "hipGirth",
  "insideLegHeight",
  "insideLegLengthR",
  "kneeGirthR",
  "midThighGirthR",
  "neckBaseGirth",
  "neckGirth",
  "outerArmLengthR",
  "outseamR",
  "outsideLegLengthR",
  "thighGirthR",
  "topHipGirth",
  "underBustGirth",
  "upperArmGirthR",
  "waistGirth",
  "wristGirthR"
]
const TRANSLATED_MEASUREMENTS_ADMIN = {
  acrossBackShoulderWidth: "Anchura De Hombros Desde Espalda",
  backNeckPointToGroundContoured: "Altura Desde Base Cuello Al Suelo Desde Espalda",
  backNeckPointToWaist: "Largo Desde Base Cuello A Cintura Desde Espalda",
  backNeckPointToWristLengthR: "Largo Desde Base Cuello A Muñeca Derecha Desde Espalda",
  bellyWaistGirth: "Ancho Cintura Desde Ombligo",
  bustGirth: "Ancho Busto",
  calfGirthR: "Ancho Pantorrilla Derecha",
  forearmGirthR: "Ancho Antebrazo Derecho",
  hipGirth: "Ancho Cadera",
  insideLegHeight: "Longitud Pierna Desde Base Gluteo A Suelo",
  insideLegLengthR: "Longitud Pierna Desde Base Gluteo A Tobillo",
  kneeGirthR: "Ancho Rodilla Derecha",
  midThighGirthR: "Ancho Mitad Muslo Derecho",
  neckBaseGirth: "Ancho Base Cuello",
  neckGirth: "Ancho Cuello",
  outerArmLengthR: "Longitud Brazo Derecho Desde Hombro A Muñeca",
  outseamR: "Longitud Pierna Derecha Desde Cintura A Tobillo",
  outsideLegLengthR: "Longitud Pierna Derecha Desde Cintura A Suelo",
  thighGirthR: "Ancho Superior Muslo Derecho",
  topHipGirth: "Ancho Superior Cadera",
  underBustGirth: "Ancho Bajo Busto",
  upperArmGirthR: "Ancho Superior Brazo Derecho",
  waistGirth: "Ancho Cintura",
  wristGirthR: "Ancho Muñeca Derecha"
}

export type MeasurementName = keyof typeof TRANSLATED_MEASUREMENTS
export function measureNameToTitle(key: MeasurementName) {
  return TRANSLATED_MEASUREMENTS[key] ?? key.split(/(?=[A-Z][^A-Z])/).join(" ")
}

export function filterAndTranslateMeasure(measurements: BodygramResponse["entry"]["measurements"]) {
  return measurements
    .filter(measurement => FILTERED_MEASUREMENTS_ADMIN.includes(measurement.name))
    .map(measurement => ({
      name: TRANSLATED_MEASUREMENTS_ADMIN[measurement.name as MeasurementName] ?? measurement.name,
      value: `${Number(measurement.value)}mm`
    }))
}

export function filterByMeasureName(measurements: BodygramResponse["entry"]["measurements"]) {
  return measurements
    .filter(measurement => FILTERED_MEASUREMENTS.includes(measurement.name))
    .map(measurement => ({
      name: measurement.name,
      value: Number(measurement.value) / 10
    }))
}
