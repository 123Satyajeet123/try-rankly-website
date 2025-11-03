import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { RanklyFooter } from "@/components/rankly-footer"
import { ManifestoDocument } from "@/components/manifesto-document"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"

export const metadata: Metadata = {
  title: "About Rankly",
  description: "Learn about Rankly's mission to make Answer Engine Optimization measurable and actionable. Discover how we're transforming AI visibility tracking.",
  openGraph: {
    title: "About Rankly - Answer Engine Analytics",
    description: "Learn about Rankly's mission to make Answer Engine Optimization measurable and actionable.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-4 py-16">
        <ManifestoDocument />
      </div>

      {/* Product Demo Section */}
      <ProductDemoSection />

      {/* FAQ Section */}
      <FAQSection2 />

      <RanklyFooter />
    </main>
  )
}
