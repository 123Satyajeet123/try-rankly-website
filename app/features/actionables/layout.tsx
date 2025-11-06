import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Actionables - Turn Insights into Strategies",
  description: "Get specific recommendations and strategies to improve your AEO performance. Transform data into concrete steps for growth. Find missing opportunities, fix underperforming pages, and optimize what works.",
  openGraph: {
    title: "Actionables - Turn Insights into Strategies",
    description: "Get specific recommendations and strategies to improve your AEO performance. Transform data into concrete steps for growth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Actionables - Turn Insights into Strategies",
    description: "Get specific recommendations and strategies to improve your AEO performance.",
  },
}

export default function ActionablesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

