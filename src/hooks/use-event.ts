import { useEffect } from "react"

export function useEvent(event: string, callback: EventListener) {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}
