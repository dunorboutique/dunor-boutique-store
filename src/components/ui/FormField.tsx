import { InfoIcon } from "@icons/Info"

interface FormFieldProps {
  type: "number" | "file" | "select"
  label: string
  name: string
  min?: number
  max?: number
  accept?: string
  tooltip?: string
  className?: string
  placeholder?: string
  description?: string
  children?: React.ReactNode
}

export function FormField({
  label,
  description,
  type,
  name,
  min,
  max,
  accept,
  placeholder,
  tooltip,
  className,
  children
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2 w-full">
      <span className="text-lg font-medium">{label}</span>
      {type === "select" ? (
        <select
          name={name}
          className="block px-3 py-2 w-full bg-white border rounded-md border-neutral-300 placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-dunor-gold focus-visible:ring-4 transition-shadow"
          required
        >
          <option value="">-- Selecciona una opción --</option>
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          min={min}
          max={max}
          accept={accept}
          placeholder={placeholder}
          className={`block px-3 py-2 w-full bg-white border rounded-md border-neutral-300 placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-dunor-gold focus-visible:ring-4 transition-shadow placeholder:font-[sans-serif] ${className}`}
          required
        />
      )}
      {description && (
        <span
          aria-label={tooltip || label}
          className={`flex items-center gap-0.5 text-neutral-500 text-sm leading-none cursor-help hover:underline decoration-wavy ${
            tooltip && "hint--bottom hint--large hint--rounded"
          }`}
        >
          <InfoIcon />
          {description}
        </span>
      )}
    </label>
  )
}
