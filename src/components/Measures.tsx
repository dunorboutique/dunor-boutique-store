import { useMeasurement } from "@hooks"
import { fileToBase64 } from "@lib/format"
import { UserMeasures } from "@components/UserMeasures"
import { LoadingIcon } from "@icons/Loading"
import { FormField } from "@ui/FormField"

export default function CalculateMeasures() {
  const { measurement, isLoading, updateFetch } = useMeasurement()

  async function onSubmit(event: SubmitEvent) {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form).entries()
    const measurementes = Object.fromEntries(formData)

    // Check if any field is empty
    const emptyFields = Object.entries(measurementes).some(([_, value]) => value === "")
    if (emptyFields) {
      alert(`No pueden haber campos vacíos`)
      return
    }

    // Transform File to Base64
    const frontPhoto = measurementes.frontPhoto as File
    const rightPhoto = measurementes.rightPhoto as File
    const frontPhotoBase64 = await fileToBase64(frontPhoto)
    const rightPhotoBase64 = await fileToBase64(rightPhoto)

    // Send data to server
    const data = {
      ...measurementes,
      age: Number(measurementes.age),
      weight: Number(measurementes.weight) * 1000,
      height: Number(measurementes.height) * 10,
      frontPhoto: frontPhotoBase64,
      rightPhoto: rightPhotoBase64
    }
    updateFetch("/api/measure", { method: "POST", body: JSON.stringify(data) })
    form.reset()
  }

  return (
    <section className="grow flex flex-col items-center gap-8 py-12 pb-20 px-6">
      <h1 className="text-4xl text-center font-semibold">Calcular medidas</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-8 w-full max-w-3xl">
        <div className="flex flex-col xs:flex-row items-center gap-y-2.5 gap-x-6">
          <FormField label="Edad" type="number" name="age" min={10} max={99} placeholder="años" />
          <FormField label="Peso" type="number" name="weight" min={30} max={200} placeholder="kg" />
        </div>
        <div className="flex flex-col xs:flex-row items-center gap-y-2.5 gap-x-6">
          <FormField
            label="Altura"
            type="number"
            name="height"
            min={100}
            max={250}
            placeholder="cm"
          />
          <FormField label="Sexo" type="select" name="gender">
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </FormField>
        </div>
        <div className="flex flex-col xs:flex-row items-center gap-y-2.5 gap-x-6">
          <FormField
            label="Foto Frontal"
            type="file"
            name="frontPhoto"
            accept="image/jpeg"
            tooltip="Asegúrate de que todo tu cuerpo aparezca en el plano. Colócate en posición A, con los pies separados a la altura de los hombros y los brazos ligeramente separados del cuerpo. Imagen en formato JPG, no más de 3MB y con tamaños 1080x1920 o 720x1280, es decir relación 9:16."
            description="Recomendaciones de subida"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-dunor-black hover:file:bg-neutral-200 file:cursor-pointer cursor-help"
          />
          <FormField
            label="Foto Lateral Derecha"
            type="file"
            name="rightPhoto"
            accept="image/jpeg"
            tooltip="Mira hacia la derecha y mantén la mirada recta. Mantén los pies juntos para crear una silueta uniforme. Evita subir o bajar los brazos. Imagen en formato JPG, no más de 3MB y con tamaños 1080x1920 o 720x1280, es decir relación 9:16."
            description="Recomendaciones de subida"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral-100 file:text-dunor-black hover:file:bg-neutral-200 file:cursor-pointer cursor-help"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="shrink-0 self-center flex items-center gap-2 mt-5 px-10 py-2.5 bg-dunor-black rounded text-white text-lg font-medium disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-dunor-gold focus-visible:ring-4 transition"
        >
          {isLoading && <LoadingIcon />}
          {isLoading ? "Cargando Medidas..." : "Calcular"}
        </button>
      </form>
      {measurement && <UserMeasures measurement={measurement} />}
    </section>
  )
}
