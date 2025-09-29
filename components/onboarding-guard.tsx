"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function OnboardingGuard() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const reset = searchParams.get("intro") === "1"
    if (reset) {
      localStorage.removeItem("km_onboarded")
    }

    const seen = localStorage.getItem("km_onboarded")
    if (!seen && pathname !== "/onboarding") {
      router.replace("/onboarding")
    }
  }, [pathname, router, searchParams])

  return null
}
