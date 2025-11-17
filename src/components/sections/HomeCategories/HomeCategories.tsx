"use client"

import { Carousel } from "@/components/cells"
import React from "react"
// Font Awesome Imports
// NOTE: Ensure you have '@fortawesome/react-fontawesome' and '@fortawesome/free-solid-svg-icons' installed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMugSaucer, // Proxy for Milk/Dairy (Solid Icon)
  faShirt, // Clothing (Solid Icon)
  faBath, // Bathing (Solid Icon)
  faBaby, // Baby Gear (Solid Icon)
  faSwatchbook, // Accessories (Solid Icon)
  faTshirt, // Tops (Solid Icon)
  faAppleWhole, // Food (Solid Icon)
  faGamepad, // Toys (Solid Icon)
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

// Define the core category data
type CategoryData = {
  id: number
  name: string
  handle: string
}

// Map the data structure to include the Font Awesome icon object
export const categories: (CategoryData & { icon: any })[] = [
  // Using Font Awesome Solid icons here
  { id: 1, name: "Milk", handle: "milk", icon: faMugSaucer },
  { id: 2, name: "Clothing", handle: "clothing", icon: faShirt },
  { id: 3, name: "Bathing", handle: "bathing", icon: faBath },
  { id: 4, name: "BabyGear", handle: "baby-gear", icon: faBaby },
  { id: 5, name: "Accessories", handle: "accessories", icon: faSwatchbook },
  { id: 6, name: "Tops", handle: "tops", icon: faTshirt },
  { id: 7, name: "Food", handle: "food", icon: faAppleWhole },
  { id: 8, name: "Toys", handle: "toys", icon: faGamepad },
]

// CategoryCard component - Mobile App Style
const CategoryCard = ({ category }: { category: (typeof categories)[0] }) => {
  // IconComponent is now the Font Awesome icon object (e.g., faMugSaucer)
  const IconComponent = category.icon

  return (
    <Link href={`/categories/${category.handle}`} className="block">
      <div className="flex flex-col items-center justify-center px-2 py-3 mx-1.5 min-w-[70px] active:opacity-70 transition-opacity">
        <div className="w-12 h-12 bg-gradient-to-br from-kiddo-secondary to-kiddo-accent/60 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
          <FontAwesomeIcon
            icon={IconComponent}
            className="w-5 h-5 text-kiddo-dark"
          />
        </div>
        <span className="text-[10px] font-medium text-center text-primary leading-tight">
          {category.name}
        </span>
      </div>
    </Link>
  )
}

// HomeCategories is a Client Component
export const HomeCategories = ({ heading }: { heading: string }) => {
  return (
    <section className="w-full">
      {heading && (
        <div className="mb-3 px-4">
          <h2 className="text-base text-primary font-bold">{heading}</h2>
        </div>
      )}
      <div className="px-2">
        <Carousel
          items={categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
          showIndicator={false}
        />
      </div>
    </section>
  )
}
