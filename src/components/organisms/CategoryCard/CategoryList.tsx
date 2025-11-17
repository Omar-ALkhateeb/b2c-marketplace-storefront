"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import type { HttpTypes } from "@medusajs/types"

const CategoryItem = ({
  category,
  level = 0,
}: {
  category: HttpTypes.StoreProductCategory
  level?: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren =
    category.category_children && category.category_children.length > 0

  return (
    <div>
      <div
        className={`flex items-center justify-between active:bg-gray-100 transition-colors ${
          level === 0 ? "bg-white" : "bg-gray-50"
        }`}
        style={{ paddingLeft: level > 0 ? `${16 + level * 12}px` : "0px" }}
      >
        <Link
          href={`/categories/${category.handle}`}
          className="flex-1 py-3.5 px-4"
        >
          <h3 className={`font-semibold ${level === 0 ? "text-sm" : "text-xs"} text-primary`}>
            {category.name}
          </h3>
          {category.description && level === 0 && (
            <p className="text-xs text-secondary mt-0.5 line-clamp-1">
              {category.description}
            </p>
          )}
        </Link>

        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-4 active:bg-gray-200 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-secondary" />
            ) : (
              <ChevronRight className="h-4 w-4 text-secondary" />
            )}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="bg-gray-50/50 border-l-2 border-kiddo-accent/30 ml-4">
          {category.category_children.map((childCategory) => (
            <CategoryItem
              key={childCategory.id}
              category={childCategory}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {level === 0 && <div className="h-[1px] bg-gray-100" />}
    </div>
  )
}

export const CategoriesList = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="mt-2">
      {/* Main Categories Card */}
      <div className="bg-white shadow-sm rounded-t-2xl overflow-hidden">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
