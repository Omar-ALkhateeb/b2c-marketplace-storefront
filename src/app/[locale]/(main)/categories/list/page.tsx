import { listCategories } from "@/lib/data/categories"
import type { HttpTypes } from "@medusajs/types"
import { CategoriesList } from "@/components/organisms/CategoryCard/CategoryList"

export default async function CategoriesPage() {
  const { categories } = (await listCategories()) as {
    categories: HttpTypes.StoreProductCategory[]
  }

  console.log(categories)

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* App-Style Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold text-primary">All Categories</h1>
        <p className="text-xs text-secondary mt-0.5">Browse everything we offer</p>
      </div>

      {/* Categories List */}
      <CategoriesList categories={categories} />
    </div>
  )
}
