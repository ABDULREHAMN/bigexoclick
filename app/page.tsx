"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"
import { isLoggedIn } from "@/lib/auth"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login")
    }
  }, [router])

  return <Dashboard />
}
