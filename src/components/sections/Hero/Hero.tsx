import Image from "next/image"

import tailwindConfig from "../../../../tailwind.config"
import { ArrowRightIcon } from "@/icons"
import Link from "next/link"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="w-full px-4 pt-4 pb-2">
      {/* Compact App-Style Hero Banner */}
      <div className="relative w-full h-[180px] overflow-hidden rounded-2xl shadow-lg">
        <Image
          src={decodeURIComponent(image)}
          width={700}
          height={400}
          alt={`Hero banner - ${heading}`}
          className="w-full h-full object-cover"
          priority
          fetchPriority="high"
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="font-bold text-xl text-white mb-1 leading-tight drop-shadow-lg">
            {heading}
          </h1>
          <p className="text-xs text-white/90 mb-3 leading-snug line-clamp-2">{paragraph}</p>

          {/* Compact Action Buttons */}
          {buttons.length > 0 && (
            <div className="flex gap-2">
              {buttons.map(({ label, path }, index) => (
                <Link
                  key={path}
                  href={path}
                  className={`flex-1 text-center py-2.5 px-4 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 ${
                    index === 0
                      ? 'bg-white text-kiddo-dark shadow-md'
                      : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                  }`}
                  aria-label={label}
                  title={label}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
