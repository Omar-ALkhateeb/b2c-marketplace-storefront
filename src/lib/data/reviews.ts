"use server"
import { revalidatePath } from "next/cache"
import { sdk } from "../config"
import { getAuthHeaders } from "./cookies"
import { HttpTypes } from "@medusajs/types"
import { withDummyData } from "./use-dummy"
import { dummyData } from "./dummy-data"

export type Review = {
  id: string
  seller: {
    id: string
    name: string
    photo: string
  }
  reference: string
  customer_note: string
  rating: number
  updated_at: string
}

export type Order = HttpTypes.StoreOrder & {
  seller: { id: string; name: string; reviews?: any[] }
  reviews: any[]
}

const getReviews = async () => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  return withDummyData(
    async () => {
      const reviews = await sdk.client.fetch("/store/reviews", {
        headers,
        query: { fields: "*seller,+customer.id,+order_id" },
        method: "GET",
      })

      return reviews as { reviews: Review[] }
    },
    { reviews: dummyData.reviews as any }
  )
}

const createReview = async (review: any) => {
  const headers = {
    ...(await getAuthHeaders()),
    "Content-Type": "application/json",
    "x-publishable-api-key": process.env
      .NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
  }

  const response = await fetch(
    `${process.env.MEDUSA_BACKEND_URL}/store/reviews`,
    {
      headers,
      method: "POST",
      body: JSON.stringify(review),
    }
  ).then((res) => {
    revalidatePath("/user/reviews")
    revalidatePath("/user/reviews/written")
    return res
  })

  return response.json()
}

export { getReviews, createReview }
