import type { BodygramResponse } from "@types"
import { useEffect } from "preact/hooks"
import { useLocalStorage, useFetch } from "@hooks"

export function useMeasurement() {
  const [storedMeasureId, setStoredMeasureId] = useLocalStorage<string>("saved-measurement", "")
  const {
    data: measurement,
    isLoading,
    updateFetch
  } = useFetch<BodygramResponse>(`/api/measure?id=${storedMeasureId}`)

  useEffect(() => {
    if (measurement?.entry) {
      setStoredMeasureId(measurement.entry.id)
    }
  }, [measurement])

  return { measurement, isLoading, updateFetch }
}
