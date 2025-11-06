import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Answer Engine Analytics - Track AI Visibility",
  description: "Track how your brand performs inside AI answers. Understand which models surface your brand, how often, and in what context. Monitor citations, visibility, sentiment, and influence across ChatGPT, Perplexity, Claude, and more.",
  openGraph: {
    title: "Answer Engine Analytics - Track AI Visibility",
    description: "Track how your brand performs inside AI answers across multiple platforms. Monitor citations, visibility, sentiment, and influence.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Answer Engine Analytics - Track AI Visibility",
    description: "Track how your brand performs inside AI answers. Monitor citations, visibility, sentiment, and influence.",
  },
}

export default function AnswerEngineAnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

