"use client"
import { navigation } from "./navigation"
import { Card, NavigationItem } from "@/components/atoms"
import { Order, Review } from "@/lib/data/reviews"
import { isEmpty } from "lodash"
import { usePathname } from "next/navigation"
import { OrderCard } from "./OrderCard"
import { translations } from "@/lib/translations"

export const ReviewsWritten = ({
  reviews,
  orders,
}: {
  reviews: Review[]
  orders: Order[]
}) => {
  const pathname = usePathname()

  return (
    <div className="md:col-span-3 space-y-8">
      <h1 className="heading-md uppercase">{translations.reviews.reviews}</h1>
      <div className="flex gap-4">
        {navigation.map((item) => (
          <NavigationItem
            key={item.label}
            href={item.href}
            active={pathname === item.href}
            className="px-0"
          >
            {item.label}
          </NavigationItem>
        ))}
      </div>
      {isEmpty(reviews) ? (
        <Card>
          <div className="text-center py-6">
            <h3 className="heading-lg text-primary uppercase">
              {translations.ui.noReviewsToWrite}
            </h3>
            <p className="text-lg text-secondary mt-2">
              {translations.ui.noReviewsMessage}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
