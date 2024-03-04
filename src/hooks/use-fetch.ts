import { useState, useEffect } from "preact/hooks"

type FetchState<T> = {
  data: T | null
  error: Error | null
  isLoading: boolean
}

export function useFetch<T>(url: string, options?: RequestInit): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const result = await response.json()
        setData(result)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, error, isLoading }
}
