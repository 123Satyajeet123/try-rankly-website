"use client";

import Image from "next/image"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { motion } from "motion/react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Card, CardContent } from "@/components/ui/card"
import { SectionFrame } from "@/components/section-frame"
import { SingularityShaders } from "@/components/ui/singularity-shaders"
import { RanklyFooter } from "@/components/rankly-footer"
import { PricingSection4 } from "@/components/ui/pricing-section-4"
import { FAQSection2 } from "@/components/ui/faq-section-2"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProductDemoSection } from "@/components/product-demo-section"

// Answer Engines Section Component
function AnswerEnginesSection() {
  const platforms = [
    { name: "ChatGPT", icon: "https://www.google.com/s2/favicons?domain=chat.openai.com&sz=256" },
    { name: "Perplexity", icon: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=256" },
    { name: "Gemini", icon: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=256" },
    { name: "Claude", icon: "https://www.google.com/s2/favicons?domain=claude.ai&sz=256" },
    { name: "Microsoft Copilot", icon: "https://www.google.com/s2/favicons?domain=copilot.microsoft.com&sz=256" },
    { name: "Grok", icon: "https://www.google.com/s2/favicons?domain=grok.x.ai&sz=256" },
    { name: "Deepseek", icon: "https://www.google.com/s2/favicons?domain=deepseek.com&sz=256" },
  ];

  return (
    <div className="relative py-20">
      <section className="relative">
        <div className="text-center mb-12 px-6 md:px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Track Major Answer Engines
          </h2>
        </div>

        {/* Favicons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 relative z-10 px-6 md:px-8">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={platform.icon}
                alt={platform.name}
                className="w-16 h-16 rounded-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl relative">
        <div>
          <div className="mb-0 max-w-5xl mx-auto px-1">
            <Hero />
          </div>
        </div>
      </div>
      
      {/* Singularity Shader - Full Width Background */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="w-full h-[600px] md:h-[700px] relative">
          {/* Top horizontal ruler - aligned with container width */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1.5px] bg-border opacity-90 pointer-events-none z-[20]"></div>
          
          {/* Bottom horizontal ruler - aligned with container width */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1.5px] bg-border opacity-90 pointer-events-none z-[20]"></div>
          
          <SingularityShaders
            speed={1.0}
            intensity={1.2}
            size={1.1}
            waveStrength={1.0}
            colorShift={1.0}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl relative px-6 md:px-8">
        {/* Answer Engines Section */}
        <AnswerEnginesSection />

        <div className="my-12">
          <section className="px-2 py-20 relative">
            {/* Top content with heading and workflow interface */}
            <div className="mb-16">
              <div className="mb-8 text-center">
                <div className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-muted border border-white/30 rounded-full mb-4" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)' }}>
                  Answer Engine Analytics
                </div>
                <h2 className="text-4xl font-bold mb-4 text-balance">
                  See how your brand performs inside AI answers
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Turn AI-generated answers into measurable insights. Understand which models surface your brand, how often, and in what context.
                </p>
                <Link href="/features/answer-engine-analytics">
                  <button className="px-4 py-1.5 text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Learn more
                  </button>
                </Link>
              </div>

              {/* Dashboard Video */}
              <div className="mt-12 -mx-8 md:-mx-10">
                <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border/50 w-full">
                  <video
                    className="w-full h-auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    key="answer-engine-analytics-v2"
                  >
                    <source src="/answer-engine-analytics.webm?v=2" type="video/webm" />
                  </video>
                </div>
              </div>
            </div>

            {/* Bottom 4 feature cards */}
            <div className="grid gap-0 md:grid-cols-4 relative py-12 -mx-8 md:-mx-10">
              {/* Grid Ruler Overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Vertical dividers */}
                <div className="absolute inset-y-0 left-1/4 w-[1.5px] bg-border opacity-90"></div>
                <div className="absolute inset-y-0 left-2/4 w-[1.5px] bg-border opacity-90"></div>
                <div className="absolute inset-y-0 left-3/4 w-[1.5px] bg-border opacity-90"></div>
                
                {/* Horizontal rulers - extended to touch container rulers */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
              </div>
              
              {/* Feature 1 */}
              <div className="px-8 py-6 relative z-10">
                
                <div className="mb-4">
                  <Icon icon="mdi:eye-outline" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Understand Visibility</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See how often your brand appears in AI answers and where it ranks across models.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="px-8 py-6 relative z-10">
                
                <div className="mb-4">
                  <Icon icon="mdi:console" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Manage Prompts</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Organize, test, and refine LLM prompts to improve response accuracy and control.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="px-8 py-6 relative z-10">
                
                <div className="mb-4">
                  <Icon icon="mdi:emoticon-happy-outline" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Understand Sentiment</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Track tone and perception across AI responses to measure brand reputation.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:link-variant" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Track Citations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor where your URLs are cited in AI answers and how they influence visibility.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="my-12">
          <section className="px-2 py-20 relative">
            {/* Top content with heading and workflow interface */}
            <div className="mb-16">
              <div className="mb-8 text-center">
                <div className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-muted border border-white/30 rounded-full mb-4" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)' }}>
                  Traffic Analytics
                </div>
                <h2 className="text-4xl font-bold mb-4 text-balance">
                  See How AI Mentions Turn into Conversions
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Rankly connects your LLM visibility with web analytics, revealing which AI Platforms and queries drive real users, clicks, and revenue to your site
                </p>
                <Link href="/features/traffic-analytics">
                  <button className="px-4 py-1.5 text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Learn more
                  </button>
                </Link>
              </div>

              {/* Dashboard Video */}
              <div className="mt-12 -mx-8 md:-mx-10">
                <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border/50 w-full">
                  <video
                    className="w-full h-auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    key="traffic-analytics-v2"
                  >
                    <source src="/traffic-analytics.webm?v=2" type="video/webm" />
                  </video>
                </div>
              </div>
            </div>

            {/* Bottom 4 feature cards */}
            <div className="grid gap-0 md:grid-cols-4 relative py-12 -mx-8 md:-mx-10">
              {/* Grid Ruler Overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Vertical dividers */}
                <div className="absolute inset-y-0 left-1/4 w-[1.5px] bg-border opacity-90"></div>
                <div className="absolute inset-y-0 left-2/4 w-[1.5px] bg-border opacity-90"></div>
                <div className="absolute inset-y-0 left-3/4 w-[1.5px] bg-border opacity-90"></div>
                
                {/* Horizontal rulers - extended to touch container rulers */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
              </div>
              
              {/* Feature 1 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:web" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Track Traffic Sources</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  See how AI-generated visibility translates into real website sessions from different channels.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:account-group" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Compare AI vs Human Visitors</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Understand how much of your traffic comes from humans versus AI crawlers - in real time.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:chart-bar" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Measure Engagement Quality</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Analyze bounce rate, session duration, and conversions to gauge LLM-sourced user performance.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:star-outline" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Discover Top Performing Pages</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Identify which pages receive the most AI-driven visitors and convert best across devices.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="my-12">
          <section className="px-2 py-20 relative">
            {/* Top content with heading and workflow interface */}
            <div className="mb-16">
              <div className="mb-8 text-center">
                <div className="inline-block px-4 py-1.5 text-sm font-medium text-white bg-muted border border-white/30 rounded-full mb-4" style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)' }}>
                  Actionables
                </div>
                <h2 className="text-4xl font-bold mb-4 text-balance">
                  Turn insights into actionable strategies
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get specific recommendations and strategies to improve your performance. Transform data into concrete steps for growth.
                </p>
                <Link href="/features/actionables">
                  <button className="px-4 py-1.5 text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    Learn more
                  </button>
                </Link>
              </div>

              {/* Dashboard Video */}
              <div className="mt-12 -mx-8 md:-mx-10">
                <div className="relative rounded-xl overflow-hidden bg-muted/20 border border-border/50 w-full">
                  <video
                    className="w-full h-auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    key="actionables-v2"
                  >
                    <source src="/actionables.webm?v=2" type="video/webm" />
                  </video>
                </div>
              </div>
            </div>

            {/* Bottom 4 feature cards */}
            <div className="grid gap-0 md:grid-cols-4 relative py-12 -mx-8 md:-mx-10">
              {/* Grid Ruler Overlay */}
              <div className="absolute inset-0 pointer-events-none z-0">
                {/* Vertical dividers */}
                <div className="absolute inset-y-0 left-1/4 w-[1.5px] bg-border opacity-90"></div>
                <div className="absolute inset-y-0 left-2/4 w-[1.5px] bg-border opacity-90"></div>
                <div className="absolute inset-y-0 left-3/4 w-[1.5px] bg-border opacity-90"></div>
                
                {/* Horizontal rulers - extended to touch container rulers */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border opacity-90 pointer-events-none"></div>
              </div>
              
              {/* Feature 1 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:lightbulb-on-outline" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Find Missing Opportunities</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Identify personas and topics with zero citations and instantly plan content to fill those gaps.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:wrench-outline" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Fix Underperforming Pages</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Identify pages that get traffic but no citations and strengthen authority signals to surface in LLM answers.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:chart-line" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Optimize What Works</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enhance well-performing content with advanced techniques to expand visibility across AI models.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="px-8 py-6 relative z-10">
                <div className="mb-4">
                  <Icon icon="mdi:arrow-expand-all" className="w-6 h-6 text-brand/60" />
                </div>
                <h3 className="text-sm font-semibold mb-3">Scale with Precision</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use Rankly's nine proven writing frameworks to generate new, high-authority pages at scale.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection4 />
      </div>

      {/* Product Demo Section */}
      <ProductDemoSection />

      {/* FAQ Section */}
      <FAQSection2 />

      {/* Rankly Footer */}
      <RanklyFooter />

      {/* Theme Toggle at bottom */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </main>
  )
}
