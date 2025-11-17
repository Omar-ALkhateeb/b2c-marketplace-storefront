import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ArrowRightIcon } from "@/icons"
import { Style } from "@/types/styles"

export const styles: Style[] = [
  {
    id: 1,
    name: "LUXURY",
    href: "/collections/luxury",
  },
  {
    id: 2,
    name: "VINTAGE",
    href: "/collections/vintage",
  },
  {
    id: 3,
    name: "CASUAL",
    href: "/collections/casual",
  },
  {
    id: 4,
    name: "STREETWEAR",
    href: "/collections/streetwear",
  },
  {
    id: 5,
    name: "Y2K",
    href: "/collections/y2k",
  },
]

export function ShopByStyleSection() {
  return (
    <section className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-kiddo-accent to-kiddo-dark px-4 py-3">
        <h2 className="text-base font-bold text-white">Shop by Style</h2>
        <p className="text-[10px] text-white/90">Find your vibe</p>
      </div>
      <div className="p-3">
        <div className="space-y-2">
          {styles.map((style) => (
            <LocalizedClientLink
              key={style.id}
              href={style.href}
              className="group flex items-center justify-between px-3 py-2.5 text-primary active:text-white bg-gray-50 active:bg-gradient-to-r active:from-kiddo-accent active:to-kiddo-dark transition-all rounded-lg border border-gray-200 active:border-transparent"
            >
              <span className="text-sm font-bold">{style.name}</span>
              <ArrowRightIcon className="w-4 h-4 text-primary group-active:text-white" />
            </LocalizedClientLink>
          ))}
        </div>
      </div>
      <div className="relative h-[140px] overflow-hidden">
        <Image
          loading="lazy"
          fetchPriority="high"
          src="/images/shop-by-styles/Image.jpg"
          alt="Models showcasing luxury fashion styles"
          width={700}
          height={600}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
    </section>
  )
}
