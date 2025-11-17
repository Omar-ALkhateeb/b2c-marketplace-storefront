"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Button } from "@/components/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import { LabeledInput } from "@/components/cells"
import { registerFormSchema, RegisterFormData } from "./schema"
import { signup } from "@/lib/data/customer"
import { useState } from "react"
import { Container } from "@medusajs/ui"
import Link from "next/link"
import { PasswordValidator } from "@/components/cells/PasswordValidator/PasswordValidator"
import { translations } from "@/lib/translations"

export const RegisterForm = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}

const Form = () => {
  const [passwordError, setPasswordError] = useState({
    isValid: false,
    lower: false,
    upper: false,
    "8chars": false,
    symbolOrDigit: false,
  })
  const [error, setError] = useState()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const submit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("first_name", data.firstName)
    formData.append("last_name", data.lastName)
    formData.append("phone", data.phone)

    const res = passwordError.isValid && (await signup(formData))

    if (res && !res?.id) setError(res)
  }

  return (
    <main className="container">
      <Container className="border max-w-xl mx-auto mt-8 p-4">
        <h1 className="heading-md text-primary uppercase mb-8">
          {translations.auth.createAccount}
        </h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <LabeledInput
              className="md:w-1/2"
              label={translations.auth.firstName}
              placeholder={translations.auth.firstName}
              error={errors.firstName as FieldError}
              {...register("firstName")}
            />
            <LabeledInput
              className="md:w-1/2"
              label={translations.auth.lastName}
              placeholder={translations.auth.lastName}
              error={errors.lastName as FieldError}
              {...register("lastName")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <LabeledInput
              className="md:w-1/2"
              label={translations.auth.email}
              placeholder={translations.auth.email}
              error={errors.email as FieldError}
              {...register("email")}
            />
            <LabeledInput
              className="md:w-1/2"
              label={translations.auth.phone}
              placeholder={translations.auth.phone}
              error={errors.phone as FieldError}
              {...register("phone")}
            />
          </div>
          <div>
            <LabeledInput
              className="mb-4"
              label={translations.auth.password}
              placeholder={translations.auth.password}
              type="password"
              error={errors.password as FieldError}
              {...register("password")}
            />
            <PasswordValidator
              password={watch("password")}
              setError={setPasswordError}
            />
          </div>

          {error && <p className="label-md text-negative">{error}</p>}
          <Button
            className="w-full flex justify-center mt-8 uppercase"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {translations.auth.createAccount}
          </Button>
        </form>
      </Container>
      <Container className="border max-w-xl mx-auto mt-8 p-4">
        <h1 className="heading-md text-primary uppercase mb-8">
          {translations.auth.alreadyHaveAccount}
        </h1>
        <p className="text-center label-md">
          <Link href="/user">
            <Button
              variant="tonal"
              className="w-full flex justify-center mt-8 uppercase"
            >
              {translations.auth.login}
            </Button>
          </Link>
        </p>
      </Container>
    </main>
  )
}
