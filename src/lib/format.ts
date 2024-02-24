export const capitalizeText = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "COP"
  }).format(price)

export const formatPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4")
