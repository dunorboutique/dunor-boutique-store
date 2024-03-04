export function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={`${className} animate-spin`}
      width="24"
      height="24"
      fill="none"
      stroke-width="2"
      stroke="currentColor"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  )
}
