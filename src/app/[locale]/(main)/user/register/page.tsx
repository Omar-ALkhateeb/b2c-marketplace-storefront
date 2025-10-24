import RegisterPhone from "@/components/molecules/RegisterPhone/RegisterPhone"
import { retrieveCustomer } from "@/lib/data/customer"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await retrieveCustomer()

  if (user) {
    redirect("/user")
  }

  return <RegisterPhone />
}
