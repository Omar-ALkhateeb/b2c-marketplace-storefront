import { Button } from "@/components/atoms"
import { CartItems, CartSummary } from "@/components/organisms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { retrieveCart } from "@/lib/data/cart"
import CartPromotionCode from "../CartReview/CartPromotionCode"

export const Cart = async () => {
  const cart = await retrieveCart()

  return (
    <div className="px-4 py-4 space-y-3">
      {/* Cart Items */}
      <CartItems cart={cart} />

      {/* Promotion Code Card */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <CartPromotionCode cart={cart} />
      </div>

      {/* Order Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm p-4 sticky bottom-20 z-10">
        <h3 className="text-sm font-bold text-primary mb-3">Order Summary</h3>
        <CartSummary
          item_total={cart?.item_subtotal || 0}
          shipping_total={cart?.shipping_subtotal || 0}
          total={cart?.total || 0}
          currency_code={cart?.currency_code || ""}
          tax={cart?.tax_total || 0}
        />
        <LocalizedClientLink href="/checkout?step=address">
          <Button className="w-full py-3.5 flex justify-center items-center bg-gradient-to-r from-kiddo-accent to-kiddo-dark hover:from-kiddo-dark hover:to-kiddo-accent text-white font-semibold rounded-xl shadow-lg active:scale-95 transition-all mt-4">
            Proceed to Checkout
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
