"use server"

import { sdk } from "../config"
import medusaError from "@/lib/helpers/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import { withDummyData } from "./use-dummy"
import { dummyData } from "./dummy-data"

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
    revalidate: 3600,
  }

  return withDummyData(
    () =>
      sdk.client
        .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
          method: "GET",
          next,
          cache: "force-cache",
        })
        .then(({ regions }) => regions)
        .catch(medusaError),
    dummyData.regions as any
  )
}

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(["regions", id].join("-"))),
    revalidate: 3600,
  }

  return withDummyData(
    () =>
      sdk.client
        .fetch<{ region: HttpTypes.StoreRegion }>(`/store/regions/${id}`, {
          method: "GET",
          next,
          cache: "force-cache",
        })
        .then(({ region }) => region)
        .catch(medusaError),
    dummyData.regions[0] as any
  )
}

const regionMap = new Map<string, HttpTypes.StoreRegion>()

export const getRegion = async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode)
    }

    const regions = await listRegions()

    if (!regions) {
      return null
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? "", region)
      })
    })

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get("us")

    return region
  } catch (e: any) {
    return null
  }
}
