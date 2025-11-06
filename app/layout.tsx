import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Special_Elite, Inter, Quintessential } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const veteranTypewriter = Special_Elite({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-typewriter",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const quintessential = Quintessential({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brand",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rankly.ai'),
  title: {
    default: "Rankly - Answer Engine Analytics & AI Visibility Tracking",
    template: "%s | Rankly"
  },
  description: "Track how your brand performs inside AI answers. Understand which models surface your brand, how often, and in what context. Turn AI-generated answers into measurable insights.",
  keywords: [
    "answer engine optimization",
    "AEO",
    "AI visibility tracking",
    "LLM analytics",
    "ChatGPT analytics",
    "Perplexity analytics",
    "Claude analytics",
    "Gemini analytics",
    "AI brand mentions",
    "generative engine optimization",
    "SEO analytics",
    "AI traffic analytics"
  ],
  authors: [{ name: "Rankly" }],
  creator: "Rankly",
  publisher: "Rankly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Rankly",
    title: "Rankly - Answer Engine Analytics & AI Visibility Tracking",
    description: "Track how your brand performs inside AI answers. Understand which models surface your brand, how often, and in what context.",
    images: [
      {
        url: "/images/rankly-dashboard-final.png",
        width: 1200,
        height: 630,
        alt: "Rankly Dashboard - Answer Engine Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rankly - Answer Engine Analytics & AI Visibility Tracking",
    description: "Track how your brand performs inside AI answers. Turn AI-generated answers into measurable insights.",
    images: ["/images/rankly-dashboard-final.png"],
    creator: "@rankly",
  },
  alternates: {
    canonical: "/",
  },
  category: "Technology",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rankly.ai'
  
  const softwareApplicationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Rankly',
    applicationCategory: 'BusinessApplication',
    description: 'Answer Engine Analytics & AI Visibility Tracking platform. Track how your brand performs inside AI answers across ChatGPT, Perplexity, Claude, Gemini, and more.',
    url: baseUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rankly',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    description: 'Answer Engine Optimization (AEO) platform that helps businesses track and improve their visibility in AI-powered search engines.',
    sameAs: [
      'https://twitter.com/rankly',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: 'https://cal.com/sj-rankly/30min',
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${veteranTypewriter.variable} ${inter.variable} ${quintessential.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global container rulers overlay across all pages */}
          <div className="pointer-events-none fixed inset-0 z-[15]">
            <div className="mx-auto max-w-7xl h-full relative">
              <div className="absolute inset-y-0 left-0 w-[1.5px] bg-border opacity-90"></div>
              <div className="absolute inset-y-0 right-0 w-[1.5px] bg-border opacity-90"></div>
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
            </div>
          </div>

          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
