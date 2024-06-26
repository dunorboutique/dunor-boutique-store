export const capitalizeText = (text: string) =>
  text
    .split(/[\s|\(|\)]/g)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim()

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "COP"
  }).format(price)

export const formatPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4")

export const formatDateTime = (date: string) =>
  Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date))

export const formatTime = (time: number) =>
  Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }).format(new Date(time * 1000))

export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let encoded = reader.result?.toString().replace(/^data:(.*,)?/, "") ?? ""
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4))
      }
      resolve(encoded)
    }
    reader.onerror = error => reject(error)
  })
}
