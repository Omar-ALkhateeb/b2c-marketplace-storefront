"use server"
import { Wishlist } from "@/types/wishlist"
import { sdk } from "../config"
import { getAuthHeaders } from "./cookies"
// import { revalidatePath } from "next/cache"
import { withDummyData } from "./use-dummy"
import { dummyData } from "./dummy-data"

export const getUserNotifications = async () => {
  const headers = {
    ...(await getAuthHeaders()),
    "Content-Type": "application/json",
    "x-publishable-api-key": process.env
      .NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
  }

  return withDummyData(
    () =>
      sdk.client
        .fetch<{ wishlists: Wishlist[]; count: number }>(`/store/notification`, {
          cache: "no-cache",
          headers,
          method: "GET",
        })
        .then((res) => {
          return res
        }),
    { notifications: dummyData.notifications, count: dummyData.notifications.length } as any
  )
}
