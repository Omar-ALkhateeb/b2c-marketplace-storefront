import { sdk } from "@/lib/config"
import { HttpTypes } from "@medusajs/types"
import { withDummyData } from "./use-dummy"
import { dummyData } from "./dummy-data"

interface CategoriesProps {
  query?: Record<string, any>
  headingCategories?: string[]
}

export const listCategories = async ({
  query,
}: Partial<CategoriesProps> = {}) => {
  const limit = query?.limit || 100

  return withDummyData(
    async () => {
      const categories = await sdk.client
        .fetch<{
          product_categories: HttpTypes.StoreProductCategory[]
        }>("/store/product-categories", {
          query: {
            // fields: "handle, name, rank",
            limit,
            // Start by fetching only top-level categories
            parent_category_id: "null",
            // Crucially, this parameter includes all nested children
            include_descendants_tree: "true",
            ...query,
          },
          cache: "force-cache",
          next: { revalidate: 3600 },
        })
        .then(({ product_categories }) => product_categories)

      return {
        categories: categories,
      }
    },
    { categories: dummyData.categories as any }
  )
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  return withDummyData(
    () =>
      sdk.client
        .fetch<HttpTypes.StoreProductCategoryListResponse>(
          `/store/product-categories`,
          {
            query: {
              fields: "*category_children",
              handle,
            },
            cache: "force-cache",
            next: { revalidate: 300 },
          }
        )
        .then(({ product_categories }) => product_categories[0]),
    dummyData.categories[0] as any
  )
}
