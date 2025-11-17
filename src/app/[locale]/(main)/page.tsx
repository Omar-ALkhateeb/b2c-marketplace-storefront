import {
  BannerSection,
  BlogSection,
  Hero,
  HomeCategories,
  HomeProductSection,
  ShopByStyleSection,
} from "@/components/sections"
import { NavbarSearch } from "@/components/molecules"

import type { Metadata } from "next"
import { headers } from "next/headers"
import Script from "next/script"
import { listRegions } from "@/lib/data/regions"
import { toHreflang } from "@/lib/helpers/hreflang"
import { listProducts } from "@/lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { SellerProps } from "@/types/seller"
import { translations } from "@/lib/translations"
// import { redirect } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`

  // Build alternates based on available regions (locales)
  let languages: Record<string, string> = {}
  try {
    const regions = await listRegions()
    const locales = Array.from(
      new Set(
        (regions || [])
          .map((r) => r.countries?.map((c) => c.iso_2) || [])
          .flat()
          .filter(Boolean)
      )
    ) as string[]

    languages = locales.reduce<Record<string, string>>((acc, code) => {
      const hrefLang = toHreflang(code)
      acc[hrefLang] = `${baseUrl}/${code}`
      return acc
    }, {})
  } catch {
    // Fallback: only current locale
    languages = { [toHreflang(locale)]: `${baseUrl}/${locale}` }
  }

  const title = translations.nav.home
  const description =
    "مرحباً بك في المتجر! اكتشف مجموعة واسعة من المنتجات عالية الجودة من أفضل البائعين."
  const ogImage = "/B2C_Storefront_Open_Graph.png"
  const canonical = `${baseUrl}/${locale}`

  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": baseUrl,
      },
    },
    openGraph: {
      title: `${title} | ${
        process.env.NEXT_PUBLIC_SITE_NAME ||
        "Mercur B2C Demo - Marketplace Storefront"
      }`,
      description,
      url: canonical,
      siteName:
        process.env.NEXT_PUBLIC_SITE_NAME ||
        "Mercur B2C Demo - Marketplace Storefront",
      type: "website",
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt:
            process.env.NEXT_PUBLIC_SITE_NAME ||
            "Mercur B2C Demo - Marketplace Storefront",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`],
    },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`

  // Fetch featured products for the homepage
  let featuredProducts: (HttpTypes.StoreProduct & { seller?: SellerProps })[] = []
  try {
    const productsData = await listProducts({
      pageParam: 1,
      queryParams: { limit: 8 },
      countryCode: locale,
    })
    featuredProducts = productsData.response.products
  } catch (error) {
    console.error("Error fetching products:", error)
  }

  // redirect(`/${locale}/categories`)
  const siteName =
    process.env.NEXT_PUBLIC_SITE_NAME ||
    "Mercur B2C Demo - Marketplace Storefront"

  return (
    <main className="flex flex-col pb-20 bg-gray-50 min-h-screen">
      <link
        rel="preload"
        as="image"
        href="/images/hero/Image.jpg"
        imageSrcSet="/images/hero/Image.jpg 700w"
        imageSizes="(min-width: 1024px) 50vw, 100vw"
      />
      {/* Organization JSON-LD */}
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteName,
            url: `${baseUrl}/${locale}/categories`,
            logo: `${baseUrl}/favicon.ico`,
          }),
        }}
      />
      {/* WebSite JSON-LD */}
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: `${baseUrl}/${locale}`,
            inLanguage: toHreflang(locale),
          }),
        }}
      />

      {/* Categories Carousel - First */}
      <div className="bg-white pt-4 pb-3">
        <div className="px-4 mb-3">
          <h2 className="text-base font-bold text-primary">{translations.categories.categories}</h2>
        </div>
        <HomeCategories heading="" />
      </div>

      {/* Search Bar - Second */}
      <div className="bg-white mt-2 px-4 py-4">
        <NavbarSearch />
      </div>

      {/* Featured Products Section - Third */}
      {featuredProducts.length > 0 && (
        <div className="mt-2 bg-white py-4">
          <div className="px-4 mb-3">
            <h2 className="text-base font-bold text-primary">{translations.common.trending}</h2>
            <p className="text-xs text-secondary mt-0.5">
              الأكثر مبيعاً هذا الموسم
            </p>
          </div>
          <HomeProductSection
            locale={locale}
            products={featuredProducts}
            home={true}
          />
        </div>
      )}

      {/* Hero Section - Compact App Style */}
      {/* <div className="mt-2">
        <Hero
          image="/images/hero/Image.jpg"
          heading="اكتشف أسلوبك"
          paragraph="تسوق أحدث صيحات الموضة من أفضل العلامات التجارية"
          buttons={[
            { label: "تسوق الآن", path: "/categories" },
            {
              label: "بيع",
              path:
                process.env.NEXT_PUBLIC_ALGOLIA_ID === "UO3C5Y8NHX"
                  ? "https://vendor-sandbox.vercel.app/"
                  : "https://vendor.mercurjs.com",
            },
          ]}
        />
      </div> */}

      {/* Shop by Style Section - Compact */}
      {/* <div className="mt-2 px-4 py-4">
        <ShopByStyleSection />
      </div> */}

      {/* Featured Collection Banner - App Card */}
      {/* <div className="mt-2">
        <BannerSection />
      </div> */}

      {/* New Arrivals Section */}
      {featuredProducts.length > 4 && (
        <div className="mt-2 bg-white py-4">
          <div className="px-4 mb-3">
            <h2 className="text-base font-bold text-primary">وصل حديثاً</h2>
            <p className="text-xs text-secondary mt-0.5">
              إضافات جديدة يومياً
            </p>
          </div>
          <HomeProductSection
            locale={locale}
            products={featuredProducts.slice(4)}
            home={true}
          />
        </div>
      )}

      {/* Blog/Tips Section - Compact */}
      {/* <div className="mt-2">
        <BlogSection />
      </div> */}
    </main>
  )
}
