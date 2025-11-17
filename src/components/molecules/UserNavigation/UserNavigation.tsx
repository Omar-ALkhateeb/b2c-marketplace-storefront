"use client"
import {
  Badge,
  Card,
  Divider,
  LogoutButton,
  NavigationItem,
} from "@/components/atoms"
import { useUnreads } from "@talkjs/react"
import { usePathname } from "next/navigation"
import {
  Package,
  MessageSquare,
  RotateCcw,
  MapPin,
  Star,
  Heart,
  Settings,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { translations } from "@/lib/translations"

const navigationItems = [
  {
    label: translations.nav.orders,
    href: "/user/orders",
    icon: Package,
  },
  {
    label: translations.messages.messages,
    href: "/user/messages",
    icon: MessageSquare,
  },
  {
    label: translations.orders.returns,
    href: "/user/returns",
    icon: RotateCcw,
  },
  {
    label: translations.user.addresses,
    href: "/user/addresses",
    icon: MapPin,
  },
  {
    label: translations.reviews.reviews,
    href: "/user/reviews",
    icon: Star,
  },
  {
    label: translations.user.wishlist,
    href: "/user/wishlist",
    icon: Heart,
  },
]

export const UserNavigation = () => {
  const unreads = useUnreads()
  const path = usePathname()

  return (
    <div className="space-y-3">
      {/* Main Menu Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          const isActive = path === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 active:bg-gray-100 transition-colors relative ${
                index !== navigationItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isActive
                    ? 'bg-gradient-to-br from-kiddo-accent to-kiddo-dark'
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                </div>
                <span className={`text-sm ${isActive ? 'font-semibold text-primary' : 'font-medium text-primary'}`}>
                  {item.label}
                </span>
                {item.label === translations.messages.messages && Boolean(unreads?.length) && (
                  <Badge className="ms-1 w-5 h-5 p-0 text-[10px] flex items-center justify-center bg-red-500">
                    {unreads?.length}
                  </Badge>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          )
        })}
      </div>

      {/* Settings & Logout Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <Link
          href="/user/settings"
          className={`flex items-center justify-between px-4 py-3.5 active:bg-gray-100 transition-colors border-b border-gray-100`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              path === '/user/settings'
                ? 'bg-gradient-to-br from-kiddo-accent to-kiddo-dark'
                : 'bg-gray-100'
            }`}>
              <Settings className={`w-4 h-4 ${path === '/user/settings' ? 'text-white' : 'text-secondary'}`} />
            </div>
            <span className={`text-sm ${path === '/user/settings' ? 'font-semibold text-primary' : 'font-medium text-primary'}`}>
              {translations.user.settings}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </Link>

        <LogoutButton className="w-full text-left px-4 py-3.5 text-sm font-medium text-red-600 active:bg-gray-100 transition-colors" />
      </div>
    </div>
  )
}
