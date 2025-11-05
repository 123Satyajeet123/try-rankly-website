"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { RanklyFooter } from "@/components/rankly-footer"
import { LotusLogo } from "@/components/lotus-logo"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { ProductDemoSection } from "@/components/product-demo-section"
import { FAQSection2 } from "@/components/ui/faq-section-2"
import { ThemeToggle } from "@/components/theme-toggle"
 
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Blog data with dates (in descending order - newest first)
  const blogs = [
    {
      id: 1,
      title: "What is AEO? Why Generative Engine Optimization is the New SEO",
      description: "Understand how Answer Engine Optimization is reshaping digital visibility across AI answer engines.",
      href: "/blogs/what-is-aeo",
      date: new Date("2024-11-05"), // 5 November
      category: "Insights",
    },
    {
      id: 2,
      title: "Inside Generative Engines: A Mathematical and System-Level Breakdown",
      description: "A deep dive into the mathematical foundations and system architecture that power modern generative AI engines.",
      href: "/blogs/inside-generative-engines",
      date: new Date("2024-10-25"), // 25 October
      category: "Technical",
    },
  ]

  // Sort by date descending (newest first) - already sorted but ensuring
  const sortedBlogs = [...blogs].sort((a, b) => b.date.getTime() - a.date.getTime())
  const latestBlog = sortedBlogs[0]
  const otherBlogs = sortedBlogs.slice(1)

  // Format date as "date month"
  const formatDate = (date: Date) => {
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'long' })
    return `${day} ${month}`
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <section
        className="relative py-24 px-6"
        style={{
          backgroundImage:
            "radial-gradient(var(--tw-prose-muted, rgba(0,0,0,0.08)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                Blogs
              </h1>
              <p className="text-base text-muted-foreground">
                Data-backed perspectives, written to engage curious minds and decision-makers alike.
              </p>

              {isSubmitted ? (
                <div className="flex items-center gap-2 max-w-xl">
                  <div className="flex-1 flex items-center rounded-full border border-border overflow-hidden bg-background px-4 py-3">
                    <p className="text-sm text-foreground font-normal">
                      Thanks, you will now get regular updates from Rankly!
                    </p>
                  </div>
                  <div className="w-[120px]"></div>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const email = formData.get('email') as string;
                    
                    if (!email || !email.includes('@')) {
                      return;
                    }

                    // Optimistic update - show success immediately
                    setIsSubmitted(true);

                    // Submit in the background
                    try {
                      await fetch('/api/waitlist', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      });
                    } catch (error) {
                      console.error('Error submitting email:', error);
                      // Optionally revert on error
                      // setIsSubmitted(false);
                    }
                  }}
                  className="flex items-center gap-2 max-w-xl"
                >
                  <div className="flex-1 flex items-center rounded-full border border-border overflow-hidden bg-background">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your work email"
                      className="w-full bg-transparent px-4 py-3 text-sm outline-none"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="rounded-full px-5">
                    Get latest blogs →
                  </Button>
                </form>
              )}
            </div>

            {/* Right Column - Latest Blog Hero */}
            <div className="rounded-xl border border-border bg-card text-card-foreground overflow-hidden">
              {/* Split: top graphic, bottom content */}
              <div className="flex flex-col">
                <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-100 via-orange-50 to-cyan-100 dark:from-cyan-900/20 dark:via-orange-900/20 dark:to-cyan-900/20">
                  {/* Full-width Flickering Grid background */}
                  <FlickeringGrid
                    className="absolute inset-0 z-0"
                    squareSize={4}
                    gridGap={6}
                    color="rgb(150, 150, 150)"
                    maxOpacity={0.35}
                    flickerChance={0.3}
                  />
                </div>
                <div className="px-6 py-6 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1.5 bg-muted dark:bg-muted/90 rounded-full text-xs font-medium uppercase tracking-wider text-foreground dark:text-foreground border border-border/80 dark:border-white/30">
                      {latestBlog.category}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {formatDate(latestBlog.date)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-4 leading-tight">
                    {latestBlog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {latestBlog.description}
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={latestBlog.href} className="no-underline">Discover the Future →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Blogs Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl relative px-6 md:px-8">
          
          <h2 className="text-2xl font-bold mb-8">All Blogs</h2>
          
          {/* Filters removed per request */}

          {/* Reports Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherBlogs.map((blog) => (
              <Card key={blog.id} className="group hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden">
                <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-cyan-100 via-orange-50 to-cyan-100 dark:from-cyan-900/20 dark:via-orange-900/20 dark:to-cyan-900/20">
                  <FlickeringGrid
                    className="absolute inset-0"
                    squareSize={4}
                    gridGap={6}
                    color="rgb(150, 150, 150)"
                    maxOpacity={0.35}
                    flickerChance={0.3}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {formatDate(blog.date)}
                    </span>
                  </div>
                  <CardTitle className="text-sm font-bold leading-tight">
                    {blog.title}
                  </CardTitle>
                  <CardDescription>
                    {blog.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 mt-auto flex items-center justify-between">
                  <span className="px-2 py-1 bg-muted dark:bg-muted/90 rounded-full text-[10px] font-medium uppercase tracking-wider text-foreground dark:text-foreground border border-border/80 dark:border-white/30">
                    {blog.category}
                  </span>
                  <Button asChild variant="outline" className="w-auto px-4 bg-transparent hover:bg-transparent">
                    <Link href={blog.href} className="no-underline">Read more →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Product Demo Section */}
      <ProductDemoSection />

      {/* FAQ Section */}
      <FAQSection2 />

      <RanklyFooter />

      {/* Theme Toggle at bottom */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </main>
  )
}
