"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileDetailsSchema, ProfileDetailsFormData } from "./schema"
import { LabeledInput } from "@/components/cells"
import { Button } from "@/components/atoms"
import { updateCustomer } from "@/lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { translations } from "@/lib/translations"

interface Props {
  defaultValues?: ProfileDetailsFormData
  handleClose?: () => void
}

export const ProfileDetailsForm: React.FC<Props> = ({
  defaultValues,
  ...props
}) => {
  const methods = useForm<ProfileDetailsFormData>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  )
}

const Form: React.FC<Props> = ({ handleClose }) => {
  const [error, setError] = useState<string>()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext()

  const submit = async (data: FieldValues) => {
    const body = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
    }
    try {
      await updateCustomer(body as HttpTypes.StoreUpdateCustomer)
    } catch (err) {
      setError((err as Error).message)
      return
    }

    setError("")
    handleClose && handleClose()
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="px-4 space-y-4">
        <div className="max-w-full grid grid-cols-2 items-top gap-4 mb-4">
          <LabeledInput
            label={translations.auth.firstName}
            placeholder={translations.auth.firstName}
            error={errors.firstName as FieldError}
            {...register("firstName")}
          />
          <LabeledInput
            label={translations.auth.lastName}
            placeholder={translations.auth.lastName}
            error={errors.lastName as FieldError}
            {...register("lastName")}
          />
          <LabeledInput
            label={translations.auth.phone}
            placeholder={translations.auth.phone}
            error={errors.phone as FieldError}
            {...register("phone")}
          />
          <LabeledInput label={translations.auth.email} disabled {...register("email")} />
        </div>
        {error && <p className="label-md text-negative">{error}</p>}
        <Button className="w-full ">{translations.actions.save}</Button>
      </div>
    </form>
  )
}
