"use client"

import { useEffect, useState } from "react"
import { WifiOff } from "lucide-react"

export function OfflineNotice() {
  const [showOffline, setShowOffline] = useState(false)

  useEffect(() => {
    // Immediate check on mount
    const checkConnection = () => {
      if (!navigator.onLine) {
        console.log("🔴 OFFLINE detected on mount")
        setShowOffline(true)
        return true
      }
      return false
    }

    // Check immediately
    const isOffline = checkConnection()

    const handleOnline = () => {
      console.log("🟢 ONLINE event fired")
      setShowOffline(false)
    }

    const handleOffline = () => {
      console.log("🔴 OFFLINE event fired")
      setShowOffline(true)
    }

    // Listen to browser events
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Aggressive polling check (backup if events don't fire)
    let pollInterval: NodeJS.Timeout | null = null

    if (!isOffline) {
      pollInterval = setInterval(() => {
        if (!navigator.onLine && !showOffline) {
          console.log("🔴 OFFLINE detected by polling")
          setShowOffline(true)
        } else if (navigator.onLine && showOffline) {
          console.log("🟢 ONLINE detected by polling")
          setShowOffline(false)
        }
      }, 1000) // Check every second
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (pollInterval) clearInterval(pollInterval)
    }
  }, [showOffline])

  if (!showOffline) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary">
      <div className="flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full bg-ui-bg-base p-6 shadow-lg">
          <WifiOff className="h-16 w-16 text-ui-fg-muted" strokeWidth={1.5} />
        </div>

        <h1 className="mb-3 text-2xl font-semibold text-ui-fg-base">
          No Internet Connection
        </h1>

        <p className="mb-8 max-w-md text-base text-ui-fg-muted">
          It looks like you&apos;re offline. Please check your internet connection and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-ui-bg-interactive px-6 py-3 font-medium text-ui-fg-on-color shadow-sm transition-all hover:bg-ui-bg-interactive-hover active:scale-95"
        >
          Try Again
        </button>

        <div className="mt-8 flex items-center gap-2 text-sm text-ui-fg-subtle">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
          <span>Offline Mode</span>
        </div>
      </div>
    </div>
  )
}
