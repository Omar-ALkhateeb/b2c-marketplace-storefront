"use client"

import { authenticateWithPhone } from "@/lib/data/customer"
// import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
import { useState } from "react"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Otp } from "@/components/sections/otp"
import { useParams } from "next/navigation"
import { Button } from "@medusajs/ui"

const LoginPhone = () => {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [enterOtp, setEnterOtp] = useState(false)
  const { countryCode } = useParams() as { countryCode: string }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response = await authenticateWithPhone(phone)
    setLoading(false)
    if (typeof response === "string") {
      setError(response)
      return
    }

    setEnterOtp(true)
  }

  if (enterOtp) {
    return <Otp phone={phone} />
  }

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={(value) => setPhone(value as string)}
            name="phone"
            required
            // @ts-ignore
            // defaultCountry={countryCode.toUpperCase()}
          />
        </div>
        {error && (
          <ErrorMessage error={error} data-testid="login-error-message" />
        )}
        <Button
          className="w-full mt-6"
          disabled={loading}
          type="submit"
          size="large"
          variant="primary"
          isLoading={loading}
        >
          Sign in
        </Button>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
        <button
          // onClick={() => setCurrentView(LOGIN_VIEW.REGISTER_PHONE)}
          className="underline"
          data-testid="register-button"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default LoginPhone
