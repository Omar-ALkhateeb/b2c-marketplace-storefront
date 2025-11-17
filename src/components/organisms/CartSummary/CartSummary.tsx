"use client"

import { convertToLocale } from "@/lib/helpers/money"

export const CartSummary = ({
  item_total,
  shipping_total,
  total,
  currency_code,
  tax,
}: {
  item_total: number
  shipping_total: number
  total: number
  currency_code: string
  tax: number
}) => {
  return (
    <div>
      <div className="space-y-2.5 text-xs text-secondary">
        <div className="flex justify-between">
          <span>Items</span>
          <span className="text-primary font-medium">
            {convertToLocale({
              amount: item_total,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="text-primary font-medium">
            {convertToLocale({
              amount: shipping_total,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span className="text-primary font-medium">
            {convertToLocale({
              amount: tax,
              currency_code,
            })}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-3 items-center">
          <span className="text-sm font-bold text-primary">Total</span>
          <span className="text-lg font-bold text-primary">
            {convertToLocale({
              amount: total,
              currency_code,
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
