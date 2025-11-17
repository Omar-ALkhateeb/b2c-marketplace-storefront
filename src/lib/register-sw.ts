"use client"

export function registerServiceWorker() {
  // Only register service worker in production
  if (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    process.env.NODE_ENV === "production"
  ) {
    window.addEventListener("load", async () => {
      try {
        // Unregister any existing service workers first
        const registrations = await navigator.serviceWorker.getRegistrations()
        for (const registration of registrations) {
          await registration.unregister()
        }

        // Register new service worker
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        })

        console.log("Service Worker registered successfully:", registration)

        // Force update if there's a waiting service worker
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" })
        }

        // Listen for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "activated") {
                console.log("New Service Worker activated")
                window.location.reload()
              }
            })
          }
        })
      } catch (error) {
        console.error("Service Worker registration failed:", error)
      }
    })
  } else if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    // In development, unregister all service workers to prevent conflicts
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister()
        console.log("Unregistered service worker for development")
      })
    })
  }
}
