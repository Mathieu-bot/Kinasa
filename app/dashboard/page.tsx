"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

export default function DashboardRedirect() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Only redirect when session loading is complete
    if (status === "loading") return
    
    if (!session) {
      router.push("/login")
      return
    }

    const userRole = session?.user?.role
    
    if (userRole === "FARMER") {
      router.push("/dashboard/farmer")
    } else if (userRole === "BUYER") {
      router.push("/dashboard/buyer")
    } else {
      console.warn("Unknown user role:", userRole)
      router.push("/dashboard/farmer")
    }
  }, [router, session, status])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-green-700" />
        <h1 className="mt-4 text-lg font-medium">Loading your dashboard...</h1>
        <p className="text-sm text-muted-foreground">Please wait a moment.</p>
      </div>
    </div>
  )
}
