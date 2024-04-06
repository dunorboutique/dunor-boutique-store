import { useState, useEffect } from "react"

type FetchState<T> = {
  data: T | null
  error: Error | null
  isLoading: boolean
  updateFetch: (url: string, options: RequestInit) => void
}

export function useFetch<T>(initialUrl: string, initOptions?: RequestInit): FetchState<T> {
  const [url, updateUrl] = useState(initialUrl)
  const [options, setOptions] = useState<RequestInit>(initOptions ?? {})
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function updateFetch(url: string, options: RequestInit) {
    updateUrl(url)
    setOptions(options)
  }

  useEffect(() => {
    if (!url) return
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const result = await response.json() as T
        setData(result)
      } catch (error: any) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url, options])

  return { data, error, isLoading, updateFetch }
}
