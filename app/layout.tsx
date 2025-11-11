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
  title: "Rankly - Answer Engine Analytics & AI Visibility",
  description: "Turn AI mentions into conversions",
  generator: "v0.app",
  openGraph: {
    title: "Rankly - Answer Engine Analytics & AI Visibility",
    description: "Turn AI mentions into conversions",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rankly - Answer Engine Analytics & AI Visibility",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rankly - Answer Engine Analytics & AI Visibility",
    description: "Turn AI mentions into conversions",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
