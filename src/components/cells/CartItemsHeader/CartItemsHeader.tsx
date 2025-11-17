import { Divider } from "@/components/atoms"
import { SingleProductSeller } from "@/types/product"
import { format } from "date-fns"
import { SellerAvatar } from "../SellerAvatar/SellerAvatar"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

export const CartItemsHeader = ({
  seller,
}: {
  seller: SingleProductSeller
}) => {
  return (
    <LocalizedClientLink href={`/sellers/${seller.handle}`}>
      <div className="bg-gray-50 px-4 py-3 flex gap-3 items-center border-b border-gray-100 active:bg-gray-100 transition-colors">
        <SellerAvatar photo={seller.photo} size={28} alt={seller.name} />

        <div className="flex-1">
          <p className="text-xs font-bold text-primary uppercase">{seller.name}</p>
          {seller.id !== "fleek" && (
            <p className="text-[10px] text-secondary mt-0.5">
              Joined {format(seller.created_at || "", "MMM yyyy")}
            </p>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  )
}
