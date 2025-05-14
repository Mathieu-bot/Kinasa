"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2 } from "lucide-react"

export default function DashboardRedirect() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function redirectBasedOnRole() {
      if (status === "loading") return
      
      if (!session) {
        router.push("/auth/login")
        return
      }

      try {
        const response = await fetch("/api/user/me")
        
        if (!response.ok) {
          throw new Error("Unable to retrieve user information")
        }
        
        const userData = await response.json()
        if (userData.role === "FARMER") {
          router.push("/dashboard/farmer")
        } else if (userData.role === "BUYER") {
          router.push("/dashboard/buyer")
        } else {
          router.push("/dashboard/farmer")
        }
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("An error occurred during redirection.")
        router.push("/dashboard/farmer")
      } finally {
        setIsLoading(false)
      }
    }

    redirectBasedOnRole()
  }, [router, session, status])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        {isLoading ? (
          <>
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-green-700" />
            <h1 className="mt-4 text-lg font-medium">Loading your dashboard...</h1>
            <p className="text-sm text-muted-foreground">Please wait a moment.</p>
          </>
        ) : error ? (
          <>
            <h1 className="text-lg font-medium text-red-600">{error}</h1>
            <p className="text-sm text-muted-foreground">You will be redirected automatically.</p>
          </>
        ) : (
          <>
            <h1 className="text-lg font-medium">Redirecting...</h1>
            <p className="text-sm text-muted-foreground">You will be redirected to your dashboard.</p>
          </>
        )}
      </div>
    </div>
  )
}
