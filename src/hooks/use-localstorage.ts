import { useEffect, useState } from "preact/hooks"

export function useLocalStorage<T>(key: string, initialValue?: T): [T | null, (value: T) => void]{
  const [value, setValue] = useState<T | null>(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] 
}
