"use client"

import { useState } from "react"
import { Input } from "@/components/atoms/Input/Input"
// import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { registerWithPhone } from "@/lib/data/customer"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Otp } from "@/components/sections/otp"
import { useParams } from "next/navigation"
import { Button } from "@medusajs/ui"

// type Props = {
//   setCurrentView: (view: LOGIN_VIEW) => void
// }

const RegisterPhone = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [enterOtp, setEnterOtp] = useState(false)
  const { countryCode } = useParams() as { countryCode: string }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response = await registerWithPhone({
      firstName,
      lastName,
      phone,
    })
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
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        Become a Medusa Store Member
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Create your Medusa Store Member profile, and get access to an enhanced
        shopping experience.
      </p>
      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={(value) => setPhone(value as string)}
            name="phone"
            required
            autoComplete="off"
            // @ts-ignore
            // defaultCountry={countryCode.toUpperCase()}
          />
        </div>
        <ErrorMessage error={error} data-testid="register-error" />
        {/* <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to Medusa Store&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span> */}
        <Button
          className="w-full mt-6"
          type="submit"
          size="large"
          variant="primary"
          isLoading={loading}
        >
          Join
        </Button>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          // onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN_PHONE)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default RegisterPhone
