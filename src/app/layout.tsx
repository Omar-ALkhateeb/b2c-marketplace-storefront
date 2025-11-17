import type { Metadata } from "next"
import { Noto_Kufi_Arabic } from "next/font/google"
import "./globals.css"
import { Toaster } from "@medusajs/ui"
import Head from "next/head"
import { OfflineNotice } from "@/components/offline-notice"
import { ServiceWorkerRegister } from "@/components/service-worker-register"

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "Mercur B2C Demo - Marketplace Storefront"
    }`,
    default:
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "Mercur B2C Demo - Marketplace Storefront",
  },
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Mercur B2C Demo - Marketplace Storefront",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  alternates: {
    languages: {
      "x-default": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    },
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  const ALGOLIA_APP = process.env.NEXT_PUBLIC_ALGOLIA_ID
  const htmlLang = locale || "en"

  return (
    <html lang="ar" dir="rtl" className="">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Inline script to detect offline IMMEDIATELY before React loads
            (function() {
              function checkOffline() {
                if (!navigator.onLine) {
                  console.log('🔴 OFFLINE - Showing fallback');
                  document.documentElement.innerHTML = \`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>لا يوجد اتصال بالإنترنت</title>
                      <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { font-family: 'Noto Kufi Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; direction: rtl; }
                        .container { text-align: center; max-width: 500px; }
                        .icon-container { background: #1a1a1a; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; }
                        .wifi-icon { width: 64px; height: 64px; stroke: #666; stroke-width: 1.5; fill: none; }
                        h1 { font-size: 28px; font-weight: 600; margin-bottom: 16px; }
                        p { font-size: 16px; color: #999; margin-bottom: 32px; }
                        button { background: #2563eb; color: white; border: none; padding: 14px 32px; font-size: 16px; border-radius: 8px; cursor: pointer; }
                        .status { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 32px; font-size: 14px; color: #666; }
                        .status-dot { width: 8px; height: 8px; background: #ef4444; border-radius: 50%; animation: pulse 2s infinite; }
                        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <div class="icon-container">
                          <svg class="wifi-icon" viewBox="0 0 24 24"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                        </div>
                        <h1>لا يوجد اتصال بالإنترنت</h1>
                        <p>يبدو أنك غير متصل بالإنترنت. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.</p>
                        <button onclick="window.location.reload()">حاول مرة أخرى</button>
                        <div class="status"><div class="status-dot"></div><span>وضع عدم الاتصال</span></div>
                      </div>
                      <script>
                        window.addEventListener('online', () => window.location.reload());
                        setInterval(() => { if (navigator.onLine) window.location.reload(); }, 3000);
                      <\/script>
                    </body>
                    </html>
                  \`;
                }
              }
              checkOffline();
              window.addEventListener('offline', checkOffline);
            })();
          `,
        }}
      />
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://i.imgur.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
        {ALGOLIA_APP && (
          <>
            <link
              rel="preconnect"
              href="https://algolia.net"
              crossOrigin="anonymous"
            />
            <link
              rel="preconnect"
              href="https://algolianet.com"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="https://algolia.net" />
            <link rel="dns-prefetch" href="https://algolianet.com" />
          </>
        )}
        {/* Image origins for faster LCP */}
        <link
          rel="preconnect"
          href="https://medusa-public-images.s3.eu-west-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://medusa-public-images.s3.eu-west-1.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://mercur-connect.s3.eu-central-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://mercur-connect.s3.eu-central-1.amazonaws.com"
        />
        <link
          rel="preconnect"
          href="https://s3.eu-central-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://s3.eu-central-1.amazonaws.com" />
        <link
          rel="preconnect"
          href="https://api.mercurjs.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.mercurjs.com" />
      </Head>
      <body
        className={`${notoKufiArabic.className} antialiased bg-primary text-secondary relative`}
      >
        <ServiceWorkerRegister />
        <OfflineNotice />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
