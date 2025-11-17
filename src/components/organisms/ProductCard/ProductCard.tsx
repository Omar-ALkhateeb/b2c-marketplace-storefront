"use client"

import Image from "next/image"
import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { BaseHit, Hit } from "instantsearch.js"
import clsx from "clsx"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { translations } from "@/lib/translations"

export const ProductCard = ({
  product,
  api_product,
}: {
  product: Hit<HttpTypes.StoreProduct> | Partial<Hit<BaseHit>>
  api_product?: HttpTypes.StoreProduct | null
}) => {
  if (!api_product) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: api_product! as HttpTypes.StoreProduct,
  })

  const productName = String(product.title || "Product")

  return (
    <div
      className={clsx(
        "relative group transition-all duration-200 flex flex-col bg-[#F9F9F9] rounded-xl h-full"
      )}
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          aria-label={`${translations.actions.view} ${productName}`}
          title={`${translations.actions.view} ${productName}`}
        >
          <div className="overflow-hidden  w-full h-full flex justify-center align-center ">
            {product.thumbnail ? (
              <Image
                priority
                fetchPriority="high"
                src={decodeURIComponent(product.thumbnail)}
                alt={`${productName} image`}
                width={100}
                height={100}
                // Updated sizes to reflect 2-column layout on larger screens
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover aspect-square w-full object-center h-full lg:group-hover:-mt-14 transition-all duration-300 rounded-xs"
              />
            ) : (
              <Image
                priority
                fetchPriority="high"
                src="/images/placeholder.svg"
                alt={`${productName} image placeholder`}
                width={100}
                height={100}
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
              />
            )}
          </div>
        </LocalizedClientLink>
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          aria-label={`${translations.actions.seeMore} ${productName}`}
          title={`${translations.actions.seeMore} ${productName}`}
        >
          <Button className="absolute rounded-lg bg-kiddo-accent hover:bg-kiddo-dark text-white h-auto lg:h-[48px] lg:group-hover:block hidden w-full
          uppercase bottom-2 z-10 font-medium">
            {translations.actions.seeMore}
          </Button>
        </LocalizedClientLink>
      </div>
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        aria-label={`${translations.actions.goTo} ${productName}`}
        title={`${translations.actions.goTo} ${productName}`}
      >
        <div className="flex justify-between p-2 ">
          <div className="w-full">
            <h3 className="text-xs truncate text-primary font-medium mb-1">{product.title}</h3>
            <div className="flex items-center gap-2">
              <p className="font-bold text-black text-sm">{cheapestPrice?.calculated_price}</p>
              {cheapestPrice?.calculated_price !==
                cheapestPrice?.original_price && (
                <p className="text-xs text-secondary line-through">
                  {cheapestPrice?.original_price}
                </p>
              )}
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
