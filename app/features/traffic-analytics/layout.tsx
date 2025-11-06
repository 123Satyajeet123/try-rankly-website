import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Traffic Analytics - AI-Driven Traffic Insights",
  description: "See how AI mentions turn into conversions. Rankly connects your LLM visibility with web analytics, revealing which AI platforms and queries drive real users, clicks, and revenue to your site.",
  openGraph: {
    title: "Traffic Analytics - AI-Driven Traffic Insights",
    description: "See how AI mentions turn into conversions. Track traffic sources, compare AI vs human visitors, and measure engagement quality.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traffic Analytics - AI-Driven Traffic Insights",
    description: "See how AI mentions turn into conversions. Track traffic sources and measure engagement quality.",
  },
}

export default function TrafficAnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

