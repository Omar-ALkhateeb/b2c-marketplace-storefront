"use client"

import { Input } from "@medusajs/ui"
import { useState, useRef, useEffect } from "react"
import { authenticateWithPhone, verifyOtp } from "@/lib/data/customer"
import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"

type Props = {
  phone: string
}

export const Otp = ({ phone }: Props) => {
  const [otp, setOtp] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleSubmit = async () => {
    setIsLoading(true)
    const response = await verifyOtp({
      otp,
      phone,
    })
    setOtp("")
    setIsLoading(false)

    if (typeof response === "string") {
      setError(response)
    }
  }

  const handleResend = async () => {
    authenticateWithPhone(phone)
    setCountdown(60)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const numericValue = pastedData.replace(/\D/g, "").slice(0, 6)

    if (numericValue) {
      setOtp(numericValue)
      // Focus the next empty input after pasted content
      const nextEmptyIndex = Math.min(numericValue.length, 5)
      inputRefs.current[nextEmptyIndex]?.focus()
    }
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [inputRefs.current])

  useEffect(() => {
    if (otp.length !== 6 || isLoading) {
      return
    }

    handleSubmit()
  }, [otp, isLoading])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        return prev > 0 ? prev - 1 : 0
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-sm flex flex-col items-center" data-testid="otp-page">
      <h1 className="text-large-semi uppercase mb-6">Verify Phone Number</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Enter the code sent to your phone number to login.
      </p>
      <div className="flex gap-2 mb-4">
        {[...Array(6)].map((_, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            pattern="\d*"
            inputMode="numeric"
            disabled={isLoading}
            className="w-10 h-10 text-center"
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            onPaste={handlePaste}
            value={otp[index] || ""}
            onChange={(e) => {
              const elm = e.target
              const value = elm.value
              setOtp((prev) => {
                const newOtp = prev.split("")
                newOtp[index] = value
                return newOtp.join("")
              })
              if (value && /^\d+$/.test(value)) {
                // Move focus to next input
                const nextInput =
                  elm.parentElement?.nextElementSibling?.querySelector("input")
                nextInput?.focus()
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !e.currentTarget.value) {
                // Move focus to previous input on backspace
                const prevInput =
                  e.currentTarget.parentElement?.previousElementSibling?.querySelector(
                    "input"
                  )
                prevInput?.focus()
              }
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-x-2 mb-4">
        <button
          className="text-small-regular text-ui-fg-interactive disabled:text-ui-fg-disabled disabled:cursor-not-allowed"
          onClick={handleResend}
          disabled={countdown > 0}
        >
          {countdown > 0 ? `Resend code in ${countdown}s` : "Resend Code"}
        </button>
      </div>
      <ErrorMessage error={error} />
    </div>
  )
}
