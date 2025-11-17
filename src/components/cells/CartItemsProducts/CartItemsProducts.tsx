import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@/lib/helpers/money"
import { DeleteCartItemButton } from "@/components/molecules"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { UpdateCartItemButton } from "@/components/molecules/UpdateCartItemButton/UpdateCartItemButton"

export const CartItemsProducts = ({
  products,
  currency_code,
  delete_item = true,
  change_quantity = true,
}: {
  products: HttpTypes.StoreCartLineItem[]
  currency_code: string
  delete_item?: boolean
  change_quantity?: boolean
}) => {
  return (
    <div className="divide-y divide-gray-100">
      {products.map((product) => {
        const { options } = product.variant ?? {}

        const total = convertToLocale({
          amount: product.subtotal ?? 0,
          currency_code,
        })

        return (
          <div key={product.id} className="p-4 flex gap-3">
            <LocalizedClientLink href={`/products/${product.product_handle}`}>
              <div className="w-[80px] h-[100px] flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                {product.thumbnail ? (
                  <Image
                    src={decodeURIComponent(product.thumbnail)}
                    alt="Product thumbnail"
                    width={80}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src={"/images/placeholder.svg"}
                      alt="Product thumbnail"
                      width={40}
                      height={50}
                      className="opacity-30"
                    />
                  </div>
                )}
              </div>
            </LocalizedClientLink>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2 mb-2">
                <LocalizedClientLink
                  href={`/products/${product.product_handle}`}
                  className="flex-1 min-w-0"
                >
                  <h3 className="text-sm font-semibold text-primary truncate">
                    {product.subtitle}
                  </h3>
                </LocalizedClientLink>
                {delete_item && (
                  <DeleteCartItemButton id={product.id} />
                )}
              </div>

              <div className="space-y-1 mb-2">
                {options?.map(({ option, id, value }) => (
                  <p key={id} className="text-xs text-secondary">
                    {option?.title}: <span className="text-primary font-medium">{value}</span>
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between mt-3">
                {change_quantity ? (
                  <UpdateCartItemButton
                    quantity={product.quantity}
                    lineItemId={product.id}
                  />
                ) : (
                  <p className="text-xs text-secondary">
                    Qty: <span className="text-primary font-medium">{product.quantity}</span>
                  </p>
                )}
                <p className="text-sm font-bold text-primary">{total}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
