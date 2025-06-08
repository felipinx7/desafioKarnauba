'use client'
import { useRouter } from "next/navigation"

export const IconArrowLeft = () => {
  const router = useRouter()
  

  return (
    <svg
    onClick={() => router.back()}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6 text-white"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  )
}
