import type { BodygramResponse } from "@types"
import { type MeasurementName, measureNameToTitle, filterByMeasureName } from "@lib/measures"
import { formatTime } from "@lib/format"

export function UserMeasures({ measurement }: { measurement: BodygramResponse }) {
  const data = measurement.entry
  if (!data) return null

  if (data.error) {
    return <MeasurementErrors error={data.error} />
  }

  const userData = data.input.photoScan
  const measurements = filterByMeasureName(data.measurements)

  return (
    <article className="flex flex-col gap-6 mt-10">
      <h2 className="text-2xl font-semibold">Tus Medidas</h2>
      <header className="flex items-center gap-4">
        <p>
          {userData.height / 10} <span className="text-sm opacity-70">cm</span>
        </p>
        <p>
          {userData.weight / 1000} <span className="text-sm opacity-70">kg</span>
        </p>
        <p>
          {userData.age} <span className="text-sm opacity-70">años</span>
        </p>
        <p>
          <span className="text-sm opacity-70">Sexo</span>{" "}
          {userData.gender == "male" ? "Masculino" : "Femenino"}
        </p>
        <p>
          <span className="text-sm opacity-70">Fecha medida</span>{" "}
          {formatTime(data.createdAt)}
        </p>
      </header>
      <div className="grid sm:grid-cols-3 gap-4">
        {measurements.map((measurement, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between py-4 px-3 w-52 h-28 border border-neutral-400 rounded-lg"
            >
              <div className="flex flex-col justify-between">
                <h2 className="font-medium capitalize">
                  {measureNameToTitle(measurement.name as MeasurementName)}
                </h2>
                <p className="text-2xl font-bold">{measurement.value} cm</p>
              </div>
              <img
                src={`https://platform.bodygram.com/measurement/${userData.gender}-${measurement.name}.png`}
                alt={measurement.name}
                className="w-14 h-14"
              />
            </div>
          )
        })}
      </div>
    </article>
  )
}

interface MeasurementErrorsProps {
  error: {
    code: string
  }
}
function MeasurementErrors({ error }: MeasurementErrorsProps) {
  if (
    error &&
    (error?.code === "frontPhotoLeftArmAngle" || error?.code === "frontPhotoRightArmAngle")
  ) {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p className="text-lg text-center">
          No se ha podido calcular las medidas. Por favor, toma una foto frontal con los brazos
          extendidos en forma de A.
        </p>
      </div>
    )
  }

  if (error && error?.code === "frontPhotoNotInFrame") {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p className="text-lg text-center">
          No se ha podido calcular las medidas. Por favor, toma una foto frontal con los brazos
          extendidos en forma de A y asegúrate de que tu cuerpo esté completamente en el marco.
        </p>
      </div>
    )
  }

  return (<></>)
}
