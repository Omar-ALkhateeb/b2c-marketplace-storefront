import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"
import { ArrowRightIcon } from "@/icons"

export const BannerSection = () => {
  return (
    <section className="bg-white px-4 py-4">
      <LocalizedClientLink href="/collections/boho" className="block">
        <div className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-md active:opacity-90 transition-opacity">
          <Image
            loading="lazy"
            fetchPriority="high"
            src="/images/banner-section/Image.jpg"
            alt="Boho fashion collection - Model wearing a floral dress with yellow boots"
            width={700}
            height={600}
            className="object-cover object-top w-full h-full"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <span className="text-[10px] inline-block px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold border border-white/30 mb-2">
              #COLLECTION
            </span>
            <h2 className="text-lg font-bold mb-1.5 text-white leading-tight">
              Boho Vibes
            </h2>
            <p className="text-xs text-white/90 mb-2.5 leading-snug line-clamp-2">
              Discover styles that inspire adventure
            </p>
            <div className="inline-flex items-center text-xs font-bold text-white">
              <span>Explore</span>
              <ArrowRightIcon className="ml-1" color="white" />
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </section>
  )
}
